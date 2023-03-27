import { GlobalStyles } from "tss-react";
import { useStyles } from "tss-react/mui";
import { fr } from "@codegouvfr/react-dsfr";

export function GlobalStylesCodeGouv() {

    const { theme } = useStyles();

    return (
        <>
            <GlobalStyles
                styles={{
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
                }}
            />
        </>
    );
}
