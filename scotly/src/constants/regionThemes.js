export const REGION_THEMES = {
  scotland: {
    "--region-primary": "#0a1a2e",
    "--region-accent":  "#5b9bd5",
    "--region-border":  "#1a3a5e",
    "--region-surface": "rgba(0,63,135,0.07)",
    "--region-text":    "#e8f0f8",
    "--region-muted":   "#a3ccf0",
    "--region-btn":     "#5b9bd5",
    "--color-primary":  "#0a1a2e",
    bgImage: "url('/img/bg-scotland.png')",
  },
  england: {
    "--region-primary": "#1a0808",
    "--region-accent":  "#b85050",
    "--region-border":  "#3d1e1e",
    "--region-surface": "rgba(184,80,80,0.07)",
    "--region-text":    "#f4e8e8",
    "--region-muted":   "#f5c0c0",
    "--region-btn":     "#b85050",
    "--color-primary":  "#1a0808",
    bgImage: "url('/img/inglaterra.jpg')",
  },
  wales: {
    "--region-primary": "#0d2318",
    "--region-accent":  "#4a9a60",
    "--region-border":  "#1e3d2a",
    "--region-surface": "rgba(74,154,96,0.07)",
    "--region-text":    "#e8f4ec",
    "--region-muted":   "#7dbf8a",
    "--region-btn":     "#4a9a60",
    "--color-primary":  "#0d2318",
    bgImage: "url('/img/Gales2.jpg')",
  },
};

export function applyRegionTheme(region) {
  const theme = REGION_THEMES[region] ?? REGION_THEMES.scotland;
  const root = document.documentElement;

  Object.entries(theme).forEach(([key, value]) => {
    if (key.startsWith("--")) root.style.setProperty(key, value);
  });

  const rootEl = document.getElementById("root");
  if (rootEl) {
    rootEl.style.backgroundImage = theme.bgImage ?? "none";
    rootEl.style.backgroundColor = theme["--region-primary"];
  }
}

const REGION_ID_MAP = {
  sc: "scotland",
  en: "england",
  wa: "wales",
};

export function applyRegionThemeById(id) {
  applyRegionTheme(REGION_ID_MAP[id] ?? "scotland");
}

export function saveActiveRegion(id) {
  localStorage.setItem("activeRegion", id);
}

export function loadActiveRegion() {
  return localStorage.getItem("activeRegion") ?? "sc";
}