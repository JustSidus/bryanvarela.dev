import React from 'react'

export function Welcome({ onOpenPalette }) {
  return (
    <div className="welcome">
      <div className="inner">
        <div style={{ fontSize: 18, color: 'var(--fg-1)', fontFamily: 'var(--font-prose)', marginBottom: 6 }}>
          Bryan · Software Engineer
        </div>
        <div style={{ color: 'var(--fg-3)', marginBottom: 18 }}>
          Selecciona un archivo en el explorador o presiona <kbd>Ctrl</kbd> + <kbd>K</kbd>
        </div>
      </div>
    </div>
  )
}
