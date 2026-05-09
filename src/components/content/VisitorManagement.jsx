import { Frontmatter } from '../ui/Frontmatter'
import { Metrics } from '../ui/Metrics'
import { Diagram } from '../ui/Diagram'
import { Mockup } from '../ui/Mockup'
import { Chips } from '../ui/Chips'
import { projects } from '../../data/projects'

/**
 * VisitorManagement — case study for the visitor management system.
 * Structured data (frontmatter, chips) comes from src/data/projects.js.
 */
export function VisitorManagement() {
  const data = projects.visitorManagement

  return (
    <div className="md">
      <Frontmatter entries={data.frontmatter} />

      <h1>
        <span className="h1-prefix">// case-study</span>
        Sistema de gestión de visitas
      </h1>
      <p className="lede">
        Reemplazo de un proceso manual con planillas y radio. Un único portal
        donde recepción registra visitas, los anfitriones reciben notificación
        y seguridad valida en la puerta — todo en menos de 30 segundos.
      </p>

      <Metrics items={data.metrics} />

      <h2><span className="num">01</span>El problema</h2>
      <p>
        Edificio corporativo con ~600 personas y volumen alto de visitas. El
        proceso vivía en una libreta y un walkie-talkie. Tres dolores claros:
        registro lento, sin trazabilidad y sin forma confiable de avisar al
        anfitrión.
      </p>

      <h2><span className="num">02</span>Diseño</h2>
      <p>
        Tres apps que comparten el mismo backend, pensadas como flujos cortos —
        no como dashboards. Cada rol ve solo lo que necesita.
      </p>
      <ul>
        <li><strong>Recepción</strong> — formulario rápido, foto opcional, genera QR y dispara notificación al anfitrión.</li>
        <li><strong>Anfitrión</strong> — ve sus visitas del día, puede pre-registrar (la visita llega y solo enseña QR).</li>
        <li><strong>Guardia</strong> — escanea QR, valida estado, registra entrada/salida. Funciona offline-first.</li>
      </ul>

      <Diagram label="flujo · check-in">
{`
   visitante              recepción              backend             anfitrión
       │                      │                     │                     │
       │   se presenta        │                     │                     │
       │ ───────────────►     │                     │                     │
       │                      │  POST /visits       │                     │
       │                      │ ──────────────────► │                     │
       │                      │                     │  push + email       │
       │                      │                     │ ──────────────────► │
       │                      │ ◄────── QR ──────── │                     │
       │ ◄─── QR + badge ───  │                     │                     │
       │                                                                  │
       │                                            guardia escanea       │
       │ ─────────────────────────────────────────────────►   GET /visit/:qr
       │                                              ◄─── 200 · activa ──
`}
      </Diagram>

      <h2><span className="num">03</span>Detalles que importaron</h2>
      <ul>
        <li><strong>Offline-first en la app del guardia.</strong> IndexedDB cache de las visitas activas; sincroniza cada 30s. Si cae la red, el portón sigue abriendo a quien tenía QR válido.</li>
        <li><strong>Auditoría inmutable.</strong> Cada cambio de estado va a una tabla append-only con hash encadenado. Útil para incidentes y para cumplir auditoría interna.</li>
        <li><strong>Notificaciones que llegan.</strong> Email + Teams + push web. Si una vía falla, las otras toman el relevo — y se mide cuál llegó primero.</li>
      </ul>

      <Mockup label="// mockup · placeholder" desc="Pantalla de recepción — registro en 4 campos" meta="tablet · 1280 × 800" />

      <Chips items={data.chips} />
    </div>
  )
}