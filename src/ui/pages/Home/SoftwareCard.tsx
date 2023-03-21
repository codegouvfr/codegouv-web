import React, { memo } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { makeStyles } from "tss-react/dsfr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { Link } from "type-route";

export type Props = {
    className?: string;
    logoUrl: string;
    softwareName: string;
    softwareDescription: string;
    softwareLinks: {
        label: string,
        link: Link
    }[]
};

export const SoftwareCard = memo((props: Props) => {
    const {
        className,
        logoUrl,
        softwareName,
        softwareDescription,
        softwareLinks,
        ...rest
    } = props;

    /** Assert to make sure all props are deconstructed */
    assert<Equals<typeof rest, {}>>();

    const { classes, cx } = useStyles();

    return (
        <div className={cx(fr.cx("fr-card"), classes.root, className)}>
            <div className={cx(fr.cx("fr-card__header"), classes.header)}>
                <p>Un exemple de sous titre</p>
                <div className={classes.title}>
                    <img
                        className={cx(classes.logo)}
                        src={logoUrl}
                        alt="Logo du logiciel"
                    />
                    <h5>{softwareName}</h5>
                </div>
            </div>


            <p className={cx(fr.cx("fr-card__desc"))}>
                {softwareDescription}
            </p>
            <div className={cx(fr.cx("fr-card__end"), classes.end)}>
                {
                    softwareLinks.map(link => (
                        <a
                            {...link.link}
                            className={fr.cx(
                                "fr-link",
                                "fr-icon-arrow-right-line",
                                "fr-link--icon-right"
                            )}
                        >
                            {link.label}
                        </a>
                    ))
                }
            </div>
        </div>
    );
});

const useStyles = makeStyles({
    name: { SoftwareCard }
})(theme => ({
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
    header: {
        width: "100%"
    },
    logo: {
        height: fr.spacing("10v"),
        width: fr.spacing("10v"),
        marginRight: fr.spacing("3v"),
        [fr.breakpoints.down("md")]: {
            height: fr.spacing("5v"),
            width: fr.spacing("5v")
        }
    },
    title: {
        display: "flex",
        alignItems: "center",

        h5: {
            marginBottom: 0
        }
    },
    end: {
        flexDirection: "row",
        gap: fr.spacing("6v")
    },
}));
