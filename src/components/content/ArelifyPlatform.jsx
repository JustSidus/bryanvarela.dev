import { AsciiDiagram } from '../ui/AsciiDiagram'
import { EditorFile } from '../ui/EditorFile'
import rawContent from '../../content/arelify-platform.cs?raw'

const DIAGRAM_RE = /^\s*\/\/\s*\[UI_DIAGRAM\]\s*$/

function extractSnapshots(code) {
  const snapshots = {}
  code.split('\n').forEach((line, idx) => {
    if (DIAGRAM_RE.test(line)) {
      snapshots[idx] = { component: AsciiDiagram }
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