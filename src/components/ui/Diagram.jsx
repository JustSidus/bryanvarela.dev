/**
 * Diagram — displays an ASCII diagram block with a label.
 *
 * @param {string} label - Label shown in the top-right corner
 * @param {string} children - ASCII diagram text
 */
export function Diagram({ label, children }) {
  return (
    <div className="diagram">
      <span className="label">{label}</span>
      {children}
    </div>
  )
}