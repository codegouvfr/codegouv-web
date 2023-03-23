import { SiteStats } from "ui/shared/SiteStats";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "stories/getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { SiteStats },
    "defaultContainerWidth": 0
});

export default meta;

export const VueDefault = getStory({
    title: "title of my stats section",
    stats: [
        {
            label: "My first stat",
            number: 300
        },
        {
            label: "My second stat",
            number: 3
        }
    ],
});
