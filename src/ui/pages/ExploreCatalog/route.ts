import { createGroup, defineRoute, createRouter, type Route } from "type-route";

export const routeDefs = {
    "exploreCatalog": defineRoute("/public/repos")
};

export const routeGroup = createGroup(Object.values(createRouter(routeDefs).routes));

export type PageRoute = Route<typeof routeGroup>;
