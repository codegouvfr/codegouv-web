
import type { PageRoute } from "./route";

type Props = {
	className?: string;
	route: PageRoute;
};

export default function Guides(props: Props) {
	const { route } = props

	return (
		<div>
			<h1>Guides</h1>
		</div>
	);

}
