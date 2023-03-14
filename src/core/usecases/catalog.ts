import type { ThunkAction, State as RootState } from "core/core";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import type { Repository } from "core/ports/CodegouvApi";
import { createObjectThatThrowsIfAccessed } from "redux-clean-architecture";

export type State = {
	repositories: Repository[];
	filter: undefined | "github" | "gitlab";
	isLoading: boolean;
};

export const name = "catalog" as const;

export const { reducer, actions } = createSlice({
	name,
	"initialState": createObjectThatThrowsIfAccessed<State>({
		"debugMessage": "State not initialized yet"
	}),
	"reducers": {
		"initialized": (_state, { payload }: PayloadAction<{ repositories: Repository[]; }>) => {

			const { repositories } = payload;

			return {
				repositories,
				"filter": undefined,
				"isLoading": false
			};

		},
		"addRepositoryStarted": state => {
			state.isLoading = true;
		},
		"addRepositoryCompleted": (state, { payload }: PayloadAction<{ newRepository: Repository; }>) => {
			const { newRepository } = payload;

			state.isLoading = false;
			state.repositories.push(newRepository);

		},
		"filterChanged": (state, { payload }: PayloadAction<{ newFilter: State["filter"]; }>) => {
			const { newFilter } = payload;

			state.filter = newFilter;

		}
	},
});

export const privateThunks = {
	"initialize":
		(): ThunkAction =>
			async (...args) => {

				const [dispatch, , { codegouvApi }] = args;

				const repositories = await codegouvApi.getRepositories();

				dispatch(actions.initialized({
					repositories
				}));

			},
};

export const thunks = {
	"addRepository":
		(params: { url: string; }): ThunkAction =>
			async (...args) => {

				const { url } = params;

				const [dispatch, , { codegouvApi }] = args;

				dispatch(actions.addRepositoryStarted());

				await codegouvApi.addRepository({ url });

				dispatch(actions.addRepositoryCompleted({
					"newRepository": { url }
				}));

			},
	"changeFilter":
		(params: { filter: State["filter"]; }): ThunkAction<void> =>
			(...args) => {

				const { filter } = params;

				const [dispatch] = args;

				dispatch(actions.filterChanged({ "newFilter": filter }));

			}
};

export const selectors = (() => {
	const sliceState = (rootState: RootState) => {
		const state = rootState[name];
		return state;
	};

	const isLoading = createSelector(sliceState, state => {
		return state.isLoading;
	});

	const filteredRepo = createSelector(sliceState, state => {

		const { filter, repositories } = state;

		if (filter === undefined) {
			return repositories;
		}

		return repositories.filter(({ url }) => url.startsWith(`https://${filter}.com`));

	});

	const repositoryCount = createSelector(filteredRepo, sliceState, (filteredRepo, state) => {
		return {
			"countInCurrentFilter": filteredRepo.length,
			"totalCount": state.repositories.length
		};
	});

	const filter = createSelector(sliceState, state => {
		return state.filter;
	});

	return {
		isLoading,
		filteredRepo,
		repositoryCount,
		filter
	};
})();




