import { createGroup, defineRoute, createRouter, noMatch, param, type Route } from "type-route";
import { z } from "zod";
import { assert, type Equals } from "tsafe";
import type { State } from "core/usecases/catalog";

export const routeDefs = {
    "exploreCatalog": defineRoute(
        {
            "sort": param.query.optional
                .ofType({
                    "parse": raw => {
                        const schema = z.union([
                            z.literal("name_asc"),
                            z.literal("name_desc"),
                            z.literal("last_update_asc"),
                            z.literal("last_update_desc"),
                        ]);

                        assert<
                            Equals<ReturnType<(typeof schema)["parse"]>, State.Sort>
                        >();

                        try {
                            return schema.parse(raw);
                        } catch {
                            return noMatch;
                        }
                    },
                    "stringify": value => value
                })
                .default("name_asc"),
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
