import { Frontmatter } from '../ui/Frontmatter'
import { Metrics } from '../ui/Metrics'
import { CodeBlock, tok } from '../ui/CodeBlock'
import { Diagram } from '../ui/Diagram'
import { Mockup } from '../ui/Mockup'
import { ProblemSolution } from '../ui/ProblemSolution'
import { Chips } from '../ui/Chips'
import { projects } from '../../data/projects'

/**
 * ArelifyPlatform — case study for the Arelify SaaS platform.
 * Structured data (frontmatter, metrics, chips) comes from src/data/projects.js.
 */
export function ArelifyPlatform() {
  const data = projects.arelify

  return (
    <div className="md">
      <Frontmatter entries={data.frontmatter} />

      <h1>
        <span className="h1-prefix">// case-study</span>
        Arelify — plataforma SaaS B2B
      </h1>
      <p className="lede">
        Plataforma multi-tenant para clientes que necesitan operar su propio
        backoffice sobre una infraestructura compartida. El reto no era hacerla
        funcionar; era hacer que escalara de 3 a 30 tenants sin reescribir el
        backend.
      </p>

      <Metrics items={data.metrics} />

      <h2><span className="num">01</span>Contexto</h2>
      <p>
        El producto entró al mercado como un sistema dedicado por cliente. Cada
        instancia era un fork del backend con configuración propia. Funcionaba a 3
        clientes; a 8 ya era inmanejable: cada parche se aplicaba N veces, los
        despliegues tomaban horas y la cobranza por tenant era manual.
      </p>
      <p>
        La decisión: rearquitectar como plataforma multi-tenant real, sin perder
        el aislamiento de datos que ya prometíamos por contrato.
      </p>

      <h2><span className="num">02</span>Decisiones de arquitectura</h2>

      <h3><span className="arrow">→</span>Aislamiento por esquema, no por base</h3>
      <p>
        Schema-per-tenant en PostgreSQL. Un solo cluster, una conexión por
        request, el tenant se resuelve por subdominio y se inyecta como{' '}
        <code>SET search_path</code> al inicio de cada unidad de trabajo. Los
        clientes obtienen aislamiento real sin pagar el costo operativo de N bases.
      </p>

      <Diagram label="arquitectura · alto nivel">
{`
   ┌─────────────────────────────────────────────────────────────┐
   │                       Cloudflare (edge)                      │
   │   tenant.arelify.app  ──►  WAF · cache · resolución tenant   │
   └─────────────────────────────────────────────────────────────┘
                                 │
                  ┌──────────────┴──────────────┐
                  ▼                             ▼
        ┌──────────────────┐         ┌──────────────────────┐
        │  Web (React)     │         │  API (.NET 8)        │
        │  Cloudflare Pages│  ──►    │  Cloud Run           │
        │  · auth · ui     │         │  · resolver tenant   │
        └──────────────────┘         │  · CQRS handlers     │
                                     └──────────┬───────────┘
                                                │
                              ┌─────────────────┼─────────────────┐
                              ▼                 ▼                 ▼
                       ┌────────────┐  ┌────────────────┐  ┌─────────────┐
                       │ PostgreSQL │  │ Cloud Storage  │  │ Pub/Sub     │
                       │ schema     │  │ (assets/PDFs)  │  │ (events)    │
                       │ -per-tenant│  │ tenant prefix  │  │ async work  │
                       └────────────┘  └────────────────┘  └─────────────┘
`}
      </Diagram>

      <h3><span className="arrow">→</span>Clean Architecture, en serio</h3>
      <p>
        Cuatro capas, dependencias hacia el centro. <strong>Domain</strong>: entidades y
        reglas. <strong>Application</strong>: casos de uso vía MediatR. <strong>Infrastructure</strong>:
        EF Core, almacenamiento, integraciones. <strong>Web</strong>: controladores delgados.
        La regla de oro es que el dominio no sabe que existe la base de datos.
      </p>

      <CodeBlock path="application/handlers/CreateInvoice.cs" lang="C#">
        {tok('public sealed', 'key')} {tok('record', 'key')} {tok('CreateInvoiceCommand', 'typ')}({'\n'}
        {'    '}{tok('Guid', 'typ')} CustomerId,{'\n'}
        {'    '}{tok('decimal', 'typ')} Amount,{'\n'}
        {'    '}{tok('string', 'typ')} Currency){tok(': ', 'pun')}{tok('IRequest', 'typ')}{tok('<Result<Invoice>>', 'pun')};{'\n\n'}
        {tok('public sealed class', 'key')} {tok('CreateInvoiceHandler', 'typ')} {tok(':', 'pun')} {tok('IRequestHandler', 'typ')}{tok('<CreateInvoiceCommand, Result<Invoice>>', 'pun')}{'\n'}
        {'{'}{'\n'}
        {'    '}{tok('// dependencias inyectadas — no hay \'new\' en el dominio', 'com')}{'\n'}
        {'    '}{tok('private readonly', 'key')} {tok('ITenantContext', 'typ')} _tenant;{'\n'}
        {'    '}{tok('private readonly', 'key')} {tok('IInvoiceRepository', 'typ')} _invoices;{'\n'}
        {'    '}{tok('private readonly', 'key')} {tok('IDomainEventBus', 'typ')} _events;{'\n\n'}
        {'    '}{tok('public async', 'key')} {tok('Task', 'typ')}{tok('<Result<Invoice>>', 'pun')} {tok('Handle', 'fn')}({'\n'}
        {'        '}{tok('CreateInvoiceCommand', 'typ')} cmd,{'\n'}
        {'        '}{tok('CancellationToken', 'typ')} ct){'\n'}
        {'    {'}{'\n'}
        {'        '}{tok('var', 'key')} invoice {tok('=', 'pun')} {tok('Invoice', 'typ')}.{tok('Open', 'fn')}(_tenant.Id, cmd.CustomerId, cmd.Amount);{'\n'}
        {'        '}{tok('await', 'key')} _invoices.{tok('AddAsync', 'fn')}(invoice, ct);{'\n'}
        {'        '}{tok('await', 'key')} _events.{tok('PublishAsync', 'fn')}(invoice.DomainEvents, ct);{'\n'}
        {'        '}{tok('return', 'key')} {tok('Result', 'typ')}.{tok('Ok', 'fn')}(invoice);{'\n'}
        {'    }'}{'\n'}
        {'}'}
      </CodeBlock>

      <h3><span className="arrow">→</span>Resolución de tenant en el borde</h3>
      <p>
        Cloudflare Worker antes del API: lee el subdominio, valida que el tenant
        exista y esté activo, inyecta un header firmado <code>X-Tenant-Id</code>.
        El API confía en el header pero no lo lee del cliente — solo del worker
        autenticado. Esto saca lógica caliente del backend y la pone en CDN.
      </p>

      <h2><span className="num">03</span>Problemas → soluciones</h2>
      <ProblemSolution pairs={[
        {
          problem: 'Los despliegues paraban a todos los tenants 30s mientras EF aplicaba migraciones a la base compartida.',
          solution: 'Migraciones por tenant, ejecutadas en background al primer request del schema. El despliegue es instantáneo; los esquemas migran en perezoso, en paralelo, con flag de cierre.',
        },
        {
          problem: 'Un tenant grande satura conexiones y degrada a los demás (noisy neighbor).',
          solution: 'Pool dedicado por tenant en PgBouncer + cuotas por minuto en Cloud Run con concurrency limits. El ruido se contiene; el SLO se mide por tenant, no global.',
        },
        {
          problem: 'El equipo de soporte pedía datos cruzados que no eran replicables sin tocar prod.',
          solution: 'Read replica con vista materializada por tenant + portal interno con scopes por rol. Soporte resuelve el 80% de los tickets sin un ingeniero.',
        },
      ]} />

      <h2><span className="num">04</span>Capturas</h2>
      <Mockup label="// mockup · placeholder" desc="Panel de admin del tenant (vista de facturación)" meta="1440 × 900" />
      <Mockup label="// diagrama · placeholder" desc="Pipeline de despliegue por anillos (canary → 10% → all)" meta="1200 × 600" />

      <h2><span className="num">05</span>Lo que aprendí</h2>
      <ul>
        <li>Multi-tenant no es una decisión de base de datos; es una decisión de <strong>contratos operacionales</strong>. Los SLAs por tenant te obligan a observar por tenant.</li>
        <li>El borde es tu amigo — sacar resolución de tenant, rate-limit y cache a Cloudflare bajó la latencia p95 ~40 ms sin tocar el API.</li>
        <li>Una hoja de cálculo con tenants activos, su ring de despliegue y su SLO sigue siendo más útil que cualquier dashboard.</li>
      </ul>

      <Chips items={data.chips} />
    </div>
  )
}