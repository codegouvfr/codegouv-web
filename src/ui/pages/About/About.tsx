
import type { PageRoute } from "./route";

type Props = {
	className?: string;
	route: PageRoute;
};

export default function About(props: Props) {
	const { route } = props

	return (
		<div>
			<h1>About</h1>
		</div>
	);
}
