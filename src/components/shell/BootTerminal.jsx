import { useState, useEffect } from 'react'
import { Icon } from '../../icons'

/**
 * BootTerminal — collapsible terminal panel at the bottom of the IDE.
 * Simulates a VS Code integrated terminal with boot messages.
 */
const BOOT_LINES = [
  { text: '[INFO]    Booting system...', delay: 0 },
  { text: '[INFO]    Loading modules: core, cloud, security...', delay: 400 },
  { text: '[INFO]    Connecting to Cloudflare edge...', delay: 900 },
  { text: '[SUCCESS] bryanvarela.dev loaded in 45ms', delay: 1500 },
  { text: '[INFO]    Runtime: .NET 10 · Node 22 · React 18', delay: 2000 },
  { text: '[READY]   Accepting connections.', delay: 2600 },
]

export function BootTerminal() {
  const [visibleLines, setVisibleLines] = useState([])
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, line])
      }, line.delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  const lineClass = (text) => {
    if (text.startsWith('[SUCCESS]')) return 'term-success'
    if (text.startsWith('[READY]')) return 'term-ready'
    if (text.startsWith('[ERROR]')) return 'term-error'
    return ''
  }

  return (
    <div className={`boot-terminal ${collapsed ? 'collapsed' : ''}`}>
      <div className="boot-terminal-head" onClick={() => setCollapsed(!collapsed)}>
        <div className="boot-terminal-tabs">
          <div className="boot-terminal-tab active">
            <Icon.bolt style={{ width: 12, height: 12 }} />
            <span>terminal</span>
          </div>
        </div>
        <div className="boot-terminal-actions">
          <span className="boot-terminal-toggle" title={collapsed ? 'Expandir' : 'Colapsar'}>
            {collapsed ? '▲' : '▼'}
          </span>
        </div>
      </div>
      {!collapsed && (
        <div className="boot-terminal-body">
          {visibleLines.map((line, i) => (
            <div key={i} className={`boot-terminal-line ${lineClass(line.text)}`}>
              {line.text}
            </div>
          ))}
          {visibleLines.length === BOOT_LINES.length && (
            <div className="boot-terminal-line">
              <span className="term-prompt">bryan@portfolio:~$</span>
              <span className="term-cmd">_<span className="term-cur"></span></span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}