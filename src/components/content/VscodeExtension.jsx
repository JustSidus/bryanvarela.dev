import { EditorFile } from '../ui/EditorFile'
import rawContent from '../../content/vscode-extension.ts?raw'

export function VscodeExtension() {
  return <EditorFile code={rawContent} lang="ts" />
}
