import {useEffect, useTransition} from "react";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { makeStyles } from "tss-react/dsfr";
import { declareComponentKeys } from "i18nifty";
import { fr } from "@codegouvfr/react-dsfr";
import { useTranslation } from "ui/i18n";
import { routes } from "ui/routes";
import { TileColumns } from "ui/shared/TileColumns";
import { TileProps } from "@codegouvfr/react-dsfr/Tile";
import { Contribute } from "ui/shared/Contribute";
import { SiteStats } from "ui/shared/SiteStats";
import { MainSearch } from "ui/shared/MainSearch";
import { useConstCallback } from "powerhooks/useConstCallback";
import { Props as SearchProps } from "ui/pages/ExploreCatalog/Search";
import type { PageRoute } from "./route";

import {selectors, useCoreFunctions, useCoreState} from "core";

type Props = {
    className?: string
    route: PageRoute;
}

export default function Explore (props: Props) {
    const {className, route, ...rest} = props
    assert<Equals<typeof rest, {}>>()

    const {t} = useTranslation({ Explore });
    const {classes} = useStyles();

    const [, startTransition] = useTransition();

    const { catalog } = useCoreFunctions()
    const { search } = useCoreState(selectors.catalog.search)

    const onSearchChange = useConstCallback<
        SearchProps["onSearchChange"]
    >(search => {
            return startTransition(() =>
                routes
                    .explore({
                        ...route.params,
                        search
                    })
                    .replace()
            )
        }
    );

    useEffect(() => {
        catalog.updateFilter({
            key: "search",
            value: route.params.search
        });
    }, [route.params.search]);

    const onSearchSubmit = () => {
        return startTransition(() =>
            routes
                .exploreCatalog({
                    ...route.params,
                    search
                })
                .replace()
        )
    }

    const reposSelection: TileProps[] = [
        {
            title: t("software selection by adm"),
            linkProps: {}
        },
        {
            title: t("software selection most recent"),
            linkProps: {}
        },
        {
            title: t("software selection most active"),
            linkProps: {}
        },
    ]

    const catalogStats = [
        {
            label: t("stats forges"),
            number: 42
        },
        {
            label: t("stats authorities"),
            number: 50
        },
        {
            label: t("stats organisations"),
            number: 1661
        },
        {
            label: t("stats deposit"),
            number: 15415
        }
    ]

    return (
        <div className={className}>
            <section className={fr.cx("fr-container")}>
                <MainSearch
                   altButton={<a className={fr.cx("fr-btn")} {...routes.exploreCatalog().link}>{t("advanced mode")}</a>}
                   search={route.params.search}
                   onSearchChange={onSearchChange}
                   onSearchSubmit={onSearchSubmit}
                />
            </section>
            <section className={classes.lightBlueBackground}>
                <TileColumns className={fr.cx("fr-container")} title={ t("software selection title") } tileList={reposSelection} />
            </section>
            <section className={fr.cx("fr-container")}>
                <Contribute />
            </section>
            <section className={classes.backgroundFullWidth}>
                <SiteStats title={t("stats title")} stats={catalogStats} invertedColors />
            </section>
        </div>
    )
}

const useStyles = makeStyles({name: {Explore}})(theme => ({
    title: {
        "&>span": {
            color: theme.decisions.text.title.blueFrance.default
        }
    },
    backgroundFullWidth: {
        backgroundColor: theme.decisions.background.actionHigh.blueFrance.default
    },
    searchBarContainer: {
        display: "flex",
        gap: fr.spacing("6v"),
        alignItems: "flex-start"
    },
    searchBar: {
        flex: 1
    },
    lightBlueBackground: {
        backgroundColor: theme.decisions.background.alt.blueFrance.default
    }
}));

export const {i18n} = declareComponentKeys<
    | "advanced mode"
    | "software selection title"
    | "software selection by adm"
    | "software selection most recent"
    | "software selection most active"
    | "stats title"
    | "stats forges"
    | "stats authorities"
    | "stats organisations"
    | "stats deposit"
>()({ Explore });
