import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { MuiDsfrThemeProvider } from "@codegouvfr/react-dsfr/mui";
const App = lazy(() => import("ui/App"));

startReactDsfr({ defaultColorScheme: "system" });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Suspense>
      <MuiDsfrThemeProvider>
        <App />
      </MuiDsfrThemeProvider>
    </Suspense>
);

