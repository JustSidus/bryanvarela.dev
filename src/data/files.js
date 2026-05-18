/**
 * File metadata — edit this file to add/remove/change portfolio sections.
 * Each key maps to a "file" in the IDE sidebar.
 *
 * To add a new section:
 *   1. Create a component in src/components/content/
 *   2. Add an entry here with the file's metadata
 *   3. Add a tree entry in tree.js
 *   4. Register the component in App.jsx's FILE_COMPONENTS map
 */
export const FILE_META = {
  'welcome': {
    id: 'welcome',
    name: 'welcome',
    ext: 'welcome',
    path: '~/portfolio',
    langAccent: null,
  },
  'about-me.md': {
    id: 'about-me.md',
    name: 'about-me.md',
    ext: 'md',
    path: '~/portfolio',
    langAccent: null,
  },
  'arelify-platform.cs': {
    id: 'arelify-platform.cs',
    name: 'arelify-platform.cs',
    ext: 'cs',
    path: '~/portfolio/projects',
    langAccent: 'var(--lang-cs)',
  },
  'visitor-management.php': {
    id: 'visitor-management.php',
    name: 'visitor-management.php',
    ext: 'php',
    path: '~/portfolio/projects',
    langAccent: 'var(--lang-php)',
  },
  'vscode-extension.ts': {
    id: 'vscode-extension.ts',
    name: 'vscode-extension.ts',
    ext: 'ts',
    path: '~/portfolio/projects',
    langAccent: 'var(--lang-ts)',
  },
  'tech-stack.json': {
    id: 'tech-stack.json',
    name: 'tech-stack.json',
    ext: 'json',
    path: '~/portfolio/infrastructure',
    langAccent: 'var(--lang-json)',
  },
  'contact.sh': {
    id: 'contact.sh',
    name: 'contact.sh',
    ext: 'sh',
    path: '~/portfolio/infrastructure',
    langAccent: 'var(--lang-sh)',
  },
}

/**
 * Language display labels for the status bar.
 */
export const LANG_LABELS = {
  welcome: 'Welcome',
  md: 'Markdown',
  ts: 'TypeScript',
  php: 'PHP',
  cs: 'C#',
  json: 'JSON',
  sh: 'Shell',
}