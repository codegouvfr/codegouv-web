import { TileColumns } from "ui/shared/TileColumns";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "stories/getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { TileColumns },
    "defaultContainerWidth": 0
});

export default meta;

export const VueDefault = getStory({
    title: "Title of my tiles section",
    tileList: [
        {
            title: "My first tile",
            linkProps: {}
        },
        {
            title: "My second tile",
            linkProps: {}
        }
    ]
});
