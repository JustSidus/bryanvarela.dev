import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Icon, FileIcon, FolderIcon } from './Icons'
import {
  AboutMe, ArelifyPlatform, VisitorManagement,
  LayeredEcommerce, TechStack, ContactSh,
} from './Content'

const FILES = {
  'about-me.md':            { id: 'about-me.md',            name: 'about-me.md',          ext: 'md',   path: '~/portfolio',              langAccent: null,              Comp: AboutMe },
  'arelify-platform.ts':    { id: 'arelify-platform.ts',    name: 'arelify-platform.ts',  ext: 'ts',   path: '~/portfolio/projects',     langAccent: 'var(--lang-ts)',  Comp: ArelifyPlatform },
  'visitor-management.vue': { id: 'visitor-management.vue', name: 'visitor-management.vue', ext: 'vue', path: '~/portfolio/projects',    langAccent: 'var(--lang-vue)', Comp: VisitorManagement },
  'layered-ecommerce.cs':   { id: 'layered-ecommerce.cs',   name: 'layered-ecommerce.cs', ext: 'cs',   path: '~/portfolio/projects',     langAccent: 'var(--lang-cs)',  Comp: LayeredEcommerce },
  'tech-stack.json':        { id: 'tech-stack.json',        name: 'tech-stack.json',      ext: 'json', path: '~/portfolio/infrastructure', langAccent: 'var(--lang-json)', Comp: TechStack },
  'contact.sh':             { id: 'contact.sh',             name: 'contact.sh',           ext: 'sh',   path: '~/portfolio/infrastructure', langAccent: 'var(--lang-sh)',  Comp: ContactSh },
}

const TREE = [
  { kind: 'file', id: 'about-me.md' },
  {
    kind: 'folder', id: 'projects', label: 'projects',
    children: [
      { kind: 'file', id: 'arelify-platform.ts' },
      { kind: 'file', id: 'visitor-management.vue' },
      { kind: 'file', id: 'layered-ecommerce.cs' },
    ],
  },
  {
    kind: 'folder', id: 'infrastructure', label: 'infrastructure',
    children: [
      { kind: 'file', id: 'tech-stack.json' },
      { kind: 'file', id: 'contact.sh' },
    ],
  },
]

const THEME = {
  accent: '#58A6FF',
  density: 'compact',
  fontProse: 'Inter',
  showActivityRail: true,
  perFileAccent: true,
}

const hexToSoft = (hex, alpha) => {
  const a = Math.round(alpha * 255).toString(16).padStart(2, '0')
  return hex + a
}

