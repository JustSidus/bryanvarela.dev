/**
 * InfrastructureDiagram — clean, solid visual rendering of the Arelify flow.
 * Monospace font, colored blocks, no sketch/hand-drawn effects.
 */

function Box({ children, title, subtitle, variant = 'default', bullets = [] }) {
  return (
    <div className={`infra-box infra-box--${variant}`}>
      {(title || subtitle) && (
        <div className="infra-box__head">
          {title && <div className="infra-box__title">{title}</div>}
          {subtitle && <div className="infra-box__subtitle">{subtitle}</div>}
        </div>
      )}
      {bullets.length > 0 && (
        <ul className="infra-box__bullets">
          {bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      )}
      {children}
    </div>
  )
}

function Arrow() {
  return <div className="infra-arrow" />
}

function Actor({ name, action, host }) {
  return (
    <div className="infra-actor">
      <div className="infra-actor__name">{name}</div>
      <div className="infra-actor__host">{host}</div>
      <div className="infra-actor__action">{action}</div>
    </div>
  )
}

function SplitArrow() {
  return (
    <div className="infra-split">
      <div className="infra-split__branch">
        <div className="infra-split__line" />
        <span className="infra-split__label">/api/v1/*</span>
        <span className="infra-split__sublabel">BFF con cookies opacas</span>
      </div>
      <div className="infra-split__branch">
        <div className="infra-split__line" />
        <span className="infra-split__label">Bundle SPA</span>
        <span className="infra-split__sublabel">assets versionados</span>
      </div>
    </div>
  )
}

function ForkDown() {
  return (
    <div className="infra-fork">
      <div className="infra-fork__stem" />
      <div className="infra-fork__legs">
        <div className="infra-fork__leg" />
        <div className="infra-fork__leg" />
      </div>
    </div>
  )
}

export function InfrastructureDiagram() {
  return (
    <div className="infra-diagram">
      <div className="infra-header">
        <span className="infra-header__title">ARELIFY · FLUJO DE PRODUCCIÓN</span>
      </div>

      {/* ── Actors ── */}
      <div className="infra-actors">
        <Actor name="Cliente final"    host="slug.arelify.com" action="Reservar cita" />
        <Actor name="Dueño del negocio" host="slug.arelify.com" action="/workspace" />
        <Actor name="Bot de Google"     host="slug.arelify.com" action="Rastreo SEO" />
      </div>

      <Arrow />

      {/* ── Cloudflare Edge ── */}
      <Box title="CLOUDFLARE EDGE" subtitle="DNS · WAF · TLS" variant="edge">
        <div className="infra-pill">*.arelify.com → Worker BFF</div>
      </Box>

      <Arrow />

      {/* ── Cloudflare Worker ── */}
      <Box
        title="CLOUDFLARE WORKER"
        subtitle="Backend-for-Frontend"
        variant="worker"
        bullets={[
          'Resuelve el subdominio del negocio',
          'Pre-renderiza HTML + JSON-LD para SEO',
          'Proxea /api/* al backend (oculta el origen real)',
          'Sirve sitemap.xml y robots.txt dinámicos',
        ]}
      />

      <SplitArrow />

      {/* ── Two columns: API + SPA ── */}
      <div className="infra-row">
        <Box
          title="GOOGLE CLOUD RUN"
          subtitle="us-east4 · .NET 10"
          variant="api"
          bullets={[
            'JWT en cookie httpOnly',
            'Límite de peticiones por capa',
            'Aislamiento multi-tenant (EF)',
            'Disponibilidad calculada en UTC',
            'Auditoría inmutable',
          ]}
        />
        <Box
          title="CLOUDFLARE PAGES"
          subtitle="React 19 + Vite"
          variant="spa"
          bullets={['Rutas por host + ruta']}
        />
      </div>

      <ForkDown />

      {/* ── Bottom row: Postgres + WorkOS ── */}
      <div className="infra-row">
        <Box
          title="POSTGRESQL 16"
          subtitle="Administrada"
          variant="db"
          bullets={[
            'TenantId por fila',
            'Índice único anti-doble-reserva',
            'Auditoría inmutable',
          ]}
        />
        <Box
          title="WORKOS"
          subtitle="OIDC · Login sin contraseña"
          variant="auth"
          bullets={[
            'Código de verificación enviado por email',
            'Identidad federada',
          ]}
        />
      </div>

      {/* ── Connection labels ── */}
      <div className="infra-labels">
        <span>TLS interno</span>
        <span>OIDC</span>
      </div>
    </div>
  )
}
