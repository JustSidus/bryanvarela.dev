import { Fragment } from 'react'
import { FileIcon } from '../../icons'
import { FILE_META } from '../../data/files'

export function Breadcrumbs({ activeId }) {
  if (!activeId) return <div className="breadcrumbs"></div>
  const f = FILE_META[activeId]
  const parts = f.path.split('/')
  return (
    <div className="breadcrumbs">
      {parts.map((p, i) => (
        <Fragment key={i}>
          <span className="crumb">{p}</span>
          <span className="sep">›</span>
        </Fragment>
      ))}
      <span className="crumb file-crumb">
        <FileIcon ext={f.ext} />
        {f.name}
      </span>
    </div>
  )
}