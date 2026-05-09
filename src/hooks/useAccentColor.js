import { useEffect } from 'react'
import { FILE_META } from '../data/files'
import { THEME, hexToSoft } from '../data/theme'

export function useAccentColor(activeId) {
  useEffect(() => {
    const root = document.documentElement
    const file = activeId ? FILE_META[activeId] : null
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
}
