import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { makeStyles } from "tss-react/dsfr";
import { declareComponentKeys } from "i18nifty";
import { fr } from "@codegouvfr/react-dsfr";
import { useTranslation } from "ui/i18n";
import Tile from "@codegouvfr/react-dsfr/Tile";

type Props = {
    className?: string
}

export const Contribute = (props: Props) => {

    const {className, ...rest} = props
    assert<Equals<typeof rest, {}>>()

    const { t } = useTranslation({ Contribute });
    const { classes } = useStyles({ tileCount: 3 });

    const contributeList = [
        {
            title: t("contribute reference software"),
            link:{
                href: `mailto:contact@code.gouv.fr?subject=${t("contribute reference software mail subject")}&body=${t("contribute reference software mail body")}`,
                onClick: () => {}
            },
        },
        {
            title: t("contribute reference source code"),
            link:{
                href: `mailto:contact@code.gouv.fr?subject=${t("contribute reference source code mail subject")}&body=${t("contribute reference source code mail body")}`,
                onClick: () => {}
            },
        },
        {
            title: t("contribute suggest"),
            link:{
                href: `mailto:contact@code.gouv.fr?subject=${t("contribute suggest mail subject")}&body=${t("contribute suggest mail body")}`,
                onClick: () => {}
            },
        }
    ]

    return (
        <div className={className}>
            <h1>{t("contribute title")}</h1>
            <div className={classes.grid}>
                {
                    contributeList.map(item => <Tile title={item.title} linkProps={item.link} />)
                }
            </div>
        </div>
    )
}

const useStyles = makeStyles<{ tileCount: number }>()((theme, { tileCount }) => ({
    grid: {
        display: "grid",
        gridTemplateColumns: `repeat(${tileCount}, 1fr)`,
        columnGap: fr.spacing("6v"),
        [fr.breakpoints.down("md")]: {
            gridTemplateColumns: `repeat(1, 1fr)`,
            rowGap: fr.spacing("4v")
        },
    },
}));

export const {i18n} = declareComponentKeys<
    | "contribute title"
    | "contribute reference software"
    | "contribute reference software mail subject"
    | "contribute reference software mail body"
    | "contribute reference source code"
    | "contribute reference source code mail subject"
    | "contribute reference source code mail body"
    | "contribute suggest"
    | "contribute suggest mail subject"
    | "contribute suggest mail body"
>()({ Contribute });
