import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'

const BOOT_LINES = [
  { text: 'Windows PowerShell',                                  type: 'banner',  delay: 0    },
  { text: 'Copyright (C) Bryan Varela. All rights reserved.',   type: 'banner',  delay: 180  },
  { text: '',                                                    type: 'blank',   delay: 360  },
  { text: 'PS C:\\portfolio> dotnet run --project bryanvarela.dev', type: 'cmd', delay: 520  },
  { text: '  Restoring packages...  ✓',                         type: 'info',    delay: 980  },
  { text: '  Connecting to Cloudflare edge... ✓',               type: 'success', delay: 1300 },
  { text: '  Runtime: .NET 10 · Node 22 · React 18',            type: 'info',    delay: 1620 },
  { text: '  bryanvarela.dev loaded in 45ms',                   type: 'success', delay: 1920 },
  { text: '',                                                    type: 'blank',   delay: 2200 },
  { text: 'PS C:\\portfolio> _',                                 type: 'prompt',  delay: 2420 },
]

const TOTAL_BOOT_MS = 2420

export const BootTerminal = forwardRef(function BootTerminal(_, ref) {
  const [visibleLines, setVisibleLines] = useState([])
  const [collapsed, setCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useImperativeHandle(ref, () => ({
    toggle: () => setCollapsed(c => !c),
  }))

  useEffect(() => {
    // small delay so the slide-in animation plays on first render
    const mountTimer = setTimeout(() => setMounted(true), 50)
    const lineTimers = BOOT_LINES.map(line =>
      setTimeout(() => setVisibleLines(prev => [...prev, line]), line.delay + 80)
    )
    const collapseTimer = setTimeout(() => setCollapsed(true), TOTAL_BOOT_MS + 1800)

    return () => {
      clearTimeout(mountTimer)
      lineTimers.forEach(clearTimeout)
      clearTimeout(collapseTimer)
    }
  }, [])

  return (
    <div
      className={`boot-terminal ${mounted ? 'boot-mounted' : ''} ${collapsed ? 'collapsed' : ''}`}
    >
      <div
        className="boot-terminal-head"
        onClick={() => setCollapsed(c => !c)}
        title={collapsed ? 'Expandir terminal' : 'Colapsar terminal'}
      >
        <div className="boot-terminal-tabs">
          <div className="boot-terminal-tab active">
            <span className="pwsh-icon">PS</span>
            <span>PowerShell</span>
          </div>
        </div>
        <div className="boot-terminal-actions">
          <span className="boot-terminal-toggle">
            {collapsed ? '▲' : '▼'}
          </span>
        </div>
      </div>

      <div className="boot-terminal-body">
        {visibleLines.map((line, i) => {
          if (line.type === 'blank') {
            return <div key={i} className="boot-terminal-line blank" />
          }
          if (line.type === 'banner') {
            return <div key={i} className="boot-terminal-line banner">{line.text}</div>
          }
          if (line.type === 'cmd') {
            const cmd = line.text.replace('PS C:\\portfolio> ', '')
            return (
              <div key={i} className="boot-terminal-line">
                <span className="pwsh-prompt">PS C:\portfolio{'>'} </span>
                <span className="pwsh-cmd">{cmd}</span>
              </div>
            )
          }
          if (line.type === 'success') {
            return <div key={i} className="boot-terminal-line term-success">{line.text}</div>
          }
          if (line.type === 'info') {
            return <div key={i} className="boot-terminal-line term-info">{line.text}</div>
          }
          if (line.type === 'prompt') {
            return (
              <div key={i} className="boot-terminal-line">
                <span className="pwsh-prompt">PS C:\portfolio{'>'} </span>
                <span className="term-cur" />
              </div>
            )
          }
          return <div key={i} className="boot-terminal-line">{line.text}</div>
        })}
      </div>
    </div>
  )
})
