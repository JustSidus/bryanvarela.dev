import { useState } from 'react'
import { FILE_META } from '../../../data/files'
import { Icon, FileIcon } from '../../../icons'

export function SearchPanel({ openFile, activeId }) {
  const [query, setQuery] = useState('')

  const files = Object.entries(FILE_META).filter(([id, f]) => {
    if (!query) return true
    const q = query.toLowerCase()
    return f.name.toLowerCase().includes(q) || f.path.toLowerCase().includes(q)
  })

  return (
    <>
      <div className="sidebar-head">
        <span>Search</span>
      </div>
      <div style={{ padding: '8px 14px' }}>
        <div className="search-input-wrap">
          <Icon.search style={{ width: 14, height: 14, color: 'var(--fg-3)', flexShrink: 0 }} />
          <input
            className="search-input"
            type="text"
            placeholder="Buscar archivos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
      </div>
      <div className="tree">
        {files.map(([id, f]) => (
          <div
            key={id}
            className={`tree-row ${activeId === id ? 'selected active' : ''}`}
            onClick={() => openFile(id)}
            style={{ height: 'var(--row-h)' }}
          >
            <span className="icon"><FileIcon ext={f.ext} /></span>
            <span className="file-name">{f.name}</span>
          </div>
        ))}
        {files.length === 0 && (
          <div style={{ padding: '8px 14px', color: 'var(--fg-3)', fontSize: 12 }}>
            // sin resultados
          </div>
        )}
      </div>
      <style>{`
        .search-input-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-0);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 6px 10px;
        }
        .search-input {
          background: transparent;
          border: none;
          outline: none;
          color: var(--fg-0);
          font-family: var(--font-mono);
          font-size: 12.5px;
          width: 100%;
        }
        .search-input::placeholder { color: var(--fg-3); }
      `}</style>
    </>
  )
}