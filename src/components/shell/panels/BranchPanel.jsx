import { Icon } from '../../../icons'
import { career } from '../../../data/career'

export function BranchPanel() {
  return (
    <>
      <div className="sidebar-head">
        <span>Carrera</span>
      </div>
      <div style={{ padding: '8px 14px 12px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>
        git log --oneline --all
      </div>
      <div className="tree branch-tree">
        {career.map((entry, i) => {
          const isLast = i === career.length - 1
          const dot = entry.type === 'project' ? '●' : '○'
          return (
            <div key={entry.hash} style={{ padding: '0 14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ color: 'var(--accent)' }}>{dot}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-2)' }}>
                  {entry.hash}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>
                  {entry.date}
                </span>
              </div>
              <div style={{ paddingLeft: 24, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-0)', marginTop: 2 }}>
                {entry.role} <span style={{ color: 'var(--fg-3)' }}>@ {entry.org}</span>
              </div>
              <div style={{ paddingLeft: 24, marginTop: 4 }}>
                {entry.bullets.map((b, bi) => (
                  <div key={bi} style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--fg-2)', paddingLeft: entry.bullets.length > 1 ? 12 : 0 }}>
                    {entry.bullets.length > 1 ? '├─ ' : '└─ '}{b}
                  </div>
                ))}
              </div>
              {!isLast && (
                <div style={{ height: 12 }} />
              )}
            </div>
          )
        })}
      </div>
      <style>{`
        .branch-tree { padding-bottom: 16px; }
      `}</style>
    </>
  )
}