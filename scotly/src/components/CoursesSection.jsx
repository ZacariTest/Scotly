import { useNavigate } from "react-router-dom";

const REGION_CONTENT = {
  scotland: {
    label: "Región activa: Escocia",
    sub: "Historia, tradiciones y mitología de las Islas Británicas — comenzá por las Highlands",
    left: {
      label: "Cursos destacados",
      courses: [
        { img: "/img/Arte.jpg",    alt: "Arte Celta",      tag: "Escocia", tagClass: "dest", name: "Arte Celta",      route: "/curso/arte" },
        { img: "/img/Comida.jpg",  alt: "Comida escocesa", tag: "Escocia", tagClass: "dest", name: "Comida escocesa", route: "/curso/cocina" },
      ],
    },
    center: {
      label: "Historia gamificada",
      course: { img: "/img/Banner-2.jpg", alt: "Historia Gamificada", tag: "Misión interactiva", tagClass: "game", name: "Historia de Escocia", desc: "Revivís la historia a través de decisiones y narrativa", route: "/curso/historia" },
    },
    right: {
      label: "Cursos principales",
      courses: [
        { img: "/img/History.jpg",    alt: "Historia Escocesa", tag: "Historia",  tagClass: "hist", name: "Historia Escocesa",  route: "/curso/history",   locked: false },
        { img: "/img/Mitologia.PNG",  alt: "Mitología",         tag: "Mitología", tagClass: "hist", name: "Mitología y leyendas", route: "/curso/mitologia", locked: false },
      ],
    },
  },
  england: {
    label: "Próximamente: Inglaterra",
    sub: "Arturo, Robin Hood y la monarquía que moldeó el mundo — región en desarrollo",
    left: {
      label: "Próximamente",
      courses: [
        { img: "/img/History.jpg",   alt: "Leyendas Artúricas",  tag: "Inglaterra", tagClass: "region-en", name: "Leyendas Artúricas",  locked: true },
        { img: "/img/Arte.jpg",      alt: "Arte Medieval",        tag: "Inglaterra", tagClass: "region-en", name: "Arte Medieval Inglés", locked: true },
      ],
    },
    center: {
      label: "Historia gamificada",
      course: { img: "/img/Banner-2.jpg", alt: "Camelot", tag: "Próximamente", tagClass: "game", name: "La Leyenda de Camelot", desc: "Acompañá a Arturo en la búsqueda del Santo Grial", locked: true },
    },
    right: {
      label: "Próximamente",
      courses: [
        { img: "/img/Mitologia.PNG", alt: "Robin Hood", tag: "Inglaterra", tagClass: "region-en", name: "Robin Hood y Sherwood", locked: true },
        { img: "/img/History.jpg",   alt: "Torre de Londres", tag: "Inglaterra", tagClass: "region-en", name: "La Torre de Londres", locked: true },
      ],
    },
  },
  wales: {
    label: "Próximamente: Gales",
    sub: "Dragones, bardos y el ciclo del Mabinogi — región en desarrollo",
    left: {
      label: "Próximamente",
      courses: [
        { img: "/img/Arte.jpg",      alt: "Arte Galés",    tag: "Gales", tagClass: "region-wa", name: "Arte y Simbolismo Galés", locked: true },
        { img: "/img/Comida.jpg",    alt: "Gastronomía",   tag: "Gales", tagClass: "region-wa", name: "Gastronomía de Gales",    locked: true },
      ],
    },
    center: {
      label: "Historia gamificada",
      course: { img: "/img/Banner-2.jpg", alt: "Mabinogi", tag: "Próximamente", tagClass: "game", name: "El Ciclo del Mabinogi", desc: "Recorré los cuatro ramos del Mabinogi galés", locked: true },
    },
    right: {
      label: "Próximamente",
      courses: [
        { img: "/img/History.jpg",   alt: "Dragones", tag: "Gales", tagClass: "region-wa", name: "Dragones y Bardos", locked: true },
        { img: "/img/Mitologia.PNG", alt: "Merlin",   tag: "Gales", tagClass: "region-wa", name: "Merlin y la Magia Celta", locked: true },
      ],
    },
  },
  ireland: {
    label: "Próximamente: Irlanda",
    sub: "Hadas, santos y la isla más verde de las Islas Británicas — región en desarrollo",
    left: {
      label: "Próximamente",
      courses: [
        { img: "/img/Arte.jpg",      alt: "Arte Irlandés", tag: "Irlanda", tagClass: "region-ir", name: "Arte Celta Irlandés",    locked: true },
        { img: "/img/Comida.jpg",    alt: "Cocina",        tag: "Irlanda", tagClass: "region-ir", name: "Gastronomía Irlandesa",  locked: true },
      ],
    },
    center: {
      label: "Historia gamificada",
      course: { img: "/img/Banner-2.jpg", alt: "Tuatha", tag: "Próximamente", tagClass: "game", name: "Los Tuatha Dé Danann", desc: "Conocé a los dioses y héroes del folclore irlandés", locked: true },
    },
    right: {
      label: "Próximamente",
      courses: [
        { img: "/img/History.jpg",   alt: "Folclore", tag: "Irlanda", tagClass: "region-ir", name: "Folclore Irlandés",      locked: true },
        { img: "/img/Mitologia.PNG", alt: "Santos",   tag: "Irlanda", tagClass: "region-ir", name: "Leyendas de los Santos", locked: true },
      ],
    },
  },
};

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
