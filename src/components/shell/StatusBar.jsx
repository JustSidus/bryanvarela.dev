import { Icon } from '../../icons'
import { FILE_META, LANG_LABELS } from '../../data/files'
import { contact } from '../../data/contact'

export function StatusBar({ activeId, onOpenPalette }) {
  const f = activeId ? FILE_META[activeId] : null
  const langLabel = LANG_LABELS[f?.ext] || '—'

  return (
    <div className="status">
      <div className="left">
        <span className="status-item brand" title="Branch">
          <Icon.branch style={{ width: 12, height: 12 }} />
          main
        </span>
        <span className="status-item" title="Sync">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
            <span style={{ fontSize: 10 }}>↑</span>0
            <span style={{ fontSize: 10, marginLeft: 4 }}>↓</span>0
          </span>
        </span>
        <span className="status-item" style={{ color: 'var(--ok)' }}>
          <Icon.cloud style={{ width: 13, height: 13 }} />
          deployed
        </span>
        <span className="status-item">
          <Icon.warn style={{ width: 12, height: 12, color: 'var(--warn)' }} />
          0
          <Icon.err style={{ width: 12, height: 12, color: 'var(--err)', marginLeft: 6 }} />
          0
        </span>
      </div>
      <div className="right">
        <span className="status-item">{langLabel}</span>
        <span className="status-item">UTF-8</span>
        <span className="status-item">LF</span>
        <span className="status-item">Ln 1, Col 1</span>
        <span className="status-item link" onClick={onOpenPalette} title="Command palette">
          Ctrl+K
        </span>
        <a className="status-item social" href={contact.github} target="_blank" rel="noreferrer" title="GitHub">
          <Icon.github style={{ width: 14, height: 14 }} />
        </a>
        <a className="status-item social" href={contact.linkedin} target="_blank" rel="noreferrer" title="LinkedIn">
          <Icon.linkedin style={{ width: 14, height: 14 }} />
        </a>
        <a className="status-item social" href={`mailto:${contact.email}`} title="Email">
          <Icon.mail style={{ width: 14, height: 14 }} />
        </a>
      </div>
    </div>
  )
}
