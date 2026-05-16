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
      <div className="panel-body">
        <div className="panel-inner">
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
          <div className="search-results">
            {files.map(([id, f]) => (
              <div
                key={id}
                className={`tree-row search-row ${activeId === id ? 'selected active' : ''}`}
                onClick={() => openFile(id)}
              >
                <span className="icon"><FileIcon ext={f.ext} /></span>
                <span className="file-name">{f.name}</span>
              </div>
            ))}
            {files.length === 0 && (
              <div className="search-empty">
                // sin resultados
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
