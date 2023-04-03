import { Repository } from "../../ports/CodeGouvApi";

export const repositories = new Promise<Repository[]>((resolve) => {
    resolve([
        {
            description: "Json formated data from from set of page of travail-emploi website",
            is_experimental: false,
            language: "HTML",
            last_updated: 20202020,
            latest_tag: "",
            license: "Apache License 2.0 (Apache-2.0)",
            name:"fiches-travail-data-0",
            organisation_name: "SocialGouv",
            sill_id: 0,
            star_count: 2,
            status: "Stable",
            topics: [],
            type: "Library",
            url: "https://github.com/SocialGouv/fiches-travail-data",
            vitality: 100,
        },
        {
            description: "Json formated data from from set of page of travail-emploi website",
            is_experimental: false,
            language: "HTML",
            last_updated: 20202020,
            latest_tag: "",
            license: "Apache License 2.0 (Apache-2.0)",
            name:"fiches-travail-data-1",
            organisation_name: "SocialGouv",
            sill_id: 0,
            star_count: 2,
            status: "Beta",
            topics: [],
            type: "Library",
            url: "https://github.com/SocialGouv/fiches-travail-data",
            vitality: 100,
        },
        {
            description: "Json formated data from from set of page of travail-emploi website",
            is_experimental: false,
            language: "Javascript",
            last_updated: 20202020,
            latest_tag: "",
            license: "Apache License 2.0 (Apache-2.0)",
            name:"fiches-travail-data-2",
            organisation_name: "SocialGouv",
            sill_id: 0,
            star_count: 2,
            status: "Beta",
            topics: [],
            type: "Source Code",
            url: "https://github.com/SocialGouv/fiches-travail-data",
            vitality: 100,
        }
    ]);
})

export const categories = new Promise<string[]>((resolve) => {
    resolve(["Cartographie", "Chimie", "IA"]);
});

export const languages = new Promise<string[]>((resolve) => {
    resolve(["HTML", "Javascript"]);
});
