import { useEffect } from 'react'
import { Icon } from '../../icons'
import { useTheme } from '../../hooks/useTheme'

export function ThemeModal({ onClose }) {
  const { theme, setTheme, themes } = useTheme()

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div className="cmdk-overlay" onClick={onClose}>
      <div className="cmdk theme-modal" onClick={e => e.stopPropagation()}>
        <div className="theme-modal-header">
          <Icon.cog style={{ width: 16, height: 16 }} />
          <span>Color Theme · Syntax Highlight</span>
        </div>
        <div className="theme-modal-body">
          {themes.map(t => {
            const active = t.id === theme
            return (
              <button
                key={t.id}
                type="button"
                className={`theme-option${active ? ' theme-option--active' : ''}`}
                onClick={() => setTheme(t.id)}
              >
                <div className="theme-option-main">
                  <div className="theme-option-label">
                    <span className="theme-option-name">{t.label}</span>
                    {active && <span className="theme-option-check">✓</span>}
                  </div>
                  <div className="theme-option-desc">{t.description}</div>
                </div>
                <div className="theme-option-swatches">
                  {t.swatches.map((c, i) => (
                    <span
                      key={i}
                      className="theme-swatch"
                      style={{ background: c }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </button>
            )
          })}
        </div>
        <div className="theme-modal-footer">
          <span className="theme-modal-hint">Se guarda en este navegador</span>
          <button className="theme-btn" onClick={onClose}>Cerrar</button>
        </div>
      </div>
      <style>{`
        .theme-modal { width: min(480px, 92vw); }
        .theme-modal-header {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 16px;
          border-bottom: 1px solid var(--border);
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--fg-0);
        }
        .theme-modal-body {
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .theme-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 12px 14px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-2);
          color: var(--fg-1);
          font-family: inherit;
          text-align: left;
          cursor: pointer;
          transition: background .12s, border-color .12s;
        }
        .theme-option:hover {
          background: var(--bg-3);
          border-color: var(--border-strong, var(--border));
        }
        .theme-option--active {
          border-color: var(--accent);
          background: var(--bg-3);
        }
        .theme-option-main {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .theme-option-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--fg-0);
        }
        .theme-option-check {
          color: var(--accent);
          font-size: 12px;
        }
        .theme-option-desc {
          font-size: 11.5px;
          color: var(--fg-3);
        }
        .theme-option-swatches {
          display: flex;
          gap: 4px;
          flex-shrink: 0;
        }
        .theme-swatch {
          width: 14px;
          height: 14px;
          border-radius: 3px;
          display: inline-block;
        }
        .theme-modal-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 16px;
          border-top: 1px solid var(--border);
        }
        .theme-modal-hint {
          font-size: 11.5px;
          color: var(--fg-3);
          font-family: var(--font-mono);
        }
        .theme-btn {
          padding: 6px 14px;
          border: 1px solid var(--border);
          border-radius: 6px;
          background: var(--bg-2);
          color: var(--fg-1);
          font-family: var(--font-mono);
          font-size: 12px;
          cursor: pointer;
          transition: background .12s;
        }
        .theme-btn:hover { background: var(--bg-3); }
      `}</style>
    </div>
  )
}
