import React, { memo } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { makeStyles } from "tss-react/dsfr";
import { useLang } from "../i18n";

type LangOption = {
    hrefLang: "fr" | "en"
    lang: "fr" | "en"
    langFull: "Français" | "English" | "Español" | "Deutsch";
};

const languageOptionDefault: LangOption = {
    "hrefLang": "fr",
    "lang": "fr",
    "langFull": "Français"
};

const languageOptions: LangOption[] = [
    languageOptionDefault,
    {
        "hrefLang": "en",
        "lang": "en",
        "langFull": "English"
    }
];

/**
 * The button controlling the component must specify 2 attributes
 * - "aria-controls": "translate-select",
 * - "aria-expanded": false,
 */
export const LanguageSelector = memo(() => {

    const { cx, classes } = useStyles();
    const { lang, setLang } = useLang()

    const ActiveLanguage = () => {
        const findActiveLanguage =
            languageOptions.find(language => language.lang === lang) ??
            languageOptionDefault;

        return (
            <>
                {" "}
                <span className={classes.langShort}>{findActiveLanguage.lang}</span>
                <span className={fr.cx("fr-hidden-lg")}>
                    {" "}
                    - {findActiveLanguage.langFull}
                </span>{" "}
            </>
        );
    };

    const onChangeLanguage = (selectedLang: "fr" | "en") => {
        setLang(selectedLang)
    }

    return (
        <>
            <div>
                <ActiveLanguage />
            </div>
            <div
                className={cx(fr.cx("fr-collapse", "fr-menu"), classes.menuLanguage)}
                id="translate-select"
            >
                <ul className={fr.cx("fr-menu__list")}>
                    {languageOptions.map(language => (
                        <li key={language.lang}>
                            <a
                                className={fr.cx(
                                    "fr-translate__language",
                                    "fr-nav__link"
                                )}
                                hrefLang={language.hrefLang}
                                lang={language.lang}
                                href="#"
                                aria-current={
                                    language.lang === lang
                                        ? "true"
                                        : undefined
                                }
                                onClick={e => onChangeLanguage(e.currentTarget.attributes.getNamedItem("lang")?.value as "fr" | "en" ?? "fr")}
                            >
                                <span className={classes.langShort}>{language.lang}</span>{" "}
                                - {language.langFull}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
});

const useStyles = makeStyles()(() => ({
    "menuLanguage": {
        "right": 0
    },
    "langShort": {
        "textTransform": "uppercase"
    }
}));
