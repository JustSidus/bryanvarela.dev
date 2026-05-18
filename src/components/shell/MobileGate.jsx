import { contact } from "../../data/contact";

const PROJECTS = [
  {
    name: "Arelify",
    role: "Cofundador técnico",
    blurb:
      "SaaS B2B multi-tenant para reservas online de PYMEs. .NET 10 · Postgres · Cloudflare · GCP Cloud Run.",
    href: "https://arelify.com",
    hrefLabel: "arelify.com",
  },
  {
    name: "Visitor Management",
    role: "Full-stack engineer",
    blurb:
      "Sistema de gestión de visitas para agencia gubernamental. Laravel + Vue 3 + Microsoft Entra ID + Azure.",
    href: "https://github.com/JustSidus/gestion-visitas-demo",
    hrefLabel: "github.com/JustSidus/gestion-visitas-demo",
  },
  {
    name: "VS Code · paste-image-to-terminal",
    role: "Autor",
    blurb:
      "Extensión que permite pegar imágenes en la terminal dentro de Dev Containers para agentes de IA. Uso personal, disponible en GitHub.",
    href: "https://github.com/JustSidus/vscode-paste-image-to-terminal",
    hrefLabel: "github.com/JustSidus/vscode-paste-image-to-terminal",
  },
];

export function MobileGate() {
  return (
    <div className="mobile-gate">
      <div className="mobile-gate__inner">
        <header className="mobile-gate__hero">
          <h1 className="mobile-gate__name">Bryan Varela</h1>
          <p className="mobile-gate__role">
            Backend &amp; Cloud Software Engineer
          </p>
          <p className="mobile-gate__location">Santo Domingo · UTC-4</p>
        </header>

        <section className="mobile-gate__section">
          <h2 className="mobile-gate__h2">Sobre mí</h2>
          <p className="mobile-gate__p">
            Ingeniero de software, cursando el 9no cuatrimestre de Ingeniería de
            Software. Mi fuerte está en arquitectura y entrega: pensar el
            sistema, decidir las piezas, conectarlas y desplegarlas.
          </p>
          <p className="mobile-gate__p" style={{ marginTop: "12px" }}>
            Uso herramientas modernas como agentes de IA y Model Context
            Protocol (MCP) para acelerar el desarrollo sin perder calidad
            técnica, enfocando todo el esfuerzo en construir soluciones reales
            que sean mantenibles, escalables y seguras desde el primer día.
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
            <a href={contact.github} target="_blank" rel="noreferrer">
              {contact.github.replace("https://", "")}
            </a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer">
              {contact.linkedin.replace("https://www.", "")}
            </a>
          </div>
        </section>

        <footer className="mobile-gate__footer">
          <p>
            Versión mobile optimizada.
            <a
              href="https://bryanvarela.dev"
              style={{ marginLeft: "0.25rem", textDecoration: "underline" }}
            >
              Ver versión IDE en escritorio
            </a>
            .
          </p>
        </footer>
      </div>
    </div>
  );
}
