import { createGroup, defineRoute, createRouter, type Route } from "type-route";

export const routeDefs = {
    "guides": defineRoute("/doc")
};

export const routeGroup = createGroup(Object.values(createRouter(routeDefs).routes));

export type PageRoute = Route<typeof routeGroup>;
