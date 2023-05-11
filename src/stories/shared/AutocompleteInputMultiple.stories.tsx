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
    options: [
        {
            value: "Option 1",
            label: "Option 1",
        },
        {
            value: "Option 2",
            label: "Option 2",
        },
        {
            value: "Option 3",
            label: "Option 3",
        }
    ],
    id: "1",
    selectedValues: []
});
