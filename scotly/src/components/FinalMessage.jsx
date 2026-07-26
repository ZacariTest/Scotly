export default function FinalMessage({ onAuth }) {
  return (
    <section className="final-message">
      <div className="overlay"></div>

      <div className="content">

        <h2 className="title">
          La historia de <span className="title-accent">Gran Bretaña</span> te espera.
          Comienza hoy tu aventura.
        </h2>

        <div className="cta-group">
          <button className="cta" onClick={onAuth}>
            Comenzar ahora
          </button>

          <a
            className="cta cta--secondary"
            href="/downloads/scotly.apk"
            download
          >
            <svg
              className="cta-icon"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            Descargar APK
          </a>
        </div>
      </div>
    </section>
  );
}