import type { ThunkAction, State as RootState } from "core/core";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import type { Dependency, Organisation, Repository, RepositoryStatistics } from "core/ports/CodeGouvApi";
import { createObjectThatThrowsIfAccessed } from "redux-clean-architecture";
import { pipe } from "lodash/fp"
import { compact, concat } from "lodash"
import memoize from "memoizee";
import { Fzf } from "fzf"
import { assert, type Equals } from "tsafe";

import { categories as mockCategories } from "core/usecases/mock/catalog"
import { between } from "ui/tools/num";

export type State = {
	repositories: State.RepositoryInternal[];
	isLoading: boolean;
	repositoryStatistics: RepositoryStatistics;
	administrations: State.Administration[]
	categories: State.Category[]
	languages: State.Language[];
	licences: State.Licence[];
	dependencies: Dependency[]
	organisations: Organisation[]
	sort: State.Sort
	search: string
	selectedAdministrations: State.Administration[]
	selectedCategories: State.Category[]
	selectedDependencies : State.Dependency[]
	selectedFunctions: State.Function[]
	selectedVitality: State.Vitality
	selectedLanguages: State.Language[]
	selectedLicences: State.Licence[]
	selectedDevStatus: State.DevStatus[]
	selectedOrganisations: State.Organisation[]
	isExperimentalReposHidden: boolean,
};

export namespace State {
	export type RepositoryInternal = Repository
	export type Sort =
		| "name_asc"
		| "name_desc"
		| "last_update_asc"
		| "last_update_desc"
	export type Administration = string
	export type Category = string
	export type Dependency = string
	export type Function = "Algorithm" | "Library" | "Source Code"
	export type Vitality = number
	export type Language = string
	export type Licence = string
	export type DevStatus = 'Concept' | 'Alpha' | 'Beta' | 'RC' | 'Stable'
	export type Organisation = string
}

const MAX_VITALITY = 100

export const name = "catalog" as const;

/**
 * Mocked data (see initialisation with mock in privateThunks > "initialize" method)
 * - categories
 * - languages
 */

export type UpdateFilterParams<
	K extends UpdateFilterParams.Key = UpdateFilterParams.Key
> = {
	key: K;
	value: State[K];
};

export namespace UpdateFilterParams {
	export type Key = keyof Omit<State, "repositories" | "isLoading">;
}

export const defaultFiltersValues = {
	search: '',
	selectedAdministrations: [],
	selectedCategories: [],
	selectedDependencies: [],
	selectedFunctions: [],
	selectedVitality: 0,
	selectedLanguages: [],
	selectedLicences: [],
	selectedDevStatus: [],
	selectedOrganisations: [],
	isExperimentalReposHidden: true
}

