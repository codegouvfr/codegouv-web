import type { OidcClient } from "core/ports/OidcClient";

export function createMockOidcClient(): OidcClient {
	return {
		"isLoggedIn": false,
		"login": () => {
			throw new Error("This is a mock implementation");
		}
	};
}