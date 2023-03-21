import type { Action, ThunkAction as ReduxGenericThunkAction } from "@reduxjs/toolkit";
import { createCoreFromUsecases } from "redux-clean-architecture";
import type { GenericCreateEvt } from "redux-clean-architecture";
import { usecases } from "./usecases"
import { Language } from "../ui/tools/Lang";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";

type CoreParams = {
	keycloakParams: {
		url: string;
		realm: string;
		clientId: string;
	} | undefined;
	apiUrl: string | undefined;
	getCurrentLang: () => Language;
};

export async function createCore(params: CoreParams) {

	const { apiUrl, keycloakParams, getCurrentLang, ...rest } = params;

	assert<Equals<typeof rest, {}>>();

	const codeGouvApi = await (async () => {

		// if (apiUrl === undefined) {

			const { createCodeGouvApiSemiMock } = await import("core/adapters/CodeGouvApiSemiMock");

			return createCodeGouvApiSemiMock();

		// }

		// const { createCodeGouvApi } = await import("core/adapters/codegouvApi");
		//
		// return createCodeGouvApi({
		// 	"url": apiUrl
		// });

	})();

	const oidcClient = await (async () => {

		if (keycloakParams === undefined) {

			const { createMockOidcClient } = await import("core/adapters/oidcClientMock");

			return createMockOidcClient();

		}

		const { createOidcClient } = await import("core/adapters/oidcClient");

		return createOidcClient(keycloakParams);

	})();

	const core = createCoreFromUsecases({
		"thunksExtraArgument": {
			"coreParams": params,
			codeGouvApi: codeGouvApi,
			oidcClient
		},
		usecases
	});

	await core.dispatch(usecases.catalog.privateThunks.initialize());

	return core;

}

type Core = Awaited<ReturnType<typeof createCore>>;

export type State = ReturnType<Core["getState"]>;

/** @deprecated: Use Thunks as soon as we cas use 'satisfy' from TS 4.9 */
export type ThunkAction<RtnType = Promise<void>> = ReduxGenericThunkAction<
	RtnType,
	State,
	Core["thunksExtraArgument"],
	Action<string>
>;

export type CreateEvt = GenericCreateEvt<Core>;
