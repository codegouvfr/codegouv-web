export type CodeGouvApi = {
    // Main data
	getRepositories: {
        (): Promise<Repository[]>;
    },
	getDependencies: {
		(): Promise<Dependency[]>;
	},
	getOrganisations: {
		(): Promise<Organisation[]>;
	},
	// Statistics
	getRepositoryStatistics: {
		(): Promise<RepositoryStatistics>;
	},
	// Filter values
	getAdministrations: {
		(): Promise<string[]>;
	},
	getDependencyNames: {
		(): Promise<string[]>;
	}
	getLanguages: {
		(): Promise<string[]>;
	},
	getLicences: {
		(): Promise<string[]>;
	},
	getOrganisationNames: {
		(): Promise<string[]>;
	},
	getTopics: {
		(): Promise<string[]>;
		clear: () => void;
	},
};

export type Dependency = {
	name: string; // ID
	repository_urls: string[];
}

export type Organisation = {
	administrations: string[];
	avatar_url: '';
	name: string; // ID
}

export type Repository = {
	description: string;
	is_experimental: boolean;
	language: string;
	last_updated: number;
	latest_tag: string;
	license: string;
	name: string;
	organisation_name: string;
	sill_id: number;
	star_count: number;
	status: 'Concept' | 'Alpha' | 'Beta' | 'RC' | 'Stable';
	topics: string[];
	type: 'Algorithm' | 'Library' | 'Source Code'
	url: string; // ID
	vitality: number;
}

export type RepositoryStatistics = {
	administration_count: number;
	forge_count: number;
	organisation_count: number;
	repository_count: number;
}
