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
    dependenciesOptions: ["Option 1", "Option 2", "Option 3"],
    categoriesOptions: ["Option 1", "Option 2", "Option 3"],
    administrationsOptions: ["Option 1", "Option 2", "Option 3"],
    organisationsOptions: ["Option 1", "Option 2", "Option 3"],
    devStatusOptions: ["Option 1", "Option 2", "Option 3"],
    functionsOptions: ["Option 1", "Option 2", "Option 3"],
    languagesOptions: ["Option 1", "Option 2", "Option 3"],
    licencesOptions: ["Option 1", "Option 2", "Option 3"],
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
});
