import { contact } from '../../data/contact'

const PROJECTS = [
  {
    name: 'Arelify',
    role: 'Cofundador técnico',
    blurb: 'SaaS B2B multi-tenant para reservas online de PYMEs. .NET 10 · Postgres · Cloudflare · GCP Cloud Run.',
    href: 'https://arelify.com',
    hrefLabel: 'arelify.com',
  },
  {
    name: 'Visitor Management',
    role: 'Full-stack engineer',
    blurb: 'Sistema de gestión de visitas para agencia gubernamental. Laravel + Vue 3 + Microsoft Entra ID + Azure.',
    href: 'https://github.com/JustSidus/gestion-visitas-demo',
    hrefLabel: 'github.com/JustSidus/gestion-visitas-demo',
  },
  {
    name: 'VS Code · paste-image-to-terminal',
    role: 'Autor',
    blurb: 'Extensión que permite pegar imágenes en la terminal dentro de Dev Containers para agentes de IA. Uso personal, disponible en GitHub.',
    href: 'https://github.com/JustSidus/vscode-paste-image-to-terminal',
    hrefLabel: 'github.com/JustSidus/vscode-paste-image-to-terminal',
  },
]

export function MobileGate() {
  return (
    <div className="mobile-gate">
      <div className="mobile-gate__inner">
        <header className="mobile-gate__hero">
          <h1 className="mobile-gate__name">Bryan Varela</h1>
          <p className="mobile-gate__role">Backend &amp; Cloud Software Engineer</p>
          <p className="mobile-gate__location">Santo Domingo · UTC-4</p>
        </header>

        <section className="mobile-gate__section">
          <h2 className="mobile-gate__h2">Sobre mí</h2>
          <p className="mobile-gate__p">
            Diseño y construyo plataformas escalables. Foco en arquitectura,
            seguridad de datos y despliegue en la nube. Cofundador técnico de
            Arelify (SaaS en producción).
          </p>
          <div className="mobile-gate__tags">
            <span className="mobile-gate__tag">.NET 10</span>
            <span className="mobile-gate__tag">TypeScript</span>
            <span className="mobile-gate__tag">PostgreSQL</span>
            <span className="mobile-gate__tag">Cloudflare</span>
            <span className="mobile-gate__tag">Google Cloud</span>
            <span className="mobile-gate__tag">Azure</span>
          </div>
        </section>

        <section className="mobile-gate__section">
          <h2 className="mobile-gate__h2">Proyectos</h2>
          <ul className="mobile-gate__projects">
            {PROJECTS.map((p) => (
              <li key={p.name} className="mobile-gate__project">
                <div className="mobile-gate__project-head">
                  <span className="mobile-gate__project-name">{p.name}</span>
                  <span className="mobile-gate__project-role">{p.role}</span>
                </div>
                <p className="mobile-gate__project-blurb">{p.blurb}</p>
                <a
                  className="mobile-gate__project-link"
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {p.hrefLabel}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mobile-gate__section">
          <h2 className="mobile-gate__h2">Contacto</h2>
          <div className="mobile-gate__contact">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={contact.github} target="_blank" rel="noreferrer">{contact.github.replace('https://', '')}</a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer">{contact.linkedin.replace('https://', '')}</a>
          </div>
        </section>

        <footer className="mobile-gate__footer">
          <p>
            Este portfolio tiene una versión interactiva tipo IDE.
            Abrila desde una pantalla de 768 px o más para verla completa.
          </p>
        </footer>
      </div>
    </div>
  )
}
