import { MyComponent } from "ui/shared/MyComponent";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "stories/getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { MyComponent },
});

export default meta;

export const VueDefault = getStory({
	"text": "Hello World"
});

export const VueWithAnotherText = getStory({
	"text": "Hello world 2"
});