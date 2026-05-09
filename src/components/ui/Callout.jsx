/**
 * Callout — highlighted note block with a header.
 *
 * @param {string} header - Callout header text (e.g. "// principio de trabajo")
 * @param {React.ReactNode} children - Callout body content
 */
export function Callout({ header, children }) {
  return (
    <div className="callout">
      <div className="head">{header}</div>
      {children}
    </div>
  )
}