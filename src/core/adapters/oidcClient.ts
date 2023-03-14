import type { OidcClient } from "core/ports/OidcClient";

export function createOidcClient(
	params: {
		url: string;
		realm: string;
		clientId: string;
	}
): OidcClient {
	return null as any;
}