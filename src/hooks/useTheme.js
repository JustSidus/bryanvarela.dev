import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'bv-syntax-theme'
const DEFAULT_THEME = 'modern'

export const THEMES = [
  {
    id: 'modern',
    label: 'Modern',
    description: 'Limpio y minimal',
    swatches: ['#FF7B72', '#A5D6FF', '#D2A8FF', '#FFA657', '#7EE787'],
  },
  {
    id: 'onedark',
    label: 'One Dark Pro',
    description: 'Suave y cálido',
    swatches: ['#C678DD', '#98C379', '#61AFEF', '#56B6C2', '#E06C75'],
  },
]

function readStored() {
  if (typeof window === 'undefined') return DEFAULT_THEME
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return THEMES.some(t => t.id === v) ? v : DEFAULT_THEME
  } catch {
    return DEFAULT_THEME
  }
}

function applyTheme(themeId) {
  const root = document.documentElement
  THEMES.forEach(t => root.classList.remove(`theme-${t.id}`))
  // CSS defaults are One Dark; only add a class when overriding
  if (themeId !== 'onedark') root.classList.add(`theme-${themeId}`)
}

export function useTheme() {
  const [theme, setTheme] = useState(readStored)

  useEffect(() => {
    applyTheme(theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {}
  }, [theme])

  const change = useCallback((id) => {
    if (THEMES.some(t => t.id === id)) setTheme(id)
  }, [])

  return { theme, setTheme: change, themes: THEMES }
}
