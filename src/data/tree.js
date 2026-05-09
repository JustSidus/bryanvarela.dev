/**
 * Sidebar tree structure — edit this file to change the file tree layout.
 * Each entry is either a file (kind: 'file', id matching a key in files.js)
 * or a folder (kind: 'folder', with label and children).
 */
export const TREE = [
  { kind: 'file', id: 'about-me.md' },
  {
    kind: 'folder', id: 'projects', label: 'projects',
    children: [
      { kind: 'file', id: 'arelify-platform.ts' },
      { kind: 'file', id: 'visitor-management.vue' },
      { kind: 'file', id: 'layered-ecommerce.cs' },
    ],
  },
  {
    kind: 'folder', id: 'infrastructure', label: 'infrastructure',
    children: [
      { kind: 'file', id: 'tech-stack.json' },
      { kind: 'file', id: 'contact.sh' },
    ],
  },
]