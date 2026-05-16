import { skillCategories } from '../../../data/skills'

export function ExtensionsPanel() {
  const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.items.length, 0)

  return (
    <>
      <div className="sidebar-head">
        <span>Tech Stack</span>
      </div>
      <div className="panel-body">
        <div className="panel-inner">
          <div className="ext-installed">
            INSTALLED ({totalSkills})
          </div>
          {skillCategories.map((cat, idx) => (
            <div key={cat.title} className="ext-group" style={{ marginTop: idx === 0 ? 0 : 14 }}>
              <div className="ext-group-head">
                <span className="ext-group-title">{cat.title}</span>
              </div>
              {cat.items.map((skill) => (
                <div key={skill.name} className="ext-row">
                  <span
                    className="lang-dot ext-row__dot"
                    style={{ background: skill.dot || 'var(--fg-3)' }}
                  />
                  <span className="ext-row__name">{skill.name}</span>
                  <span className="ext-row__status" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
