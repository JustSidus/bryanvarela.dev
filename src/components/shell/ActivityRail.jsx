import { useState } from 'react'
import { Icon } from '../../icons'
import { BellPanel } from './BellPanel'
import { CogModal } from './CogModal'

const PANELS = [
  { id: 'files',      icon: Icon.files,   title: 'Explorer' },
  { id: 'search',    icon: Icon.search,  title: 'Buscar archivos' },
  { id: 'branch',    icon: Icon.branch,  title: 'Carrera' },
  { id: 'profile',   icon: Icon.user,    title: 'Perfil & Contacto' },
  { id: 'extensions', icon: Icon.bolt,   title: 'Tech Stack' },
]

function BellButton() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div
        className="rail-btn"
        role="button"
        tabIndex={0}
        title="Estado laboral"
        aria-label="Estado laboral"
        onClick={() => setOpen(v => !v)}
      >
        <Icon.bell />
      </div>
      {open && <BellPanel onClose={() => setOpen(false)} />}
    </>
  )
}

function CogButton() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div
        className="rail-btn"
        role="button"
        tabIndex={0}
        title="Ver código fuente"
        aria-label="Ver código fuente"
        onClick={() => setOpen(true)}
      >
        <Icon.cog />
      </div>
      {open && <CogModal onClose={() => setOpen(false)} />}
    </>
  )
}

export function ActivityRail({ activePanelId, onSetPanel, onOpenPalette }) {
  return (
    <nav className="rail">
      {PANELS.map(p => (
        <div
          key={p.id}
          className="rail-btn"
          role="button"
          tabIndex={0}
          aria-current={activePanelId === p.id ? 'true' : 'false'}
          aria-label={p.title}
          title={p.title}
          onClick={() => onSetPanel(p.id)}
        >
          <p.icon />
        </div>
      ))}
      <div className="rail-spacer" />
      <BellButton />
      <CogButton />
    </nav>
  )
}