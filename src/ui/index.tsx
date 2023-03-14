import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RouteProvider } from "ui/router";
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { MuiDsfrThemeProvider } from "@codegouvfr/react-dsfr/mui";
startReactDsfr({ defaultColorScheme: "system" });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouteProvider>
      <MuiDsfrThemeProvider>
        <App />
      </MuiDsfrThemeProvider>
    </RouteProvider>
  </React.StrictMode>
);

