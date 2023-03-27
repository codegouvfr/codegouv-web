import { Suspense } from "react";
import { Footer } from "@codegouvfr/react-dsfr/Footer";
import { routes, useRoute } from "ui/routes";
import { createCoreProvider } from "core";
import { RouteProvider } from "ui/routes";
import { makeStyles } from "tss-react/dsfr";
import { pages, page404 } from "ui/pages"
import { objectKeys } from "tsafe/objectKeys";
import { evtLang } from "ui/i18n";
import { Header } from "./shared/Header";
import { declareComponentKeys } from "i18nifty";
import { GlobalStylesCodeGouv } from "./shared/GlobalStyles";

const homeLinkProps =
  { ...routes.home().link, "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)" };


const { CoreProvider } = createCoreProvider({
    "apiUrl": undefined,
    "keycloakParams": undefined,
    "getCurrentLang": () => evtLang.state
});

export default function App() {
  return (
    <CoreProvider fallback={<h1>Splash screen</h1>} >
        <RouteProvider>
            <ContextualizedApp />
        </RouteProvider>
    </CoreProvider>
  );
}

function ContextualizedApp() {
    const route = useRoute();

    const { classes, cx } = useStyles();

    return (
        <div className={cx(classes.root)}>
            <Suspense>
                <GlobalStylesCodeGouv />
                <Header />
                <main className={classes.main}>

                        {(() => {
                            for (const pageName of objectKeys(pages)) {
                                //You must be able to replace "homepage" by any other page and get no type error.
                                const page = pages[pageName as "home"];

                                if (page.routeGroup.has(route)) {
                                    return <page.LazyComponent route={route} />;
                                }
                            }

                            return <page404.LazyComponent />;
                        })()}

                </main>
            </Suspense>
            <Footer
                accessibility="fully compliant"
                brandTop={"Code gouv"}
                contentDescription="
            Ce message est à remplacer par les informations de votre site.

            Comme exemple de contenu, vous pouvez indiquer les informations
            suivantes : Le site officiel d’information administrative pour les entreprises.
            Retrouvez toutes les informations et démarches administratives nécessaires à la création,
            à la gestion et au développement de votre entreprise.
            "
                homeLinkProps={homeLinkProps}
            />
        </div>
    );
}

const useStyles = makeStyles({
    "name": { App }
})({
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100vh"
    },
    main: {
        flex: 1
    },
});

export const { i18n } = declareComponentKeys<
    "find out more"
    | "subscribe"
>()({ App: null });


