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
import { ToggleSwitch } from "@codegouvfr/react-dsfr/ToggleSwitch"
import { Slider } from "@mui/material";
import {MultiSelect} from "../../shared/MultiSelect";

export type Props = {
    className?: string
    search: string
    onSearchChange: (search: string) => void
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
    selectedVitality: number
    onVitalityChange: (range: number) => void
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
                    onSearchChange={onSearchChange}
                    search={search}
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
                        label={t("administrations label")}
                        options={administrationsOptions}
                        selectedValues={selectedAdministrations}
                        onChange={onAdministrationsChange}
                        className={classes.filterSelectGroup}
                    />
                    <MultiSelect
                        id="categories"
                        label={t("categories label")}
                        options={categoriesOptions}
                        selectedValues={selectedCategories}
                        onChange={onCategoriesChange}
                        className={classes.filterSelectGroup}
                    />
                    <div className={classes.filterSelectGroup}>
                        <label>{t("dependencies label")}</label>
                        <AutocompleteInputMultiple
                            id={"dependencies"}
                            options={dependenciesOptions}
                            selectedValues={selectedDependencies}
                            onChange={onDependenciesChange}
                        />
                    </div>
                    <MultiSelect
                        id="functions"
                        label={t("functions label")}
                        options={functionsOptions}
                        selectedValues={selectedFunctions}
                        onChange={onFunctionsChange}
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
                        id="languages"
                        label={t("languages label")}
                        options={languagesOptions}
                        selectedValues={selectedLanguages}
                        onChange={onLanguagesChange}
                        className={classes.filterSelectGroup}
                    />
                    <MultiSelect
                        id="licences"
                        label={t("licences label")}
                        options={licencesOptions}
                        selectedValues={selectedLicences}
                        onChange={onLicencesChange}
                        className={classes.filterSelectGroup}
                    />
                    <MultiSelect
                        id="devStatus"
                        label={t("dev status label")}
                        options={devStatusOptions}
                        selectedValues={selectedDevStatus}
                        onChange={onDevStatusChange}
                        className={classes.filterSelectGroup}
                    />
                    <div className={classes.filterSelectGroup}>
                        <label>{t("organisation label")}</label>
                        <AutocompleteInputMultiple
                            id={"organisation"}
                            options={organisationsOptions}
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
        gridTemplateColumns: `repeat(4, 1fr)`,
        columnGap: fr.spacing("4v"),
        rowGap: fr.spacing("4v"),
        marginTop: fr.spacing("3v"),
        [fr.breakpoints.down("lg")]: {
            gridTemplateColumns: `repeat(2, 1fr)`
        },
        [fr.breakpoints.down("md")]: {
            gridTemplateColumns: `repeat(1, 1fr)`
        }
    },
    filterSelectGroup: {
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
>()({Search});
