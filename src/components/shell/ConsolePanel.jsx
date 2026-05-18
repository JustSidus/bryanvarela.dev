const SHORTCUTS = [
  { keys: ["Ctrl", "P"], desc: "Buscar archivo" },
  { keys: ["Ctrl", "H"], desc: "Abrir Welcome" },
  { keys: ["Ctrl", "G"], desc: "Ir a GitHub" },
  { keys: ["Ctrl", "D"], desc: "Descargar CV" },
];

export function ConsolePanel() {
  return (
    <section className="panel-console">
      <div className="console-header">
        <span className="console-dot" />
        <span className="console-dot" />
        <span className="console-dot" />
        <span className="console-title">
          <span className="console-accent">bv</span>_backend.sys
        </span>
      </div>
      <div className="console-block">
        <div className="console-cmd">
          <span className="arrow">{">"}</span>user.identify()
        </div>
        <div className="console-out">
          <div className="identity-row">
            <span className="lbl">Nombre</span>
            <span className="sep">:</span>
            <span className="val">Bryan Varela</span>
          </div>
          <div className="identity-row">
            <span className="lbl">Rol</span>
            <span className="sep">:</span>
            <span className="val">Backend &amp; Cloud Software Engineer</span>
          </div>
        </div>
      </div>

      <div className="console-block">
        <div className="console-cmd">
          <span className="arrow">{">"}</span>system.shortcuts()
        </div>
        <div className="console-out">
          {SHORTCUTS.map(({ keys, desc }) => (
            <div key={desc} className="shortcut-row">
              <span className="keys">
                {keys.map((k, i) => (
                  <span key={k}>
                    {i > 0 && <span className="plus">+ </span>}
                    <kbd>{k}</kbd>
                  </span>
                ))}
              </span>
              <span className="desc">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="console-prompt">
        <span className="arrow">{">"}</span>
        <span className="cursor" />
      </div>
    </section>
  );
}
