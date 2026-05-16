export function Welcome({ openFile }) {
  return (
    <div className="welcome-doc">
      <header className="welcome-doc__header">
        <h1 className="welcome-doc__title">Bienvenido a bryanvarela.dev</h1>
        <p className="welcome-doc__subtitle">
          Portfolio personal en formato IDE. Cada archivo es una sección.
        </p>
      </header>

      <section className="welcome-doc__section">
        <h2>¿Qué es esto?</h2>
        <p>
          Este es mi portfolio personal, diseñado como un IDE. Cada archivo del
          explorador de la izquierda es una sección. Navegá por el árbol, o usá
          <kbd className="welcome-doc__kbd">Ctrl</kbd>+<kbd className="welcome-doc__kbd">P</kbd>
          {' '}para buscar.
        </p>
      </section>

      <section className="welcome-doc__section">
        <h2>Cómo navegar</h2>
        <div className="welcome-doc__shortcuts">
          <div className="welcome-doc__shortcut">
            <span className="welcome-doc__keys">
              <kbd className="welcome-doc__kbd">Ctrl</kbd>+<kbd className="welcome-doc__kbd">P</kbd>
            </span>
            <span className="welcome-doc__shortcut-label">Buscar archivo</span>
          </div>
          <div className="welcome-doc__shortcut">
            <span className="welcome-doc__keys">
              <kbd className="welcome-doc__kbd">Ctrl</kbd>+<kbd className="welcome-doc__kbd">W</kbd>
            </span>
            <span className="welcome-doc__shortcut-label">Cerrar pestaña</span>
          </div>
          <div className="welcome-doc__shortcut">
            <span className="welcome-doc__keys">
              <kbd className="welcome-doc__kbd">Ctrl</kbd>+<kbd className="welcome-doc__kbd">`</kbd>
            </span>
            <span className="welcome-doc__shortcut-label">Toggle terminal</span>
          </div>
          <div className="welcome-doc__shortcut">
            <span className="welcome-doc__keys">
              <span className="welcome-doc__mouse">middle-click</span>
            </span>
            <span className="welcome-doc__shortcut-label">Cerrar pestaña</span>
          </div>
        </div>
      </section>

      <section className="welcome-doc__section">
        <h2>Por dónde empezar</h2>
        <div className="welcome-doc__cards">
          <button
            type="button"
            className="welcome-doc__card"
            onClick={() => openFile?.('about-me.md')}
          >
            <span className="welcome-doc__card-file">about-me.md</span>
            <span className="welcome-doc__card-desc">Quién soy y qué hago</span>
          </button>
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
