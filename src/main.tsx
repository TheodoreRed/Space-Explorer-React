import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthContextProvider from "./context/AuthContextProvider.tsx";
import SpaceEventProvider from "./context/SpaceEventContextProvider.tsx";
import AstronautProvider from "./context/AstronautContextProvider.tsx";
import SpacecraftProvider from "./context/SpacecraftContextProvider.tsx";
import SearchProvider from "./context/SearchProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SpaceEventProvider>
        <AstronautProvider>
          <SpacecraftProvider>
            <SearchProvider>
              <App />
            </SearchProvider>
          </SpacecraftProvider>
        </AstronautProvider>
      </SpaceEventProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
