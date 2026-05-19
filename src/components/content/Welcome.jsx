import { FileIcon } from "../../icons";
import { contact } from "../../data/contact";

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
    <path
      fill="currentColor"
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
    />
  </svg>
);

const START_ITEMS = [
  { id: "about-me.md",     label: "about-me.md",     desc: "Mi perfil y experiencia" },
  { id: "contact.sh",      label: "contact.sh",      desc: "Información de contacto" },
  { id: "tech-stack.json", label: "tech-stack.json", desc: "Lenguajes y herramientas" },
  {
    id: "resume.pdf",
    label: "resume.pdf",
    desc: "Descargar CV (PDF)",
    href: "/resume.pdf",
    download: "cv-bryan-varela.pdf",
  },
  {
    id: "github-profile",
    label: "github/JustSidus",
    desc: "Repositorios y código público",
    href: contact.github,
    target: "_blank",
    icon: <GitHubIcon />,
  },
];

const RECENT_ITEMS = [
  { id: "arelify-platform.cs",    label: "arelify-platform.cs",    desc: "SaaS B2B multi-tenant" },
  { id: "visitor-management.php", label: "visitor-management.php", desc: "Infraestructura Azure + Backend" },
  { id: "vscode-extension.ts",    label: "vscode-extension.ts",    desc: "Extensión open source" },
];

function Column({ title, items, openFile }) {
  return (
    <div className="welcome-doc__col">
      <h2>{title}</h2>
      <ul className="welcome-doc__list">
        {items.map((it) => {
          const ext = it.id.split(".").pop();
          const inner = (
            <>
              {it.icon ?? <FileIcon ext={ext} />}
              <span className="welcome-doc__list-label">{it.label}</span>
              <span className="welcome-doc__list-desc">{it.desc}</span>
            </>
          );
          return (
            <li key={it.id}>
              {it.href ? (
                <a
                  className="welcome-doc__list-item"
                  href={it.href}
                  download={it.download}
                  target={it.target}
                  rel={it.target === "_blank" ? "noreferrer" : undefined}
                >
                  {inner}
                </a>
              ) : (
                <button
                  type="button"
                  className="welcome-doc__list-item"
                  onClick={() => openFile?.(it.id)}
                >
                  {inner}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Welcome({ openFile }) {
  return (
    <div className="welcome-doc">
      <header className="welcome-doc__header">
        <h1 className="welcome-doc__title">Hola, soy Bryan</h1>
        <p className="welcome-doc__subtitle">
          Backend &amp; Cloud Engineer. Diseño sistemas, tomo decisiones técnicas y las despliego.
        </p>
      </header>

      <div className="welcome-doc__grid">
        <Column title="Comenzar"  items={START_ITEMS}  openFile={openFile} />
        <Column title="Proyectos" items={RECENT_ITEMS} openFile={openFile} />
      </div>
    </div>
  );
}
