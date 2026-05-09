import React from 'react'
import { FILE_META } from '../../data/files'

export function Breadcrumbs({ activeId }) {
  if (!activeId) return <div className="breadcrumbs"></div>
  const f = FILE_META[activeId]
  const parts = f.path.split('/')
  return (
    <div className="breadcrumbs">
      {parts.map((p, i) => (
        <React.Fragment key={i}>
          <span className="crumb">{p}</span>
          <span className="sep">›</span>
        </React.Fragment>
      ))}
      <span className="crumb">{f.name}</span>
    </div>
  )
}
