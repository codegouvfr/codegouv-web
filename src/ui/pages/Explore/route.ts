import { createGroup, defineRoute, createRouter, type Route, param } from "type-route";

export const routeDefs = {
    "explore": defineRoute(
        {
            "search": param.query.optional.string.default(""),
        },
        () => "/public"
    )
};

export const routeGroup = createGroup(Object.values(createRouter(routeDefs).routes));

export type PageRoute = Route<typeof routeGroup>;
