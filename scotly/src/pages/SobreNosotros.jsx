import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/sobrenosotros.css";

export default function SobreNosotros() {
  return (
    <>
      <Navbar />
      <main className="sn-page">

        {/* HERO */}
        <section className="sn-hero">
          <div className="sn-hero__line-top" />
          <div className="sn-hero__line-bot" />
          <div className="sn-hero__content">
            <p className="sn-hero__eyebrow">Nuestra historia</p>
            <h1 className="sn-hero__title">Sobre <span>Scotly</span></h1>
            <p className="sn-hero__sub">
              Un proyecto nacido del amor por la cultura escocesa y la convicción
              de que aprender puede ser una aventura.
            </p>
          </div>
        </section>

        {/* QUÉ ES SCOTLY */}
        <section className="sn-block">
          <p className="sn-block__label">El proyecto</p>
          <h2 className="sn-block__title">¿Qué es Scotly?</h2>
          <div className="sn-block__body">
            <p>
              Scotly es una plataforma digital dedicada a preservar y difundir la
              historia, cultura y tradiciones de Escocia de una forma atractiva y
              accesible. A través de cursos interactivos, narrativa gamificada y
              una comunidad activa, buscamos conectar a personas de todo el mundo
              con la riqueza del patrimonio escocés.
            </p>
            <p>
              No somos un portal turístico ni una enciclopedia. Somos un espacio
              donde la historia se convierte en aventura, donde aprender sobre la
              gaita o el tartán puede ser tan entretenido como jugar.
            </p>
          </div>
        </section>

        <div className="sn-sep" />

        {/* POR QUÉ ESCOCIA */}
        <section className="sn-block sn-block--dark">
          <p className="sn-block__label">Por qué Escocia</p>
          <h2 className="sn-block__title">Una cultura que merece ser contada</h2>
          <div className="sn-block__body">
            <p>
              Escocia tiene una identidad cultural extraordinaria — castillos,
              clanes, mitología, música tradicional, una lengua propia — y sin
              embargo gran parte de esa riqueza permanece dispersa en sitios poco
              accesibles o demasiado formales para el público joven.
            </p>
            <p>
              Scotly nació para cambiar eso. Para que cualquier persona, desde
              Buenos Aires hasta Edimburgo, pueda descubrir las Highlands de una
              manera cercana, divertida y auténtica.
            </p>
          </div>
        </section>

        <div className="sn-sep" />

        {/* EQUIPO */}
        <section className="sn-block">
          <p className="sn-block__label">Quiénes somos</p>
          <h2 className="sn-block__title">El equipo detrás del proyecto</h2>
          <div className="sn-block__body">
            <p>
              Scotly es desarrollado por <span className="sn-name">Andres Zacarias</span>,
              estudiante de arte multimedial en Da Vinci, con pasión por el diseño,
              el desarrollo web y la cultura europea.
            </p>
            <p>
              El arte y los personajes están siendo creados junto a ilustradores
              independientes que comparten la visión del proyecto. darle a Escocia
              una cara visual moderna, auténtica y con personalidad.
            </p>
            <p>
              Si te interesa colaborar, reportar algo o simplemente saludar, podés
              escribirnos desde la sección de contacto.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="sn-cta">
          <p className="sn-cta__sub">¿Querés ser parte de esta aventura?</p>
          <button className="sn-cta__btn">Comenzar ahora</button>
        </div>

      </main>
      <Footer />
    </>
  );
}
