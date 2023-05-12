import { MainSearch } from "ui/shared/MainSearch";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "stories/getStory";
import {fr} from "@codegouvfr/react-dsfr";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { MainSearch },
    "defaultContainerWidth": 0
});

export default meta;

export const VueDefault = getStory({
    onSearchSubmit: () => {},
    search: "",
    onSearchChange: () => {}
});

export const VueWithAltButton = getStory({
    onSearchSubmit: () => {},
    search: "",
    onSearchChange: () => {},
    altButton: <a className={fr.cx("fr-btn")} href="">Button</a>,
});

export const VueWithHeader = getStory({
    onSearchSubmit: () => {},
    search: "",
    onSearchChange: () => {},
    header: <div>Header of main search</div>
});
