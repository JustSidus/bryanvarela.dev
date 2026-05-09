import { Icon, FileIcon, FolderIcon } from '../../icons'
import { FILE_META } from '../../data/files'

export function TreeRow({ node, depth, openFolders, toggleFolder, openFile, activeId }) {
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
  const file = FILE_META[node.id]
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
