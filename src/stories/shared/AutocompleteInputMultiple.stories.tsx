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
            label: "Option 1",
            itemCount: 1,
        },
        {
            label: "Option 2",
            itemCount: 0,
        },
        {
            label: "Option 3",
            itemCount: 2
        }
    ],
    id: "1",
    selectedValues: []
});
