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
    "--region-primary": "#0b1f17",
    "--region-accent":  "#4a9a60",
    "--region-border":  "#1e3d2a",
    "--region-surface": "rgba(74,154,96,0.07)",
    "--region-text":    "#e8f4ec",
    "--region-muted":   "#6a9a7a",
    "--region-btn":     "#4a9a60",
    "--color-primary":  "#0b1f17",
    bgImage: "url('/img/bg-scotland.png')",  // ← esto sobreescribe la variable global
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
    "--region-primary": "#080d1a",
    "--region-accent":  "#4a6ab8",
    "--region-border":  "#1e2a4a",
    "--region-surface": "rgba(74,106,184,0.07)",
    "--region-text":    "#e8eef8",
    "--region-muted":   "#7090c8",
    "--region-btn":     "#4a6ab8",
    "--color-primary":  "#080d1a",
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
