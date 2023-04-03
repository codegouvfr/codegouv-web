
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

	const { functionFilterOptions } = useCoreState(selectors.catalog.functionFilterOptions)
	const { languagesFilterOptions } = useCoreState(selectors.catalog.languagesFilterOptions)

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

	if (isLoading) {
		return <CircularProgress />
	}

	return (
		<div>
			<section className={fr.cx("fr-container")}>
				<Search
					selectedFunctions={route.params.functions}
					functionsOptions={functionFilterOptions}
					onFunctionsChange={onFunctionsChange}
					selectedLanguages={route.params.languages}
					languagesOptions={languagesFilterOptions}
					onLanguagesChange={onLanguagesChange}
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
