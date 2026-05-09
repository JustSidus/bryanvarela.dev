
/**
 * Terminal — displays a terminal block with header and body.
 *
 * @param {string} title - Terminal title shown in the header
 * @param {React.ReactNode} children - Terminal body content
 */
export function Terminal({ title, children }) {
  return (
    <div className="terminal">
      <div className="terminal-head">
        <div className="dots"><i></i><i></i><i></i></div>
        <span>{title}</span>
      </div>
      <div className="terminal-body">
        {children}
      </div>
    </div>
  )
}

/**
 * TermLine — a single terminal line with prompt and command.
 */
export function TermLine({ prompt, cmd, children, style }) {
  return (
    <div className="term-line" style={style}>
      <span className="term-prompt">{prompt}</span>
      <span className="term-cmd">{cmd}{children}</span>
    </div>
  )
}

/**
 * TermOut — terminal output line.
 */
export function TermOut({ children }) {
  return <div className="term-out">{children}</div>
}

/**
 * TermCur — blinking cursor at end of command.
 */
export function TermCur() {
  return <span className="term-cur"></span>
}