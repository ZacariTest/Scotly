import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { applyRegionThemeById } from "./constants/regionThemes";
import "./styles/index.css";

// Aplica el tema guardado antes de renderizar
const savedRegion = localStorage.getItem("activeRegion") ?? "sc";
applyRegionThemeById(savedRegion);

const rootEl = document.getElementById("root");

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);