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
    options: ["Option 1", "Option 2", "Option 3"],
    selectedValues: [],
    label: "My multiselect"
});
