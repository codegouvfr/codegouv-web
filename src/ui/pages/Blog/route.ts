import { createGroup, defineRoute, createRouter, type Route } from "type-route";

export const routeDefs = {
    "blog": defineRoute("/blog")
};

export const routeGroup = createGroup(Object.values(createRouter(routeDefs).routes));

export type PageRoute = Route<typeof routeGroup>;
