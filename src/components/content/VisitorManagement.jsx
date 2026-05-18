import { EditorFile } from '../ui/EditorFile'
import rawContent from '../../content/visitor-management.php?raw'

export function VisitorManagement() {
  return <EditorFile code={rawContent} lang="php" />
}
