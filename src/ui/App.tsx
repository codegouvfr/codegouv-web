
import { Header } from "@codegouvfr/react-dsfr/Header";
import { fr } from "@codegouvfr/react-dsfr";
import { Display, headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { Footer } from "@codegouvfr/react-dsfr/Footer";
import { routes, useRoute } from "./router";
import { Home } from "./pages/Home";
import { Mui } from "./pages/Mui";

const homeLinkProps =
  { ...routes.home().link, "title": "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)" };

const brandTop = <>CODE<br />GOUV</>;

export default function App() {

  const route = useRoute();

  return (
    <div style={{
      "height": "100vh",
      "display": "flex",
      "flexDirection": "column",
    }}>
      <Header
        brandTop={brandTop}
        serviceTitle="Nom du site / service"
        quickAccessItems={[headerFooterDisplayItem]}
        homeLinkProps={homeLinkProps}
        navigation={[
          {
            "text": "Home",
            "linkProps": routes.home().link,
            "isActive": route.name === "home"
          },
          {
            "text": "Mui playground",
            "linkProps": routes.mui().link,
            "isActive": route.name === "mui"
          }
        ]}
      />
      <div style={{
        "flex": 1,
        "margin": "auto",
        "maxWidth": 1000,
        ...fr.spacing("padding", { "topBottom": "10v" })
      }}>
        {(() => {
          switch (route.name) {
            case "mui": return <Mui />;
            case "home": return <Home />;
            case false: return <h1>404</h1>
          }
        })()}

      </div>
        <Footer
          accessibility="fully compliant"
          brandTop={brandTop}
          contentDescription="
    Ce message est à remplacer par les informations de votre site.

    Comme exemple de contenu, vous pouvez indiquer les informations 
    suivantes : Le site officiel d’information administrative pour les entreprises.
    Retrouvez toutes les informations et démarches administratives nécessaires à la création, 
    à la gestion et au développement de votre entreprise.
    "
          homeLinkProps={homeLinkProps}
        />

      <Display />
    </div>
  );
}

