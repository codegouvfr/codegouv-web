import * as home from "./Home";
import * as catalog from "./Catalog";
import * as page404 from "./page404";

import { objectKeys } from "tsafe/objectKeys";
import type { UnionToIntersection } from "tsafe";

export const pages = {
    home,
    catalog,
};

export const routeDefs = {} as UnionToIntersection<
    (typeof pages)[keyof typeof pages]["routeDefs"]
>;

objectKeys(pages).forEach(pageName =>
    Object.assign(routeDefs, pages[pageName].routeDefs)
);

export { page404 };
