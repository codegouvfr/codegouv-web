import { SoftwareCard } from "ui/pages/Home/SoftwareCard";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "stories/getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { SoftwareCard },
    "defaultContainerWidth": 0
});

export default meta;

export const VueDefault = getStory({
    softwareName: "Tchap",
    logoUrl: "https://www.systeme-de-design.gouv.fr/img/placeholder.1x1.png",
    softwareDescription: "Un description fictive de logiciel",
    softwareLinks: [
        {
            link:{
                href: "",
                onClick: () => {}
            },
            label: "En savoir plus"
        }
    ]
});
