export function Welcome({ openFile }) {
  return (
    <div className="welcome-doc">
      <header className="welcome-doc__header">
        <h1 className="welcome-doc__title">Hola, soy Bryan</h1>
        <p className="welcome-doc__subtitle">
          Portfolio en formato IDE. Cada archivo es una sección.
        </p>
      </header>

      <section className="welcome-doc__section">
        <h2>Por dónde empezar</h2>
        <div className="welcome-doc__cards">
          <button
            type="button"
            className="welcome-doc__card"
            onClick={() => openFile?.('arelify-platform.cs')}
          >
            <span className="welcome-doc__card-file">arelify-platform.cs</span>
            <span className="welcome-doc__card-desc">Proyecto destacado</span>
          </button>
          <button
            type="button"
            className="welcome-doc__card"
            onClick={() => openFile?.('about-me.md')}
          >
            <span className="welcome-doc__card-file">about-me.md</span>
            <span className="welcome-doc__card-desc">Mi perfil completo</span>
          </button>
          <button
            type="button"
            className="welcome-doc__card"
            onClick={() => openFile?.('contact.sh')}
          >
            <span className="welcome-doc__card-file">contact.sh</span>
            <span className="welcome-doc__card-desc">Cómo contactarme</span>
          </button>
        </div>
      </section>

      <footer className="welcome-doc__footer">
        Cerrá esta pestaña cuando quieras — no volverá a aparecer.
      </footer>
    </div>
  )
}
