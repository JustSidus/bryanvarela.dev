import React from "react";

const projects = [
  {
    name: "Staris",
    category: "Estudio web · proyecto propio",
    summary: "De una necesidad de negocio a una web que se puede usar.",
    description:
      "Desarrollo sitios, catálogos y herramientas para negocios dominicanos. Trabajo desde el levantamiento de requisitos hasta la implementación, las pruebas y la publicación.",
    detail:
      "El sitio del estudio distingue trabajos publicados y conceptos de demostración.",
    stack: "Astro · TypeScript · Node.js · Cloudflare",
    url: "https://staris.do",
    link: "Visitar Staris",
  },
  {
    name: "Sistema de operaciones para salón",
    category: "Aplicación privada · desarrollo reciente",
    summary: "La operación de un negocio, organizada en una sola aplicación.",
    description:
      "Desarrollé flujos de agenda, ventas, caja, inventario y comisiones. Incluye permisos de acceso, movimientos auditables, importes exactos y protección contra operaciones duplicadas.",
    detail:
      "Una herramienta adaptada a los procesos diarios de un negocio real.",
    stack: "Next.js · TypeScript · PostgreSQL · Docker · Cloud Run",
  },
  {
    name: "Arelify",
    category: "SaaS B2B · cofundador técnico",
    summary: "Reservas con aislamiento de datos entre negocios.",
    description:
      "Construí una plataforma de reservas con API, frontend e infraestructura cloud. Implementé filtros de aislamiento por negocio y una restricción de base de datos para evitar reservas duplicadas.",
    detail:
      "Código privado. Puedo explicar las decisiones técnicas en una entrevista.",
    stack: "C# / .NET · React · PostgreSQL · Cloudflare · Cloud Run",
    url: "https://arelify.com",
    link: "Visitar Arelify",
  },
  {
    name: "Gestión de visitas",
    category: "CONANI · pasantía, sep–dic 2025",
    summary: "Accesos, roles y reportes para una institución.",
    description:
      "Desarrollé con Laravel y Vue 3 un sistema de visitas con Microsoft Entra ID, JWT, roles y reportes PDF/Excel. También trabajé en su infraestructura de Azure.",
    detail:
      "La versión pública está anonimizada para proteger la información institucional.",
    stack: "PHP / Laravel · Vue 3 · MySQL · Microsoft Azure",
    url: "https://github.com/JustSidus/gestion-visitas-demo",
    link: "Ver código de la demo",
  },
  {
    name: "Paste Image to Terminal",
    category: "Open source · herramientas de desarrollo",
    summary: "Una fricción menos al trabajar con agentes de código.",
    description:
      "Creé una extensión de VS Code para pegar imágenes en la terminal dentro de Dev Containers. Usa la API de VS Code y deduplicación SHA-256 para apoyar flujos de desarrollo asistidos por IA.",
    detail: "Un proyecto concreto de herramientas para desarrolladores.",
    stack: "TypeScript · VS Code API · Dev Containers",
    url: "https://github.com/JustSidus/vscode-paste-image-to-terminal",
    link: "Ver repositorio",
  },
];

