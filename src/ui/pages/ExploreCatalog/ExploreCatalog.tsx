
import { selectors, useCoreFunctions, useCoreState } from "core";
import CircularProgress from '@mui/material/CircularProgress';
import { Select } from "@codegouvfr/react-dsfr/Select"
import { Button } from "@codegouvfr/react-dsfr/Button";
import type { PageRoute } from "./route";
import { fr } from "@codegouvfr/react-dsfr";
import { MainSearch } from "../../shared/MainSearch";
import { routes } from "../../routes";
import React from "react";
import { assert } from "tsafe/assert";
import { Equals } from "tsafe";
import { useTranslation } from "../../i18n";
import { makeStyles } from "tss-react/dsfr";
import Explore from "../Explore/Explore";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import { declareComponentKeys } from "i18nifty";
import { Header } from "../../shared/Header";

type Props = {
	className?: string;
	route: PageRoute;
};

export default function ExploreCatalog(props: Props) {

	const {className, route, ...rest} = props
	assert<Equals<typeof rest, {}>>()

	const {t} = useTranslation({ ExploreCatalog });
	
	const { filteredRepo } = useCoreState(selectors.catalog.filteredRepo)
	const { filter } = useCoreState(selectors.catalog.filter)
	const { isLoading } = useCoreState(selectors.catalog.isLoading)
	const { repositoryCount } = useCoreState(selectors.catalog.repositoryCount)
	const { repositoryStatistics } = useCoreState(selectors.catalog.repositoryStatistics)
	const { languages } = useCoreState(selectors.catalog.languages)
	const { administrations } = useCoreState(selectors.catalog.administrations)

	const { catalog } = useCoreFunctions()

	if (isLoading) {
		return <CircularProgress />
	}

	const breadcrumbSegments = [
		{
			label: t("breadcrumb explore"),
			linkProps: routes.explore().link
		},
	]

	return (
		<div>
			<section className={fr.cx("fr-container")}>
				<MainSearch
					header={
						<Breadcrumb segments={breadcrumbSegments} currentPageLabel={t("breadcrumb current page")} />
					}
				/>
			</section>
{/*			<p>{repositoryStatistics.repository_count} repositories total</p>
			<p>Languages are {languages.join(',')}</p>
			<p>Administrations are {administrations.join(',')}</p>
			<Select
				label="Label"
				nativeSelectProps={{
					"onChange": event => catalog.changeFilter({
						"filter": event.target.value || undefined as any
					}),
					"value": filter
				}}
			>
				<option value="">Aucun filtre</option>
				<option value="github">GitHub</option>
				<option value="gitlab">GitLab</option>
			</Select>

			<p>Repo count in current filter {repositoryCount.countInCurrentFilter}</p>
			<ul>
				{filteredRepo.map(repo => <li key={repo.url}>{repo.url}</li>)}
			</ul>*/}
		</div>
	);
}

const useStyles = makeStyles({name: {Explore}})(theme => ({
}));

export const { i18n } = declareComponentKeys<
	| "breadcrumb explore"
	| "breadcrumb current page"
>()({ ExploreCatalog });
