import { Icon, FileIcon } from '../../icons'
import { FILE_META } from '../../data/files'
import { TREE } from '../../data/tree'
import { TreeRow } from './TreeRow'

export function Sidebar({ openFolders, toggleFolder, openFile, activeId, openFiles }) {
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
          const f = FILE_META[id]
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
