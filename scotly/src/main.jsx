import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./styles/index.css";

// ── Tema por defecto ─────────────────────────────────────────
const REGION_THEMES = {
  scotland: {
    "--region-primary": "#0a1a2e",
    "--region-accent":  "#5b9bd5",
    "--region-border":  "#1a3a5e",
    "--region-surface": "rgba(0,63,135,0.07)",
    "--region-text":    "#e8f0f8",
    "--region-muted":   "#7aaad5",
    "--region-btn":     "#5b9bd5",
    "--color-primary":  "#0a1a2e",
    bgImage: "url('/img/bg-scotland.png')",
  }, england:  { "--region-primary":"#1a0808","--region-accent":"#b85050","--region-border":"#3d1e1e","--region-surface":"rgba(184,80,80,0.07)","--region-text":"#f4e8e8","--region-muted":"#a07070","--region-btn":"#b85050","--color-primary":"#1a0808" },
  wales:    { "--region-primary":"#080d1a","--region-accent":"#4a6ab8","--region-border":"#1e2a4a","--region-surface":"rgba(74,106,184,0.07)","--region-text":"#e8eef8","--region-muted":"#7090c8","--region-btn":"#4a6ab8","--color-primary":"#080d1a" },
  ireland:  { "--region-primary":"#081a0f","--region-accent":"#3a8a60","--region-border":"#1e3a28","--region-surface":"rgba(58,138,96,0.07)","--region-text":"#e8f4ee","--region-muted":"#60aa80","--region-btn":"#3a8a60","--color-primary":"#081a0f" },
};

const saved = localStorage.getItem("activeRegion") || "scotland";
const theme = REGION_THEMES[saved];
Object.entries(theme).forEach(([k, v]) => {
  if (k.startsWith("--")) document.documentElement.style.setProperty(k, v);
});
const rootEl = document.getElementById("root");
if (rootEl) {
  rootEl.style.backgroundImage = theme.bgImage || "none";
  rootEl.style.backgroundColor = theme["--region-primary"];
}
// ─────────────────────────────────────────────────────────────
ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>  
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);