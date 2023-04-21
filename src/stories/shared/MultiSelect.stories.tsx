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
    selectedValues: [],
    label: "My multiselect"
});
