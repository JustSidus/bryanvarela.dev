import { Icon } from "../../../icons";
import { contact } from "../../../data/contact";

export function ProfilePanel() {
  return (
    <>
      <div className="sidebar-head">
        <span>Perfil</span>
      </div>
      <div
        style={{
          padding: "8px 14px 16px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-prose)",
            fontSize: 14,
            color: "var(--fg-0)",
            fontWeight: 600,
          }}
        >
          Bryan Varela
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11.5,
            color: "var(--fg-2)",
            marginTop: 2,
          }}
        >
          Backend & Cloud Engineer
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--fg-3)",
            marginTop: 2,
          }}
        >
          República Dominicana
        </div>
      </div>

      <div
        style={{
          padding: "12px 14px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--accent)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>↗</span> github.com/JustSidus
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--accent)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>↗</span> linkedin.com/in/bryan-varela-mazzei
          </a>
          <a
            href={`mailto:${contact.email}`}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--accent)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>✉</span> {contact.email}
          </a>
          <a
            href="/resume.pdf"
            download="cv-bryan-varela.pdf"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--fg-2)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 4,
            }}
          >
            <span>↓</span> Descargar CV
          </a>
        </div>
      </div>

      <div style={{ padding: "12px 14px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 8,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--ok)",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--ok)",
              letterSpacing: ".05em",
            }}
          >
            OPEN TO WORK
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11.5,
            color: "var(--fg-2)",
            lineHeight: 1.6,
          }}
        >
          backend · cloud · arquitectura
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--fg-3)",
            marginTop: 8,
            lineHeight: 1.5,
          }}
        >
          Prefiero email para contexto largo, LinkedIn para intros.
        </div>
      </div>
    </>
  );
}
