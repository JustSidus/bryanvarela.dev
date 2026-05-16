import { FileIcon, Icon } from '../../icons'
import { FILE_META } from '../../data/files'

export function Tabs({ openFiles, activeId, setActive, closeFile }) {
  return (
    <div className="tabs">
      {openFiles.map((id) => {
        const f = FILE_META[id]
        return (
          <div
            key={id}
            className={`tab ${activeId === id ? 'active' : ''}`}
            onClick={() => setActive(id)}
            onMouseDown={(e) => {
              if (e.button === 1) {
                e.preventDefault()
                closeFile(id)
              }
            }}
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
