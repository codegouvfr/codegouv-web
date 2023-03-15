
import { selectors, useCoreState, useCoreFunctions } from "core";
import CircularProgress from '@mui/material/CircularProgress';
import { Select } from "@codegouvfr/react-dsfr/Select"
import { Button } from "@codegouvfr/react-dsfr/Button";
import type { PageRoute } from "./route";

type Props = {
	className?: string;
	route: PageRoute;
};

export default function Catalog(props: Props) {
	const { route } = props

	const { filteredRepo } = useCoreState(selectors.catalog.filteredRepo)
	const { filter } = useCoreState(selectors.catalog.filter)
	const { isLoading } = useCoreState(selectors.catalog.isLoading)
	const { repositoryCount } = useCoreState(selectors.catalog.repositoryCount)

	const { catalog } = useCoreFunctions();

	if (isLoading) {
		return <CircularProgress />
	}

	return (
		<div>
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
			</ul>
			<Button
				onClick={() => catalog.addRepository({
					"url": "https://github.com/xxxx/yyyy" + Date.now()
				})}
			>
				Add random repo
			</Button>

		</div>
	);

}
