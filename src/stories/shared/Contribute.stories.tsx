import { Contribute } from "ui/shared/Contribute";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "stories/getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Contribute },
    "defaultContainerWidth": 0
});

export default meta;

export const VueDefault = getStory({});
