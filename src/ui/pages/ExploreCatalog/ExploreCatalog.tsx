
import { selectors, useCoreFunctions, useCoreState } from "core";
import CircularProgress from '@mui/material/CircularProgress';
import type { PageRoute } from "./route";
import { fr } from "@codegouvfr/react-dsfr";
import {useEffect, useTransition} from "react";
import { assert } from "tsafe/assert";
import { Equals } from "tsafe";
import { useTranslation } from "ui/i18n";
import { makeStyles } from "tss-react/dsfr";
import Explore from "ui/pages/Explore/Explore";
import { declareComponentKeys } from "i18nifty";
import { Search } from "./Search";
import { useConstCallback } from "powerhooks/useConstCallback";
import { Props as SearchProps } from "ui/pages/ExploreCatalog/Search"
import { routes } from "ui/routes"
import { RepoCard } from "./RepoCard";
import useDebounce from "ui/tools/cancelableDebounce";
import SelectNext from "ui/shared/SelectNext";
import type { State as CatalogState } from "core/usecases/catalog";


type Props = {
	className?: string;
	route: PageRoute;
};

export default function ExploreCatalog(props: Props) {

	const {className, route, ...rest} = props
	assert<Equals<typeof rest, {}>>()

	const {t} = useTranslation({ ExploreCatalog });
	const {classes} = useStyles();

	const [, startTransition] = useTransition();

	const { catalog } = useCoreFunctions()
	const { filteredRepositories } = useCoreState(selectors.catalog.filteredRepositories)
	const { isLoading } = useCoreState(selectors.catalog.isLoading)

	const { sortOptions } = useCoreState(selectors.catalog.sortOptions);
	const { administrationsFilterOptions } = useCoreState(selectors.catalog.administrationsFilterOptions)
	const { categoriesFilterOptions } = useCoreState(selectors.catalog.categoriesFilterOptions)
	const { dependenciesFilterOptions } = useCoreState(selectors.catalog.dependenciesFilterOptions)
	const { functionFilterOptions } = useCoreState(selectors.catalog.functionFilterOptions)
	const { languagesFilterOptions } = useCoreState(selectors.catalog.languagesFilterOptions)
	const { licencesFilterOptions } = useCoreState(selectors.catalog.licencesFilterOptions)
	const { devStatusFilterOptions } = useCoreState(selectors.catalog.devStatusFilterOptions)
	const { organisationsFilterOptions } = useCoreState(selectors.catalog.organisationsFilterOptions)

	const onSortChange = useConstCallback((sort: CatalogState.Sort) => {
			return startTransition(() =>
				routes
					.exploreCatalog({
						...route.params,
						sort
					})
					.replace()
			)
		}
	);

	useEffect(() => {
		catalog.updateSort({
			sort: route.params.sort
		});
	}, [route.params.sort]);

	const onSearchChange = useConstCallback<
		SearchProps["onSearchChange"]
	>(search => {
			return startTransition(() =>
				routes
					.exploreCatalog({
						...route.params,
						search
					})
					.replace()
			)
		}
	);

	const debouncedSearch = useDebounce({ value: route.params.search, delay: 1000 });

	useEffect(() => {

		catalog.updateFilter({
			"key": "search",
			"value": route.params.search
		})

	}, [debouncedSearch]);

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
			key: "selectedCategories",
			value: route.params.categories
		});
	}, [route.params.categories]);

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

	const debouncedVitality = useDebounce({ value: route.params.vitality, delay: 500 });

	useEffect(() => {

		catalog.updateFilter({
			"key": "selectedVitality",
			"value": route.params.vitality
		})

	}, [debouncedVitality]);

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
			<div className={fr.cx("fr-container")}>
				<Search
					search={route.params.search}
					onSearchChange={onSearchChange}
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
			</div>
			<section className={fr.cx("fr-container")}>
				<div>
					<div className={classes.header}>
						<h6 className={classes.filteredRepositoriesCount}>
							{t("search results", {
								"count": filteredRepositories.length
							})}
						</h6>
						<SelectNext
							label={t("sort by")}
							className={classes.sort}
							nativeSelectProps={{
								"value": route.params.sort,
								"onChange": event => onSortChange(event.target.value)
							}}
							options={sortOptions.map(value => ({
								value,
								label: (() => {
									switch (value) {
										case "name_asc":
											return t("name asc");
										case "name_desc":
											return t("name desc");
										case "last_update_asc":
											return t("last update asc");
										case "last_update_desc":
											return t("last update desc");

									}
								})()
							}))}
						/>
					</div>
					<div className={classes.repoList}>
						{filteredRepositories.map(repo => (
							<RepoCard
								key={repo.url}
								repositoryName={repo.name}
								devStatus={repo.status}
								description={repo.description}
								language={repo.language}
								lastUpdate={repo.last_updated}
								starCount={repo.star_count}
							/>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}

const useStyles = makeStyles({name: {Explore}})(() => ({
	header: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		...fr.spacing("margin", {
			topBottom: "4v"
		}),
		[fr.breakpoints.down("md")]: {
			flexWrap: "wrap"
		}
	},
	filteredRepositoriesCount: {
		marginBottom: 0
	},
	sort: {
		display: "flex",
		alignItems: "center",
		gap: fr.spacing("2v"),

		"&&>select": {
			width: "auto",
			marginTop: 0
		},
		[fr.breakpoints.down("md")]: {
			marginTop: fr.spacing("4v")
		}
	},
	repoList: {
		display: "grid",
		gridTemplateColumns: "repeat(2, 1fr)",
		gap: fr.spacing("4v")
	},
}));

export const { i18n } = declareComponentKeys<
	| {
	K: "search results";
	P: { count: number };
}
	| "sort by"
	| "name asc"
	| "name desc"
	| "last update asc"
	| "last update desc"
>()({ ExploreCatalog });
