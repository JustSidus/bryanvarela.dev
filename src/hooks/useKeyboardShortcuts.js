import { useEffect } from 'react'

export function useKeyboardShortcuts({ activeId, closeFile, setPaletteOpen, terminalRef }) {
  useEffect(() => {
    const onKey = (e) => {
      const ctrl = e.metaKey || e.ctrlKey

      // Ctrl+P or Ctrl+K → command palette
      if (ctrl && (e.key === 'k' || e.key === 'K' || e.key === 'p' || e.key === 'P')) {
        e.preventDefault()
        setPaletteOpen(true)
        return
      }

      // Escape → close palette
      if (e.key === 'Escape') {
        setPaletteOpen(false)
        return
      }

      // Ctrl+W → close active tab
      if (ctrl && e.key === 'w') {
        e.preventDefault()
        if (activeId) closeFile(activeId)
        return
      }

      // Ctrl+` → toggle terminal
      if (ctrl && e.key === '`') {
        e.preventDefault()
        terminalRef?.current?.toggle()
        return
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeId, closeFile, setPaletteOpen, terminalRef])
}
