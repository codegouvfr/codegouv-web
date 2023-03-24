import React from "react";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { makeStyles } from "tss-react/dsfr";
import { declareComponentKeys } from "i18nifty";
import { fr } from "@codegouvfr/react-dsfr";
import { useTranslation } from "ui/i18n";
import SearchBar from "@codegouvfr/react-dsfr/SearchBar";

type Props = {
    className?: string
    header?: JSX.Element
    altButton?: JSX.Element
}

export const MainSearch = (props: Props) => {

    const {className, header, altButton, ...rest} = props
    assert<Equals<typeof rest, {}>>()

    const {t} = useTranslation({ MainSearch });
    const {classes} = useStyles();

    return (
        <div className={className}>
            { header }
            <h2 className={classes.title}>{t("title", { repoCount: 15415, forgeCount: 42 })}</h2>
            <div className={classes.searchBarContainer}>
                <SearchBar className={classes.searchBar}/>
                { altButton }
            </div>
        </div>
    )
}

const useStyles = makeStyles({name: {MainSearch}})(theme => ({
    title: {
        "&>span": {
            color: theme.decisions.text.title.blueFrance.default
        }
    },
    searchBarContainer: {
        display: "flex",
        gap: fr.spacing("6v"),
        alignItems: "flex-start"
    },
    searchBar: {
        flex: 1
    },
}));

export const {i18n} = declareComponentKeys<
    | {
    K: "title";
    P: { repoCount: number, forgeCount: number }
    R: JSX.Element;
}
>()({MainSearch});
