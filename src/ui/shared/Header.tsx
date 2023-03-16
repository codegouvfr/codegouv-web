import React, { memo } from "react";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { declareComponentKeys } from "i18nifty";
import { Header as HeaderDS } from "@codegouvfr/react-dsfr/Header";
import { routes, useRoute } from "ui/routes";
import { LanguageSelector } from "ui/shared/LanguageSelector";
import { Display, headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { fr } from "@codegouvfr/react-dsfr";
import { useTranslation } from "ui/i18n";
import { ReactComponent as LogoCodeGouv } from "ui/assets/logo_codegouv.svg";

export type Props = {
    className?: string;
};

export const Header = memo((props: Props) => {
    const { className, ...rest } = props;

    assert<Equals<typeof rest, {}>>();

    const currentRoute = useRoute();
    const { t } = useTranslation({ Header })

    return (
        <>
            <HeaderDS
                className={className}
                brandTop={t("brand")}
                serviceTitle={
                    <>
                        <LogoCodeGouv /> < br/>
                        { t("serviceTitle") }
                    </>
                }
                homeLinkProps={{
                    ...routes.home().link,
                    title: "Code gouv"
                }}
                quickAccessItems={[
                    headerFooterDisplayItem,
                    {
                        buttonProps: {
                            "aria-controls": "translate-select",
                            "aria-expanded": false,
                            title: "Changer de langue",
                            className: "fr-btn--tertiary fr-translate fr-nav"
                        },
                        iconId: "fr-icon-translate-2",
                        text: (
                            <LanguageSelector />
                        )
                    }
                ]}
                navigation={[
                    {
                        text: t("services"),
                        linkProps: routes.services().link,
                        className: fr.cx("fr-label--disabled")
                    },
                    {
                        text: t("sill"),
                        linkProps: {
                            href:"https://www.sill.code.gouv.fr"
                        },
                        isActive: currentRoute.name === "home"
                    },
                    {
                        text: t("documentation"),
                        isActive: currentRoute.name === "guides" || currentRoute.name ===  "faq" ||currentRoute.name ===  "forum",
                        menuLinks: [
                            {
                                text: t("guides"),
                                linkProps: routes.guides().link,
                                isActive: currentRoute.name === "guides",
                            },
                            {
                                text: t("faq"),
                                linkProps: routes.faq().link,
                                isActive: currentRoute.name === "faq",
                            },
                            {
                                text: t("forum"),
                                linkProps: routes.forum().link,
                                isActive: currentRoute.name === "forum",
                            }
                        ]
                    },
                    {
                        text: t("blog"),
                        linkProps: routes.blog().link,
                        isActive: currentRoute.name === "blog"
                    },
                    {
                        text: t("about"),
                        linkProps: routes.about().link,
                        isActive: currentRoute.name === "about"
                    },
                    {
                        text: t("explore"),
                        linkProps: routes.explore().link,
                        isActive: currentRoute.name === "explore"
                    },

                ]}
            />
            <Display />
        </>
    );
});

export const { i18n } = declareComponentKeys<
    | { K: "brand"; R: JSX.Element }
    | "serviceTitle"
    | "services"
    | "sill"
    | "documentation"
    | "guides"
    | "faq"
    | "forum"
    | "blog"
    | "about"
    | "explore"
>()({ Header });
