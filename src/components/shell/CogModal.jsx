import { useEffect, useRef } from 'react'
import { Icon } from '../../icons'

const REPO_URL = 'https://github.com/JustSidus/bryanvarela.dev'

export function CogModal({ onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div className="cmdk-overlay" onClick={onClose}>
      <div className="cmdk cog-modal" ref={ref} onClick={e => e.stopPropagation()}>
        <div className="cog-modal-header">
          <Icon.cog style={{ width: 16, height: 16 }} />
          <span>Abrir repositorio externo</span>
        </div>
        <div className="cog-modal-body">
          <div className="cog-cmd">
            <span style={{ color: 'var(--accent)' }}>{'>'} git remote get-url origin</span>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--fg-1)', marginTop: 4 }}>
            {REPO_URL}
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--fg-2)', marginTop: 12, lineHeight: 1.5 }}>
            Esto abrirá el repositorio público donde está el código fuente de este portfolio.
          </div>
        </div>
        <div className="cog-modal-footer">
          <button
            className="cog-btn cog-btn--primary"
            onClick={() => window.open(REPO_URL, '_blank')}
          >
            Continuar →
          </button>
          <button className="cog-btn" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
      <style>{`
        .cog-modal {
          width: min(480px, 92vw);
        }
        .cog-modal-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          border-bottom: 1px solid var(--border);
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--fg-0);
        }
        .cog-modal-body {
          padding: 16px;
        }
        .cog-cmd {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--accent);
        }
        .cog-modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          padding: 12px 16px;
          border-top: 1px solid var(--border);
        }
        .cog-btn {
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
        .cog-btn:hover { background: var(--bg-3); }
        .cog-btn--primary {
          background: var(--accent);
          color: #0B0D12;
          border-color: var(--accent);
          font-weight: 500;
        }
        .cog-btn--primary:hover { filter: brightness(1.08); }
      `}</style>
    </div>
  )
}