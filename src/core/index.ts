import { createReactApi } from "redux-clean-architecture/react";
import { createCore } from "core/core";
import { usecases } from "core/usecases";

export const { createCoreProvider, selectors, useCoreFunctions, useCoreState } = createReactApi({
	createCore,
	usecases
});