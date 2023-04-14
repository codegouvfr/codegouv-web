import { createGroup, defineRoute, createRouter, param, type Route } from "type-route";

export const routeDefs = {
    "exploreCatalog": defineRoute(
        {
            "search": param.query.optional.string.default(""),
            "administrations": param.query.optional.array.string.default([]),
            "categories": param.query.optional.array.string.default([]),
            "dependencies": param.query.optional.array.string.default([]),
            "functions": param.query.optional.array.string.default([]),
            "vitality": param.query.optional.array.number.default([0,100]),
            "languages": param.query.optional.array.string.default([]),
            "licences": param.query.optional.array.string.default([]),
            "devStatus": param.query.optional.array.string.default([]),
            "organisations": param.query.optional.array.string.default([]),
            "isExperimentalReposHidden": param.query.optional.boolean.default(false),
        },
        () => "/public/repos"
    )
};

export const routeGroup = createGroup(Object.values(createRouter(routeDefs).routes));

export type PageRoute = Route<typeof routeGroup>;
