import React, { memo } from "react";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { makeStyles } from "tss-react/dsfr";
import { declareComponentKeys } from "i18nifty";
import { fr } from "@codegouvfr/react-dsfr";
import { useTranslation } from "ui/i18n";
import { routes } from "ui/routes";
import { TileColumns } from "../../shared/TileColumns";
import { TileProps } from "@codegouvfr/react-dsfr/Tile";
import { Contribute } from "../../shared/Contribute";
import { SiteStats } from "../../shared/SiteStats";

type Props = {
    className?: string
}

export default function Explore (props: Props) {

	const { filteredRepo } = useCoreState(selectors.catalog.filteredRepo)
	const { filter } = useCoreState(selectors.catalog.filter)
	const { isLoading } = useCoreState(selectors.catalog.isLoading)
	const { repositoryCount } = useCoreState(selectors.catalog.repositoryCount)
	const { repositoryStatistics } = useCoreState(selectors.catalog.repositoryStatistics)
	const { languages } = useCoreState(selectors.catalog.languages)
	const { administrations } = useCoreState(selectors.catalog.administrations)
    const {className, ...rest} = props
    assert<Equals<typeof rest, {}>>()

    const {t} = useTranslation({ Explore });
    const {cx, classes} = useStyles();
    const { classes: classesCommon } = useStyles()

    const reposSelection: TileProps[] = [
        {
            title: t("software selection by adm"),
            linkProps: {
                href: "",
            }
        },
        {
            title: t("software selection most recent"),
            linkProps: {
                href: "",
            }
        },
        {
            title: t("software selection most active"),
            linkProps: {
                href: "",
            }
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
            <section className={cx(fr.cx("fr-container"))}>
                <TileColumns title={ t("software selection title") } tileList={reposSelection} />
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
    backgroundFullWidth: {
        backgroundColor: theme.decisions.background.actionHigh.blueFrance.default
    },
}));

export const {i18n} = declareComponentKeys<
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
