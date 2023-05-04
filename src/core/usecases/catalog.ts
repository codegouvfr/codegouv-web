import type { ThunkAction, State as RootState } from "core/core";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import type { Dependency, Organisation, Repository, RepositoryStatistics } from "core/ports/CodeGouvApi";
import { createObjectThatThrowsIfAccessed } from "redux-clean-architecture";
import { pipe } from "lodash/fp"
import { compact } from "lodash"
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
	organisationNames: State.OrganisationName[]
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
	selectedOrganisations: State.OrganisationName[]
	isExperimentalReposHidden: boolean,
	administrationsFilterOptions: State.AdministrationFilterOption[]
	categoriesFilterOptions: State.CategoryFilterOption[]
	dependenciesFilterOptions: State.DependenciesFilterOption[]
	functionsFilterOptions: State.FunctionsFilterOption[]
	languagesFilterOptions: State.LanguagesFilterOption[]
	licencesFilterOptions: State.LicencesFilterOption[]
	devStatusFilterOptions: State.DevStatusFilterOption[]
	organisationsFilterOptions: State.OrganisationsFilterOption[]
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
	export type OrganisationName = string
	export type AdministrationFilterOption = {
		administration: string,
		repoCount: number
	}
	export type CategoryFilterOption = {
		category: string,
		repoCount: number
	}
	export type DependenciesFilterOption = {
		dependency: string,
		repoCount: number
	}
	export type FunctionsFilterOption = {
		function: State.Function,
		repoCount: number
	}
	export type LanguagesFilterOption = {
		language: string,
		repoCount: number
	}
	export type LicencesFilterOption = {
		licence: string,
		repoCount: number
	}
	export type DevStatusFilterOption = {
		status: State.DevStatus,
		repoCount: number
	}
	export type OrganisationsFilterOption = {
		organisation: string,
		repoCount: number
	}
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

export const defaultSelectedFilters = {
	selectedAdministrations: [],
	selectedCategories: [],
	selectedDependencies: [],
	selectedFunctions: [],
	selectedVitality: 0,
	selectedLanguages: [],
	selectedLicences: [],
	selectedDevStatus: [],
	selectedOrganisations: [],
	isExperimentalReposHidden: false
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
				organisationNames: State.OrganisationName[]
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
				organisationNames,
			} = payload;

			const sort: State.Sort = "last_update_asc";

			const optionsFunction: State.Function[] = ["Source Code", "Library", "Algorithm"]
			const optionsStatus: State.DevStatus[] = ["Beta", "RC", "Concept", "Alpha", "Stable"]

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
				organisationNames,
				sort,
				search: "",
				...defaultSelectedFilters,
				administrationsFilterOptions: administrations.map(administration => (
					{
						administration: administration,
						repoCount: 1
					}
				)),
				categoriesFilterOptions: categories.map(category => (
					{
						category,
						repoCount: 1
					}
				)),
				dependenciesFilterOptions: dependencies.map(dependency => (
					{
						dependency: dependency.name,
						repoCount: 1
					}
				)),
				functionsFilterOptions: optionsFunction.map(option => (
				{
					function: option,
					repoCount: repositories.filter(repo => repo.type === option).length
				}
				)),
				languagesFilterOptions: languages.map(language => (
					{
						language,
						repoCount: 1
					}
				)),
				licencesFilterOptions: licences.map(licence => (
					{
						licence,
						repoCount: repositories.filter(repo => repo.license === licence).length
					}
				)),
				devStatusFilterOptions: optionsStatus.map(option => (
					{
						status: option,
						repoCount: repositories.filter(repo => repo.status === option).length
					}
				)),
				organisationsFilterOptions: organisationNames.map(organisationName => (
					{
						organisation: organisationName,
						repoCount: repositories.filter(repo => repo.organisation_name === organisationName).length
					}
				))
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
			state.selectedVitality = defaultSelectedFilters.selectedVitality
			state.selectedDependencies = defaultSelectedFilters.selectedDependencies
			state.selectedOrganisations = defaultSelectedFilters.selectedOrganisations
			state.selectedAdministrations = defaultSelectedFilters.selectedAdministrations
			state.selectedLanguages = defaultSelectedFilters.selectedLanguages
			state.selectedLicences = defaultSelectedFilters.selectedLicences
			state.selectedDevStatus = defaultSelectedFilters.selectedDevStatus
			state.selectedFunctions = defaultSelectedFilters.selectedFunctions
			state.selectedCategories = defaultSelectedFilters.selectedCategories
			state.isExperimentalReposHidden = defaultSelectedFilters.isExperimentalReposHidden
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
				const organisationNames = compact(await codeGouvApi.getOrganisationNames())

				dispatch(actions.initialized({
					repositories,
					repositoryStatistics,
					languages,
					administrations,
					licences,
					dependencies,
					categories,
					organisations,
					organisationNames
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
				new Fzf(repos, { "selector": ({ name }) => name }),
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

	const filterByAdministration = (repos: Repository[], organisations: Organisation[], selectedAdministrations: string[]): Repository[] => {

		/*
		* Administrations are linked to software by organisation
		* We must find organisations linked to selected administrations to filter repositories
		*/
		const selectedOrganisationsByAdministration = organisations
			.filter(organisation => {
					return organisation.administrations.some(administration => selectedAdministrations.includes(administration))
				}
			).map(organisation => organisation.name)

		return repos.filter(repo => selectedOrganisationsByAdministration.some(organisation => repo.organisation_name.includes(organisation)))
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
				(repos: Repository[]) => selectedOrganisations.length ? repos.filter(repo => selectedOrganisations.includes(repo.organisation_name)) : repos,
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

	const getAdministrationsFilterOptions = createSelector(sliceState, state => {
		return state.administrationsFilterOptions
	});

	const getCategoriesFilterOptions = createSelector(sliceState, state => {
		return state.categoriesFilterOptions
	});

	const getDependenciesFilterOptions = createSelector(sliceState, state => {
		return state.dependenciesFilterOptions
	});

	const getFunctionsFilterOptions = createSelector(
		sliceState, state => {
			return state.functionsFilterOptions
		}
	);

	const getLanguagesFilterOptions = createSelector(sliceState, state => {
		return state.languagesFilterOptions
	});

	const getLicencesFilterOptions = createSelector(sliceState, state => {
		return state.licencesFilterOptions
	});

	const getDevStatusFilterOptions = createSelector(sliceState, state => {
		return state.devStatusFilterOptions
	});

	const getOrganisationsFilterOptions = createSelector(sliceState, state => {
		return state.organisationsFilterOptions
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
		getAdministrationsFilterOptions,
		getCategoriesFilterOptions,
		getDependenciesFilterOptions,
		getFunctionsFilterOptions,
		getLanguagesFilterOptions,
		getLicencesFilterOptions,
		getDevStatusFilterOptions,
		getOrganisationsFilterOptions,
		filteredRepositories
	};
})();