export const { reducer, actions } = createSlice({
	name,
	initialState: createObjectThatThrowsIfAccessed<State>({
		"debugMessage": "State not initialized yet"
	}),
	reducers: {
		initialized: (
			_state,
			{ payload }: PayloadAction<{
				repositories: Repository[];
				repositoryStatistics: RepositoryStatistics;
				languages: State.Language[];
				administrations: State.Administration[];
				licences: State.Licence[];
				dependencies: Dependency[];
				categories: State.Category[];
				organisations: Organisation[];
			}>) => {
			const {
				repositories,
				repositoryStatistics,
				languages,
				administrations,
				licences,
				dependencies,
				categories,
				organisations,
			} = payload;

			const sort: State.Sort = "last_update_asc";

			return {
				repositories,
				filter: undefined,
				isLoading: false,
				repositoryStatistics,
				languages,
				administrations,
				licences,
				dependencies,
				categories,
				organisations,
				sort,
				...defaultFiltersValues,
			}

		},
		addRepositoryStarted: state => {
			state.isLoading = true;
		},
		addRepositoryCompleted: (state, { payload }: PayloadAction<{ newRepository: Repository; }>) => {
			const { newRepository } = payload;

			state.isLoading = false;
			state.repositories.push(newRepository);

		},
		filterUpdated: (state, { payload }: PayloadAction<UpdateFilterParams>) => {
			const { key, value } = payload;

			(state as any)[key] = value;
		},
		sortUpdated: (
			state,
			{ payload }: PayloadAction<{ sort: State.Sort }>
		) => {
			const { sort } = payload;

			state.sort = sort
		},
		filtersReset: (state) => {
			state.search = defaultFiltersValues.search
			state.selectedVitality = defaultFiltersValues.selectedVitality
			state.selectedDependencies = defaultFiltersValues.selectedDependencies
			state.selectedOrganisations = defaultFiltersValues.selectedOrganisations
			state.selectedAdministrations = defaultFiltersValues.selectedAdministrations
			state.selectedLanguages = defaultFiltersValues.selectedLanguages
			state.selectedLicences = defaultFiltersValues.selectedLicences
			state.selectedDevStatus = defaultFiltersValues.selectedDevStatus
			state.selectedFunctions = defaultFiltersValues.selectedFunctions
			state.selectedCategories = defaultFiltersValues.selectedCategories
			state.isExperimentalReposHidden = defaultFiltersValues.isExperimentalReposHidden
		},
	},
});

export const privateThunks = {
	initialize:
		(): ThunkAction =>
			async (...args) => {

				const [dispatch, , { codeGouvApi }] = args;

				const repositories = await codeGouvApi.getRepositories();
				const repositoryStatistics = await codeGouvApi.getRepositoryStatistics();
				const languages = compact(await codeGouvApi.getLanguages())
				const administrations = compact(await codeGouvApi.getAdministrations())
				const licences = compact(await codeGouvApi.getLicences())
				const dependencies = await codeGouvApi.getDependencies();
				const categories = await mockCategories
				const organisations = await codeGouvApi.getOrganisations()

				dispatch(actions.initialized({
					repositories,
					repositoryStatistics,
					languages,
					administrations,
					licences,
					dependencies,
					categories,
					organisations,
				}));
			},
};

export const thunks = {
	updateFilter:
		<K extends UpdateFilterParams.Key>(
			params: UpdateFilterParams<K>
		): ThunkAction<void> =>
			(...args) => {
				const [dispatch] = args;
				dispatch(actions.filterUpdated(params));
			},
	updateSort:
		(
			params: Record<"sort", State.Sort>
		): ThunkAction<void> =>
			(...args) => {
				const [dispatch] = args;
				dispatch(actions.sortUpdated(params));
			},
	resetFilters:
		(): ThunkAction<void> =>
			(...args) => {
				const [dispatch] = args;
				dispatch(actions.filtersReset());
			},
};

const filterByAdministration = (repos: Repository[], organisations: Organisation[], selectedAdministrations: string[]): Repository[] => {
	/*
    * Administrations are linked to software by organisation
    * We must find organisations linked to selected administrations to filter repositories
    */
	const selectedOrganisationsByAdministration = organisations
		.filter(organisation => {
				return organisation.administrations.some(administration => selectedAdministrations.includes(administration))
			}
		).map(organisation => organisation.id)

	return repos.filter(repo => selectedOrganisationsByAdministration.some(organisation => repo.organisation_id.includes(organisation)))
}

export const repositoryOrganisation = (repo: Repository, organisations: Organisation[]) => {
	return organisations.find(organisation => repo.organisation_id === organisation.id)
}

const filterByDependencies = (repos: Repository[], dependencies: Dependency[], selectedDependenciesNames: string[]): Repository[] => {
	const selectedDependencies = dependencies.filter(dependency => selectedDependenciesNames.includes(dependency.name))

	return repos.filter(repo => selectedDependencies.some(dependency => dependency.repository_urls.includes(repo.url)))
}

const filterByVitality = (repos: Repository[], selectedVitality: number): Repository[] => {
	return repos.filter(repo => between(repo.vitality, selectedVitality, MAX_VITALITY))
}

