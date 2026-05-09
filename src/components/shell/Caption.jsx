import React from 'react'
import { Icon } from '../../icons'
import { FILE_META } from '../../data/files'

export function Caption({ activeId, onOpenPalette }) {
  const f = activeId ? FILE_META[activeId] : null
  return (
    <div className="caption">
      <div className="caption-left">
        <span className="product-mark">B</span>
        <span className="repo">bryan</span>
        <span className="crumb-sep">/</span>
        <span className="repo">portfolio</span>
        <span className="branch-pill">
          <Icon.branch />
          main
        </span>
        <span style={{ color: 'var(--fg-3)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
          {f ? `· ${f.name}` : ''}
        </span>
      </div>

      <div className="caption-search" onClick={onOpenPalette} title="Buscar archivos · Ctrl+K">
        <Icon.search />
        <span className="placeholder">Buscar en el portafolio…</span>
        <kbd>Ctrl</kbd> + <kbd>K</kbd>
      </div>

      <div className="caption-right">
        <span className="meta-bit" title="Stars">
          <Icon.star /><span className="num">12</span>
        </span>
        <span className="meta-bit" title="Forks">
          <Icon.fork /><span className="num">3</span>
        </span>
      </div>

      <div className="caption-buttons">
        <div className="cap-btn" title="Minimizar"><Icon.capMin /></div>
        <div className="cap-btn" title="Maximizar"><Icon.capMax /></div>
        <div className="cap-btn close" title="Cerrar"><Icon.capClose /></div>
      </div>
    </div>
  )
}
