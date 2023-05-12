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
    dependenciesOptions: ["Dependency 1", "Dependency 2", "Dependency 3"],
    categoriesOptions: ["Category 1", "Category 2", "Category 3"],
    administrationsOptions: ["Administration 1", "Administration 2", "Administration 3"],
    organisationsOptions: [
        {
            organisation: "Organisation 1",
            organisationId: "Id Organisation 1",
        },
        {
            organisation: "Organisation 2",
            organisationId: "Id Organisation 2",
        },
        {
            organisation: "Organisation 3",
            organisationId: "Id Organisation 3",
        }
    ],
    devStatusOptions: ["Beta", "RC", "Alpha", "Stable", "Concept"],
    functionsOptions: ["Library", "Algorithm", "Source Code"],
    languagesOptions: ["Language 1", "Language 2", "Language 3"],
    licencesOptions: ["License 1", "License 2", "License 3"],
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