const sortRepos = (repos: Repository[], sort: State.Sort) => {
	switch (sort) {
		case "name_asc":
		default:
			return [...repos].sort((repoA, repoB) => repoA.name.localeCompare(repoB.name))

		case "name_desc":
			return [...repos].sort((repoA, repoB) => repoB.name.localeCompare(repoA.name))

		case "last_update_asc":
			return [...repos].sort((repoA, repoB) => repoB.last_updated - repoA.last_updated)

		case "last_update_desc":
			return [...repos].sort((repoA, repoB) => repoA.last_updated - repoB.last_updated)
	}
}

export const selectors = (() => {
	const sliceState = (rootState: RootState) => {
		return rootState[name];
	};

	const internalRepositories = (rootState: RootState) =>
		rootState.catalog.repositories;

	const isLoading = createSelector(sliceState, state => state.isLoading);
	const repositoryStatistics = createSelector(sliceState, state => state.repositoryStatistics);
	const administrations = createSelector(sliceState, state => state.administrations);
	const categories = createSelector(sliceState, state => state.categories);
	const languages = createSelector(sliceState, state => state.languages);
	const licences = createSelector(sliceState, state => state.licences);
	const sort = createSelector(sliceState, state => state.sort);
	const search = createSelector(sliceState, state => state.search)
	const selectedAdministrations = createSelector(sliceState, state => state.selectedAdministrations)
	const selectedCategories = createSelector(sliceState, state => state.selectedCategories)
	const selectedDependencies = createSelector(sliceState, state => state.selectedDependencies)
	const selectedFunctions = createSelector(sliceState, state => state.selectedFunctions)
	const selectedVitality = createSelector(sliceState, state => state.selectedVitality)
	const selectedLanguages = createSelector(sliceState, state => state.selectedLanguages)
	const selectedLicences = createSelector(sliceState, state => state.selectedLicences)
	const selectedDevStatus = createSelector(sliceState, state => state.selectedDevStatus)
	const selectedOrganisations = createSelector(sliceState, state => state.selectedOrganisations)
	const organisations = createSelector(sliceState, state => state.organisations)
	const dependencies = createSelector(sliceState, state => state.dependencies);
	const isExperimentalReposHidden = createSelector(sliceState, state => state.isExperimentalReposHidden);

	const { filterBySearch } = (() => {
		const getFzf = memoize(
			(repos: State.RepositoryInternal[]) =>
				new Fzf(repos, { "selector": ({ name }) => name, fuzzy: false}),
			{ "max": 1 }
		);

		const filterBySearchMemoized = memoize(
			(repos: State.RepositoryInternal[], search: string) =>
				new Set(
					getFzf(repos)
						.find(search)
						.map(({ item: { name } }) => name)
				),
			{ "max": 1 }
		);

		function filterBySearch(params: {
			repos: State.RepositoryInternal[];
			search: string;
		}) {
			const { repos, search } = params;

			const reposIds = filterBySearchMemoized(repos, search);

			return repos.filter(({ name }) => reposIds.has(name));
		}

		return { filterBySearch };
	})();

	const filteredRepositories = createSelector(
		internalRepositories,
		sort,
		search,
		selectedAdministrations,
		selectedCategories,
		selectedDependencies,
		selectedFunctions,
		selectedVitality,
		selectedLanguages,
		selectedLicences,
		selectedDevStatus,
		selectedOrganisations,
		isExperimentalReposHidden,
		organisations,
		dependencies,
		(
			internalRepositories,
			sort,
			search,
			selectedAdministrations,
			selectedCategories,
			selectedDependencies,
			selectedFunctions,
			selectedVitality,
			selectedLanguages,
			selectedLicences,
			selectedDevStatus,
			selectedOrganisations,
			isExperimentalReposHidden,
			organisations,
			dependencies,
		) => {
			return pipe(
				(repos: Repository[]) => search.length ? filterBySearch({repos, search}) : repos,
				(repos: Repository[]) => isExperimentalReposHidden ? repos.filter(repo => !repo.is_experimental) : repos,
				(repos: Repository[]) => selectedAdministrations.length ? filterByAdministration(repos, organisations, selectedAdministrations) : repos,
				(repos: Repository[]) => selectedCategories.length ?  repos.filter(repo => selectedCategories.some(selectedCategory => repo.topics.includes(selectedCategory))) : repos,
				(repos: Repository[]) => selectedDependencies.length ? filterByDependencies(internalRepositories, dependencies, selectedDependencies) : repos,
				(repos: Repository[]) => selectedFunctions.length ? repos.filter(repo => selectedFunctions.includes(repo.type)) : repos,
				(repos: Repository[]) => filterByVitality(repos, selectedVitality),
				(repos: Repository[]) => selectedLanguages.length ? repos.filter(repo => selectedLanguages.includes(repo.language)) : repos,
				(repos: Repository[]) => selectedDevStatus.length ? repos.filter(repo => selectedDevStatus.includes(repo.status)) : repos,
				(repos: Repository[]) => selectedLicences.length ? repos.filter(repo => selectedLicences.includes(repo.license)) : repos,
				(repos: Repository[]) => selectedOrganisations.length ? repos.filter(repo => selectedOrganisations.includes(repo.organisation_id)) : repos,
				(repos: Repository[]) => sortRepos(repos, sort)
			)(internalRepositories) as Repository[]
	}
	);

	const sortOptions =  createSelector(sliceState, _state => {
		const sorts = [
			"name_asc" as const,
			"name_desc" as const,
			"last_update_asc" as const,
			"last_update_desc" as const,
		];

		assert<Equals<(typeof sorts)[number], State.Sort>>();

		return sorts;
	});

	const administrationsFilterOptions = createSelector(sliceState, state => {
		return state.administrations
	});

	const categoriesFilterOptions = createSelector(sliceState, state => {
		return state.categories
	});

	const dependenciesFilterOptions = createSelector(sliceState, state => {
		return state.dependencies.map(dependency => dependency.name)
	});

	const functionsFilterOptions = createSelector(
		sliceState, _state => {
			return ["Source Code", "Library", "Algorithm"] satisfies State.Function[]
		}
	);

	const languagesFilterOptions = createSelector(sliceState, state => {
		return state.languages
	});

	const licencesFilterOptions = createSelector(sliceState, state => {
		return state.licences
	});

	const devStatusFilterOptions = createSelector(sliceState, state => {
		return ["Beta", "RC", "Concept", "Alpha", "Stable"] satisfies State.DevStatus[]
	});

	const organisationsFilterOptions = createSelector(sliceState, state => {
		return state.organisations.map(organisation => (
			{
				organisation: organisation.name,
				organisationId: organisation.id,
			}
		))
	});

	const filters = createSelector(sliceState, state => {

		const selectedOrganisationsLabel =
			compact(
				state.selectedOrganisations
					.map(selectedOrganisation => state.organisations.find(organisation => organisation.id === selectedOrganisation)))
				.map(organisation => organisation.name)


		return concat(
			state.selectedAdministrations,
			state.selectedCategories,
			state.selectedDependencies,
			state.selectedLanguages,
			state.selectedLicences,
			state.selectedDevStatus,
			selectedOrganisationsLabel
		)
	});

	return {
		isLoading,
		repositoryStatistics,
		languages,
		administrations,
		licences,
		selectedFunctions,
		organisations,
		dependencies,
		categories,
		sortOptions,
		search,
		administrationsFilterOptions,
		categoriesFilterOptions,
		dependenciesFilterOptions,
		functionsFilterOptions,
		languagesFilterOptions,
		licencesFilterOptions,
		devStatusFilterOptions,
		organisationsFilterOptions,
		filteredRepositories,
		filters
	};
})();
