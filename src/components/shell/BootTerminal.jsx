import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { RECENT_COMMITS } from '../../data/recent-commits'

// Faux terminal session: short `git log` of the repo's own last 3 commits
// (injected at build-time by scripts/generate-recent-commits.mjs). Falls back
// to a curated synthetic list when the real history is not conventional-commits clean.
const BOOT_LINES = [
  { text: 'PS C:\\portfolio> git log --oneline -3', type: 'cmd', delay: 0 },
  ...RECENT_COMMITS.map((c, i) => ({ ...c, type: 'log', delay: 260 + i * 160 })),
  { text: 'PS C:\\portfolio> _', type: 'prompt', delay: 260 + RECENT_COMMITS.length * 160 + 80 },
]

const TOTAL_BOOT_MS = BOOT_LINES[BOOT_LINES.length - 1].delay

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
          if (line.type === 'comment') {
            return <div key={i} className="boot-terminal-line term-comment">{line.text}</div>
          }
          if (line.type === 'log') {
            return (
              <div key={i} className="boot-terminal-line term-log">
                <span className="git-hash">{line.hash}</span>
                <span className="git-msg">{line.msg}</span>
              </div>
            )
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
