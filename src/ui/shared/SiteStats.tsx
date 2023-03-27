import { fr } from "@codegouvfr/react-dsfr";
import { makeStyles } from "tss-react/dsfr";

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
    const { cx, classes } = useStyles({ invertedColors, statsCount: stats.length });

    return (
        <div className={cx(fr.cx("fr-container"), classes.statsListContainer)}>
            <h1 className={cx(classes.whiteText, classes.statTitle)}>
                { title }
            </h1>
            <div className={classes.grid}>
                {stats.map(stat => (
                    <div key={stat.label}>
                        <p
                            className={cx(
                                fr.cx("fr-display--sm"),
                                classes.whiteText,
                                classes.statNumber
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
    statsListContainer: {
        textAlign: "center"
    },
    grid: {
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
    statTitle: {
        marginBottom: fr.spacing("20v")
    },
    statNumber: {
        marginBottom: fr.spacing("1v")
    },
}));
