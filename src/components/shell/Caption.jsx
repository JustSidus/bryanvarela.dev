import { useState } from 'react'
import { Icon, BvLogo } from '../../icons'
import { FILE_META } from '../../data/files'
import { CogModal } from './CogModal'

export function Caption({ activeId, onOpenPalette }) {
  const [cogOpen, setCogOpen] = useState(false)
  const f = activeId ? FILE_META[activeId] : null
  return (
    <div className="caption">
      <div className="caption-left">
        <span className="product-mark" title="[bv] · bryanvarela.dev">
          <BvLogo size={18} />
        </span>
        <span className="repo">bryan</span>
        <span className="crumb-sep">/</span>
        <span className="repo">portfolio</span>
        <span className="branch-pill">
          <Icon.branch />
          main
        </span>
        <span style={{ color: 'var(--fg-3)', fontFamily: 'var(--font-mono)', fontSize: 11, marginLeft: 6 }}>
          {f ? `· ${f.name}` : ''}
        </span>
      </div>

      <div className="caption-search" onClick={onOpenPalette} title="Buscar archivos · Ctrl+P">
        <Icon.search />
        <span className="placeholder">Buscar en el portafolio…</span>
        <kbd>Ctrl</kbd> + <kbd>P</kbd>
      </div>

      <div className="caption-right">
        <button
          className="meta-bit meta-bit--link"
          onClick={() => setCogOpen(true)}
          title="Código fuente de este portfolio"
        >
          <Icon.github /><span className="num">view source</span>
        </button>
        {cogOpen && <CogModal onClose={() => setCogOpen(false)} />}
      </div>

      <div className="caption-buttons">
        <div className="cap-btn" title="Minimizar"><Icon.capMin /></div>
        <div className="cap-btn" title="Maximizar"><Icon.capMax /></div>
        <div className="cap-btn close" title="Cerrar"><Icon.capClose /></div>
      </div>
    </div>
  )
}
