import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Presentation from "../components/Presentation";
import CoursesSection from "../components/CoursesSection";
import FinalMessage from "../components/FinalMessage";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";
import RegionsSection from "../components/RegionsSection";
import { applyRegionTheme, saveActiveRegion } from "../constants/regionThemes";

const SHORT_TO_LONG = {
  sc: "scotland",
  en: "england",
  wa: "wales",
};

const LONG_TO_SHORT = {
  scotland: "sc",
  england:  "en",
  wales:    "wa",
};

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false);

  // Arranca con la región guardada, mapeando id corto → largo
  const [activeRegion, setActiveRegion] = useState(() => {
    const saved = localStorage.getItem("activeRegion");
    return SHORT_TO_LONG[saved] ?? "scotland";
  });

  // Al montar: aplica el tema guardado
  useEffect(() => {
    applyRegionTheme(activeRegion);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Al cambiar región
  useEffect(() => {
    applyRegionTheme(activeRegion);
  }, [activeRegion]);

  const handleRegionSelect = (region) => {
    setActiveRegion(region);
    saveActiveRegion(LONG_TO_SHORT[region] ?? "sc");
  };

  return (
    <>
      <Navbar />

      <main className="w-full">
        <Hero activeRegion={activeRegion} />
        <RegionsSection activeRegion={activeRegion} onSelect={handleRegionSelect} />
        <Presentation />
        <CoursesSection activeRegion={activeRegion} />
        <FinalMessage onAuth={() => setAuthOpen(true)} />
        <Footer />
      </main>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}