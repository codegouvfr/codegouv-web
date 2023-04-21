import React from "react";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { makeStyles } from "tss-react/dsfr";
import { declareComponentKeys } from "i18nifty";
import { fr } from "@codegouvfr/react-dsfr";
import { useTranslation } from "ui/i18n";
import { useFromNow } from "ui/useMoment";

type Props = {
    className?: string
    repositoryName: string
    starCount?: number
    description: string
    language: string
    devStatus: string
    lastUpdate: number
}

export const RepoCard = (props: Props) => {

    const {className, repositoryName, description, language, starCount, devStatus, lastUpdate, ...rest} = props
    assert<Equals<typeof rest, {}>>()

    const {t} = useTranslation({RepoCard});
    const {cx, classes} = useStyles();

    const { fromNowText } = useFromNow({ "dateTime": lastUpdate });

    return (
        <div className={cx(fr.cx("fr-card"), classes.root, className)}>
            <div className={classes.cardBody}>
                <div className={cx(fr.cx("fr-card__header"), classes.header)}>
                    <h3 className={classes.name}>{repositoryName}</h3>
                    {starCount !== undefined && <div className={classes.startCountWrapper}>
                        <i className={fr.cx("fr-icon-star-fill")}/>
                        <span>{starCount}</span>
                    </div>}
                </div>
                <p className={cx(fr.cx("fr-card__content"), classes.description)}>
                    { description }
                </p>
                <div className={cx(fr.cx("fr-card__footer"), classes.footer)}>
                    {language && <span
                        className={cx(
                            fr.cx(
                                "fr-badge--no-icon",
                                "fr-badge--blue-ecume",
                                "fr-badge",
                                "fr-badge--sm"
                            )
                        )}
                    >
                        {language}
                    </span>}
                    <span
                        className={cx(
                            fr.cx(
                                "fr-badge--no-icon",
                                "fr-badge--blue-cumulus",
                                "fr-badge",
                                "fr-badge--sm"
                            )
                        )}
                    >
                        { devStatus }
                    </span>
                    <span
                        className={cx(
                            fr.cx(
                                "fr-badge--no-icon",
                                "fr-badge--yellow-tournesol",
                                "fr-badge",
                                "fr-badge--sm"
                            ),
                            classes.lastUpdate
                        )}
                    >
                         {t("latest update", { fromNowText })}
                    </span>
                </div>
            </div>
        </div>
    )
}

const useStyles = makeStyles({name: {RepoCard}})(theme => ({
    root: {
        ...fr.spacing("padding", {
            topBottom: "7v",
            rightLeft: "6v"
        }),
        backgroundColor: theme.decisions.background.default.grey.default,
        [fr.breakpoints.down("md")]: {
            ...fr.spacing("padding", {
                topBottom: "5v",
                rightLeft: "3v"
            })
        }
    },
    cardBody: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    name: {
        margin: 0,
        color: theme.decisions.text.title.grey.default,
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: "1",
        whiteSpace: "pre-wrap",
        overflow: "hidden"
    },
    startCountWrapper : {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: fr.spacing("1v")
    },
    description: {
        marginTop: 0,
        marginBottom: fr.spacing("3v"),
        color: theme.decisions.text.default.grey.default,
        overflow: "hidden",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: "3",
        whiteSpace: "pre-wrap"
    },
    footer: {
        display: "flex",
        gap: fr.spacing("4v"),
        flexWrap: "wrap"
    },
    lastUpdate: {
        whiteSpace: "nowrap"
    }
}));

export const {i18n} = declareComponentKeys<
    | { K: "latest update"; P: { fromNowText: string } }
>()({RepoCard});
