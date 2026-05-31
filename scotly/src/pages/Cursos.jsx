import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/cursos.css";

const COURSES = [
  {
    category: "Arte",
    region: "sc",
    items: [
      {
        name: "Arte Celta",
        desc: "Explorá los patrones, nudos y símbolos que definieron la identidad visual escocesa durante siglos.",
        img: "/img/Arte.jpg",
        tag: "Gratis",
        tagType: "free",
        route: "/curso/arte",
      },
    ],
  },
  {
    category: "Gastronomía",
    region: "sc",
    items: [
      {
        name: "Comida Escocesa",
        desc: "Desde el haggis hasta el cranachan — los sabores más emblemáticos de Escocia y cómo prepararlos.",
        img: "/img/Comida.jpg",
        tag: "Gratis",
        tagType: "free",
        route: "/curso/cocina",
      },
    ],
  },
  {
    category: "Historia",
    region: "sc",
    items: [
      {
        name: "Historia Escocesa",
        desc: "Clanes, batallas, reyes y revoluciones — un recorrido por los momentos que forjaron Escocia.",
        img: "/img/History.jpg",
        tag: "Gratis",
        tagType: "free",
        route: "/curso/history",
      },
      {
        name: "Historia Gamificada",
        desc: "Revivís la historia escocesa a través de decisiones, narrativa y personajes interactivos.",
        img: "/img/Banner-2.jpg",
        tag: "Interactivo",
        tagType: "game",
        route: "/curso/historia",
        featured: true,
      },
    ],
  },
  {
    category: "Mitología",
    region: "sc",
    items: [
      {
        name: "Mitología y Leyendas",
        desc: "Selkies, kelpies y el Loch Ness — las criaturas y leyendas que habitan el imaginario escocés.",
        img: "/img/Mitologia.PNG",
        tag: "Gratis",
        tagType: "free",
        route: "/curso/mitologia",
      },
    ],
  },
];

const COMING_SOON = [
  {
    region: "en",
    regionLabel: "Inglaterra",
    name: "Leyendas Artúricas",
    desc: "El rey Arturo, Merlín y los Caballeros de la Mesa Redonda — mito e historia entrelazados.",
    img: "/img/History.jpg",
  },
  {
    region: "wa",
    regionLabel: "Gales",
    name: "El Ciclo del Mabinogi",
    desc: "Los grandes relatos de la mitología galesa, sus dioses y sus héroes.",
    img: "/img/Mitologia.PNG",
  },
  {
    region: "ir",
    regionLabel: "Irlanda",
    name: "Folclore Irlandés",
    desc: "Hadas, santos y la rica tradición oral de la isla esmeralda.",
    img: "/img/Arte.jpg",
  },
];

export default function Cursos() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <main className="cp-page">

        <div className="cp-header">
          <p className="cp-header__eyebrow">Legends of Britain</p>
          <h1 className="cp-header__title">Cursos disponibles</h1>
          <p className="cp-header__sub">Comenzá en Escocia — Inglaterra, Gales e Irlanda se desbloquean próximamente</p>
        </div>

        <div className="cp-body">

          <div className="cp-region-header">
            <span className="cp-region-header__dot"></span>
            <span className="cp-region-header__name">Escocia — The Highlands</span>
            <span className="cp-region-header__badge">Región activa</span>
          </div>

          {COURSES.map((cat) => (
            <div className="cp-category" key={cat.category}>
              <p className="cp-category__label">{cat.category}</p>
              <div className="cp-list">
                {cat.items.map((course) => (
                  <div
                    key={course.name}
                    className={`cp-item cp-item--${cat.region}${course.featured ? " cp-item--featured" : ""}`}
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
                      <span className={`cp-item__tag cp-item__tag--${course.tagType}`}>
                        {course.tag}
                      </span>
                      <span className="cp-item__arrow">›</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* BLOQUE PRÓXIMAS REGIONES */}
          <div className="cp-coming-header">
            <p className="cp-coming-header__label">Próximamente en otras regiones</p>
          </div>

          <div className="cp-list">
            {COMING_SOON.map((course) => (
              <div
                key={course.name}
                className={`cp-item cp-item--locked cp-item--${course.region}`}
              >
                <div className="cp-item__img-wrap">
                  <img src={course.img} alt={course.name} className="cp-item__img" />
                </div>
                <div className="cp-item__info">
                  <p className={`cp-item__region cp-item__region--${course.region}`}>{course.regionLabel}</p>
                  <p className="cp-item__name">{course.name}</p>
                  <p className="cp-item__desc">{course.desc}</p>
                </div>
                <div className="cp-item__meta">
                  <span className="cp-item__tag cp-item__tag--coming">Pronto</span>
                  <span className="cp-item__arrow">🔒</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </main>
      <Footer />
    </>
  );
}
