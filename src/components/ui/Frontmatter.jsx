/**
 * Frontmatter block — displays key-value metadata at the top of a file view.
 *
 * @param {Object[]} entries - Array of { key, value, accent?, statusDot? }
 */
export function Frontmatter({ entries }) {
  return (
    <div className="frontmatter">
      {entries.map((e, i) => (
        <React.Fragment key={i}>
          <span className="k">{e.key}</span>
          <span className={`v${e.accent ? ' accent' : ''}`}>
            {e.statusDot && (
              <span className="lang-dot" style={{ background: e.statusDot, marginRight: 6, verticalAlign: 'middle' }} />
            )}
            {e.value}
          </span>
        </React.Fragment>
      ))}
    </div>
  )
}