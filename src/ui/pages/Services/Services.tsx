
import type { PageRoute } from "./route";
import { declareComponentKeys } from "i18nifty";

type Props = {
	className?: string;
	route: PageRoute;
};
export default function Services(props: Props) {
	const { route } = props

	return (
		<div>
			<h1>Services</h1>
		</div>
	);
}
