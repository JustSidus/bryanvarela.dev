import { EditorFile } from "../ui/EditorFile";
import rawContent from "../../content/about-me.md?raw";

export function AboutMe() {
  return <EditorFile code={rawContent} lang="md" animateLastN={4} />;
}
