import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/cursos.css";

const COURSES = [
  {
    category: "Arte",
    items: [
      {
        name: "Arte Celta",
        desc: "Explorá los patrones, nudos y símbolos que definieron la identidad visual escocesa durante siglos.",
        img: "/img/Arte.jpg",
        tag: "0000",
        tagType: "free",
        route: "/curso/arte",
      },
    ],
  },
  {
    category: "Gastronomía",
    items: [
      {
        name: "Comida Escocesa",
        desc: "Desde el haggis hasta el cranachan — los sabores más emblemáticos de Escocia y cómo prepararlos.",
        img: "/img/Comida.jpg",
        tag: "0000",
        tagType: "free",
        route: "/curso/cocina",
      },
    ],
  },
  {
    category: "Historia",
    items: [
      {
        name: "Historia Escocesa",
        desc: "Clanes, batallas, reyes y revoluciones — un recorrido por los momentos que forjaron Escocia.",
        img: "/img/History.jpg",
        tag: "0000",
        tagType: "free",
        route: "/curso/history",
      },
      {
        name: "Historia Gamificada",
        desc: "Revive la historia escocesa a través de decisiones, narrativa y personajes interactivos.",
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
    items: [
      {
        name: "Mitología y Leyendas",
        desc: "Selkies, kelpies y el Loch Ness — las criaturas y leyendas que habitan el imaginario escocés.",
        img: "/img/Mitologia.PNG",
        tag: "0000",
        tagType: "free",
        route: "/curso/mitologia",
      },
    ],
  },
];

export default function Cursos() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <main className="cp-page">

        <div className="cp-header">
          <p className="cp-header__eyebrow">Aprende a tu ritmo</p>
          <h1 className="cp-header__title">Cursos disponibles</h1>
          <p className="cp-header__sub">Historia, cultura y tradiciones escocesas en un solo lugar</p>
        </div>

        <div className="cp-body">
          {COURSES.map((cat) => (
            <div className="cp-category" key={cat.category}>
              <p className="cp-category__label">{cat.category}</p>
              <div className="cp-list">
                {cat.items.map((course) => (
                  <div
                    key={course.name}
                    className={`cp-item ${course.featured ? "cp-item--featured" : ""}`}
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
        </div>

      </main>
      <Footer />
    </>
  );
}
