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
    | typeof import("ui/shared/Contribute").i18n
    | typeof import("ui/pages/Explore/Explore").i18n
    | typeof import("ui/shared/MainSearch").i18n
    | typeof import("ui/pages/ExploreCatalog/ExploreCatalog").i18n
    | typeof import("ui/pages/ExploreCatalog/Search").i18n
    | typeof import("ui/pages/ExploreCatalog/RepoCard").i18n
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
                "find us": "Find us",
                "contact us": "Contact us",
                "contact by mail": "Contact by email",
                "follow us on": ({ socialMedia }) => `Follow us on ${socialMedia}`,
                "title follow us on": ({ socialMedia }) => `Follow us on ${socialMedia} - Open a new tab`,
                "newsletter BlueHats title": "BlueHats newsletter",
                "newsletter BlueHats desc": "Newsletter in French about free software by and for the public sector.",
                "newsletter DSI libre title": "FLOSS CIO newsletter",
                "newsletter DSI libre desc": "FLOSS Newsletter in French targetting public sector CIO."
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
            },
            "Contribute": {
                "contribute title": "Contribute!",
                "contribute reference software": "Reference free software",
                "contribute reference software mail subject": "Reference free software",
                "contribute reference software mail body": "Reference free software email body to change",
                "contribute reference source code": "Reference source code",
                "contribute reference source code mail subject": "Reference source code",
                "contribute reference source code mail body": "Reference source code email body to change",
                "contribute suggest": "Propose a workshop or an article",
                "contribute suggest mail subject": "Propose a workshop or an article",
                "contribute suggest mail body": "Propose a workshop or an article email body to change",
            },
            "Explore": {
                "advanced mode": "Advanced mode",
                "software selection title": "Some source code selections",
                "software selection by adm": "By adm.",
                "software selection most recent": "The most recent",
                "software selection most active": "The most active",
                "stats title": "Some numbers",
                "stats forges": "Referenced forges",
                "stats authorities": "Authorities",
                "stats organisations": "Organizations",
                "stats deposit": "Analyzed deposits",
            },
            "MainSearch": {
                "title": ({ repoCount, forgeCount }) => (
                    <>
                        <span>Search among </span>the { repoCount } source code repositories and the { forgeCount } administration forges.
                    </>
                ),
            },
            "ExploreCatalog": {
                "search results": ({ count }) =>
                    `${count} repositor${count > 1 ? "ies" : "y"}`,
                "sort by": "Sort by",
                "name asc" : "Ascending name (A-Z)",
                "name desc" : "Descending name (Z-A)",
                "last update asc" : "Last updated",
                "last update desc" : "Oldest updated",
            },
            "Search": {
                "breadcrumb explore": "Explore!",
                "breadcrumb current page": "All source codes",
                "filters": "Filters",
                "administrations label": "Administrations",
                "categories label": "Categories",
                "dependencies label": "Dependencies",
                "functions label": "Functions",
                "vitality index label": "Vitality index",
                "languages label": "Languages",
                "licences label": "Licences",
                "dev status label": "Development status",
                "organisation label": "Organisation",
                "experimental toggle switch label": "Hide experimental repositories",
                "algorithm": "Algorithm",
                "library": "Library",
                "source code": "Source code"
            },
            "RepoCard": {
                "latest update": ({ fromNowText }) => `Latest update:${fromNowText}`,
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
                "find us": "Retrouvez-nous",
                "contact us": "Contactez nous",
                "contact by mail": "Contacter par email",
                "follow us on": ({ socialMedia }) => `Follow us on ${socialMedia}`,
                "title follow us on": ({ socialMedia }) => `Suivez nous sur ${socialMedia} - Ouvre un nouvel onglet`,
                "newsletter BlueHats title": "Gazette BlueHats",
                "newsletter BlueHats desc": "Votre lettre d'information sur les logiciels libres par et pour les administrations.",
                "newsletter DSI libre title": "Gazette DSI Libre",
                "newsletter DSI libre desc": "Lettre d'information sur les logiciels libres pour les DSI du secteur public."
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
            },
            "Contribute": {
                "contribute title": "Contribuez !",
                "contribute reference software": "Référencer un logiciel libre",
                "contribute reference software mail subject": "Référencer un logiciel libre",
                "contribute reference software mail body": "Référencer un logiciel libre email body à modifier",
                "contribute reference source code": "Référencer un code source",
                "contribute reference source code mail subject": "Référencer un code source",
                "contribute reference source code mail body": "Référencer un code source email body à modifier",
                "contribute suggest": "Proposer un atelier ou un article",
                "contribute suggest mail subject": "Proposer un atelier ou un article",
                "contribute suggest mail body": "Proposer un atelier ou un article email body à modifier",
            },
            "Explore": {
                "advanced mode": "Mode avancé",
                "software selection title": "Quelques sélections de codes sources",
                "software selection by adm": "Par adm.",
                "software selection most recent": "Les plus récents",
                "software selection most active": "Les plus actifs",
                "stats title": "Quelques chiffres",
                "stats forges": "Forges référencées",
                "stats authorities": "Administrations",
                "stats organisations": "Organisations",
                "stats deposit": "Dépôts analysés",
            },
            "MainSearch": {
                "title": ({ repoCount, forgeCount }) => (
                    <>
                        <span>Effectuez une recherche </span>parmis les { repoCount } dépôts de code source et les { forgeCount } forges de l'administration.
                    </>
                ),
            },
            "ExploreCatalog": {
                "search results": ({ count }) =>
                    `${count} dépot${count > 1 ? "s" : ""} de code source`,
                "sort by": "Trier par",
                "name asc" : "Nom ascendant (A-Z)",
                "name desc" : "Nom descendant (Z-A)",
                "last update asc" : "Dernier mis à jour",
                "last update desc" : "Mise à jour la plus ancienne",
            },
            "Search": {
                "breadcrumb explore": "Explorer !",
                "breadcrumb current page": "Tous les codes sources",
                "filters": "Filtres",
                "administrations label": "Administrations",
                "categories label": "Catégories",
                "dependencies label": "Dépendences",
                "functions label": "Fonctions",
                "vitality index label": "Indice de vitalité",
                "languages label": "Languages",
                "licences label": "Licences",
                "dev status label": "Status du développement",
                "organisation label": "Organisation",
                "experimental toggle switch label": "Masquer les dépots expérimentaux",
                "algorithm": "Algorithme",
                "library": "Bibliothèque",
                "source code": "Code source"
            },
            "RepoCard": {
                "latest update": ({ fromNowText }) => `Dernière mise à jour : ${fromNowText}`,
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
