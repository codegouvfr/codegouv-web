
import type { PageRoute } from "./route";
import { declareComponentKeys } from "i18nifty";
import { useTranslation } from "ui/i18n";

type Props = {
	className?: string;
	route: PageRoute;
};
export default function Home(props: Props) {
	const { route } = props

	const { t } = useTranslation({ Home });

	return (
		<>
			<h1>{t("hello world")}</h1>
		</>
	);
}

export const { i18n } = declareComponentKeys<
	"hello world"
>()({ Home });
