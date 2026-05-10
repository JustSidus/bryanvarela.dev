import { BvLogo } from '../../icons'

const SHORTCUTS = [
  {
    keys: ['Ctrl', 'P'],
    label: 'Buscar archivo',
    action: 'palette',
  },
  {
    keys: ['Ctrl', 'Shift', 'E'],
    label: 'Explorador',
    action: null,
  },
  {
    keys: ['Ctrl', '`'],
    label: 'Terminal',
    action: null,
  },
  {
    keys: ['Ctrl', 'W'],
    label: 'Cerrar pestaña',
    action: null,
  },
]

export function Welcome({ onOpenPalette }) {
  return (
    <div className="welcome">
      {/* Giant watermark logo */}
      <div className="welcome-watermark" aria-hidden="true">
        <BvLogo size={220} className="watermark-logo" />
      </div>

      <div className="welcome-content">
        <div className="welcome-title">
          <span className="welcome-name">bryan varela</span>
          <span className="welcome-sep"> · </span>
          <span className="welcome-role">software engineer</span>
        </div>

        <div className="welcome-shortcuts">
          {SHORTCUTS.map(({ keys, label, action }) => (
            <div
              key={label}
              className={`welcome-shortcut ${action ? 'clickable' : ''}`}
              onClick={action === 'palette' ? onOpenPalette : undefined}
            >
              <span className="shortcut-keys">
                {keys.map((k, i) => (
                  <span key={k}>
                    {i > 0 && <span className="key-sep">+</span>}
                    <kbd className="key">{k}</kbd>
                  </span>
                ))}
              </span>
              <span className="shortcut-label">{label}</span>
            </div>
          ))}
        </div>

        <p className="welcome-hint">
          Selecciona un archivo en el explorador o usa <kbd className="key key-sm">Ctrl</kbd>+<kbd className="key key-sm">P</kbd>
        </p>
      </div>
    </div>
  )
}
