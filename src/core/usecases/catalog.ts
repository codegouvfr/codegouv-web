import type { ThunkAction, State as RootState } from "core/core";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import type { Dependency, Organisation, Repository, RepositoryStatistics } from "core/ports/CodeGouvApi";
import { createObjectThatThrowsIfAccessed } from "redux-clean-architecture";
import { uniqBy } from "lodash"
import { pipe } from "lodash/fp"

import {categories as mockCategories, repositories as mockRepositories, languages as mockLanguages} from "core/usecases/mock/catalog"

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
	selectedAdministrations: State.Administration[]
	selectedCategories: State.Category[]
	selectedDependencies : State.Dependency[]
	selectedFunctions: State.Function[]
	selectedVitality: State.Vitality[]
	selectedLanguages: State.Language[]
	selectedLicences: State.Licence[]
	selectedDevStatus: State.DevStatus[]
	selectedOrganisations: State.OrganisationName[]
	isExperimentalReposHidden: boolean
};

export namespace State {
	export type RepositoryInternal = Repository
	export type Administration = string
	export type Category = string
	export type Dependency = string
	export type Function = "Algorithm" | "Library" | "Source Code"
	export type Vitality = number
	export type Language = string
	export type Licence = string
	export type DevStatus = 'Concept' | 'Alpha' | 'Beta' | 'RC' | 'Stable'
	export type OrganisationName = string
}

export const name = "catalog" as const;

/**
 * Mocked data (see initialisation with mock in privateThunks > "initialize" method)
 * - categories
 * - repositories
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
				selectedAdministrations: [],
				selectedCategories: [],
				selectedDependencies: [],
				selectedFunctions: [],
				selectedVitality: [],
				selectedLanguages: [],
				selectedLicences: [],
				selectedDevStatus: [],
				selectedOrganisations: [],
				isExperimentalReposHidden: false
			};

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
		}
	},
});

export const privateThunks = {
	initialize:
		(): ThunkAction =>
			async (...args) => {

				const [dispatch, , { codeGouvApi }] = args;

				const repositories = await mockRepositories;
				//const repositories = await codeGouvApi.getRepositories();
				const repositoryStatistics = await codeGouvApi.getRepositoryStatistics();
				//const languages = await codeGouvApi.getLanguages();
				const languages = await mockLanguages;
				const administrations = await codeGouvApi.getAdministrations();
				const licences = await codeGouvApi.getLicences()
				const dependencies = await codeGouvApi.getDependencies();
				const categories = await mockCategories
				const organisations = await codeGouvApi.getOrganisations()
				const organisationNames = await codeGouvApi.getOrganisationNames()

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
	/*addRepository:
		(params: { url: string; }): ThunkAction =>
			async (...args) => {

				const { url } = params;

				const [dispatch, , { codeGouvApi }] = args;

				dispatch(actions.addRepositoryStarted());
			},*/
	updateFilter:
		<K extends UpdateFilterParams.Key>(
			params: UpdateFilterParams<K>
		): ThunkAction<void> =>
			(...args) => {
				const [dispatch] = args;
				dispatch(actions.filterUpdated(params));
			}
};

