import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/donaciones.css";

export default function Donaciones() {
  return (
    <>
      <Navbar />
      <main className="dn-page">

        {/* HERO split */}
        <section className="dn-hero">
          <div className="dn-hero__left">
            <p className="dn-hero__eyebrow">Apoyá el proyecto</p>
            <h1 className="dn-hero__title">Apoya a <span>Scotly</span></h1>
            <button
              className="dn-hero__btn"
              onClick={() => window.open("https://paypal.me/scotly", "_blank")}
            >
              Donar ahora ›
            </button>
          </div>
          <div className="dn-hero__right">
            <p className="dn-hero__right-title">¿A dónde va tu donación?</p>
            <div className="dn-news-item">
              <span className="dn-news-badge">Arte</span>
              <span className="dn-news-text">Comisión de personajes originales</span>
            </div>
            <div className="dn-news-item">
              <span className="dn-news-badge">Cursos</span>
              <span className="dn-news-text">Desarrollo de nuevos módulos</span>
            </div>
            <div className="dn-news-item">
              <span className="dn-news-badge">Servidor</span>
              <span className="dn-news-text">Mantenimiento e infraestructura</span>
            </div>
          </div>
        </section>

        {/* MANIFIESTO */}
        <section className="dn-block">
          <p className="dn-block__label">¿Por qué donar?</p>
          <h2 class="dn-block__title">Ayudas directamente al desarrollo de Scotly.</h2>
          <div className="dn-block__body">
            <p>
              Scotly es un proyecto independiente. No tiene publicidad, no vende
              datos, y el acceso al contenido base es y seguirá siendo gratuito.
            </p>
            <p>
              Los cursos, los personajes, los minijuego, la
              historia, es el resultado de meses de trabajo personal.{" "}
              <strong>Cada donación, por pequeña que sea, ayuda a que Scotly siga creciendo.</strong>
            </p>
            <p>
              No pedimos que donaciones para acceder a algo, solo que apoyes
              si creés en el proyecto y querés que exista.
            </p>
          </div>
          <p className="dn-sign">— <span>Andres Zacarias</span>, creador de Scotly</p>
        </section>

        <div className="dn-sep" />

        {/* STATS */}
        <section className="dn-block dn-block--dark">
          <p className="dn-block__label">¿Qué conseguimos con tu apoyo?</p>
          <h2 className="dn-block__title">Un mejor desarrollo para Scotly</h2>
          <div className="dn-block__body">
            <p>
              Scotly no tiene publicidad, no vende tus datos y el acceso a la
              mayoría del contenido es gratuito. El proyecto se sostiene gracias
              a los cursos y al apoyo directo de quienes creen en él.
            </p>
            <p>
              Cada donación va directamente al desarrollo de nuevos cursos, la
              comisión de personajes originales y el mantenimiento de los servidores.
            </p>
          </div>
          <div className="dn-stats">
            <div className="dn-stat">
              <p className="dn-stat__num">100%</p>
              <p className="dn-stat__label">Sin publicidad</p>
            </div>
            <div className="dn-stat">
              <p className="dn-stat__num">6+</p>
              <p className="dn-stat__label">Personajes en desarrollo</p>
            </div>
            <div className="dn-stat">
              <p className="dn-stat__num">Gratis</p>
              <p className="dn-stat__label">Acceso base siempre</p>
            </div>
          </div>
        </section>

        <div className="dn-sep" />

        {/* PAYPAL */}
        <section className="dn-block">
          <p className="dn-block__label">Cómo apoyarnos</p>
          <h2 className="dn-block__title">Mediante nuestros medios de donación</h2>
          <div className="dn-block__body">
            <p>
              Podés apoyar el proyecto de forma directa y segura a través de
              PayPal. No necesitás cuenta, podés donar con tarjeta también.
            </p>
            <div className="dn-paypal">
              <div className="dn-paypal__icon">🅿</div>
              <div className="dn-paypal__info">
                <p className="dn-paypal__label">PayPal</p>
                <p className="dn-paypal__link">paypal.me/scotly</p>
              </div>
              <button
                className="dn-paypal__btn"
                onClick={() => window.open("https://paypal.me/scotly", "_blank")}
              >
                Donar ›
              </button>
            </div>
            <p className="dn-note">
              Próximamente también via Ko-fi. Toda donación es voluntaria y no
              da acceso a contenido exclusivo.
            </p>
          </div>
        </section>

        <div className="dn-cta">
          <p className="dn-cta__sub">
            Si no podés donar, compartir Scotly con alguien también ayuda muchísimo.
          </p>
        </div>

      </main>
      <Footer />
    </>
  );
}
