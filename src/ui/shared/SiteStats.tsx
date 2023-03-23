import { declareComponentKeys } from "i18nifty";
import { useTranslation } from "ui/i18n";
import { fr } from "@codegouvfr/react-dsfr";
import { makeStyles } from "tss-react/dsfr";
import Tile from "@codegouvfr/react-dsfr/Tile";
import Card from "@codegouvfr/react-dsfr/Card";
import { Button } from "@codegouvfr/react-dsfr/Button";
import Input from "@codegouvfr/react-dsfr/Input";

type Props = {
    title?: string
    stats: {
        label: string
        number: number
    }[]
    invertedColors?: boolean
}
export const SiteStats = (props: Props) => {
    const { stats, title, invertedColors } = props
    const { t: tCommons } = useTranslation({ App: null });
    const { cx, classes } = useStyles({ invertedColors, statsCount: stats.length });

    return (
        <div className={cx(fr.cx("fr-container"), classes.numbersListContainer)}>
            <h1 className={cx(classes.whiteText, classes.numberTitle)}>
                { title }
            </h1>
            <div className={classes.grid3items}>
                {stats.map(stat => (
                    <div key={stat.label}>
                        <p
                            className={cx(
                                fr.cx("fr-display--sm"),
                                classes.whiteText,
                                classes.numberText
                            )}
                        >
                            {stat.number}
                        </p>
                        <h4 className={classes.whiteText}>{stat.label}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}

const useStyles = makeStyles<{ invertedColors: Props["invertedColors"], statsCount: number }>()((theme, { invertedColors, statsCount }) => ({
    section: {
        ...fr.spacing("padding", {
            topBottom: "30v"
        }),
        [fr.breakpoints.down("md")]: {
            ...fr.spacing("padding", {
                topBottom: "20v"
            })
        }
    },
    backgroundFullWidth: {
        backgroundColor: theme.decisions.background.actionHigh.blueFrance.default
    },
    titleSection: {
        marginBottom: fr.spacing("10v"),
        [fr.breakpoints.down("md")]: {
            marginBottom: fr.spacing("8v")
        }
    },
    titleContainer: {
        marginBottom: fr.spacing("10v"),
        display: "flex"
    },
    intro: {
        display: "flex",
        gap: fr.spacing("6v"),
        [fr.breakpoints.down("md")]: {
            flexDirection: "column"
        }
    },
    primaryEvents: {
        display: "flex",
        flexDirection: "column",
        gap: fr.spacing("8v")
    },
    numbersListContainer: {
        textAlign: "center"
    },
    grid3items: {
        display: "grid",
        gridTemplateColumns: `repeat(${statsCount}, 1fr)`,
        columnGap: fr.spacing("6v"),
        [fr.breakpoints.down("md")]: {
            gridTemplateColumns: `repeat(1, 1fr)`,
            rowGap: fr.spacing("4v")
        },
    },
    whiteText: {
        color: invertedColors ? theme.decisions.text.inverted.grey.default : ""
    },
    numberTitle: {
        marginBottom: fr.spacing("20v")
    },
    numberText: {
        marginBottom: fr.spacing("1v")
    },
    shareGroup: {
        order: "initial",
        marginBottom: fr.spacing("4v"),

        ".fr-share__link": {
            marginBottom: 0
        }
    },
    row: {
        "& .fr-col-4": {
            [fr.breakpoints.down("md")]: {
                flex: "0 0 100%",
                width: "100%",
                maxWidth: "100%"
            },
        }
    }
}));
