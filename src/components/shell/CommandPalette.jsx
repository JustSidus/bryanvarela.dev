import React, { useState, useEffect, useRef, useMemo } from 'react'
import { FileIcon } from '../../icons'
import { FILE_META } from '../../data/files'

export function CommandPalette({ onClose, onOpenFile }) {
  const [q, setQ] = useState('')
  const [idx, setIdx] = useState(0)
  const inputRef = useRef(null)
  useEffect(() => { inputRef.current?.focus() }, [])

  const items = useMemo(() => {
    const all = Object.values(FILE_META).map((f) => ({
      id: f.id, name: f.name, path: f.path + '/' + f.name, ext: f.ext,
    }))
    if (!q.trim()) return all
    const t = q.toLowerCase()
    return all.filter((f) => f.name.toLowerCase().includes(t) || f.path.toLowerCase().includes(t))
  }, [q])

  useEffect(() => { setIdx(0) }, [q])

  const onKey = (e) => {
    if (e.key === 'Escape') onClose()
    else if (e.key === 'ArrowDown') { e.preventDefault(); setIdx((i) => Math.min(i + 1, items.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter' && items[idx]) { onOpenFile(items[idx].id); onClose() }
  }

  return (
    <div className="cmdk-overlay" onClick={onClose}>
      <div className="cmdk" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          className="cmdk-input"
          placeholder="Buscar archivos · escribe el nombre…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onKey}
        />
        <div className="cmdk-list">
          {items.length === 0 && <div className="cmdk-empty">Sin resultados</div>}
          {items.map((it, i) => (
            <div
              key={it.id}
              className={`cmdk-row ${i === idx ? 'active' : ''}`}
              onMouseEnter={() => setIdx(i)}
              onClick={() => { onOpenFile(it.id); onClose() }}
            >
              <FileIcon ext={it.ext} />
              <span className="name">{it.name}</span>
              <span className="path">{it.path}</span>
            </div>
          ))}
        </div>
        <div className="cmdk-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> navegar</span>
          <span><kbd>↵</kbd> abrir</span>
          <span><kbd>esc</kbd> cerrar</span>
        </div>
      </div>
    </div>
  )
}
