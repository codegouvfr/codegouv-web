import { createGroup, defineRoute, createRouter, type Route } from "type-route";

export const routeDefs = {
    "forum": defineRoute("/forum")
};

export const routeGroup = createGroup(Object.values(createRouter(routeDefs).routes));

export type PageRoute = Route<typeof routeGroup>;
