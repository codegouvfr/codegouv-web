import * as home from "./Home";
import * as services from "./Services";
import * as guides from "./Guides";
import * as faq from "./Faq";
import * as forum from "./Forum";
import * as blog from "./Blog";
import * as about from "./About";
import * as explore from "./Explore";
import * as page404 from "./page404";

import { objectKeys } from "tsafe/objectKeys";
import type { UnionToIntersection } from "tsafe";

export const pages = {
    home,
    services,
    guides,
    faq,
    forum,
    blog,
    about,
    explore,
};

export const routeDefs = {} as UnionToIntersection<
    (typeof pages)[keyof typeof pages]["routeDefs"]
>;

objectKeys(pages).forEach(pageName =>
    Object.assign(routeDefs, pages[pageName].routeDefs)
);

export { page404 };
