import { useNavigate } from "react-router-dom";

const REGION_CONTENT = {
  scotland: {
    label: "Región activa: Escocia",
    sub: "Historia, tradiciones y mitología de Escocia",
    left: {
      label: "Cursos destacados",
      courses: [
        { img: "/img/Arte.jpg", alt: "Arte Celta", tag: "Arte", tagClass: "dest", name: "Arte Celta", route: "/curso/arte" },
        { img: "/img/Comida.jpg", alt: "Comida escocesa", tag: "Comida", tagClass: "dest", name: "Comida escocesa", route: "/curso/cocina" },
      ],
    },
    center: {
      label: "Historia gamificada",
      course: { img: "/img/Banner-2.jpg", alt: "Historia Gamificada", tag: "Misión interactiva", tagClass: "game", name: "Historia de Escocia", desc: "Revivís la historia a través de decisiones y narrativa", route: "/curso/historia" },
    },
    right: {
      label: "Cursos principales",
      courses: [
        { img: "/img/History.jpg", alt: "Historia Escocesa", tag: "Historia", tagClass: "hist", name: "Historia Escocesa", route: "/curso/history", locked: false },
        { img: "/img/Mitologia.PNG", alt: "Mitología", tag: "Mitología", tagClass: "hist", name: "Mitología y leyendas", route: "/curso/mitologia", locked: false },
      ],
    },
  },
england: {
  label: "Región activa: Inglaterra",
  sub: "Caballeros, reyes y relatos de la vieja Inglaterra",
  left: {
    label: "Cursos destacados",
    courses: [
      { img: "/img/Ing-Art4.jpg", alt: "Arte Medieval", tag: "Arte", tagClass: "dest", name: "Arte Medieval Inglés", route: "/curso/england/arte", locked: false },
      { img: "/img/C2.jpg", alt: "Cocina Inglesa", tag: "Cocina", tagClass: "dest", name: "Cocina Inglesa", route: "/curso/england/cocina", locked: false },
    ],
  },
center: {
  label: "Historia gamificada",
  course: { img: "/img/HEN.png", alt: "Historia Gamificada", tag: "Misión interactiva", tagClass: "game", name: "Historia de Inglaterra", desc: "De los romanos a la Revolución Industrial — vivís la historia a través de decisiones y narrativa", route: "/curso/historia" },
},
right: {
    label: "Cursos principales",
    courses: [
      { img: "/img/H222.jpg", alt: "Historia Inglesa", tag: "Historia", tagClass: "hist", name: "Historia Inglesa", route: "/curso/england/historia", locked: false },
      { img: "/img/M11.jpg", alt: "Leyendas Artúricas", tag: "Mitología", tagClass: "hist", name: "Leyendas Artúricas", route: "/curso/england/mitologia", locked: false },
    ],
  },
},
wales: {
  label: "Próximamente: Gales",
  sub: "Dragones, bardos y el ciclo del Mabinogi (región en desarrollo)",
  left: {
    label: "Próximamente",
    courses: [
      { img: "/img/W1.jpg", alt: "Arte Galés", tag: "Arte", tagClass: "dest", name: "Arte y Simbolismo Galés", locked: true },
      { img: "/img/W2.jpg", alt: "Gastronomía", tag: "Cocina", tagClass: "dest", name: "Gastronomía de Gales", locked: true },
    ],
  },
  center: {
    label: "Historia gamificada",
    course: { img: "/img/W3.jpg", alt: "Mabinogi", tag: "Próximamente", tagClass: "game", name: "El Ciclo del Mabinogi", desc: "Recorré los cuatro ramos del Mabinogi galés", locked: true },
  },
  right: {
    label: "Próximamente",
    courses: [
      { img: "/img/W4.jpg", alt: "Dragones", tag: "Gales", tagClass: "hist", name: "Dragones y Bardos", locked: true },
      { img: "/img/W5.jpg", alt: "Merlin", tag: "Gales", tagClass: "hist", name: "Merlin y la Magia Celta", locked: true },
    ],
  },
},
};

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
];

export default function CoursesSection({ activeRegion = "scotland" }) {
  const navigate = useNavigate();
  const content = REGION_CONTENT[activeRegion];

  const handleClick = (route, locked) => {
    if (!locked && route) navigate(route);
  };

  return (
    <section className="courses-container">
      <div className="courses-header">
        <p className="courses-header__title">{content.label}</p>
        <p className="courses-header__sub">{content.sub}</p>
      </div>

      <div className="courses-grid">

        {/* Columna izquierda */}
        <div className="courses-col">
          <p className="courses-col__label">{content.left.label}</p>
          {content.left.courses.map((c, i) => (
            <div
              key={i}
              className={`course-card course-card--sm ${c.locked ? "course-card--locked" : ""}`}
              onClick={() => handleClick(c.route, c.locked)}
            >
              <img src={c.img} alt={c.alt} className="course-card__img" />
              <div className="course-card__overlay" />
              <div className="course-card__body">
                <span className={`course-card__tag course-card__tag--${c.tagClass}`}>{c.tag}</span>
                <p className="course-card__name">{c.name}</p>
              </div>
              {!c.locked && <div className="course-card__arrow">›</div>}
            </div>
          ))}
        </div>

        {/* Columna central */}
        <div className="courses-col">
          <p className="courses-col__label">{content.center.label}</p>
          <div
            className={`course-card course-card--lg course-card--featured ${content.center.course.locked ? "course-card--locked" : ""}`}
            onClick={() => handleClick(content.center.course.route, content.center.course.locked)}
          >
            <img src={content.center.course.img} alt={content.center.course.alt} className="course-card__img" />
            <div className="course-card__overlay" />
            <div className="course-card__body">
              <span className={`course-card__tag course-card__tag--${content.center.course.tagClass}`}>{content.center.course.tag}</span>
              <p className="course-card__name">{content.center.course.name}</p>
              <p className="course-card__desc">{content.center.course.desc}</p>
            </div>
            {!content.center.course.locked && <div className="course-card__arrow">›</div>}
          </div>
        </div>

        {/* Columna derecha */}
        <div className="courses-col">
          <p className="courses-col__label">{content.right.label}</p>
          {content.right.courses.map((c, i) => (
            <div
              key={i}
              className={`course-card course-card--sm ${c.locked ? "course-card--locked" : ""}`}
              onClick={() => handleClick(c.route, c.locked)}
            >
              <img src={c.img} alt={c.alt} className="course-card__img" />
              <div className="course-card__overlay" />
              <div className="course-card__body">
                <span className={`course-card__tag course-card__tag--${c.tagClass}`}>{c.tag}</span>
                <p className="course-card__name">{c.name}</p>
              </div>
              {!c.locked && <div className="course-card__arrow">›</div>}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
