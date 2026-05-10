import { EditorFile } from '../ui/EditorFile'
import rawContent from '../../content/tech-stack.json?raw'

export function TechStack() {
  return <EditorFile code={rawContent} lang="json" />
}
