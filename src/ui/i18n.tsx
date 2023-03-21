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
    typeof import("ui/App").i18n
    | typeof import("ui/pages/Home/Home").i18n
    | typeof import("ui/shared/Header").i18n
>()(
    { languages, fallbackLanguage },
    {
        "en": {
            "App": {
                "find out more": "Find out more",
                "subscribe": "Subscribe",
            },
            "Home": {
                "title":
                    <>
                        <span>Le service public</span> du Logiciel libre
                    </>,
                "codegouv numbers": "Some numbers",
                "numbers services": "Services opérés",
                "numbers referenced software": "logiciels libres référencés",
                "numbers deposit": "Dépôts analysés",
                "help title": "Need help ? Consult our documentation",
                "help guides": "Guides, outils et template",
                "help faq": "FAQ",
                "help forum": "Forum",
                "contribute title": "Contribute!",
                "contribute reference software": "Référencer un logiciel libre",
                "contribute reference source code": "Référencer un code source",
                "contribute suggest": "Proposer un atelier ou un article",
                "find us": "Find us",
                "contact us": "Contact us",
                "contact by mail": "Contact by email",
                "follow us on": ({ socialMedia }) => `Follow us on ${socialMedia}`,
                "title follow us on": ({ socialMedia }) => `Follow us on ${socialMedia} - Open a new tab`,
                "subscribe to gazette": ({ gazetteName }) => `Subscribe to the ${gazetteName} gazette`,
            },
            "Header": {
                "brand": <span>French<br />Republic</span>,
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
            "App": {
                "find out more": "En savoir plus",
                "subscribe": "S'abonner",
            },
            "Home": {
                "title":
                    <>
                        <span>Le service public</span> du Logiciel libre
                    </>,
                "codegouv numbers": "Quelques chiffres",
                "numbers services": "Services opérés",
                "numbers referenced software": "logiciels libres référencés",
                "numbers deposit": "Dépôts analysés",
                "help title": "Besoin d'aide ? Consultez notre documentation",
                "help guides": "Guides, outils et template",
                "help faq": "FAQ",
                "help forum": "Forum",
                "contribute title": "Contribuez !",
                "contribute reference software": "Référencer un logiciel libre",
                "contribute reference source code": "Référencer un code source",
                "contribute suggest": "Proposer un atelier ou un article",
                "find us": "Retrouvez-nous",
                "contact us": "Contactez nous",
                "contact by mail": "Contacter par email",
                "follow us on": ({ socialMedia }) => `Follow us on ${socialMedia}`,
                "title follow us on": ({ socialMedia }) => `Suivez nous sur ${socialMedia} - Ouvre un nouvel onglet`,
                "subscribe to gazette": ({ gazetteName }) => `S'abonner à la gazette ${gazetteName}`,
            },
            "Header": {
                "brand": <span>République<br />Française</span>,
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
