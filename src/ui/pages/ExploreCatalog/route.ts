import { createGroup, defineRoute, createRouter, param, type Route } from "type-route";

export const routeDefs = {
    "exploreCatalog": defineRoute(
        {
            "search": param.query.optional.string.default(""),
            "functions": param.query.optional.array.string.default([]),
            "languages": param.query.optional.array.string.default([]),
        },
        () => "/public/repos"
    )
};

export const routeGroup = createGroup(Object.values(createRouter(routeDefs).routes));

export type PageRoute = Route<typeof routeGroup>;
