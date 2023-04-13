
import { selectors, useCoreFunctions, useCoreState } from "core";
import CircularProgress from '@mui/material/CircularProgress';
import type { PageRoute } from "./route";
import { fr } from "@codegouvfr/react-dsfr";
import React, {useEffect, useTransition} from "react";
import { assert } from "tsafe/assert";
import { Equals } from "tsafe";
import { useTranslation } from "../../i18n";
import { makeStyles } from "tss-react/dsfr";
import Explore from "../Explore/Explore";
import { declareComponentKeys } from "i18nifty";
import {Search} from "./Search";
import { useConstCallback } from "powerhooks/useConstCallback";
import { Props as SearchProps } from "ui/pages/ExploreCatalog/Search"
import { routes } from "ui/routes"

type Props = {
	className?: string;
	route: PageRoute;
};

export default function ExploreCatalog(props: Props) {

	const {className, route, ...rest} = props
	assert<Equals<typeof rest, {}>>()

	const {t} = useTranslation({ ExploreCatalog });
	const {cx, classes} = useStyles();

	const [, startTransition] = useTransition();

	const { catalog } = useCoreFunctions()
	const { filteredRepositories } = useCoreState(selectors.catalog.filteredRepositories)
	const { isLoading } = useCoreState(selectors.catalog.isLoading)

	const { administrationsFilterOptions } = useCoreState(selectors.catalog.administrationsFilterOptions)
	const { categoriesFilterOptions } = useCoreState(selectors.catalog.categoriesFilterOptions)
	const { dependenciesFilterOptions } = useCoreState(selectors.catalog.dependenciesFilterOptions)
	const { functionFilterOptions } = useCoreState(selectors.catalog.functionFilterOptions)
	const { languagesFilterOptions } = useCoreState(selectors.catalog.languagesFilterOptions)
	const { licencesFilterOptions } = useCoreState(selectors.catalog.licencesFilterOptions)
	const { devStatusFilterOptions } = useCoreState(selectors.catalog.devStatusFilterOptions)
	const { organisationsFilterOptions } = useCoreState(selectors.catalog.organisationsFilterOptions)

	const onAdministrationsChange = useConstCallback<
		SearchProps["onAdministrationsChange"]
	>(administrations => {
			return startTransition(() =>
				routes
					.exploreCatalog({
						...route.params,
						administrations
					})
					.replace()
			)
		}
	);

	useEffect(() => {
		catalog.updateFilter({
			key: "selectedAdministrations",
			value: route.params.administrations
		});
	}, [route.params.administrations]);

	const onCategoriesChange = useConstCallback<
		SearchProps["onCategoriesChange"]
	>(categories => {
			return startTransition(() =>
				routes
					.exploreCatalog({
						...route.params,
						categories
					})
					.replace()
			)
		}
	);

	useEffect(() => {
		catalog.updateFilter({
			key: "selectedDependencies",
			value: route.params.dependencies
		});
	}, [route.params.dependencies]);

	const onDependenciesChange = useConstCallback<
		SearchProps["onDependenciesChange"]
	>(dependencies => {
			return startTransition(() =>
				routes
					.exploreCatalog({
						...route.params,
						dependencies
					})
					.replace()
			)
		}
	);

	useEffect(() => {
		catalog.updateFilter({
			key: "selectedDependencies",
			value: route.params.dependencies
		});
	}, [route.params.dependencies]);

	const onFunctionsChange = useConstCallback<
		SearchProps["onFunctionsChange"]
	>(functions => {
			return startTransition(() =>
				routes
					.exploreCatalog({
						...route.params,
						functions
					})
					.replace()
			)
		}
	);

	useEffect(() => {
		catalog.updateFilter({
			key: "selectedFunctions",
			value: route.params.functions
		});
	}, [route.params.functions]);

	const onLanguagesChange = useConstCallback<
		SearchProps["onLanguagesChange"]
	>(languages => {
			return startTransition(() =>
				routes
					.exploreCatalog({
						...route.params,
						languages
					})
					.replace()
			)
		}
	);

	useEffect(() => {
		catalog.updateFilter({
			key: "selectedLanguages",
			value: route.params.languages
		});
	}, [route.params.languages]);

	const onLicencesChange = useConstCallback<
		SearchProps["onLicencesChange"]
	>(licences => {
			return startTransition(() =>
				routes
					.exploreCatalog({
						...route.params,
						licences
					})
					.replace()
			)
		}
	);

	useEffect(() => {
		catalog.updateFilter({
			key: "selectedLicences",
			value: route.params.licences
		});
	}, [route.params.licences]);

	const onDevStatusChange = useConstCallback<
		SearchProps["onDevStatusChange"]
	>(devStatus => {
			return startTransition(() =>
				routes
					.exploreCatalog({
						...route.params,
						devStatus
					})
					.replace()
			)
		}
	);

	useEffect(() => {
		catalog.updateFilter({
			key: "selectedDevStatus",
			value: route.params.devStatus
		});
	}, [route.params.devStatus]);

	const onOrganisationsChange = useConstCallback<
		SearchProps["onOrganisationsChange"]
	>(organisations => {
			return startTransition(() =>
				routes
					.exploreCatalog({
						...route.params,
						organisations
					})
					.replace()
			)
		}
	);

	useEffect(() => {
		catalog.updateFilter({
			key: "selectedOrganisations",
			value: route.params.organisations
		});
	}, [route.params.organisations]);

	const onVitalityChange = useConstCallback<
		SearchProps["onVitalityChange"]
	>(vitality => {
			return startTransition(() =>
				routes
					.exploreCatalog({
						...route.params,
						vitality
					})
					.replace()
			)
		}
	);

	useEffect(() => {
		catalog.updateFilter({
			key: "selectedVitality",
			value: route.params.vitality
		});
	}, [route.params.vitality]);

	const onIsExperimentalReposChange = useConstCallback<
		SearchProps["onIsExperimentalReposHidden"]
	>(checked => {
			return startTransition(() =>
				routes
					.exploreCatalog({
						...route.params,
						isExperimentalReposHidden: checked
					})
					.replace()
			)
		}
	);

	useEffect(() => {
		catalog.updateFilter({
			key: "isExperimentalReposHidden",
			value: route.params.isExperimentalReposHidden
		});
	}, [route.params.isExperimentalReposHidden]);

	if (isLoading) {
		return <CircularProgress />
	}

	return (
		<div>
			<section className={fr.cx("fr-container")}>
				<Search
					selectedAdministrations={route.params.administrations}
					administrationsOptions={administrationsFilterOptions}
					onAdministrationsChange={onAdministrationsChange}
					selectedCategories={route.params.categories}
					categoriesOptions={categoriesFilterOptions}
					onCategoriesChange={onCategoriesChange}
					selectedDependencies={route.params.dependencies}
					dependenciesOptions={dependenciesFilterOptions}
					onDependenciesChange={onDependenciesChange}
					selectedFunctions={route.params.functions}
					functionsOptions={functionFilterOptions}
					onFunctionsChange={onFunctionsChange}
					selectedVitality={route.params.vitality}
					onVitalityChange={onVitalityChange}
					selectedLanguages={route.params.languages}
					languagesOptions={languagesFilterOptions}
					onLanguagesChange={onLanguagesChange}
					selectedLicences={route.params.licences}
					licencesOptions={licencesFilterOptions}
					onLicencesChange={onLicencesChange}
					selectedDevStatus={route.params.devStatus}
					devStatusOptions={devStatusFilterOptions}
					onDevStatusChange={onDevStatusChange}
					selectedOrganisations={route.params.organisations}
					organisationsOptions={organisationsFilterOptions}
					onOrganisationsChange={onOrganisationsChange}
					isExperimentalReposHidden={route.params.isExperimentalReposHidden}
					onIsExperimentalReposHidden={onIsExperimentalReposChange}
				/>
			</section>
			<section className={fr.cx("fr-container")}>
				<div className={classes.filteredList}>
					<p>Number of result : {filteredRepositories.length}</p>
					<ul>
						{filteredRepositories.map(repo => <li key={repo.name}>{repo.url}</li>)}
					</ul>
				</div>
			</section>
		</div>
	);
}

const useStyles = makeStyles({name: {Explore}})(theme => ({
	filteredList: {
		backgroundColor: "aqua",
	},
}));

export const { i18n } = declareComponentKeys<
	| "test"
>()({ ExploreCatalog });
