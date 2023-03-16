import { createI18nApi, declareComponentKeys } from "i18nifty";
import { languages } from "ui/tools/Lang";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import type { Language } from "ui/tools/Lang";
import { statefulObservableToStatefulEvt } from "powerhooks/tools/StatefulObservable/statefulObservableToStatefulEvt";
import { z } from "zod";
import { createUnionSchema } from "ui/tools/zod/createUnionSchema";
import React from "react";

export { declareComponentKeys };
export { languages };
export type { Language };

export const fallbackLanguage = "en";

export type LocalizedString = Parameters<typeof resolveLocalizedString>[0];

const {
    useTranslation,
    resolveLocalizedString,
    useLang,
    $lang,
    useResolveLocalizedString
} = createI18nApi<
    | typeof import("ui/pages/Home/Home").i18n
    | typeof import("ui/shared/Header").i18n
>()(
    { languages, fallbackLanguage },
    {
        "en": {
            "Home": {
                "hello world": "Hello world"
            },
            "Header": {
                "brand": (
                    <span>French<br />Republic</span>
                ),
                "serviceTitle": "Public sector source codes",
                "services": "Services",
                "sill": "Software (SILL)",
                "documentation": "Documentation",
                "guides": "Guides, tools and templates",
                "faq": "FAQ",
                "forum": "Forum",
                "blog": "Blog",
                "about": "About",
                "explore": "Explore !"
            }
        },
        "fr": {
            /* spell-checker: disable */
            "Home": {
                "hello world": "Bonjour"
            },
            "Header": {
                "brand": (
                    <span>République<br />Française</span>
                ),
                "serviceTitle": "Les codes sources du secteur public",
                "services": "Services",
                "sill": "Logiciels (SILL)",
                "documentation": "Documentation",
                "guides": "Guides, outils et templates",
                "faq": "FAQ",
                "forum": "Forum",
                "blog": "Blog",
                "about": "À propos",
                "explore": "Explorer !"
            }
            /* spell-checker: enable */
        }
    }
);

export { useTranslation, resolveLocalizedString, useLang, useResolveLocalizedString };

export const evtLang = statefulObservableToStatefulEvt({
    "statefulObservable": $lang
});

export const zLocalizedString = z.union([
    z.string(),
    z.record(createUnionSchema(languages), z.string())
]);

{
    type Got = ReturnType<(typeof zLocalizedString)["parse"]>;
    type Expected = LocalizedString;

    assert<Equals<Got, Expected>>();
}
