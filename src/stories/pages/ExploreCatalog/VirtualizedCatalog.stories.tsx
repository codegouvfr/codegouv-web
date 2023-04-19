import { VirtualizedCatalog } from "ui/pages/ExploreCatalog/VirtualizedCatalog";
import { sectionName } from "./sectionName"
import { getStoryFactory } from "stories/getStory";
import { repository } from "core/usecases/mock/catalog";
import {Repository} from "../../../core/ports/CodeGouvApi";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { VirtualizedCatalog },
    "defaultContainerWidth": 0,
    argTypes: {
        repositories: {
            control: false
        }
    }
});

export default meta;

const repos: Repository[] = []
const NUMBER_OF_REPOSITORY = 2000

for (var i = 0; i < NUMBER_OF_REPOSITORY; i++) {
 repos.push(
     {
         url: `${repository.url}${i}`,
         last_updated: repository.last_updated,
         name: `${repository.name} # ${i}`,
         type: "Algorithm",
         vitality: repository.vitality,
         is_experimental: repository.is_experimental,
         topics: repository.topics,
         organisation_name: repository.organisation_name,
         license: repository.license,
         language: repository.language,
         description: repository.description,
         latest_tag: repository.latest_tag,
         sill_id: repository.sill_id,
         star_count: repository.star_count,
         status: "Beta"
     }
 )
}

export const VueDefault = getStory({
    repositories: repos
});
