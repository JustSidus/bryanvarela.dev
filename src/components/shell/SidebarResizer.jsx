import { useRef } from 'react'

export function SidebarResizer({ onResize }) {
  const dragging = useRef(false)
  const startX = useRef(0)
  const startW = useRef(0)

  function onMouseDown(e) {
    dragging.current = true
    startX.current = e.clientX
    startW.current = parseInt(
      getComputedStyle(document.getElementById('app'))
        .getPropertyValue('--sidebar-w') || '260'
    )
    e.currentTarget.classList.add('dragging')

    function onMouseMove(e) {
      if (!dragging.current) return
      const delta = e.clientX - startX.current
      const newW = Math.max(160, Math.min(480, startW.current + delta))
      onResize(newW)
    }
    function onMouseUp() {
      dragging.current = false
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  return <div className="sidebar-resizer" onMouseDown={onMouseDown} />
}