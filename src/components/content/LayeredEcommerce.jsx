import { EditorFile } from '../ui/EditorFile'
import rawContent from '../../content/layered-ecommerce.cs?raw'

export function LayeredEcommerce() {
  return <EditorFile code={rawContent} lang="cs" />
}
