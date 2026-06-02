import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Presentation from "../components/Presentation";
import CoursesSection from "../components/CoursesSection";
import FinalMessage from "../components/FinalMessage";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";
import RegionsSection from "../components/RegionsSection";

const REGION_THEMES = {
  scotland: {
    "--region-primary": "#0a1a2e",      // ← azul escocés oscuro
    "--region-accent":  "#5b9bd5",      // ← azul claro
    "--region-border":  "#1a3a5e",      // ← borde azul
    "--region-surface": "rgba(0,63,135,0.07)",
    "--region-text":    "#e8f0f8",
    "--region-muted":   "#7aaad5",
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
    "--region-muted":   "#a07070",
    "--region-btn":     "#b85050",
    "--color-primary":  "#1a0808",
    bgImage: "url('/img/inglaterra.jpg')",
  },
  wales: {
    "--region-primary": "#0d2318",      // ← verde galés oscuro
    "--region-accent":  "#4a9a60",      // ← verde
    "--region-border":  "#1e3d2a",      // ← borde verde
    "--region-surface": "rgba(74,154,96,0.07)",
    "--region-text":    "#e8f4ec",
    "--region-muted":   "#7dbf8a",
    "--region-btn":     "#4a9a60",
    "--color-primary":  "#0d2318",
  },
  ireland: {
    "--region-primary": "#081a0f",
    "--region-accent":  "#3a8a60",
    "--region-border":  "#1e3a28",
    "--region-surface": "rgba(58,138,96,0.07)",
    "--region-text":    "#e8f4ee",
    "--region-muted":   "#60aa80",
    "--region-btn":     "#3a8a60",
    "--color-primary":  "#081a0f",
  },
};

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false);
  const [activeRegion, setActiveRegion] = useState("scotland");

  // Aplica variables CSS al root cuando cambia la región
useEffect(() => {
  const theme = REGION_THEMES[activeRegion];
  const root = document.documentElement;
  
  Object.entries(theme).forEach(([key, value]) => {
    if (key.startsWith("--")) {
      root.style.setProperty(key, value);
    }
  });

  // Cambiá el background del #root element
const rootEl = document.getElementById("root");
if (rootEl) {
  rootEl.style.backgroundImage = theme.bgImage || "none";
  rootEl.style.backgroundColor = theme["--region-primary"];
}
}, [activeRegion]);
  return (
    <>
      <Navbar />

      <main className="w-full">
        <Hero activeRegion={activeRegion} />
        <RegionsSection activeRegion={activeRegion} onSelect={setActiveRegion} />
        <Presentation />
        <CoursesSection activeRegion={activeRegion} />
        <FinalMessage onAuth={() => setAuthOpen(true)} />
        <Footer />
      </main>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}
