import { useState, useRef } from "react";
import "../styles/authmodal.css";
import { useAuth } from "../context/AuthContext";

export default function AuthModal({ onClose }) {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const mouseDownTarget = useRef(null);
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form); // conecta con AuthContext — reemplazar con backend cuando esté listo
    onClose();
  };

  const handleOverlayMouseDown = (e) => {
    mouseDownTarget.current = e.target;
  };

  const handleOverlayMouseUp = (e) => {
    if (
      mouseDownTarget.current === e.currentTarget &&
      e.target === e.currentTarget
    ) {
      onClose();
    }
    mouseDownTarget.current = null;
  };

  return (
    <div
      className="auth-overlay"
      onMouseDown={handleOverlayMouseDown} // guarda dónde empezó el clic
      onMouseUp={handleOverlayMouseUp}     // cierra solo si ambos eventos son en el overlay
    >
      <div className="auth-modal">

        {/* HEADER */}
        <div className="auth-modal__header">
          <p className="auth-modal__logo">Sc<span>otly</span></p>
          <button className="auth-modal__close" onClick={onClose}>✕</button>
        </div>

        {/* TABS */}
        <div className="auth-modal__tabs">
          <button
            className={`auth-tab ${tab === "login" ? "auth-tab--active" : ""}`}
            onClick={() => setTab("login")}
          >
            Entrar
          </button>
          <button
            className={`auth-tab ${tab === "register" ? "auth-tab--active" : ""}`}
            onClick={() => setTab("register")}
          >
            Registrarse
          </button>
        </div>

        {/* BODY */}
        <div className="auth-modal__body">
          <p className="auth-modal__title">
            {tab === "login" ? "Bienvenido de nuevo" : "Creá tu cuenta"}
          </p>
          <p className="auth-modal__sub">
            {tab === "login"
              ? "Ingresá para continuar tu aventura escocesa"
              : "Unite a la comunidad de Scotly gratis"}
          </p>

          <form onSubmit={handleSubmit}>
            {tab === "register" && (
              <div className="auth-field">
                <input
                  className="auth-input"
                  type="text"
                  name="username"
                  placeholder="Nombre de usuario"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="auth-field">
              <input
                className="auth-input"
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </div>

            <div className="auth-field">
              <input
                className="auth-input"
                type="password"
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </div>

            <button type="submit" className="auth-btn">
              {tab === "login" ? "Entrar" : "Crear cuenta"}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="auth-divider">
            <div className="auth-divider__line" />
            <span className="auth-divider__text">o continuá con</span>
            <div className="auth-divider__line" />
          </div>

          {/* SOCIAL — desactivados hasta tener backend */}
          <div className="auth-social">
            <button className="auth-social__btn" disabled title="Próximamente">
              <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
                <path d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z" fill="#fff" opacity="0.3"/>
              </svg>
              Google
            </button>
            <button className="auth-social__btn" disabled title="Próximamente">
              <svg width="18" height="18" viewBox="0 0 127.14 96.36" fill="none">
                <path d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0a105.89 105.89 0 0 0-26.25 8.09C2.79 32.65-1.71 56.6.54 80.21a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.14c2.64-27.38-4.51-51.11-18.9-72.15z" fill="#fff" opacity="0.3"/>
              </svg>
              Discord
            </button>
          </div>

          <p className="auth-footer">
            {tab === "login" ? (
              <>¿No tenés cuenta? <span onClick={() => setTab("register")}>Registrate gratis</span></>
            ) : (
              <>¿Ya tenés cuenta? <span onClick={() => setTab("login")}>Entrá acá</span></>
            )}
          </p>
        </div>

      </div>
    </div>
  );
}