function Caption({ activeId, onOpenPalette }) {
  const f = activeId ? FILES[activeId] : null
  return (
    <div className="caption">
      <div className="caption-left">
        <span className="product-mark">B</span>
        <span className="repo">bryan</span>
        <span className="crumb-sep">/</span>
        <span className="repo">portfolio</span>
        <span className="branch-pill">
          <Icon.branch />
          main
        </span>
        <span style={{ color: 'var(--fg-3)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
          {f ? `· ${f.name}` : ''}
        </span>
      </div>

      <div className="caption-search" onClick={onOpenPalette} title="Buscar archivos · Ctrl+K">
        <Icon.search />
        <span className="placeholder">Buscar en el portafolio…</span>
        <kbd>Ctrl</kbd><kbd>K</kbd>
      </div>

      <div className="caption-right">
        <span className="meta-bit" title="Stars">
          <Icon.star /><span className="num">12</span>
        </span>
        <span className="meta-bit" title="Forks">
          <Icon.fork /><span className="num">3</span>
        </span>
      </div>

      <div className="caption-buttons">
        <div className="cap-btn" title="Minimizar"><Icon.capMin /></div>
        <div className="cap-btn" title="Maximizar"><Icon.capMax /></div>
        <div className="cap-btn close" title="Cerrar"><Icon.capClose /></div>
      </div>
    </div>
  )
}

function TreeRow({ node, depth, openFolders, toggleFolder, openFile, activeId }) {
  if (node.kind === 'folder') {
    const open = openFolders.has(node.id)
    return (
      <>
        <div
          className={`tree-row ${open ? 'open' : ''} ${depth ? `indent-${depth}` : ''}`}
          onClick={() => toggleFolder(node.id)}
        >
          <span className="chev"><Icon.chev style={{ width: 12, height: 12 }} /></span>
          <span className="icon"><FolderIcon open={open} /></span>
          <span className="file-name">{node.label}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--fg-3)' }}>
            {node.children.length}
          </span>
        </div>
        {open && (
          <div className="tree-children" style={{ display: 'block' }}>
            {node.children.map((c) => (
              <TreeRow
                key={c.id}
                node={c}
                depth={depth + 1}
                openFolders={openFolders}
                toggleFolder={toggleFolder}
                openFile={openFile}
                activeId={activeId}
              />
            ))}
          </div>
        )}
      </>
    )
  }
  const file = FILES[node.id]
  const active = activeId === node.id
  return (
    <div
      className={`tree-row ${active ? 'selected active' : ''} ${depth ? `indent-${depth}` : ''}`}
      onClick={() => openFile(node.id)}
    >
      <span className="chev"></span>
      <span className="icon"><FileIcon ext={file.ext} /></span>
      <span className="file-name">{file.name}</span>
    </div>
  )
}

function Sidebar({ openFolders, toggleFolder, openFile, activeId, openFiles }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-head">
        <span>Explorer</span>
        <div className="actions">
          <span title="New file"><Icon.newFile /></span>
          <span title="Collapse all"><Icon.collapse /></span>
        </div>
      </div>
      <div className="sidebar-section-label">portfolio</div>
      <div className="tree">
        {TREE.map((n) => (
          <TreeRow
            key={n.id}
            node={n}
            depth={0}
            openFolders={openFolders}
            toggleFolder={toggleFolder}
            openFile={openFile}
            activeId={activeId}
          />
        ))}
      </div>
      <div className="sidebar-section-label">open editors · {openFiles.length}</div>
      <div style={{ padding: '0 0 14px' }}>
        {openFiles.map((id) => {
          const f = FILES[id]
          return (
            <div
              key={id}
              className={`tree-row ${activeId === id ? 'selected active' : ''} indent-1`}
              onClick={() => openFile(id)}
              style={{ height: 'var(--row-h)' }}
            >
              <span className="icon"><FileIcon ext={f.ext} /></span>
              <span className="file-name">{f.name}</span>
            </div>
          )
        })}
        {openFiles.length === 0 && (
          <div style={{
            padding: '8px 14px',
            color: 'var(--fg-3)',
            fontFamily: 'var(--font-mono)',
            fontSize: 11.5,
          }}>
            // ningún archivo abierto
          </div>
        )}
      </div>
    </aside>
  )
}

function Tabs({ openFiles, activeId, setActive, closeFile }) {
  return (
    <div className="tabs">
      {openFiles.map((id) => {
        const f = FILES[id]
        return (
          <div
            key={id}
            className={`tab ${activeId === id ? 'active' : ''}`}
            onClick={() => setActive(id)}
          >
            <FileIcon ext={f.ext} />
            <span>{f.name}</span>
            <span
              className="close"
              onClick={(e) => { e.stopPropagation(); closeFile(id) }}
              title="Close"
            >
              <Icon.close style={{ width: 10, height: 10 }} />
            </span>
          </div>
        )
      })}
    </div>
  )
}

function Breadcrumbs({ activeId }) {
  if (!activeId) return <div className="breadcrumbs"></div>
  const f = FILES[activeId]
  const parts = f.path.split('/')
  return (
    <div className="breadcrumbs">
      {parts.map((p, i) => (
        <React.Fragment key={i}>
          <span className="crumb">{p}</span>
          <span className="sep">›</span>
        </React.Fragment>
      ))}
      <span className="crumb">{f.name}</span>
    </div>
  )
}

function StatusBar({ activeId, onOpenPalette }) {
  const f = activeId ? FILES[activeId] : null
  const langLabel = {
    md: 'Markdown',
    ts: 'TypeScript',
    vue: 'Vue · TS',
    cs: 'C#',
    json: 'JSON',
    sh: 'Shell',
  }[f?.ext] || '—'

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
        <a className="status-item link" href="https://github.com/JustSidus" target="_blank" rel="noreferrer" title="GitHub">
          <Icon.github style={{ width: 12, height: 12 }} />
        </a>
        <a className="status-item link" href="https://linkedin.com/in/bryanvarela" target="_blank" rel="noreferrer" title="LinkedIn">
          <Icon.linkedin style={{ width: 12, height: 12 }} />
        </a>
        <a className="status-item link" href="mailto:bryanvarela2411@gmail.com" title="Email">
          <Icon.mail style={{ width: 12, height: 12 }} />
        </a>
      </div>
    </div>
  )
}

function ActivityRail({ onOpenPalette }) {
  return (
    <nav className="rail">
      <div className="rail-btn" aria-current="true" title="Explorer"><Icon.files /></div>
      <div className="rail-btn" title="Search · ⌘K" onClick={onOpenPalette}><Icon.search /></div>
      <div className="rail-btn" title="Branch"><Icon.branch /></div>
      <div className="rail-btn" title="Profile"><Icon.user /></div>
      <div className="rail-btn" title="Decisions"><Icon.bolt /></div>
      <div className="rail-spacer"></div>
      <div className="rail-btn" title="Notifications"><Icon.bell /></div>
      <div className="rail-btn" title="Settings"><Icon.cog /></div>
    </nav>
  )
}

