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
import {AutocompleteInputMultiple} from "ui/shared/AutocompleteInputMultiple";
import { ToggleSwitch } from "@codegouvfr/react-dsfr/ToggleSwitch"
import { Slider } from "@mui/material";
import {MultiSelect} from "ui/shared/MultiSelect";
import type { State as CatalogState } from "core/usecases/catalog";

export type Props = {
    className?: string
    search: string
    onSearchChange: (search: string) => void
    administrationsOptions: CatalogState.Administration[]
    selectedAdministrations: string[]
    onAdministrationsChange: (administrations: string[]) => void
    categoriesOptions: CatalogState.Category[]
    selectedCategories: string[]
    onCategoriesChange: (categories: string[]) => void
    dependenciesOptions: CatalogState.Dependency[]
    onDependenciesChange: (dependencies: string[]) => void
    selectedDependencies: string[]
    functionsOptions: CatalogState.Function[]
    selectedFunctions: CatalogState.Function[]
    onFunctionsChange: (functions: CatalogState.Function[]) => void
    selectedVitality: number
    onVitalityChange: (range: number) => void
    languagesOptions: CatalogState.Language []
    selectedLanguages: string[]
    onLanguagesChange: (languages: string[]) => void
    licencesOptions: CatalogState.Licence[]
    onLicencesChange: (licences: string[]) => void
    selectedLicences: string[]
    devStatusOptions: CatalogState.DevStatus[]
    onDevStatusChange: (licences: string[]) => void
    selectedDevStatus: string[]
    organisationsOptions: {
        organisation: string,
        organisationId: string,
    }[]
    onOrganisationsChange: (organisation: string[]) => void
    selectedOrganisations: string[]
    isExperimentalReposHidden: boolean,
    onIsExperimentalReposHidden: (checked: boolean) => void
    onResetFilters: () => void
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
        onResetFilters,
        ...rest} = props
    assert<Equals<typeof rest, {}>>()

    const {t} = useTranslation({Search});
    const {cx, classes} = useStyles();

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const breadcrumbSegments = [
        {
            label: t("breadcrumb explore"),
            linkProps: routes.explore().link
        },
    ]

    return (
        <div className={cx(className, classes.root)}>
            <div className={cx(classes.basicSearch, className)}>
                <MainSearch
                    header={
                        <Breadcrumb segments={breadcrumbSegments} currentPageLabel={t("breadcrumb current page")} />
                    }
                    onSearchChange={onSearchChange}
                    search={search}
                />
                <Button
                    className={classes.filterButton}
                    iconId={
                        isFilterOpen ? "ri-arrow-up-s-fill" : "ri-arrow-down-s-fill"
                    }
                    iconPosition="right"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    aria-expanded="true"
                    aria-controls="accordion-filters"
                >
                    {t("filters")}
                </Button>
            </div>
            <div className={cx("fr-collapse", classes.filters)} id="accordion-filters">
                <div className={cx(classes.filtersWrapper)}>
                    <MultiSelect
                        id="administrations"
                        label={t("administrations label")}
                        options={administrationsOptions.map(administration => ({
                            label: administration,
                            value: administration,
                        }))}
                        selectedValues={selectedAdministrations}
                        onChange={onAdministrationsChange}
                        className={classes.filterSelectGroup}
                    />
                    <MultiSelect
                        id="categories"
                        label={t("categories label")}
                        options={categoriesOptions.map( category => ({
                            label: category,
                            value: category,
                        }))}
                        selectedValues={selectedCategories}
                        onChange={onCategoriesChange}
                        className={classes.filterSelectGroup}
                    />
                    <div className={classes.filterSelectGroup}>
                        <label>{t("dependencies label")}</label>
                        <AutocompleteInputMultiple
                            id={"dependencies"}
                            options={dependenciesOptions.map(dependency => ({
                                label: dependency,
                                value: dependency
                            }))}
                            selectedValues={selectedDependencies}
                            onChange={onDependenciesChange}
                        />
                    </div>
                    <MultiSelect
                        id="functions"
                        label={t("functions label")}
                        options={functionsOptions.map(option => ({
                            value: option,
                            label: (() => {
                                switch (option) {
                                    case "Algorithm":
                                        return t("algorithm");
                                    case "Library":
                                        return t("library");
                                    case "Source Code":
                                        return t("source code");
                                }
                            })(),
                        }))}
                        selectedValues={selectedFunctions}
                        onChange={options => onFunctionsChange(options as CatalogState.Function[])}
                        className={classes.filterSelectGroup}
                    />
                    <MultiSelect
                        id="languages"
                        label={t("languages label")}
                        options={languagesOptions.map(language => ({
                            label: language,
                            value: language,
                        }))}
                        selectedValues={selectedLanguages}
                        onChange={onLanguagesChange}
                        className={classes.filterSelectGroup}
                    />
                    <div className={classes.filterSelectGroup}>
                        <label>{t("vitality index label")}</label>
                        <Slider
                            value={selectedVitality}
                            onChange={(_event, newValue) => onVitalityChange(newValue as number)}
                            valueLabelDisplay="auto"
                            track="inverted"
                        />
                    </div>
                    <MultiSelect
                        id="licences"
                        label={t("licences label")}
                        options={licencesOptions.map(licence => ({
                            label: licence,
                            value: licence,
                        }))}
                        selectedValues={selectedLicences}
                        onChange={onLicencesChange}
                        className={classes.filterSelectGroup}
                    />
                    <MultiSelect
                        id="devStatus"
                        label={t("dev status label")}
                        options={devStatusOptions.map(status => ({
                            label: status,
                            value: status,
                        }))}
                        selectedValues={selectedDevStatus}
                        onChange={onDevStatusChange}
                        className={classes.filterSelectGroup}
                    />
                    <div className={classes.filterSelectGroup}>
                        <label>{t("organisation label")}</label>
                        <AutocompleteInputMultiple
                            id={"organisation"}
                            options={organisationsOptions.map(({ organisation, organisationId }) => ({
                                label: organisation,
                                value: organisationId,
                            }))}
                            selectedValues={selectedOrganisations}
                            onChange={onOrganisationsChange}
                        />
                    </div>
                    <ToggleSwitch
                        checked={isExperimentalReposHidden}
                        onChange={onIsExperimentalReposHidden}
                        label={t("experimental toggle switch label")}
                        inputTitle={t("experimental toggle switch label")}
                        className={classes.filterSelectGroup}
                    />
                    <Button
                        onClick={onResetFilters}
                        priority={"secondary"}
                        iconId="ri-restart-line"
                        iconPosition="left"
                    >
                        {t("reset filters")}
                    </Button>
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
            margin: 0
        }
    },
    filtersWrapper: {
        display: "grid",
        gridTemplateColumns: `repeat(4, minmax(20%, 1fr))`,
        columnGap: fr.spacing("4v"),
        rowGap: fr.spacing("4v"),
        marginTop: fr.spacing("3v"),
        alignItems: "flex-start",
        [fr.breakpoints.down("lg")]: {
            gridTemplateColumns: `repeat(2, minmax(20%, 1fr))`
        },
        [fr.breakpoints.down("md")]: {
            gridTemplateColumns: `repeat(1, minmax(20%, 1fr))`
        }
    },
    filterSelectGroup: {
        height: "100%",
        [fr.breakpoints.up("lg")]: {
            "&:not(:nth-of-type(4n))": {
                borderRight: `1px ${theme.decisions.border.default.grey.default} solid`,
                paddingRight: fr.spacing("4v")
            },
        },
        [fr.breakpoints.down("lg") && fr.breakpoints.up("md")]: {
            "&:not(:nth-of-type(2n))": {
                borderRight: `1px ${theme.decisions.border.default.grey.default} solid`,
                paddingRight: fr.spacing("4v")
            },
        },
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
    | "administrations label"
    | "categories label"
    | "dependencies label"
    | "functions label"
    | "vitality index label"
    | "languages label"
    | "licences label"
    | "dev status label"
    | "organisation label"
    | "experimental toggle switch label"
    | "algorithm"
    | "library"
    | "source code"
    | "reset filters"
>()({Search});
