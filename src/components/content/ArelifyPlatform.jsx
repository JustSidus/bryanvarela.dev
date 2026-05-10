import { EditorFile } from '../ui/EditorFile'
import rawContent from '../../content/arelify-platform.ts?raw'

export function ArelifyPlatform() {
  return <EditorFile code={rawContent} lang="ts" />
}
