import { Search } from "ui/pages/ExploreCatalog/Search";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "stories/getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Search },
    "defaultContainerWidth": 0
});

export default meta;

export const VueDefault = getStory({
    selectedOrganisations : [],
    search: "",
    selectedDependencies: [],
    selectedVitality: 0,
    selectedFunctions: [],
    selectedAdministrations: [],
    selectedCategories: [],
    selectedLanguages: [],
    selectedDevStatus: [],
    selectedLicences: [],
    dependenciesOptions: [
        {
            dependency: "Dependency 1",
            repoCount: 1,
        },
        {
            dependency: "Dependency 2",
            repoCount: 0,
        },
        {
            dependency: "Dependency 3",
            repoCount: 2
        }
    ],
    categoriesOptions: [
        {
            category:"Category 1",
            repoCount: 1,
        },
        {
            category: "Category 2",
            repoCount: 0,
        },
        {
            category: "Category 3",
            repoCount: 2
        }
    ],
    administrationsOptions: [
        {
            administration: "Administration 1",
            repoCount: 1,
        },
        {
            administration: "Administration 2",
            repoCount: 0,
        },
        {
            administration: "Administration 3",
            repoCount: 2
        }
    ],
    organisationsOptions: [
        {
            organisation: "Organisation 1",
            organisationId: "Id Organisation 1",
            repoCount: 1,
        },
        {
            organisation: "Organisation 2",
            organisationId: "Id Organisation 2",
            repoCount: 0,
        },
        {
            organisation: "Organisation 3",
            organisationId: "Id Organisation 3",
            repoCount: 2
        }
    ],
    devStatusOptions: [
        {
            status: "Beta",
            repoCount: 0,
        },
        {
            status: "RC",
            repoCount: 1,
        },
        {
            status: "Alpha",
            repoCount: 2
        },
        {
            status: "Stable",
            repoCount: 2
        },
        {
            status: "Concept",
            repoCount: 0
        }
    ],
    functionsOptions: [
        {
            function:"Library",
            repoCount: 0,
        },
        {
            function: "Algorithm",
            repoCount: 1,
        },
        {
            function: "Source Code",
            repoCount: 2
        }
    ],
    languagesOptions: [
        {
            language: "Language 1",
            repoCount: 0,
        },
        {
            language: "Language 2",
            repoCount: 1,
        },
        {
            language: "Language 3",
            repoCount: 2
        }
    ],
    licencesOptions: [
        {
            licence:"License 1",
            repoCount: 0,
        },
        {
            licence:"License 2",
            repoCount: 1,
        },
        {
            licence:"License 3",
            repoCount: 2
        }
    ],
    isExperimentalReposHidden: false,
    onSearchChange: () => {},
    onIsExperimentalReposHidden: () => {},
    onVitalityChange: () => {},
    onDependenciesChange: () => {},
    onCategoriesChange: () => {},
    onAdministrationsChange: () => {},
    onOrganisationsChange: () => {},
    onDevStatusChange: () => {},
    onLicencesChange: () => {},
    onLanguagesChange: () => {},
    onFunctionsChange: () => {},
    onResetFilters: ()=> {}
});
