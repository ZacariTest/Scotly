import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { applyRegionThemeById, saveActiveRegion, loadActiveRegion } from "../constants/regionThemes";
import "../styles/cursos.css";

const REGIONS = [
  { id: "sc", label: "Escocia", badge: "Activa" },
  { id: "en", label: "Inglaterra", badge: "Activa" },
  { id: "wa", label: "Gales", badge: "Pronto", locked: true },
];

const COURSES = {
  sc: [
    {
      category: "Arte",
      items: [
        { name: "Arte Celta", desc: "Explorá los patrones, nudos y símbolos que definieron la identidad visual escocesa durante siglos.", img: "/img/Arte.jpg", tag: "Gratis", tagType: "free", route: "/curso/arte" },
      ],
    },
    {
      category: "Gastronomía",
      items: [
        { name: "Comida Escocesa", desc: "Desde el haggis hasta el cranachan. Los sabores más emblemáticos de Escocia y cómo prepararlos.", img: "/img/Comida.jpg", tag: "Gratis", tagType: "free", route: "/curso/cocina" },
      ],
    },
    {
      category: "Historia",
      items: [
        { name: "Historia Escocesa", desc: "Clanes, batallas, reyes y revoluciones, un recorrido por los momentos que forjaron Escocia.", img: "/img/History.jpg", tag: "Gratis", tagType: "free", route: "/curso/history" },
        { name: "Historia Gamificada", desc: "Revivís la historia escocesa a través de decisiones, narrativa y personajes interactivos.", img: "/img/Banner-2.jpg", tag: "Interactivo", tagType: "game", route: "/curso/historia", featured: true },
      ],
    },
    {
      category: "Mitología",
      items: [
        { name: "Mitología y Leyendas", desc: "Selkies, kelpies y el Loch Ness. Las criaturas y leyendas que habitan el imaginario escocés.", img: "/img/Mitologia.PNG", tag: "Gratis", tagType: "free", route: "/curso/mitologia" },
      ],
    },
  ],
  en: [
    {
      category: "Arte",
      items: [
        { name: "Arte Medieval Inglés", desc: "Iluminaciones, catedrales y tapices, el arte que la Iglesia y la nobleza dejaron como herencia al mundo.", img: "/img/Ing-Art4.jpg", tag: "Gratis", tagType: "free", route: "/curso/england/arte" },
      ],
    },
    {
      category: "Gastronomía",
      items: [
        { name: "Cocina Inglesa", desc: "Del roast beef al fish and chips. La gastronomía que alimentó un imperio.", img: "/img/C2.jpg", tag: "Gratis", tagType: "free", route: "/curso/england/cocina" },
      ],
    },
    {
      category: "Historia",
      items: [
        { name: "Historia de Inglaterra", desc: "De los romanos a la Revolución Industrial. Los eventos que moldearon el mundo moderno.", img: "/img/H22.jpg", tag: "Gratis", tagType: "free", route: "/curso/england/history" },
      ],
    },
    {
      category: "Mitología",
      items: [
        { name: "Leyendas Artúricas", desc: "El rey Arturo, Merlín y los Caballeros de la Mesa Redonda. Mito e historia entrelazados.", img: "/img/M11.jpg", tag: "Gratis", tagType: "free", route: "/curso/england/mitologia" },
      ],
    },
  ],
};

const REGION_LABELS = {
  sc: "Escocia — The Highlands",
  en: "Inglaterra — The Kingdom",
};

export default function Cursos() {
  const navigate = useNavigate();

  const [activeRegion, setActiveRegion] = useState(() => loadActiveRegion());

  // Al montar
  useEffect(() => {
    applyRegionThemeById(activeRegion);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Al cambiar tab
  useEffect(() => {
    applyRegionThemeById(activeRegion);
  }, [activeRegion]);

  const handleRegionSelect = (id) => {
    setActiveRegion(id);
    saveActiveRegion(id);
  };

  const courses = COURSES[activeRegion] ?? [];

  return (
    <>
      <Navbar />
      <main className="cp-page">

        <div className="cp-header">
          <p className="cp-header__eyebrow">Legends of Britain</p>
          <h1 className="cp-header__title">Cursos disponibles</h1>
        </div>

        <div className="cp-body">

          <div className="cp-region-tabs">
            {REGIONS.map((r) => (
              <button
                key={r.id}
                className={[
                  "cp-region-tab",
                  activeRegion === r.id ? "cp-region-tab--active" : "",
                  r.locked ? "cp-region-tab--locked" : "",
                ].join(" ")}
                onClick={() => !r.locked && handleRegionSelect(r.id)}
                disabled={r.locked}
              >
                {r.label}
                <span className={`cp-region-tab__badge cp-region-tab__badge--${r.locked ? "soon" : "active"}`}>
                  {r.badge}
                </span>
              </button>
            ))}
          </div>

          <div className="cp-region-header">
            <span className="cp-region-header__dot" />
            <span className="cp-region-header__name">{REGION_LABELS[activeRegion]}</span>
            <span className="cp-region-header__badge">Región activa</span>
          </div>

          {courses.map((cat) => (
            <div className="cp-category" key={cat.category}>
              <p className="cp-category__label">{cat.category}</p>
              <div className="cp-list">
                {cat.items.map((course) => (
                  <div
                    key={course.name}
                    className={`cp-item${course.featured ? " cp-item--featured" : ""}`}
                    onClick={() => navigate(course.route)}
                  >
                    <div className="cp-item__img-wrap">
                      <img src={course.img} alt={course.name} className="cp-item__img" />
                    </div>
                    <div className="cp-item__info">
                      <p className="cp-item__name">{course.name}</p>
                      <p className="cp-item__desc">{course.desc}</p>
                    </div>
                    <div className="cp-item__meta">
                      <span className={`cp-item__tag cp-item__tag--${course.tagType}`}>{course.tag}</span>
                      <span className="cp-item__arrow">›</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>

      </main>
      <Footer />
    </>
  );
}