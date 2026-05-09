import { Fragment } from 'react'

/**
 * Badge — Shields.io-style inline badge for technologies.
 * Renders as a self-contained SVG that looks like a GitHub readme badge.
 *
 * @param {string} label - Left side label (e.g. "C#")
 * @param {string} value - Right side value (e.g. ".NET 10")
 * @param {string} color - Hex color for the value side (e.g. "#9D7CFF")
 */
export function Badge({ label, value, color }) {
  const labelLen = label.length * 7.2 + 12
  const valueLen = value.length * 7.2 + 12
  const totalWidth = labelLen + valueLen
  const midX = labelLen

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={totalWidth}
      height="20"
      viewBox={`0 0 ${totalWidth} 20`}
      style={{ display: 'inline-block', verticalAlign: 'middle', margin: '0 2px' }}
    >
      <clipPath id={`clip-${label}-${value}`}>
        <rect width={totalWidth} height="20" rx="3" fill="#fff" />
      </clipPath>
      <g clipPath={`url(#clip-${label}-${value})`}>
        <rect width={labelLen} height="20" fill="#21262D" />
        <rect x={labelLen} width={valueLen} height="20" fill={color} />
      </g>
      <g fill="#fff" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="11">
        <text x={labelLen / 2} y="14.5" fill="#C9D1D9">{label}</text>
        <text x={labelLen + valueLen / 2} y="14.5" fill="#fff" fontWeight="600">{value}</text>
      </g>
    </svg>
  )
}

/**
 * BadgeRow — renders a row of badges with consistent spacing.
 */
export function BadgeRow({ children }) {
  return (
    <div className="badge-row">
      {children}
    </div>
  )
}