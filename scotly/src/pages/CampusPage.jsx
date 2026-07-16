import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { loadActiveRegion, applyRegionThemeById } from "../constants/regionThemes";
import "../styles/campus.css";

export default function CampusPage() {
  const activeRegion = loadActiveRegion();

  useEffect(() => {
    applyRegionThemeById(activeRegion);
  }, [activeRegion]);

  return (
    <>
      <Navbar />
      <main className="campus-page">
        <div className="campus-card">
          <span className="campus-eyebrow">Scotly · Legends of Britain</span>

          <div className="campus-emblem">🏰</div>

          <h1 className="campus-title">Campus</h1>

          <span className="campus-badge">Próximamente</span>

          <p className="campus-description">
            Estamos desarrollando un nuevo espacio de aprendizaje dentro de Scotly.
            El Campus reunirá nuevas lecciones y formas de dominar
            la cultura britanica.
          </p>

          <div className="campus-divider" />

          <p className="campus-footer">
            Vuelve pronto para descubrir lo que se viene.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}