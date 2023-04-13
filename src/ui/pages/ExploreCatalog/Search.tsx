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
    administrationsOptions: string[]
    selectedAdministrations: string[]
    onAdministrationsChange: (administrations: string[]) => void
    categoriesOptions: string[]
    selectedCategories: string[]
    onCategoriesChange: (categories: string[]) => void
    dependenciesOptions: string[]
    onDependenciesChange: (dependencies: string[]) => void
    selectedDependencies: string[]
    functionsOptions: string[]
    selectedFunctions: string[]
    onFunctionsChange: (functions: string[]) => void
    selectedVitality: number[]
    onVitalityChange: (range: number[]) => void
    languagesOptions: string[]
    selectedLanguages: string[]
    onLanguagesChange: (languages: string[]) => void
    licencesOptions: string[]
    onLicencesChange: (licences: string[]) => void
    selectedLicences: string[]
    devStatusOptions: string[]
    onDevStatusChange: (licences: string[]) => void
    selectedDevStatus: string[]
    organisationsOptions: string[]
    onOrganisationsChange: (organisation: string[]) => void
    selectedOrganisations: string[]
    isExperimentalReposHidden: boolean,
    onIsExperimentalReposHidden: (checked: boolean) => void
}

export const Search = (props: Props) => {

    const {
        className,
        search,
        onSearchChange,
        administrationsOptions,
        selectedAdministrations,
        onAdministrationsChange,
        categoriesOptions,
        selectedCategories,
        onCategoriesChange,
        dependenciesOptions,
        onDependenciesChange,
        selectedDependencies,
        selectedFunctions,
        functionsOptions,
        onFunctionsChange,
        selectedVitality,
        onVitalityChange,
        languagesOptions,
        selectedLanguages,
        onLanguagesChange,
        licencesOptions,
        onLicencesChange,
        selectedLicences,
        devStatusOptions,
        onDevStatusChange,
        selectedDevStatus,
        organisationsOptions,
        onOrganisationsChange,
        selectedOrganisations,
        isExperimentalReposHidden,
        onIsExperimentalReposHidden,
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
                    <MultiSelect
                        id="administrations"
                        label="administrations"
                        options={administrationsOptions}
                        selectedValues={selectedAdministrations}
                        onChange={onAdministrationsChange}
                    />
                    <MultiSelect
                        id="Catégories"
                        label="Catégories"
                        options={categoriesOptions}
                        selectedValues={selectedCategories}
                        onChange={onCategoriesChange}
                    />
                    <div className={classes.filterSelectGroup}>
                        <label>Dépendances</label>
                        <AutocompleteInputMultiple
                            id={"Dépendances"}
                            options={dependenciesOptions}
                            onChange={onDependenciesChange}
                        />
                    </div>
                    <MultiSelect
                        id="Fonctions"
                        label="Fonctions"
                        options={functionsOptions}
                        selectedValues={selectedFunctions}
                        onChange={onFunctionsChange}
                    />
                    <div className={classes.filterSelectGroup}>
                        <label>Indice de vitalité</label>
                        <Slider
                            value={selectedVitality}
                            onChange={(_event, newValue) => onVitalityChange(newValue as number[])}
                            valueLabelDisplay="auto"
                        />
                    </div>
                    <MultiSelect
                        id="Languages"
                        label="Languages"
                        options={languagesOptions}
                        selectedValues={selectedLanguages}
                        onChange={onLanguagesChange}
                    />
                    <MultiSelect
                        id="Licences"
                        label="Licences"
                        options={licencesOptions}
                        selectedValues={selectedLicences}
                        onChange={onLicencesChange}
                    />
                    <MultiSelect
                        id="Status du développement"
                        label="Status du développement"
                        options={devStatusOptions}
                        selectedValues={selectedDevStatus}
                        onChange={onDevStatusChange}
                    />
                    <div className={classes.filterSelectGroup}>
                        <label>Organisation</label>
                        <AutocompleteInputMultiple
                            id={"Organisation"}
                            options={organisationsOptions}
                            onChange={onOrganisationsChange}
                        />
                    </div>
                    <ToggleSwitch checked={isExperimentalReposHidden} onChange={onIsExperimentalReposHidden} label="Masquer les dépots expérimentaux" inputTitle="Masquer les dépots expérimentaux" />
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
