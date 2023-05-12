import { MultiSelect } from "ui/shared/MultiSelect";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "stories/getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { MultiSelect },
    "defaultContainerWidth": 0
});

export default meta;

export const VueDefault = getStory({
    id: "1",
    onChange: () => {},
    options: [
        {
            label: "Option 1",
            value: "Option 1"
        },
        {
            label: "Option 2",
            value: "Option 2"
        },
        {
            label: "Option 3",
            value: "Option 3"
        }
    ],
    selectedValues: [],
    label: "My multiselect"
});
