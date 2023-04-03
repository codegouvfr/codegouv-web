import type { ThunkAction, State as RootState } from "core/core";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import type {Dependency, Repository, RepositoryStatistics} from "core/ports/CodeGouvApi";
import { createObjectThatThrowsIfAccessed } from "redux-clean-architecture";
import { uniqBy } from "lodash"
import { objectKeys } from "tsafe/objectKeys";
import { pipe, flow, filter} from "lodash/fp"

import {categories as mockCategories, repositories as mockRepositories, languages as mockLanguages} from "core/usecases/mock/catalog"
import { includes } from "evt/tools/reducers";

export type State = {
	repositories: State.RepositoryInternal[];
	isLoading: boolean;
	repositoryStatistics: RepositoryStatistics;
	languages: string[];
	licences: string[];
	dependencies: Dependency[]
	categories: string[]
	administrations: State.Administration[]
	organisations: State.Organisation[] | undefined
	selectedFunctions: State.Function[]
	selectedLanguages: State.Language[]
};

export namespace State {
	export type RepositoryInternal = Repository
	export type Administration = string
	export type Organisation = string
	export type Function = "Algorithm" | "Library" | "Source Code"
	export type Language = string
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
			{ payload }: PayloadAction<{ repositories: Repository[]; repositoryStatistics: RepositoryStatistics, languages: string[], administrations: string[], licences: string[], dependencies: Dependency[], categories: string[] }>) => {
			const { repositories, repositoryStatistics, languages, administrations, licences, dependencies, categories } = payload;

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
				organisations: undefined,
				selectedFunctions: [],
				selectedLanguages: []
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
				const repositoryStatistics = await codeGouvApi.getRepositoryStatistics();
				//const languages = await codeGouvApi.getLanguages();
				const languages = await mockLanguages;
				const administrations = await codeGouvApi.getAdministrations();
				const licences = await codeGouvApi.getLicences()
				const dependencies = await codeGouvApi.getDependencies();
				const categories = await mockCategories

				dispatch(actions.initialized({
					repositories,
					repositoryStatistics,
					languages,
					administrations,
					licences,
					dependencies,
					categories,
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

	const languages = createSelector(sliceState, state => {
		return state.languages;
	});

	const administrations = createSelector(sliceState, state => {
		return state.administrations;
	});

	const licences = createSelector(sliceState, state => {
		return state.licences;
	});

	const devStatus = createSelector(sliceState, state => {
		return uniqBy(state.repositories, "status").map(repo => repo.status)
	})

	const selectedFunctions = createSelector(sliceState, state => {
		return state.selectedFunctions
	})

	const selectedLanguages = createSelector(sliceState, state => {
		return state.selectedLanguages
	})

	const organisations = createSelector(sliceState, state => {
		return uniqBy(state.repositories, "organisation_name").map(repo => repo.organisation_name)
	})

	const dependencies = createSelector(sliceState, state => {
		return uniqBy(state.dependencies, "name").map(dependency => dependency.name)
	});

	const categories = createSelector(sliceState, state => {
		return state.categories
	});

	const filteredRepositories = createSelector(
		internalRepositories,
		selectedFunctions,
		selectedLanguages,
		(
			internalRepositories,
			selectedFunctions,
			selectedLanguages
		) => {
			console.log(selectedLanguages)
			/*const repositories: Repository[] = selectedFunctions.length ? internalRepositories.filter(repo => selectedFunctions.includes(repo.type)) : internalRepositories
			return repositories*/

			const repositories: Repository[] = pipe(
				(repos: Repository[]) => selectedFunctions.length ? repos.filter(repo => selectedFunctions.some(f => repo.type.includes(f))) : repos,
				(repos: Repository[]) => selectedLanguages.length ? repos.filter(repo => selectedLanguages.some(f => repo.language.includes(f))) : repos,
				//(repos: Repository[]) => selectedLanguages.length ? repos.filter(repo => selectedLanguages.includes(repo.language)) : repos,
			)(internalRepositories)

			return repositories
		}
	);

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
		functionFilterOptions,
		languagesFilterOptions,
		filteredRepositories
	};
})();
