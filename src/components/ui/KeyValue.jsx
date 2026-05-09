/**
 * KeyValue — displays a key-value grid.
 *
 * @param {Object[]} entries - Array of { key, value }
 * @param {React.CSSProperties} [style] - Optional inline styles
 */
export function KeyValue({ entries, style }) {
  return (
    <div className="kv" style={style}>
      {entries.map((e, i) => (
        <React.Fragment key={i}>
          <div className="k">{e.key}</div>
          <div className="v">{e.value}</div>
        </React.Fragment>
      ))}
    </div>
  )
}