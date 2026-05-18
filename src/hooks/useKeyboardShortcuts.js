import { useEffect } from 'react'

export function useKeyboardShortcuts({ activeId, closeFile, setPaletteOpen, terminalRef }) {
  useEffect(() => {
    const onKey = (e) => {
      const ctrl = e.metaKey || e.ctrlKey

      // Ctrl+P → command palette
      if (ctrl && (e.key === 'p' || e.key === 'P')) {
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

      // Ctrl+G → open GitHub profile
      if (ctrl && (e.key === 'g' || e.key === 'G')) {
        e.preventDefault()
        window.open('https://github.com/JustSidus', '_blank', 'noreferrer')
        return
      }

      // Ctrl+D → download CV
      if (ctrl && (e.key === 'd' || e.key === 'D')) {
        e.preventDefault()
        const a = document.createElement('a')
        a.href = '/cv-bryan-varela.pdf'
        a.download = 'cv-bryan-varela.pdf'
        a.click()
        return
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeId, closeFile, setPaletteOpen, terminalRef])
}
