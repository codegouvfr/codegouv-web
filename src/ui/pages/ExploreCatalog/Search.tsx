import React, { useState } from "react";
import {assert} from "tsafe/assert";
import type {Equals} from "tsafe";
import {makeStyles} from "tss-react/dsfr";
import {declareComponentKeys} from "i18nifty";
import {fr} from "@codegouvfr/react-dsfr";
import {useTranslation} from "ui/i18n";
import {routes} from "ui/routes";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import {MainSearch} from "ui/shared/MainSearch";
import { Button } from "@codegouvfr/react-dsfr/Button"
import {AutocompleteInputMultiple} from "../../shared/AutocompleteInputMultiple";
import {selectors, useCoreFunctions, useCoreState} from "../../../core";
import { ToggleSwitch } from "@codegouvfr/react-dsfr/ToggleSwitch"
import { Slider } from "@mui/material";
import {MultiSelect} from "../../shared/MultiSelect";

export type Props = {
    className?: string
    search?: string
    onSearchChange?: (search: string) => void
    administrations?: string[]
    onAdministrationsChange?: (administrations: string[]) => void
    selectedAdministrations?: string[]
    categories?: string[]
    onCategoriesChange?: (categories: string[]) => void
    selectedCategories?: string[]
    dependencies?: string[]
    onDependenciesChange?: (dependencies: string[]) => void
    selectedDependencies?: string[]
    functionsOptions: string[]
    selectedFunctions: string[]
    onFunctionsChange: (functions: string[]) => void
    languagesOptions: string[]
    selectedLanguages: string[]
    onLanguagesChange: (languages: string[]) => void
    licences?: string[]
    onLicencesChange?: (licences: string[]) => void
    selectedLicences?: string[]
    devStatus?: string[]
    onDevStatusChange?: (devStatus: string[]) => void
    selectedDevStatus?: string[]
    organisationsOptions?: string[]
    organisations?: string[]
    onOrganisationsChange?: (organisation: string[]) => void
}

