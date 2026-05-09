import { useEffect } from 'react'

export function useKeyboardShortcuts({ activeId, closeFile, setPaletteOpen }) {
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
  }, [activeId, closeFile, setPaletteOpen])
}
