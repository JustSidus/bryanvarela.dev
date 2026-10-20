import React from "react";

const projects = [
  {
    name: "Staris",
    category: "Estudio web · proyecto propio",
    summary: "Sitios web y sistemas para negocios dominicanos.",
    description:
      "Staris es mi estudio de desarrollo web. Trabajo en sitios, catálogos y sistemas de gestión: converso sobre lo que necesita el negocio, lo desarrollo y me encargo de las pruebas y la publicación.",
    detail:
      "En la web del estudio puedes ver trabajos publicados y propuestas de demostración, identificadas como tales.",
    stack: "Astro · TypeScript · Node.js · Cloudflare",
    url: "https://staris.do",
    link: "Visitar Staris",
  },
  {
    name: "Balayage OS",
    category: "Aplicación privada · desarrollo reciente",
    summary: "Agenda, ventas y caja de un salón.",
    description:
      "Desarrollé una aplicación que reúne las citas, las ventas, el inventario y las comisiones del personal. Implementé permisos por usuario, un registro de movimientos de caja y controles para evitar que una operación se procese dos veces.",
    detail:
      "El código es privado. Puedo conversar sobre la estructura del sistema y las decisiones de implementación.",
    stack: "Next.js · TypeScript · PostgreSQL / Supabase · Cloud Run",
  },
  {
    name: "Arelify",
    category: "SaaS B2B · cofundador técnico",
    summary: "Una plataforma de reservas para varios negocios.",
    description:
      "Como cofundador técnico, construí la API, la interfaz web y la infraestructura. Cada negocio tiene sus datos separados; la base de datos también comprueba que no se creen dos reservas para el mismo horario.",
    detail: "Backend en C#/.NET, interfaz en React y datos en PostgreSQL.",
    stack: "C# / .NET · React · PostgreSQL · Cloudflare · Cloud Run",
    url: "https://arelify.com",
    link: "Visitar Arelify",
  },
  {
    name: "Gestión de visitas",
    category: "CONANI · pasantía, sep–dic 2025",
    summary: "El sistema de visitas que desarrollé en CONANI.",
    description:
      "Durante mi pasantía desarrollé un sistema con Laravel y Vue 3 para gestionar visitas. Integré el inicio de sesión institucional con Microsoft Entra ID, los permisos por rol y la exportación de reportes a PDF y Excel.",
    detail:
      "La versión pública está anonimizada para proteger la información institucional.",
    stack: "PHP / Laravel · Vue 3 · MySQL · Microsoft Azure",
    url: "https://github.com/JustSidus/gestion-visitas-demo",
    link: "Ver código de la demo",
  },
  {
    name: "Paste Image to Terminal",
    category: "Open source · herramientas de desarrollo",
    summary: "Pegar imágenes en una terminal dentro de un contenedor.",
    description:
      "Creé esta extensión de VS Code para usar imágenes al trabajar con agentes de código dentro de Dev Containers. Guarda la imagen y permite usar su ruta desde la terminal; si la imagen ya existe, evita guardarla de nuevo.",
    detail:
      "El repositorio público incluye el código y las instrucciones de uso.",
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
              Soy Bryan Varela.
              <br />
              <span>Desarrollador web.</span>
            </h1>
            <p className="intro">
              Trabajo en aplicaciones web y APIs desde Santo Domingo. Mis
              proyectos recientes incluyen sistemas de reservas, ventas e
              inventario, además de sitios para negocios a través de Staris.
            </p>
            <p className="hero-note">
              Desarrollo full stack · Backend · Automatización
            </p>
            <div className="actions">
              <a className="button" href="#proyectos">
                Ver mis proyectos <span aria-hidden="true">↘</span>
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
            <span className="note-label">UN POCO SOBRE MÍ</span>
            <p>
              Llevo Staris, mi estudio de desarrollo web, y curso Ingeniería de
              Software en APEC.
            </p>
            <div className="note-bottom">
              <span>Santo Domingo, República Dominicana</span>
              <span>UTC−4 · Disponibilidad inmediata</span>
            </div>
          </aside>
        </section>
        <section id="proyectos" aria-labelledby="projects-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Mi trabajo</p>
              <h2 id="projects-title">Proyectos recientes</h2>
            </div>
            <p>
              Qué hace cada proyecto
              <br />y cuál fue mi parte.
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
              <p className="eyebrow">Mi recorrido</p>
              <h2 id="experience-title">Experiencia y formación</h2>
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
                  Además del sistema de visitas, trabajé en infraestructura de
                  Azure y en la migración de tres proyectos. También corregí
                  errores y preparé documentación técnica.
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
                  Atendí problemas de hardware y software de los usuarios y
                  colaboré con el control de los equipos y recursos de TI.
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
              <h3>Tecnologías que uso</h3>
              <dl>
                <dt>Backend y datos</dt>
                <dd>
                  C# / .NET, PHP / Laravel, Node.js, REST APIs, PostgreSQL,
                  MySQL y SQL Server.
                </dd>
                <dt>Interfaces</dt>
                <dd>React, Next.js, Vue 3, Astro, TypeScript y JavaScript.</dd>
                <dt>Infraestructura y despliegue</dt>
                <dd>
                  Azure, Google Cloud Run, Cloudflare, Docker, Git y GitHub
                  Actions.
                </dd>
                <dt>Automatización e IA</dt>
                <dd>
                  Escribo scripts y herramientas MCP. Uso Codex y Claude Code
                  como apoyo al desarrollo, y reviso y pruebo los cambios.
                </dd>
                <dt>Idiomas</dt>
                <dd>Español nativo. Inglés B2; sigo practicándolo.</dd>
              </dl>
            </aside>
          </div>
        </section>
        <section
          className="contact-section"
          id="contacto"
          aria-labelledby="contact-title"
        >
          <p className="eyebrow">Contacto</p>
          <h2 id="contact-title">Podemos trabajar juntos.</h2>
          <p>
            Estoy buscando trabajo remoto en español, en desarrollo web,
            backend, automatización o soporte técnico. Puedo empezar de
            inmediato. Si tienes una vacante o un proyecto, escríbeme.
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
        <span>Santo Domingo, República Dominicana</span>
      </footer>
    </>
  );
}
