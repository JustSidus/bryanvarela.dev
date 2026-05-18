import { FileIcon } from "../../icons";

const START_ITEMS = [
  { id: "about-me.md",     label: "about-me.md",     desc: "Mi perfil y experiencia" },
  { id: "contact.sh",      label: "contact.sh",      desc: "Información de contacto" },
  { id: "tech-stack.json", label: "tech-stack.json", desc: "Lenguajes y herramientas" },
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
          return (
            <li key={it.id}>
              <button
                type="button"
                className="welcome-doc__list-item"
                onClick={() => openFile?.(it.id)}
              >
                <FileIcon ext={ext} />
                <span className="welcome-doc__list-label">{it.label}</span>
                <span className="welcome-doc__list-desc">{it.desc}</span>
              </button>
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
