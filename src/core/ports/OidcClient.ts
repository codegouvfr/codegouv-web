
export type OidcClient = OidcClient.LoggedIn | OidcClient.NotLoggedIn;

export namespace OidcClient {

	export type LoggedIn = {
		isLoggedIn: true;
		logout: () => Promise<never>;
		accessToken: string;
	};

	export type NotLoggedIn = {
		isLoggedIn: false;
		login: () => Promise<never>;
	};

}
