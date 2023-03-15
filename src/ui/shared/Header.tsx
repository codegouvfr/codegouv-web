import React, { memo } from "react";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { declareComponentKeys } from "i18nifty";
import { Header as HeaderDS } from "@codegouvfr/react-dsfr/Header";
import { routes, useRoute } from "ui/routes";
import { LanguageSelector } from "./LanguageSelector";
import { Display, headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { PageRoute } from "../pages/Home";

export type Props = {
    className?: string;
};

export const Header = memo((props: Props) => {
    const { className, ...rest } = props;

    assert<Equals<typeof rest, {}>>();

    const currentRoute = useRoute();

    return (
        <>
            <HeaderDS
                className={className}
                brandTop={<>CODE<br />GOUV</>}
                serviceTitle={"Service title"}
                homeLinkProps={{
                    ...routes.home().link,
                    "title": "Code gouv"
                }}
                quickAccessItems={[
                    headerFooterDisplayItem,
                    {
                        "buttonProps": {
                            "aria-controls": "translate-select",
                            "aria-expanded": false,
                            "title": "Changer de langue",
                            "className": "fr-btn--tertiary fr-translate fr-nav"
                        },
                        "iconId": "fr-icon-translate-2",
                        "text": (
                            <LanguageSelector />
                        )
                    }
                ]}
                navigation={[
                    {
                        "text": "Home",
                        "linkProps": routes.home().link,
                        "isActive": currentRoute.name === "home"
                    },
                    {
                        "text": "Repo catalog",
                        "linkProps": routes.catalog().link,
                        "isActive": currentRoute.name === "catalog"
                    }
                ]}
            />
            <Display />
        </>
    );
});

export const { i18n } = declareComponentKeys<
    | "brand"
    | "home title"
    | "title"
    | "navigation welcome"
    | "navigation catalog"
    | "navigation add software"
    | "navigation support request"
    | "navigation about"
    | "quick access test"
    | "quick access login"
    | "quick access logout"
    | "quick access account"
    | "select language"
>()({ Header });
