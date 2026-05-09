
/**
 * Syntax token helper — wraps text in a colored span.
 */
export const tok = (text, type) => <span className={`tk-${type}`}>{text}</span>

/**
 * CodeBlock — displays a code block with header and syntax highlighting.
 *
 * @param {string} path - File path shown in the header
 * @param {string} lang - Language label shown in the header
 * @param {React.ReactNode} children - Pre-formatted code content (use tok() for highlighting)
 */
export function CodeBlock({ path, lang, children }) {
  return (
    <div className="codeblock">
      <div className="codeblock-head">
        <span className="lang">{path}</span>
        <span>{lang}</span>
      </div>
      <div className="codeblock-body">
        <pre>{children}</pre>
      </div>
    </div>
  )
}