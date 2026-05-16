import { AsciiDiagram } from '../ui/AsciiDiagram'
import { InfrastructureDiagram } from '../ui/InfrastructureDiagram'
import { EditorFile } from '../ui/EditorFile'
import rawContent from '../../content/arelify-platform.cs?raw'

const SNAPSHOT_RE = /^\/\/\s*\[UI_SNAPSHOT:\s*(.+?)\s*\]\s*$/

function extractSnapshots(code) {
  const snapshots = {}
  const lines = code.split('\n')
  let imageIndex = 0

  lines.forEach((line, idx) => {
    const m = line.match(SNAPSHOT_RE)
    if (!m) return
    const alt = m[1]

    if (alt.toLowerCase().includes('ascii')) {
      snapshots[idx] = { type: 'component', component: AsciiDiagram, alt }
    } else if (alt.toLowerCase().includes('infraestructura')) {
      snapshots[idx] = { type: 'component', component: InfrastructureDiagram, alt }
    } else {
      imageIndex++
      snapshots[idx] = { type: 'image', src: `/images/arelify/snapshot-${imageIndex}.webp`, alt }
    }
  })

  return snapshots
}

export function ArelifyPlatform() {
  return (
    <EditorFile
      code={rawContent}
      lang="cs"
      snapshots={extractSnapshots(rawContent)}
    />
  )
}