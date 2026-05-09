import { useState, useEffect } from 'react'

/**
 * BootTerminal — collapsible terminal panel styled as PowerShell.
 * Auto-collapses 1.5s after boot completes.
 */
const BOOT_LINES = [
  { text: 'Windows PowerShell', type: 'banner', delay: 0 },
  { text: 'Copyright (C) Bryan Varela. All rights reserved.', type: 'banner', delay: 200 },
  { text: '', type: 'blank', delay: 400 },
  { text: 'PS C:\\portfolio> dotnet run --project bryanvarela.dev', type: 'cmd', delay: 600 },
  { text: '  Connecting to Cloudflare edge... ✓', type: 'success', delay: 1200 },
  { text: '  Runtime: .NET 10 · Node 22 · React 18', type: 'info', delay: 1700 },
  { text: '  bryanvarela.dev loaded in 45ms', type: 'success', delay: 2200 },
  { text: '', type: 'blank', delay: 2600 },
  { text: 'PS C:\\portfolio> _', type: 'prompt', delay: 2800 },
]

export function BootTerminal() {
  const [visibleLines, setVisibleLines] = useState([])
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const timers = BOOT_LINES.map((line) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, line])
      }, line.delay)
    )
    // Auto-collapse 1.5s after boot completes
    const collapseTimer = setTimeout(() => {
      setCollapsed(true)
    }, 4300)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(collapseTimer)
    }
  }, [])

  return (
    <div className={`boot-terminal ${collapsed ? 'collapsed' : ''}`}>
      <div className="boot-terminal-head" onClick={() => setCollapsed(!collapsed)}>
        <div className="boot-terminal-tabs">
          <div className="boot-terminal-tab active">
            <span className="pwsh-icon">PS</span>
            <span>PowerShell</span>
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
          {visibleLines.map((line, i) => {
            if (line.type === 'blank') return <div key={i} className="boot-terminal-line blank" />
            if (line.type === 'banner') return <div key={i} className="boot-terminal-line banner">{line.text}</div>
            if (line.type === 'cmd') return (
              <div key={i} className="boot-terminal-line">
                <span className="pwsh-prompt">PS C:\portfolio{'>'} </span>
                <span className="pwsh-cmd">{line.text.replace('PS C:\\portfolio> ', '')}</span>
              </div>
            )
            if (line.type === 'success') return <div key={i} className="boot-terminal-line term-success">{line.text}</div>
            if (line.type === 'info') return <div key={i} className="boot-terminal-line term-info">{line.text}</div>
            if (line.type === 'prompt') return (
              <div key={i} className="boot-terminal-line">
                <span className="pwsh-prompt">PS C:\portfolio{'>'} </span>
                <span className="term-cur"></span>
              </div>
            )
            return <div key={i} className="boot-terminal-line">{line.text}</div>
          })}
        </div>
      )}
    </div>
  )
}