export const selectors = (() => {
	const sliceState = (rootState: RootState) => {
		return rootState[name];
	};

	const internalRepositories = (rootState: RootState) =>
		rootState.catalog.repositories;

	const isLoading = createSelector(sliceState, state => {
		return state.isLoading;
	});

	const repositoryStatistics = createSelector(sliceState, state => {
		return state.repositoryStatistics;
	});

	const administrations = createSelector(sliceState, state => {
		return state.administrations;
	});

	const categories = createSelector(sliceState, state => {
		return state.categories;
	});

	const languages = createSelector(sliceState, state => {
		return state.languages;
	});

	const licences = createSelector(sliceState, state => {
		return state.licences;
	});

	const devStatus = createSelector(sliceState, state => {
		return uniqBy(state.repositories, "status").map(repo => repo.status)
	})

	const selectedAdministrations = createSelector(sliceState, state => {
		return state.selectedAdministrations
	})

	const selectedCategories = createSelector(sliceState, state => {
		return state.selectedCategories
	})

	const selectedDependencies = createSelector(sliceState, state => {
		return state.selectedDependencies
	})

	const selectedFunctions = createSelector(sliceState, state => {
		return state.selectedFunctions
	})

	const selectedVitality = createSelector(sliceState, state => {
		return state.selectedVitality
	})

	const selectedLanguages = createSelector(sliceState, state => {
		return state.selectedLanguages
	})

	const selectedLicences = createSelector(sliceState, state => {
		return state.selectedLicences
	})

	const selectedDevStatus = createSelector(sliceState, state => {
		return state.selectedDevStatus
	})

	const selectedOrganisations = createSelector(sliceState, state => {
		return state.selectedOrganisations
	})

	const organisationNames = createSelector(sliceState, state => {
		return state.organisationNames
	})

	const organisations = createSelector(sliceState, state => {
		return state.organisations
	})

	const dependenciesNames = createSelector(sliceState, state => {
		return uniqBy(state.dependencies, "name").map(dependency => dependency.name)
	});

	const dependencies = createSelector(sliceState, state => {
		return state.dependencies
	});

	const isExperimentalReposHidden = createSelector(sliceState, state => {
		return state.isExperimentalReposHidden
	});

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

	function between(x: number, min: number, max: number) {
		return x >= min && x <= max;
	}

	const filterByVitality = (repos: Repository[], selectedVitality: number[]): Repository[] => {
		/*TODO: Add debounce*/
		return repos.filter(repo => between(repo.vitality, selectedVitality[0], selectedVitality[1]))
	}

	const filteredRepositories = createSelector(
		internalRepositories,
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

			console.log(isExperimentalReposHidden)

			// TODO: return pipe
			// TODO: change pipe by chain ?
			const repositories: Repository[] = pipe(
				(repos: Repository[]) => isExperimentalReposHidden ? repos.filter(repo => !repo.is_experimental) : repos,
				(repos: Repository[]) => selectedAdministrations.length ? filterByAdministration(repos, organisations, selectedAdministrations) : repos,
				(repos: Repository[]) => selectedCategories.length ? repos.filter(repo => selectedCategories.some(selectedCategory => repo.topics.includes(selectedCategory))) : repos,
				(repos: Repository[]) => selectedDependencies.length ? filterByDependencies(repos, dependencies, selectedDependencies) : repos,
				(repos: Repository[]) => selectedFunctions.length ? repos.filter(repo => selectedFunctions.some(selectedFunction => repo.type.includes(selectedFunction))) : repos,
				(repos: Repository[]) => selectedVitality.length ? filterByVitality(repos, selectedVitality) : repos,
				(repos: Repository[]) => selectedLanguages.length ? repos.filter(repo => selectedLanguages.some(selectedLanguage => repo.language.includes(selectedLanguage))) : repos,
				(repos: Repository[]) => selectedLicences.length ? repos.filter(repo => selectedLicences.some(selectedLicence => repo.license.includes(selectedLicence))) : repos,
				(repos: Repository[]) => selectedDevStatus.length ? repos.filter(repo => selectedDevStatus.some(selectedStatus => repo.status.includes(selectedStatus))) : repos,
				(repos: Repository[]) => selectedOrganisations.length ? repos.filter(repo => selectedOrganisations.some(selectedOrganisation => repo.organisation_name.includes(selectedOrganisation))) : repos,
			)(internalRepositories)

			console.log(repositories)

			return repositories
		}
	);

	const administrationsFilterOptions = createSelector(sliceState, state => {
		return state.administrations;
	});

	const categoriesFilterOptions = createSelector(sliceState, state => {
		return state.categories;
	});

	const dependenciesFilterOptions = createSelector(sliceState, state => {
		return state.dependencies.map(dependency => dependency.name);
	});

	const functionFilterOptions = createSelector(
		internalRepositories,
		(
			internalRepositories,
		) => {
			return uniqBy(internalRepositories, "type").map(repo => repo.type)
		}
	);

	const languagesFilterOptions = createSelector(sliceState, state => {
		return state.languages;
	});

	const licencesFilterOptions = createSelector(sliceState, state => {
		return state.licences;
	});

	const devStatusFilterOptions = createSelector(sliceState, state => {
		const options: State.DevStatus[] = ["Beta", "RC", "Concept", "Alpha", "Stable"]

		return options;
	});

	const organisationsFilterOptions = createSelector(sliceState, state => {
		return state.organisationNames;
	});

	return {
		isLoading,
		repositoryStatistics,
		languages,
		administrations,
		licences,
		devStatus,
		selectedFunctions,
		organisations,
		dependencies,
		categories,
		administrationsFilterOptions,
		categoriesFilterOptions,
		dependenciesFilterOptions,
		functionFilterOptions,
		languagesFilterOptions,
		licencesFilterOptions,
		devStatusFilterOptions,
		organisationsFilterOptions,
		filteredRepositories
	};
})();
