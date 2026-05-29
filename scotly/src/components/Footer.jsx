import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* MARCA */}
        <div className="footer-brand">
          <p className="footer-brand__name">Scotly</p>
          <p className="footer-brand__sub">Legends of Britain</p>
          <p className="footer-brand__desc">
            Explorá las Islas Británicas a través de cursos, juegos y narrativa interactiva. Comenzamos en Escocia.
          </p>
        </div>

        {/* CURSOS */}
        <div>
          <h4 className="footer-title">Escocia</h4>
          <ul className="footer-links">
            <li><Link to="/curso/arte">Arte Celta</Link></li>
            <li><Link to="/curso/cocina">Comida Escocesa</Link></li>
            <li><Link to="/curso/history">Historia Escocesa</Link></li>
            <li>
              <Link to="/curso/historia" className="footer-link--badge">
                Historia Gamificada
                <span className="footer-badge">NUEVO</span>
              </Link>
            </li>
            <li><Link to="/curso/mitologia">Mitología</Link></li>
          </ul>
        </div>

        {/* PRÓXIMAS REGIONES */}
        <div>
          <h4 className="footer-title">Próximas regiones</h4>
          <ul className="footer-links">
            <li className="footer-link--coming">
              <span className="footer-region-dot footer-region-dot--en"></span>
              Inglaterra
              <span className="footer-badge footer-badge--soon">PRONTO</span>
            </li>
            <li className="footer-link--coming">
              <span className="footer-region-dot footer-region-dot--wa"></span>
              Gales
              <span className="footer-badge footer-badge--soon">PRONTO</span>
            </li>
            <li className="footer-link--coming">
              <span className="footer-region-dot footer-region-dot--ir"></span>
              Irlanda
              <span className="footer-badge footer-badge--soon">PRONTO</span>
            </li>
          </ul>
        </div>

        {/* EXPLORAR */}
        <div>
          <h4 className="footer-title">Explorar</h4>
          <ul className="footer-links">
            <li><Link to="/shop">Tienda</Link></li>
            <li>
              <Link to="/invasion" className="footer-link--badge">
                Invasión
                <span className="footer-badge footer-badge--event">EVENTO</span>
              </Link>
            </li>
            <li><Link to="/sobre-nosotros">Sobre Nosotros</Link></li>
            <li><Link to="/donaciones">Donar</Link></li>
          </ul>
        </div>

        {/* COMUNIDAD */}
        <div>
          <h4 className="footer-title">Comunidad</h4>
          <ul className="footer-links">
            <li>Foro</li>
            <li>Eventos</li>
            <li>Discord</li>
            <li>FAQ</li>
            <li>Soporte</li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p className="footer-bottom__copy">© 2026 Scotly — Todos los derechos reservados</p>
        <div className="footer-bottom__links">
          <span>Privacidad</span>
          <span>Términos</span>
          <span>Cookies</span>
        </div>
      </div>
    </footer>
  );
}
