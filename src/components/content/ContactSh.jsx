import { EditorFile } from '../ui/EditorFile'
import rawContent from '../../content/contact.sh?raw'

export function ContactSh() {
  return <EditorFile code={rawContent} lang="sh" />
}
