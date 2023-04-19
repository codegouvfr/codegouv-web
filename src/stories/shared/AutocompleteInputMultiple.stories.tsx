import { AutocompleteInputMultiple } from "ui/shared/AutocompleteInputMultiple";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "stories/getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { AutocompleteInputMultiple },
    "defaultContainerWidth": 0
});

export default meta;

export const VueDefault = getStory({
    onChange: () => {},
    options: ["Option 1", "Option 2", "Option 3"],
    id: "1",
    selectedValues: []
});
