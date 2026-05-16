import { skillCategories } from '../../../data/skills'

export function ExtensionsPanel() {
  const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.items.length, 0)

  return (
    <>
      <div className="sidebar-head">
        <span>Tech Stack</span>
      </div>
      <div style={{ padding: '4px 14px 12px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>
        INSTALLED ({totalSkills})
      </div>
      <div className="tree">
        {skillCategories.map((cat, idx) => (
          <div key={cat.title} style={{ marginTop: idx === 0 ? 0 : 14, marginBottom: 4 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '4px 20px 6px 14px',
              borderBottom: '1px solid var(--bg-3)',
              marginBottom: 4,
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10.5,
                color: 'var(--fg-3)',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
              }}>
                {cat.title}
              </span>
            </div>
            {cat.items.map((skill) => (
              <div
                key={skill.name}
                className="tree-row"
                style={{ height: 'var(--row-h)', paddingRight: 20 }}
              >
                <span
                  className="lang-dot"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 2,
                    background: skill.dot || 'var(--fg-3)',
                    marginRight: 8,
                    flexShrink: 0,
                  }}
                />
                <span style={{ flex: 1, fontSize: 13, color: 'var(--fg-1)' }}>{skill.name}</span>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--ok)',
                    marginLeft: 6,
                    flexShrink: 0,
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}