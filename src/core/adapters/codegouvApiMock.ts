import type { CodegouvApi, Repository } from "core/ports/CodegouvApi";
import memoize from "memoizee";


export function createCodeGouvApiMock(): CodegouvApi {

	const repositories: Repository[] = [
		{
			"url": "https://github.com/garronej/evt"
		},
		{
			"url": "https://github.com/garronej/tss-react"
		},
		{
			"url": "https://github.com/garronej/cra-envs"
		},
		{
			"url": "https://gitlab.com/op18-enki/cosmic-sapeurs"
		},
		{
			"url": "https://gitlab.com/gitlab/abc"
		}
	];


	const out: CodegouvApi = {
		"getRepositories": memoize(async () => [ ...repositories ]),
		"addRepository": async ({ url }) => {
			repositories.push({ url });
			out.getRepositories.clear();
		}
	};

	return out;

}