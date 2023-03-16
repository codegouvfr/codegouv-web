
import type { PageRoute } from "./route";

type Props = {
	className?: string;
	route: PageRoute;
};

export default function Forum(props: Props) {
	const { route } = props

	return (
		<div>
			<h1>Forum</h1>
		</div>
	);

}
