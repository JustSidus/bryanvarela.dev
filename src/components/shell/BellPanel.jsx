import { useEffect, useRef } from 'react'
import { contact } from '../../data/contact'

export function BellPanel({ onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose])

  return (
    <>
      <div className="bell-backdrop" onClick={onClose} />
      <div className="bell-panel" ref={ref}>
        <div className="bell-panel-header">
          <span style={{ color: 'var(--ok)' }}>●</span>
          DISPONIBLE PARA OPORTUNIDADES
        </div>
        <div className="bell-panel-body">
          <div className="bell-row">
            <span className="bell-label">Buscando:</span>
            <span>{contact.openTo.join(' · ')}</span>
          </div>
          <div className="bell-row">
            <span className="bell-label">Prefiero:</span>
            <span>Email para contexto largo</span>
          </div>
          <div style={{ paddingLeft: 80, fontSize: 11.5, color: 'var(--fg-2)' }}>
            LinkedIn para intros · GitHub para código
          </div>
          <div className="bell-row" style={{ marginTop: 8 }}>
            <span className="bell-label">Pro-tip:</span>
            <span>Mándame el JD o el problema concreto.</span>
          </div>
          <div className="bell-row" style={{ marginTop: 4 }}>
            <span className="bell-label">No gracias:</span>
            <span style={{ fontSize: 11.5 }}>{contact.noThanks}</span>
          </div>
        </div>
      </div>
      <style>{`
        .bell-backdrop {
          position: fixed;
          inset: 0;
          z-index: 49;
        }
        .bell-panel {
          position: absolute;
          bottom: 40px;
          left: 56px;
          width: 320px;
          background: var(--bg-1);
          border: 1px solid var(--border-strong);
          border-radius: 8px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.5);
          z-index: 50;
          font-family: var(--font-mono);
          overflow: hidden;
        }
        .bell-panel-header {
          padding: 10px 14px;
          font-size: 11px;
          letter-spacing: .06em;
          color: var(--ok);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .bell-panel-body {
          padding: 12px 14px;
          font-size: 12px;
          color: var(--fg-2);
          line-height: 1.6;
        }
        .bell-row {
          display: flex;
          gap: 8px;
          align-items: baseline;
        }
        .bell-label {
          color: var(--fg-3);
          flex-shrink: 0;
          width: 72px;
          font-size: 11px;
        }
      `}</style>
    </>
  )
}