
import type { PageRoute } from "./route";

type Props = {
	className?: string;
	route: PageRoute;
};

export default function Blog(props: Props) {
	const { route } = props

	return (
		<div>
			<h1>Blog</h1>
		</div>
	);

}
