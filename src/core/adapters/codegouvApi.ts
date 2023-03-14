import type { CodegouvApi, Repository } from "core/ports/CodegouvApi";
import { z } from "zod";
import { type Equals, assert } from "tsafe";
import memoize from "memoizee";

const zRepository = z.object({
	"url": z.string(),
});

assert<Equals<Repository, ReturnType<(typeof zRepository)["parse"]>>>();

console.log("zut alors!");

export function createCodeGouvApi(
	params: {
		url: string;
	}
): CodegouvApi {

	const { url } = params;

	const out: CodegouvApi=  {
		"getRepositories": memoize(async () => {

			const resp = await fetch(`${url}/repositoriesyouyouyou`)

			const data = await resp.json();

			const dataConfirmed = z.array(zRepository).parse(data);

			return dataConfirmed;

		}),
		"addRepository": async ({ url }) => {

			await fetch(`${url}/repo/add`)

			out.getRepositories.clear();

		}
	};

	return out;

}
