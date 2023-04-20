import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { makeStyles } from "tss-react/dsfr";
import { declareComponentKeys } from "i18nifty";
import { fr } from "@codegouvfr/react-dsfr";
import { useTranslation } from "ui/i18n";
import SearchBar from "@codegouvfr/react-dsfr/SearchBar";
import { selectors, useCoreState } from "core";

type Props = {
    className?: string
    search: string
    onSearchChange: (search: string) => void
    onSearchSubmit?: () => void
    header?: JSX.Element
    altButton?: JSX.Element
}

export const MainSearch = (props: Props) => {

    const {className, header, altButton, search, onSearchChange, onSearchSubmit, ...rest} = props
    assert<Equals<typeof rest, {}>>()

    const {t} = useTranslation({ MainSearch });
    const {classes} = useStyles();

    const { repositoryStatistics } = useCoreState(selectors.catalog.repositoryStatistics)

    return (
        <div className={className}>
            { header }
            <h2 className={classes.title}>{t("title", { repoCount: repositoryStatistics.repository_count, forgeCount: repositoryStatistics.forge_count })}</h2>
            <form className={classes.searchBarContainer} onSubmit={(event) => {
                event.preventDefault()
                if (onSearchSubmit) {
                    onSearchSubmit()
                }
            }}>
                <SearchBar
                    className={classes.searchBar}
                       nativeInputProps={{
                           value: search,
                           onChange: event => onSearchChange(event.currentTarget.value),
                       }}
                       onButtonClick={onSearchSubmit}
                />
                { altButton }
            </form>
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
