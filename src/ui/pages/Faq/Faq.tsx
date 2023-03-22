
import type { PageRoute } from "./route";

type Props = {
	className?: string;
	route: PageRoute;
};

export default function Faq(props: Props) {
	const { route } = props

	return (
		<div>
			<h1>Faq</h1>
		</div>
	);

}