export const Search = (props: Props) => {

    const {
        className,
        search,
        onSearchChange,
        administrations,
        onAdministrationsChange,
        selectedAdministrations,
        categories,
        onCategoriesChange,
        selectedCategories,
        dependencies,
        onDependenciesChange,
        selectedDependencies,
        selectedFunctions,
        functionsOptions,
        onFunctionsChange,
        languagesOptions,
        selectedLanguages,
        onLanguagesChange,
        licences,
        onLicencesChange,
        selectedLicences,
        devStatus,
        onDevStatusChange,
        selectedDevStatus,
        organisations,
        organisationsOptions,
        onOrganisationsChange,
        ...rest} = props
    assert<Equals<typeof rest, {}>>()

    const {t} = useTranslation({Search});
    const {t: tCommons} = useTranslation({App: null});
    const {cx, classes} = useStyles();

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const breadcrumbSegments = [
        {
            label: t("breadcrumb explore"),
            linkProps: routes.explore().link
        },
    ]


    /*TODO : must be passed in props and handled in core*/
    const [vitality, setVitality] = useState<number[]>([0, 100])

    {/*Todo : className={cx(fr.cx("fr-select"), classes.multiSelect)} */}

    return (
        <div className={cx(className, classes.root)}>
            <div className={cx(classes.basicSearch, className)}>
                <MainSearch
                    header={
                        <Breadcrumb segments={breadcrumbSegments} currentPageLabel={t("breadcrumb current page")} />
                    }
                />
                <Button
                    className={classes.filterButton}
                    iconId={
                        isFilterOpen ? "ri-arrow-down-s-fill" : "ri-arrow-up-s-fill"
                    }
                    iconPosition="right"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    aria-expanded="false"
                    aria-controls="accordion-filters"
                >
                    {t("filters")}
                </Button>
            </div>
            <div className={cx("fr-collapse", classes.filters)} id="accordion-filters">
                <div className={cx(classes.filtersWrapper)}>
{/*                    <MultiSelect
                        id="administrations"
                        label="administrations"
                        options={administrations}
                        selectedValues={selectedAdministrations}
                        onChange={selectedOptions => onAdministrationsChange(selectedOptions)}
                    />*/}
                   {/* <MultiSelect
                        id="Catégories"
                        label="Catégories"
                        options={categories}
                        selectedValues={selectedCategories}
                        onChange={selectedOptions => setSelectedCategories(selectedOptions)}
                    />
                    <div className={classes.filterSelectGroup}>

                        <label>Dépendances</label>
                        <AutocompleteInputMultiple
                            id={"dependencies"}
                            options={dependencies}
                        />
                    </div>*/}
                    <MultiSelect
                        id="Fonctions"
                        label="Fonctions"
                        options={functionsOptions}
                        selectedValues={selectedFunctions}
                        onChange={selectedOptions => onFunctionsChange(selectedOptions)}
                    />
                    <MultiSelect
                        id="Languages"
                        label="Languages"
                        options={languagesOptions}
                        selectedValues={selectedLanguages}
                        onChange={selectedOptions => onLanguagesChange(selectedOptions)}
                    />
                   {/* <MultiSelect
                        id="Languages"
                        label="Languages"
                        options={languages}
                        selectedValues={selectedLanguages}
                        onChange={selectedOptions => setSelectedLanguages(selectedOptions)}
                    />
                    <MultiSelect
                        id="Licences"
                        label="Licences"
                        options={licences}
                        selectedValues={selectedLicences}
                        onChange={selectedOptions => setSelectedLicences(selectedOptions)}
                    />
                    <MultiSelect
                        id="Status du développement"
                        label="Status du développement"
                        options={devStatus}
                        selectedValues={selectedDevStatus}
                        onChange={selectedOptions => setSelectedDevStatus(selectedOptions)}
                    />*/}
{/*                    <div className={classes.filterSelectGroup}>
                        <label>Organisation</label>
                        <AutocompleteInputMultiple
                            id={"Organisation"}
                            options={organisations}
                        />
                    </div>*/}
{/*                    <div className={classes.filterSelectGroup}>
                        <label>Indice de vitalité</label>
                        <Slider
                            value={vitality}
                            onChange={(_event, newValue) => setVitality(newValue as number[])}
                            valueLabelDisplay="auto"
                        />
                    </div>
                    <ToggleSwitch label="Masquer les dépots expérimentaux" inputTitle="Masquer les dépots expérimentaux" />*/}
                </div>
            </div>
        </div>
    )
}

const useStyles = makeStyles({name: {Search}})(theme => ({
    root: {
        "&:before": {
            content: "none"
        }
    },
    basicSearch: {
        display: "flex",
        alignItems: "flex-end",
        paddingTop: fr.spacing("6v")
    },
    searchBar: {
        flex: 1
    },
    filterButton: {
        backgroundColor: theme.decisions.background.actionLow.blueFrance.default,
        "&&&:hover": {
            backgroundColor: theme.decisions.background.actionLow.blueFrance.hover
        },
        color: theme.decisions.text.actionHigh.blueFrance.default,
        marginLeft: fr.spacing("4v")
    },
    filters: {
        "&&": {
            overflowX: "visible",
            ...fr.spacing("padding", {
                rightLeft: "1v"
            }),
            margin: 0
        }
    },
    filtersWrapper: {
        display: "grid",
        gridTemplateColumns: `repeat(4, minmax(20%, 1fr))`,
        columnGap: fr.spacing("4v"),
        rowGap: fr.spacing("4v"),
        marginTop: fr.spacing("3v"),
        [fr.breakpoints.down("md")]: {
            gridTemplateColumns: `repeat(1, 1fr)`
        }
    },
    filterSelectGroup: {
        "&:not(:last-of-type)": {
            borderRight: `1px ${theme.decisions.border.default.grey.default} solid`,
            paddingRight: fr.spacing("4v")
        },
        [fr.breakpoints.down("md")]: {
            "&:not(:last-of-type)": {
                "border": "none"
            }
        }
    },
    multiSelect: {
        marginTop: fr.spacing("2v"),
        paddingRight: 0,
        "&&>.MuiInputBase-input": {
            padding: 0
        },
        "&&>.MuiSvgIcon-root": {
            display: "none"
        }
    }
}));

export const {i18n} = declareComponentKeys<
    | "filters"
    | "breadcrumb explore"
    | "breadcrumb current page"
>()({Search});
