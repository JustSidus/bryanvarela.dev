import { ProficiencyBar } from '../ui/ProficiencyBar'
import { skillCategories } from '../../data/skills'

/**
 * TechStack — displays categorized skills with proficiency bars.
 * Skill data comes from src/data/skills.js — edit that file to update skills.
 */
export function TechStack() {
  return (
    <div className="md">
      <h1>
        <span className="h1-prefix">{'{ }'}</span>
        Tech stack
      </h1>
      <p className="lede">
        Las herramientas con las que trabajo a diario, agrupadas por capa.
        El nivel es honesto: alto = lo uso en producción y conozco sus
        bordes; medio = sé lo que hace y lo defiendo en una decisión.
      </p>

      <div className="stack-grid">
        {skillCategories.map((cat, i) => (
          <div key={i} className="stack-cat">
            <h3>{cat.title}</h3>
            <ul>
              {cat.items.map((item, j) => (
                <ProficiencyBar key={j} name={item.name} lvl={item.lvl} dot={item.dot} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2><span className="num">02</span>Lo que no aparece</h2>
      <ul>
        <li><strong>No-go:</strong> frameworks que prometen "todo en una caja" pero ocultan SQL — prefiero ver la consulta.</li>
        <li><strong>No-go:</strong> ORMs configurados con magia implícita; EF Core sí, pero con migraciones revisadas a mano.</li>
        <li><strong>Por aprender:</strong> Rust para servicios chicos críticos, Temporal para workflows duraderos.</li>
      </ul>
    </div>
  )
}