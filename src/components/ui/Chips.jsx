/**
 * Chips — displays a row of technology/keyword chips.
 *
 * @param {Object[]} items - Array of { label, dot?, accent? }
 *   - dot: CSS color variable for the language dot (e.g. 'var(--lang-cs)')
 *   - accent: if true, chip gets accent styling
 */
export function Chips({ items }) {
  return (
    <div className="chips">
      {items.map((chip, i) => (
        <span key={i} className={`chip${chip.accent ? ' accent' : ''}`}>
          {chip.dot && <span className="dot" style={{ background: chip.dot }}></span>}
          {chip.label}
        </span>
      ))}
    </div>
  )
}