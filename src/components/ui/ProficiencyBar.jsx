/**
 * ProficiencyBar — displays a skill name with a proficiency level bar.
 *
 * @param {string} name - Skill name
 * @param {number} lvl - Proficiency level (0–1)
 * @param {string} [dot] - CSS color variable for the language dot
 */
export function ProficiencyBar({ name, lvl, dot }) {
  return (
    <li>
      <span className="name">
        {dot && <span className="lang-dot" style={{ background: dot }}></span>}
        {name}
      </span>
      <span className="lvl">
        <span className="lvl-bar"><i style={{ width: `${Math.round(lvl * 100)}%` }}></i></span>
      </span>
    </li>
  )
}