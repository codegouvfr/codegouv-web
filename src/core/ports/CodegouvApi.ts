

export type CodegouvApi = {
	getRepositories: {
		(): Promise<Repository[]>;
		clear: ()=> void;
	}
	addRepository: (params: { url: string; })=> Promise<void>;
};

export type Repository= {
	url: string;
}