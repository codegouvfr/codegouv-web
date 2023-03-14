import { createRouter, defineRoute } from "type-route";

const routeDefs = {
    "home": defineRoute("/"),
    "mui": defineRoute("/mui"),
    "catalog": defineRoute("/catalog")
};

export const { RouteProvider, useRoute, routes } = createRouter(routeDefs);