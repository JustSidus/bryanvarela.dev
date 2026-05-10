import { EditorFile } from '../ui/EditorFile'
import rawContent from '../../content/visitor-management.vue?raw'

export function VisitorManagement() {
  return <EditorFile code={rawContent} lang="vue" />
}
