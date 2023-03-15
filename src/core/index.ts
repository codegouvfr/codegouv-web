import { createReactApi } from "redux-clean-architecture/react";
import { createCore } from "./core";
import { usecases } from "./usecases";

export const {
	createCoreProvider,
	selectors,
	useCoreFunctions,
	useCoreState
} = createReactApi({
	createCore,
	usecases
});
