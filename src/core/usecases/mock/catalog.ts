import { Repository } from "../../ports/CodeGouvApi";

export const repositories = new Promise<Repository[]>((resolve) => {
    resolve([
        {
            description: "Json formated data from from set of page of travail-emploi website",
            is_experimental: false,
            language: "HTML",
            last_updated: 1681465412100,
            latest_tag: "",
            license: "Apache License 2.0 (Apache-2.0)",
            name:"fiches-travail-data-0",
            organisation_id: "SocialGouv",
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
            is_experimental: true,
            language: "HTML",
            last_updated: 1681745519968,
            latest_tag: "",
            license: "Apache License 2.0 (Apache-2.0)",
            name:"fiches-travail-data-1",
            organisation_id: "altair",
            sill_id: 1,
            star_count: 2,
            status: "Beta",
            topics: ["IA", "Chimie"],
            type: "Library",
            url: "https://github.com/betagouv/hedgedoc",
            vitality: 50,
        },
        {
            description: "Json formated data from from set of page of travail-emploi website",
            is_experimental: false,
            language: "Javascript",
            last_updated: 1681745439118,
            latest_tag: "",
            license: "Apache License 2.0 (Apache-2.0)",
            name:"fiches-travail-data-2",
            organisation_id: "H2M",
            sill_id: 2,
            star_count: 2,
            status: "Beta",
            topics: ["Cartographie", "Chimie"],
            type: "Source Code",
            url: "https://plmlab.math.cnrs.fr/plmteam/common/asdf/hashicorp/asdf-plmteam-hashicorp-terraform",
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

export const repository =         {
    description: "Json formated data from from set of page of travail-emploi website",
    is_experimental: false,
    language: "HTML",
    last_updated: 1681465412100,
    latest_tag: "",
    license: "Apache License 2.0 (Apache-2.0)",
    name:"fiches-travail-data-0",
    organisation_id: "SocialGouv",
    sill_id: 0,
    star_count: 2,
    status: "Stable",
    topics: [],
    type: "Library",
    url: "https://github.com/SocialGouv/fiches-travail-data",
    vitality: 100,
}
