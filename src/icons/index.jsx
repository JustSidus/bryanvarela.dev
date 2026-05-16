import React from 'react'
import { Icon as Iconify } from '@iconify/react'

// ── Shell icons (stroke-based, custom) ───────────────────────────────────────

export const Icon = {
  files: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6" />
    </svg>
  ),
  search: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  ),
  branch: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="6" cy="5" r="2" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="9" r="2" />
      <path d="M6 7v10M18 11c0 4-6 4-6 8" />
    </svg>
  ),
  user: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6" />
    </svg>
  ),
  bolt: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m13 3-9 12h6l-1 6 9-12h-6z" />
    </svg>
  ),
  cog: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
    </svg>
  ),
  chev: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  ),
  close: (p) => (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 3l6 6M9 3l-6 6" />
    </svg>
  ),
  newFile: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6M12 13v6M9 16h6" />
    </svg>
  ),
  collapse: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 12h16M9 7l-5 5 5 5M15 7l5 5-5 5" />
    </svg>
  ),
  github: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.4 3.6 1 .1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.3v3.4c0 .3.2.7.8.6A12 12 0 0 0 12 .5z" />
    </svg>
  ),
  linkedin: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05A4.16 4.16 0 0 1 17.6 8.7c4 0 4.7 2.6 4.7 6.1V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z" />
    </svg>
  ),
  mail: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 7 9-7" />
    </svg>
  ),
  bell: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 9a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9zM10 21a2 2 0 0 0 4 0" />
    </svg>
  ),
  cloud: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M7 18a4 4 0 1 1 .8-7.9 6 6 0 0 1 11.4 1.5A3.5 3.5 0 0 1 18 18z" />
    </svg>
  ),
  warn: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m12 3 10 18H2zM12 10v5M12 18v.1" />
    </svg>
  ),
  err: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16v.1" />
    </svg>
  ),
  capMin: (p) => (
    <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1" {...p}>
      <line x1="0" y1="5" x2="10" y2="5" />
    </svg>
  ),
  capMax: (p) => (
    <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1" {...p}>
      <rect x="0.5" y="0.5" width="9" height="9" />
    </svg>
  ),
  capClose: (p) => (
    <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" {...p}>
      <path d="M0.5 0.5 L9.5 9.5 M9.5 0.5 L0.5 9.5" />
    </svg>
  ),
  star: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m12 3 2.7 6 6.3.7-4.8 4.3 1.5 6-5.7-3.3-5.7 3.3 1.5-6L3 9.7l6.3-.7z" />
    </svg>
  ),
  fork: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="6" cy="5" r="2" /><circle cx="18" cy="5" r="2" /><circle cx="12" cy="19" r="2" />
      <path d="M6 7v3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V7M12 13v4" />
    </svg>
  ),
  terminal: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m7 9 3 3-3 3M13 15h4" />
    </svg>
  ),
}

// ── [bv] logo mark (SVG inline, color follows --accent) ──────────────────────

export function BvLogo({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      className={className}
      style={{ flexShrink: 0 }}
      aria-label="[bv]"
    >
      <rect x="0.5" y="0.5" width="17" height="17" rx="3"
        fill="currentColor" fillOpacity="0.12"
        stroke="currentColor" strokeOpacity="0.6" strokeWidth="0.8" />
      <text
        x="9" y="13"
        textAnchor="middle"
        fill="currentColor"
        fontSize="8.5"
        fontWeight="700"
        fontFamily="'JetBrains Mono', ui-monospace, monospace"
        letterSpacing="-0.5"
      >
        [bv]
      </text>
    </svg>
  )
}

// ── File icons — Material Icon Theme via Iconify ──────────────────────────────

const FILE_ICON_MAP = {
  md:   'material-icon-theme:markdown',
  ts:   'material-icon-theme:typescript',
  vue:  'material-icon-theme:vue',
  cs:   'material-icon-theme:csharp',
  json: 'material-icon-theme:json',
  sh:   'material-icon-theme:console',
}

const FOLDER_ICON_MAP = {
  projects:       'material-icon-theme:folder-app',
  infrastructure: 'material-icon-theme:folder-ci',
  default:        'material-icon-theme:folder-src',
  open:           'material-icon-theme:folder-app',
}

export function FileIcon({ ext }) {
  if (ext === 'welcome') {
    return (
      <Icon.star style={{ width: 14, height: 14, color: 'var(--accent)', flexShrink: 0 }} />
    )
  }
  const iconId = FILE_ICON_MAP[ext]
  if (iconId) {
    return (
      <Iconify
        icon={iconId}
        width={16}
        height={16}
        style={{ flexShrink: 0, display: 'inline-block' }}
      />
    )
  }
  // generic fallback
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
      <rect x="2" y="1" width="12" height="14" rx="2" fill="none" stroke="#6e7681" strokeWidth=".7"/>
    </svg>
  )
}

export function FolderIcon({ id, open }) {
  const closedId = FOLDER_ICON_MAP[id] || FOLDER_ICON_MAP.default
  const iconId = open ? FOLDER_ICON_MAP.open : closedId
  return (
    <Iconify
      icon={iconId}
      width={16}
      height={16}
      style={{ flexShrink: 0, display: 'inline-block' }}
    />
  )
}