export default function Portfolio() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header className="site-header wrap">
        <a
          className="wordmark"
          href="#inicio"
          aria-label="Bryan Varela, inicio"
        >
          bryan varela<span>.</span>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#proyectos">Proyectos</a>
          <a href="#experiencia">Experiencia</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </header>
      <main id="contenido" className="wrap">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> Disponible para trabajo remoto
            </p>
            <h1 id="hero-title">
              Software útil.
              <br />
              <span>De principio a fin.</span>
            </h1>
            <p className="intro">
              Soy Bryan Varela, desarrollador de software en Santo Domingo.
              Construyo aplicaciones web, APIs y herramientas que ayudan a
              organizar el trabajo de un negocio.
            </p>
            <p className="hero-note">
              Full stack · Backend · Automatización · Soporte técnico
            </p>
            <div className="actions">
              <a className="button" href="#proyectos">
                Explorar proyectos <span aria-hidden="true">↘</span>
              </a>
              <a
                className="text-link"
                href="/resume.pdf"
                download="Bryan-Varela-CV-ES.pdf"
              >
                Descargar CV <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <aside className="profile-note" aria-label="Sobre mi trabajo">
            <span className="note-label">CÓMO TRABAJO</span>
            <p>
              Entender el problema.
              <br />
              Construir la solución.
              <br />
              Comprobar que funciona.
            </p>
            <div className="note-bottom">
              <span>República Dominicana</span>
              <span>UTC−4 · Remoto</span>
            </div>
          </aside>
        </section>
        <section id="proyectos" aria-labelledby="projects-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Trabajo seleccionado</p>
              <h2 id="projects-title">Proyectos con contexto.</h2>
            </div>
            <p>
              Qué construí, para qué sirve
              <br />y con qué herramientas.
            </p>
          </div>
          <div>
            {projects.map((project, index) => (
              <article className="project" key={project.name}>
                <div className="project-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="project-identity">
                  <p className="category">{project.category}</p>
                  <h3>{project.name}</h3>
                  <p className="stack">{project.stack}</p>
                </div>
                <div className="project-description">
                  <h4>{project.summary}</h4>
                  <p>{project.description}</p>
                  <p className="project-detail">{project.detail}</p>
                  {project.url && (
                    <a
                      className="text-link"
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.link} <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section
          className="experience-section"
          id="experiencia"
          aria-labelledby="experience-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">Experiencia y herramientas</p>
              <h2 id="experience-title">Construir. Resolver. Aprender.</h2>
            </div>
          </div>
          <div className="experience-grid">
            <div>
              <article className="job">
                <p className="category">Sep 2025 - Dic 2025</p>
                <h3>
                  Desarrollador full stack <span>· Pasantía</span>
                </h3>
                <p className="organization">CONANI</p>
                <p>
                  Sistema de visitas con Laravel y Vue 3, autenticación y
                  reportes. Infraestructura Azure, migración de tres proyectos,
                  depuración y documentación técnica.
                </p>
              </article>
              <article className="job">
                <p className="category">Oct 2022 - Dic 2022</p>
                <h3>
                  Soporte de TI <span>· Pasantía</span>
                </h3>
                <p className="organization">
                  Programa Mundial de Alimentos · ONU
                </p>
                <p>
                  Soporte de hardware y software a usuarios corporativos,
                  control de activos y gestión de recursos tecnológicos.
                </p>
              </article>
              <article className="job">
                <p className="category">Formación</p>
                <h3>Ingeniería de Software</h3>
                <p className="organization">
                  Universidad APEC · En curso desde 2023
                </p>
                <p>
                  Finalización prevista para finales de 2027. Técnico en
                  Desarrollo y Administración de Aplicaciones Informáticas,
                  CAFAM, 2019–2023.
                </p>
              </article>
            </div>
            <aside className="toolbox">
              <h3>Mi caja de herramientas</h3>
              <dl>
                <dt>Backend y datos</dt>
                <dd>
                  C# / .NET, PHP / Laravel, Node.js, REST APIs, PostgreSQL,
                  MySQL y SQL Server.
                </dd>
                <dt>Interfaces</dt>
                <dd>React, Next.js, Vue 3, Astro, TypeScript y JavaScript.</dd>
                <dt>Entrega y cloud</dt>
                <dd>
                  Azure, Google Cloud Run, Cloudflare, Docker, Git y GitHub
                  Actions.
                </dd>
                <dt>Automatización e IA</dt>
                <dd>
                  Scripts, herramientas MCP y flujos con Codex y Claude Code,
                  acompañados de validación y revisión.
                </dd>
                <dt>Idiomas</dt>
                <dd>Español nativo. Inglés B2, en mejora continua.</dd>
              </dl>
            </aside>
          </div>
        </section>
        <section
          className="contact-section"
          id="contacto"
          aria-labelledby="contact-title"
        >
          <p className="eyebrow">Hablemos</p>
          <h2 id="contact-title">¿En qué puedo ayudarte?</h2>
          <p>
            Busco oportunidades remotas en español y proyectos donde pueda
            aportar desde el primer día. Disponibilidad inmediata.
          </p>
          <a className="contact-email" href="mailto:devbryanvarela@gmail.com">
            devbryanvarela@gmail.com <span aria-hidden="true">↗</span>
          </a>
          <div className="contact-links">
            <a
              href="https://github.com/JustSidus"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/bryan-varela-mazzei/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
            <a href="/resume.pdf" download="Bryan-Varela-CV-ES.pdf">
              CV en español ↓
            </a>
          </div>
        </section>
      </main>
      <footer className="wrap">
        <span>© 2026 Bryan Varela</span>
        <span>Hecho con claridad, desde Santo Domingo.</span>
      </footer>
    </>
  );
}