function CommandPalette({ onClose, onOpenFile }) {
  const [q, setQ] = useState('')
  const [idx, setIdx] = useState(0)
  const inputRef = useRef(null)
  useEffect(() => { inputRef.current?.focus() }, [])

  const items = useMemo(() => {
    const all = Object.values(FILES).map((f) => ({
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

function Welcome({ onOpenPalette }) {
  return (
    <div className="welcome">
      <div className="inner">
        <div style={{ fontSize: 18, color: 'var(--fg-1)', fontFamily: 'var(--font-prose)', marginBottom: 6 }}>
          Bryan · Software Engineer
        </div>
        <div style={{ color: 'var(--fg-3)', marginBottom: 18 }}>
          Selecciona un archivo en el explorador o presiona <kbd>Ctrl</kbd> + <kbd>K</kbd>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [openFiles, setOpenFiles] = useState(['about-me.md'])
  const [activeId, setActiveId] = useState('about-me.md')
  const [openFolders, setOpenFolders] = useState(new Set(['projects', 'infrastructure']))
  const [paletteOpen, setPaletteOpen] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    const file = activeId ? FILES[activeId] : null
    const useFileAccent = THEME.perFileAccent && file?.langAccent
    const accent = useFileAccent ? file.langAccent : THEME.accent
    let resolved = accent
    if (typeof accent === 'string' && accent.startsWith('var(')) {
      const m = accent.match(/var\((--[^)]+)\)/)
      if (m) {
        const v = getComputedStyle(root).getPropertyValue(m[1]).trim()
        if (v) resolved = v
      }
    }
    root.style.setProperty('--accent', resolved)
    root.style.setProperty('--accent-soft', hexToSoft(resolved, 0.16))
    root.style.setProperty('--accent-line', hexToSoft(resolved, 0.42))
    root.dataset.density = THEME.density
    root.dataset.rail = THEME.showActivityRail ? 'shown' : 'hidden'
    root.style.setProperty('--font-prose',
      `"${THEME.fontProse}", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`)
  }, [activeId])

  const openFile = useCallback((id) => {
    setOpenFiles((prev) => prev.includes(id) ? prev : [...prev, id])
    setActiveId(id)
  }, [])

  const closeFile = useCallback((id) => {
    setOpenFiles((prev) => {
      const idx = prev.indexOf(id)
      const next = prev.filter((x) => x !== id)
      if (id === activeId) {
        const fallback = next[idx] || next[idx - 1] || next[0] || null
        setActiveId(fallback)
      }
      return next
    })
  }, [activeId])

  const toggleFolder = useCallback((id) => {
    setOpenFolders((prev) => {
      const n = new Set(prev)
      if (n.has(id)) n.delete(id); else n.add(id)
      return n
    })
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K' || e.key === 'p' || e.key === 'P')) {
        e.preventDefault()
        setPaletteOpen(true)
      }
      if (e.key === 'Escape') setPaletteOpen(false)
      if ((e.metaKey || e.ctrlKey) && e.key === 'w') {
        e.preventDefault()
        if (activeId) closeFile(activeId)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeId, closeFile])

  const ActiveComp = activeId ? FILES[activeId].Comp : null

  return (
    <>
      <Caption activeId={activeId} onOpenPalette={() => setPaletteOpen(true)} />
      <ActivityRail onOpenPalette={() => setPaletteOpen(true)} />
      <Sidebar
        openFolders={openFolders}
        toggleFolder={toggleFolder}
        openFile={openFile}
        activeId={activeId}
        openFiles={openFiles}
      />
      <main className="editor">
        <Tabs
          openFiles={openFiles}
          activeId={activeId}
          setActive={setActiveId}
          closeFile={closeFile}
        />
        <Breadcrumbs activeId={activeId} />
        <div className="content" key={activeId}>
          {ActiveComp ? (
            <div className="content-inner">
              <ActiveComp />
            </div>
          ) : (
            <Welcome onOpenPalette={() => setPaletteOpen(true)} />
          )}
        </div>
      </main>
      <StatusBar activeId={activeId} onOpenPalette={() => setPaletteOpen(true)} />

      {paletteOpen && (
        <CommandPalette
          onClose={() => setPaletteOpen(false)}
          onOpenFile={openFile}
        />
      )}
    </>
  )
}
