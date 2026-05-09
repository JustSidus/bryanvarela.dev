/**
 * Metrics grid — displays key metric cards.
 *
 * @param {Object[]} items - Array of { value, unit, label }
 */
export function Metrics({ items }) {
  return (
    <div className="metrics">
      {items.map((m, i) => (
        <div key={i} className="metric">
          <div className="v">{m.value}<span className="unit">{m.unit}</span></div>
          <div className="k">{m.label}</div>
        </div>
      ))}
    </div>
  )
}