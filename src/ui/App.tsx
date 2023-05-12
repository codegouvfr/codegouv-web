import { Suspense } from "react";
import { Footer } from "@codegouvfr/react-dsfr/Footer";
import { routes, useRoute } from "ui/routes";
import { createCoreProvider } from "core";
import { RouteProvider } from "ui/routes";
import { pages, page404 } from "ui/pages"
import { objectKeys } from "tsafe/objectKeys";
import { evtLang } from "ui/i18n";
import { Header } from "ui//shared/Header";
import { declareComponentKeys } from "i18nifty";
import { GlobalStylesCodeGouv } from "ui//shared/GlobalStyles";
import { LoadingFallback, loadingFallbackClassName } from "ui/shared/LoadingFallback";
import { makeStyles, useStyles as useCss, GlobalStyles, keyframes } from "@codegouvfr/react-dsfr/tss";
import { useDomRect } from "powerhooks/useDomRect";

const homeLinkProps =
  { ...routes.home().link, "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)" };


const { CoreProvider } = createCoreProvider({
    apiUrl: undefined,
    keycloakParams: undefined,
    getCurrentLang: () => evtLang.state
});

export default function App() {
    const { css } = useCss();

  return (
      <>
          <GlobalStylesCodeGouv />
          <GlobalStyles
              styles={{
                  html: {
                      overflow: "-moz-scrollbars-vertical",
                      overflowY: "scroll"
                  }
              }}
          />
          <CoreProvider fallback={<LoadingFallback className={css({ height: "100vh" })} />}>
              <RouteProvider>
                  <ContextualizedApp />
              </RouteProvider>
          </CoreProvider>
      </>
  );
}

function ContextualizedApp() {
    const route = useRoute();

    const {
        ref: headerRef,
        domRect: { height: headerHeight }
    } = useDomRect();

    const { cx, classes } = useStyles({ headerHeight });

    return (
        <div className={cx(classes.root)}>
            <Header
                ref={headerRef}
            />
            <main className={classes.main}>
                <Suspense fallback={<LoadingFallback />}>
                    {(() => {
                        for (const pageName of objectKeys(pages)) {
                            //You must be able to replace "homepage" by any other page and get no type error.
                            const page = pages[pageName as "home"];

                            if (page.routeGroup.has(route)) {
                                return <page.LazyComponent route={route} className={classes.page} />;
                            }
                        }

                        return <page404.LazyComponent className={classes.page} />;
                    })()}
                </Suspense>
            </main>
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

const useStyles = makeStyles<{ headerHeight: number }>({
    "name": { App }
})((_theme, { headerHeight }) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100vh"
    },
    main: {
        flex: 1,
        [`& .${loadingFallbackClassName}`]: {
            height: `calc(100vh - ${headerHeight}px)`
        }
    },
    loadingFallback : {
        height: "100vh"
    },
    page: {
        animation: `${keyframes`
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
            `} 400ms`
    }
}));

export const { i18n } = declareComponentKeys<
    "find out more"
    | "subscribe"
>()({ App: null });


