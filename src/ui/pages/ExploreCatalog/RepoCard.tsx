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
    repositoryUrl: string
    starCount?: number
    description: string
    language: string
    devStatus: string
    lastUpdate: number
}

export const RepoCard = (props: Props) => {

    const {className, repositoryName, repositoryUrl, description, language, starCount, devStatus, lastUpdate, ...rest} = props
    assert<Equals<typeof rest, {}>>()

    const {t} = useTranslation({RepoCard});
    const {cx, classes} = useStyles();

    const { fromNowText } = useFromNow({ "dateTime": lastUpdate });

    return (
        <div className={cx(fr.cx("fr-card", "fr-enlarge-link"), classes.root, className)}>
            <div className={cx(fr.cx("fr-card__body"), classes.cardBody)}>
                <div className={fr.cx("fr-card__content")}>
                    <div className="fr-card__start">
                        <ul className="fr-tags-group">
                            {language && <li>
                                <p className={fr.cx("fr-tag", "fr-tag--blue-ecume")}>
                                    {language}
                                </p>
                            </li>}
                            <li>
                                <p className={fr.cx("fr-tag", "fr-tag--blue-cumulus")}>
                                    { devStatus }
                                </p>
                            </li>
                            <li>
                                <p className={cx(fr.cx("fr-tag", "fr-tag--yellow-tournesol"),classes.lastUpdate)}>
                                    {t("latest update", { fromNowText })}
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className={cx(fr.cx("fr-card__title"), classes.header)}>
                        <h3 className={classes.name}>
                            <a href={repositoryUrl}>
                                {repositoryName}
                            </a>
                        </h3>
                        {starCount !== undefined && <div className={classes.startCountWrapper}>
                            <i className={fr.cx("fr-icon-star-fill")}/>
                            <span>{starCount}</span>
                        </div>}
                    </div>
                    <p className={cx(fr.cx("fr-card__desc"), classes.description)}>
                        { description }
                    </p>
                </div>
                <div className={cx(fr.cx("fr-card__footer"), classes.footer)}>

                </div>
            </div>
        </div>
    )
}

const useStyles = makeStyles({name: {RepoCard}})(theme => ({
    root: {
        backgroundColor: theme.decisions.background.default.grey.default,
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
