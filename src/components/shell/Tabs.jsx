import { useState, useCallback } from 'react'
import { FileIcon, Icon } from '../../icons'
import { FILE_META } from '../../data/files'

export function Tabs({ openFiles, activeId, setActive, closeFile, moveFile }) {
  const [dragIndex, setDragIndex] = useState(null)
  const [dropIndex, setDropIndex] = useState(null)

  const onDragStart = useCallback((e, index) => {
    setDragIndex(index)
    e.dataTransfer.effectAllowed = 'move'
    // Firefox needs data to be set for drag to start.
    try { e.dataTransfer.setData('text/plain', String(index)) } catch {}
  }, [])

  const onDragOver = useCallback((e, index) => {
    if (dragIndex === null) return
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    const rect = e.currentTarget.getBoundingClientRect()
    const after = (e.clientX - rect.left) > rect.width / 2
    setDropIndex(after ? index + 1 : index)
  }, [dragIndex])

  const onDrop = useCallback((e) => {
    if (dragIndex === null || dropIndex === null) return
    e.preventDefault()
    moveFile?.(dragIndex, dropIndex)
    setDragIndex(null)
    setDropIndex(null)
  }, [dragIndex, dropIndex, moveFile])

  const onDragEnd = useCallback(() => {
    setDragIndex(null)
    setDropIndex(null)
  }, [])

  return (
    <div
      className="tabs"
      onDragOver={(e) => { if (dragIndex !== null) e.preventDefault() }}
      onDrop={onDrop}
    >
      {openFiles.map((id, index) => {
        const f = FILE_META[id]
        const isDragging = dragIndex === index
        const showInsertBefore = dropIndex === index && dragIndex !== index && dragIndex !== index - 1
        const showInsertAfter =
          dropIndex === index + 1 && dragIndex !== index && dragIndex !== index + 1 &&
          index === openFiles.length - 1
        return (
          <div
            key={id}
            className={
              `tab ${activeId === id ? 'active' : ''}` +
              (isDragging ? ' tab--dragging' : '') +
              (showInsertBefore ? ' tab--drop-before' : '') +
              (showInsertAfter ? ' tab--drop-after' : '')
            }
            draggable
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={(e) => onDragOver(e, index)}
            onDragEnd={onDragEnd}
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
