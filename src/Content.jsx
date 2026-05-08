import React, { useState } from 'react'

const tok = (text, type) => <span className={`tk-${type}`}>{text}</span>

export function AboutMe() {
  return (
    <div className="md">
      <div className="frontmatter">
        <span className="k">name</span>      <span className="v">Bryan</span>
        <span className="k">role</span>      <span className="v accent">Software Engineer · Backend &amp; Cloud</span>
        <span className="k">focus</span>     <span className="v">Plataformas escalables · Multi-tenant · Arquitectura</span>
        <span className="k">stack</span>     <span className="v">C# · .NET · React · Vue · SQL · GCP · Cloudflare · Azure</span>
        <span className="k">status</span>    <span className="v"><span className="lang-dot" style={{ background: 'var(--ok)', marginRight: 6, verticalAlign: 'middle' }}></span>Disponible para roles backend / arquitectura</span>
      </div>

      <h1>
        <span className="h1-prefix"># about-me</span>
        Construyo plataformas que aguantan.
      </h1>
      <p className="lede">
        Software Engineer enfocado en backend y nube. Diseño sistemas multi-tenant,
        arquitecturas en capas y servicios que escalan sin volverse frágiles.
        Me importan las decisiones de diseño que envejecen bien.
      </p>

      <h2><span className="num">01</span>Qué hago</h2>
      <p>
        Trabajo en la capa donde se cruzan <strong>arquitectura</strong>, <strong>persistencia</strong> y <strong>operación</strong>. La parte
        invisible: la que decide si tu producto sigue siendo barato de mantener
        cuando llegas a 10×, 100×.
      </p>
      <ul>
        <li>APIs y servicios sobre <code>.NET</code> con <strong>Clean Architecture</strong> y separación N-Tier.</li>
        <li>Modelos de datos relacionales claros — índices, transacciones, integridad referencial antes que ORMs mágicos.</li>
        <li>Sistemas <strong>multi-tenant</strong>: aislamiento de datos, cobranza por tenant, despliegues por anillos.</li>
        <li>Infraestructura serverless / contenerizada — <code>Cloud Run</code>, <code>Cloudflare</code>, <code>Azure App Service</code>.</li>
        <li>Frontends funcionales en <code>React</code> y <code>Vue</code> cuando el flujo lo pide. No me defino como diseñador.</li>
      </ul>

      <h2><span className="num">02</span>Cómo pienso</h2>
      <div className="callout">
        <div className="head">// principio de trabajo</div>
        Prefiero código aburrido y predecible sobre código clever. La complejidad
        es inventario: hay que justificarla. Si una abstracción no me devuelve
        algo medible — extensibilidad real, menos bugs, despliegue más simple —
        no entra.
      </div>
      <ul>
        <li><strong>Diseño primero.</strong> Un diagrama, una decisión escrita, una alternativa descartada. Después se escribe el código.</li>
        <li><strong>Bordes explícitos.</strong> Un servicio con contratos claros vale más que diez microservicios mal cortados.</li>
        <li><strong>Observabilidad de día uno.</strong> Logs estructurados, trazas, métricas — nadie depura ciego en producción.</li>
        <li><strong>El negocio manda.</strong> La arquitectura existe para que la empresa pueda cambiar de opinión barato.</li>
      </ul>

      <h2><span className="num">03</span>Áreas activas</h2>
      <div className="kv">
        <div className="k">backend</div>      <div className="v">.NET 8 · ASP.NET Core · EF Core · MediatR · FluentValidation</div>
        <div className="k">datos</div>        <div className="v">PostgreSQL · SQL Server · esquemas multi-tenant · migraciones versionadas</div>
        <div className="k">cloud</div>        <div className="v">Google Cloud Run · Cloudflare Workers/Pages · Azure App Service</div>
        <div className="k">frontend</div>     <div className="v">React (cuando hace falta) · Vue 3 + Composition API</div>
        <div className="k">prácticas</div>    <div className="v">Clean Architecture · CQRS · Domain Events · Testing pragmático</div>
      </div>

      <h2><span className="num">04</span>Fuera del editor</h2>
      <p>
        Leo más diseño de sistemas que tutoriales. Documento decisiones técnicas
        en ADRs aunque trabaje solo. Si algo del portafolio te interesa, abrelo
        — están escritos como casos, no como bullets de CV.
      </p>
      <p style={{ color: 'var(--fg-3)', fontSize: 13.5, marginTop: 28 }}>
        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-3)' }}>// </span>
        Para ver proyectos, abre <code>projects/</code> en el explorador o presiona{' '}
        <code>Ctrl+K</code>.<span className="read-caret"></span>
      </p>
    </div>
  )
}

export function ArelifyPlatform() {
  return (
    <div className="md">
      <div className="frontmatter">
        <span className="k">project</span>   <span className="v accent">Arelify Platform</span>
        <span className="k">type</span>      <span className="v">SaaS B2B · Multi-tenant</span>
        <span className="k">role</span>      <span className="v">Tech lead · Backend &amp; arquitectura</span>
        <span className="k">stack</span>     <span className="v">.NET 8 · PostgreSQL · React · Cloud Run · Cloudflare</span>
        <span className="k">status</span>    <span className="v"><span className="lang-dot" style={{ background: 'var(--ok)', marginRight: 6, verticalAlign: 'middle' }}></span>En producción</span>
      </div>

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

      <div className="metrics">
        <div className="metric"><div className="v">12<span className="unit">+ tenants</span></div><div className="k">en producción</div></div>
        <div className="metric"><div className="v">~180<span className="unit"> ms</span></div><div className="k">p95 API</div></div>
        <div className="metric"><div className="v">99.9<span className="unit">%</span></div><div className="k">uptime últimos 6m</div></div>
        <div className="metric"><div className="v">1<span className="unit"> · ingeniero</span></div><div className="k">backend principal</div></div>
      </div>

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

      <div className="diagram">
        <span className="label">arquitectura · alto nivel</span>
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
      </div>

      <h3><span className="arrow">→</span>Clean Architecture, en serio</h3>
      <p>
        Cuatro capas, dependencias hacia el centro. <strong>Domain</strong>: entidades y
        reglas. <strong>Application</strong>: casos de uso vía MediatR. <strong>Infrastructure</strong>:
        EF Core, almacenamiento, integraciones. <strong>Web</strong>: controladores delgados.
        La regla de oro es que el dominio no sabe que existe la base de datos.
      </p>

      <div className="codeblock">
        <div className="codeblock-head"><span className="lang">application/handlers/CreateInvoice.cs</span><span>C#</span></div>
        <div className="codeblock-body"><pre>{tok('public sealed', 'key')} {tok('record', 'key')} {tok('CreateInvoiceCommand', 'typ')}({'\n'}
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
{'}'}</pre></div>
      </div>

      <h3><span className="arrow">→</span>Resolución de tenant en el borde</h3>
      <p>
        Cloudflare Worker antes del API: lee el subdominio, valida que el tenant
        exista y esté activo, inyecta un header firmado <code>X-Tenant-Id</code>.
        El API confía en el header pero no lo lee del cliente — solo del worker
        autenticado. Esto saca lógica caliente del backend y la pone en CDN.
      </p>

      <h2><span className="num">03</span>Problemas → soluciones</h2>
      <div className="ps">
        <div className="problem">
          <h4>// problema</h4>
          <p>Los despliegues paraban a todos los tenants 30s mientras EF aplicaba migraciones a la base compartida.</p>
        </div>
        <div className="solution">
          <h4>// solución</h4>
          <p>Migraciones por tenant, ejecutadas en background al primer request del schema. El despliegue es instantáneo; los esquemas migran en perezoso, en paralelo, con flag de cierre.</p>
        </div>
        <div className="problem">
          <h4>// problema</h4>
          <p>Un tenant grande satura conexiones y degrada a los demás (noisy neighbor).</p>
        </div>
        <div className="solution">
          <h4>// solución</h4>
          <p>Pool dedicado por tenant en PgBouncer + cuotas por minuto en Cloud Run con concurrency limits. El ruido se contiene; el SLO se mide por tenant, no global.</p>
        </div>
        <div className="problem">
          <h4>// problema</h4>
          <p>El equipo de soporte pedía datos cruzados que no eran replicables sin tocar prod.</p>
        </div>
        <div className="solution">
          <h4>// solución</h4>
          <p>Read replica con vista materializada por tenant + portal interno con scopes por rol. Soporte resuelve el 80% de los tickets sin un ingeniero.</p>
        </div>
      </div>

      <h2><span className="num">04</span>Capturas</h2>
      <div className="mockup">
        <div>
          <div className="label">// mockup · placeholder</div>
          <div className="desc">Panel de admin del tenant (vista de facturación)</div>
        </div>
        <div className="meta">1440 × 900</div>
      </div>
      <div className="mockup">
        <div>
          <div className="label">// diagrama · placeholder</div>
          <div className="desc">Pipeline de despliegue por anillos (canary → 10% → all)</div>
        </div>
        <div className="meta">1200 × 600</div>
      </div>

      <h2><span className="num">05</span>Lo que aprendí</h2>
      <ul>
        <li>Multi-tenant no es una decisión de base de datos; es una decisión de <strong>contratos operacionales</strong>. Los SLAs por tenant te obligan a observar por tenant.</li>
        <li>El borde es tu amigo — sacar resolución de tenant, rate-limit y cache a Cloudflare bajó la latencia p95 ~40 ms sin tocar el API.</li>
        <li>Una hoja de cálculo con tenants activos, su ring de despliegue y su SLO sigue siendo más útil que cualquier dashboard.</li>
      </ul>

      <div className="chips">
        <span className="chip"><span className="dot" style={{ background: 'var(--lang-cs)' }}></span>.NET 8</span>
        <span className="chip"><span className="dot" style={{ background: 'var(--lang-ts)' }}></span>React</span>
        <span className="chip">PostgreSQL</span>
        <span className="chip">Cloud Run</span>
        <span className="chip">Cloudflare Workers</span>
        <span className="chip">MediatR</span>
        <span className="chip">EF Core</span>
        <span className="chip accent">Multi-tenant</span>
      </div>
    </div>
  )
}

export function VisitorManagement() {
  return (
    <div className="md">
      <div className="frontmatter">
        <span className="k">project</span>   <span className="v accent">Visitor Management System</span>
        <span className="k">type</span>      <span className="v">Aplicación interna · gestión de accesos</span>
        <span className="k">role</span>      <span className="v">Full-stack engineer</span>
        <span className="k">stack</span>     <span className="v">Vue 3 · TypeScript · .NET · SQL Server · Azure</span>
      </div>

      <h1>
        <span className="h1-prefix">// case-study</span>
        Sistema de gestión de visitas
      </h1>
      <p className="lede">
        Reemplazo de un proceso manual con planillas y radio. Un único portal
        donde recepción registra visitas, los anfitriones reciben notificación
        y seguridad valida en la puerta — todo en menos de 30 segundos.
      </p>

      <div className="metrics">
        <div className="metric"><div className="v">~28<span className="unit"> s</span></div><div className="k">tiempo registro</div></div>
        <div className="metric"><div className="v">3<span className="unit"> · roles</span></div><div className="k">recepción / anfitrión / guardia</div></div>
        <div className="metric"><div className="v">100<span className="unit">%</span></div><div className="k">trazabilidad QR</div></div>
      </div>

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

      <div className="diagram">
        <span className="label">flujo · check-in</span>
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
      </div>

      <h2><span className="num">03</span>Detalles que importaron</h2>
      <ul>
        <li><strong>Offline-first en la app del guardia.</strong> IndexedDB cache de las visitas activas; sincroniza cada 30s. Si cae la red, el portón sigue abriendo a quien tenía QR válido.</li>
        <li><strong>Auditoría inmutable.</strong> Cada cambio de estado va a una tabla append-only con hash encadenado. Útil para incidentes y para cumplir auditoría interna.</li>
        <li><strong>Notificaciones que llegan.</strong> Email + Teams + push web. Si una vía falla, las otras toman el relevo — y se mide cuál llegó primero.</li>
      </ul>

      <div className="mockup">
        <div>
          <div className="label">// mockup · placeholder</div>
          <div className="desc">Pantalla de recepción — registro en 4 campos</div>
        </div>
        <div className="meta">tablet · 1280 × 800</div>
      </div>

      <div className="chips">
        <span className="chip"><span className="dot" style={{ background: 'var(--lang-vue)' }}></span>Vue 3</span>
        <span className="chip">TypeScript</span>
        <span className="chip">.NET</span>
        <span className="chip">SQL Server</span>
        <span className="chip">Azure App Service</span>
        <span className="chip">SignalR</span>
        <span className="chip accent">Offline-first</span>
      </div>
    </div>
  )
}

export function LayeredEcommerce() {
  return (
    <div className="md">
      <div className="frontmatter">
        <span className="k">project</span>   <span className="v accent">Layered E-commerce</span>
        <span className="k">type</span>      <span className="v">Plataforma e-commerce · Arquitectura N-Tier</span>
        <span className="k">role</span>      <span className="v">Backend engineer · Diseño de capas</span>
        <span className="k">stack</span>     <span className="v">C# · ASP.NET Core · SQL Server · Redis · Docker</span>
      </div>

      <h1>
        <span className="h1-prefix">// case-study</span>
        E-commerce N-Tier — separar para sostener
      </h1>
      <p className="lede">
        Caso de estudio sobre cómo una arquitectura en capas bien cortada
        permitió que un equipo pequeño sostuviera un catálogo creciente, sin
        caer en microservicios prematuros.
      </p>

      <h2><span className="num">01</span>Por qué N-Tier</h2>
      <p>
        Microservicios estaban de moda. El equipo eran 4 personas y el negocio
        cambiaba a la semana. La pregunta correcta no era "¿cómo escalo a 100
        servicios?", era "¿cómo evito que un cambio toque cinco archivos no
        relacionados?".
      </p>
      <p>
        Respuesta: cuatro capas verticales con dependencias unidireccionales,
        bordes explícitos por interfaz. Un único proceso, despliegue simple,
        pero con la disciplina interna que un sistema más grande exigiría.
      </p>

      <div className="diagram">
        <span className="label">capas · n-tier</span>
{`
   ┌──────────────────────────────────────────────────┐
   │  Presentation                                    │  ← API · controllers
   │  · request/response DTOs   · model binding       │
   ├──────────────────────────────────────────────────┤
   │  Application / Services                          │  ← orquestación
   │  · use-cases  · validations  · cross-cutting     │
   ├──────────────────────────────────────────────────┤
   │  Domain                                          │  ← reglas del negocio
   │  · entities  · value objects  · domain services  │
   ├──────────────────────────────────────────────────┤
   │  Infrastructure / Data                           │  ← persistencia
   │  · repositories  · EF Core  · email · storage    │
   └──────────────────────────────────────────────────┘
            ▲ las dependencias apuntan hacia ARRIBA
`}
      </div>

      <h2><span className="num">02</span>Reglas de oro</h2>
      <ul>
        <li><strong>Domain no referencia infraestructura.</strong> Si necesita persistir algo, define la interfaz; otro la implementa.</li>
        <li><strong>Cada capa expone DTOs propios.</strong> Las entidades no se filtran al API ni a la UI.</li>
        <li><strong>Application orquesta, no decide reglas.</strong> Las reglas viven en Domain. Application las invoca.</li>
        <li><strong>Una transacción por caso de uso.</strong> Si necesitas dos, probablemente son dos casos de uso.</li>
      </ul>

      <div className="codeblock">
        <div className="codeblock-head"><span className="lang">domain/entities/Order.cs</span><span>C#</span></div>
        <div className="codeblock-body"><pre>{tok('public sealed class', 'key')} {tok('Order', 'typ')}{'\n'}
{'{'}{'\n'}
{'    '}{tok('private readonly', 'key')} {tok('List', 'typ')}{tok('<', 'pun')}{tok('OrderLine', 'typ')}{tok('>', 'pun')} _lines {tok('=', 'pun')} {tok('new', 'key')}();{'\n\n'}
{'    '}{tok('public', 'key')} {tok('Guid', 'typ')} Id {'{'} {tok('get', 'key')}; {tok('private set', 'key')}; {'}'}{'\n'}
{'    '}{tok('public', 'key')} {tok('OrderStatus', 'typ')} Status {'{'} {tok('get', 'key')}; {tok('private set', 'key')}; {'}'}{'\n'}
{'    '}{tok('public', 'key')} {tok('IReadOnlyList', 'typ')}{tok('<', 'pun')}{tok('OrderLine', 'typ')}{tok('>', 'pun')} Lines {'=> _lines;'}{'\n\n'}
{'    '}{tok('// el dominio se protege a sí mismo — sin setters públicos', 'com')}{'\n'}
{'    '}{tok('public void', 'key')} {tok('AddLine', 'fn')}({tok('ProductRef', 'typ')} product, {tok('int', 'typ')} qty){'\n'}
{'    {'}{'\n'}
{'        '}{tok('if', 'key')} (Status {tok('!=', 'pun')} {tok('OrderStatus', 'typ')}.Draft){'\n'}
{'            '}{tok('throw new', 'key')} {tok('DomainException', 'typ')}({tok('"order is not draft"', 'str')});{'\n'}
{'        '}_lines.{tok('Add', 'fn')}({tok('new', 'key')} {tok('OrderLine', 'typ')}(product, qty));{'\n'}
{'    }'}{'\n'}
{'}'}</pre></div>
      </div>

      <h2><span className="num">03</span>Resultado</h2>
      <ul>
        <li>Cuatro features nuevas en un trimestre, sin romper el catálogo existente.</li>
        <li>Tests unitarios reales en la capa Domain — sin mocks de base de datos.</li>
        <li>Tres meses después, separar el módulo de pagos a un servicio aparte costó dos días: las dependencias ya estaban del lado correcto.</li>
      </ul>

      <div className="callout">
        <div className="head">// reflexión</div>
        N-Tier no está pasado de moda. Es la arquitectura que más se justifica
        cuando el negocio aún está aprendiendo qué quiere ser. Cuando el dolor
        de escalar es real, ya tienes los bordes para cortar.
      </div>

      <div className="chips">
        <span className="chip"><span className="dot" style={{ background: 'var(--lang-cs)' }}></span>C#</span>
        <span className="chip">ASP.NET Core</span>
        <span className="chip">SQL Server</span>
        <span className="chip">Redis</span>
        <span className="chip">Docker</span>
        <span className="chip accent">N-Tier</span>
        <span className="chip accent">Clean Arch</span>
      </div>
    </div>
  )
}

export function TechStack() {
  const cats = [
    {
      title: 'Lenguajes',
      items: [
        { name: 'C# / .NET', lvl: 0.95, dot: 'var(--lang-cs)' },
        { name: 'TypeScript', lvl: 0.85, dot: 'var(--lang-ts)' },
        { name: 'SQL', lvl: 0.85, dot: 'var(--lang-json)' },
        { name: 'JavaScript', lvl: 0.85, dot: 'var(--lang-json)' },
        { name: 'Python', lvl: 0.55, dot: 'var(--fg-2)' },
      ],
    },
    {
      title: 'Backend',
      items: [
        { name: 'ASP.NET Core', lvl: 0.95 },
        { name: 'EF Core', lvl: 0.9 },
        { name: 'MediatR · CQRS', lvl: 0.85 },
        { name: 'FluentValidation', lvl: 0.8 },
        { name: 'SignalR', lvl: 0.7 },
      ],
    },
    {
      title: 'Datos',
      items: [
        { name: 'PostgreSQL', lvl: 0.85 },
        { name: 'SQL Server', lvl: 0.9 },
        { name: 'Redis', lvl: 0.7 },
        { name: 'Multi-tenant patterns', lvl: 0.85 },
      ],
    },
    {
      title: 'Cloud & Infra',
      items: [
        { name: 'Google Cloud Run', lvl: 0.85 },
        { name: 'Cloudflare (Workers / Pages)', lvl: 0.8 },
        { name: 'Azure App Service', lvl: 0.75 },
        { name: 'Docker', lvl: 0.85 },
        { name: 'GitHub Actions', lvl: 0.8 },
      ],
    },
    {
      title: 'Frontend',
      items: [
        { name: 'React', lvl: 0.75, dot: 'var(--lang-ts)' },
        { name: 'Vue 3 (Composition API)', lvl: 0.8, dot: 'var(--lang-vue)' },
        { name: 'Tailwind CSS', lvl: 0.7 },
        { name: 'Vite', lvl: 0.75 },
      ],
    },
    {
      title: 'Prácticas',
      items: [
        { name: 'Clean Architecture', lvl: 0.9 },
        { name: 'N-Tier', lvl: 0.9 },
        { name: 'ADRs · Documentación técnica', lvl: 0.85 },
        { name: 'Code Review', lvl: 0.85 },
        { name: 'Testing pragmático', lvl: 0.75 },
      ],
    },
  ]

  return (
    <div className="md">
      <h1>
        <span className="h1-prefix">{'{ }'}</span>
        Tech stack
      </h1>
      <p className="lede">
        Las herramientas con las que trabajo a diario, agrupadas por capa.
        El nivel es honesto: alto = lo uso en producción y conozco sus
        bordes; medio = sé lo que hace y lo defiendo en una decisión.
      </p>

      <div className="stack-grid">
        {cats.map((c, i) => (
          <div key={i} className="stack-cat">
            <h3>{c.title}</h3>
            <ul>
              {c.items.map((it, j) => (
                <li key={j}>
                  <span className="name">
                    <span className="lang-dot" style={{ background: it.dot || 'var(--accent)' }}></span>
                    {it.name}
                  </span>
                  <span className="lvl">
                    <span className="lvl-bar"><i style={{ width: `${Math.round(it.lvl * 100)}%` }}></i></span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2><span className="num">02</span>Lo que no aparece</h2>
      <ul>
        <li><strong>No-go:</strong> frameworks que prometen "todo en una caja" pero ocultan SQL — prefiero ver la consulta.</li>
        <li><strong>No-go:</strong> ORMs configurados con magia implícita; EF Core sí, pero con migraciones revisadas a mano.</li>
        <li><strong>Por aprender:</strong> Rust para servicios chicos críticos, Temporal para workflows duraderos.</li>
      </ul>
    </div>
  )
}

export function ContactSh() {
  return (
    <div className="md">
      <h1>
        <span className="h1-prefix">$</span>
        contact.sh
      </h1>
      <p className="lede">
        Si lo que viste te encaja — un rol backend, una arquitectura que
        revisar, o solo cambiar opiniones sobre multi-tenant — escríbeme.
        Respondo en horas hábiles.
      </p>

      <div className="terminal">
        <div className="terminal-head">
          <div className="dots"><i></i><i></i><i></i></div>
          <span>contact.sh — bash · 80×24</span>
        </div>
        <div className="terminal-body">
          <div className="term-line"><span className="term-prompt">bryan@portfolio:~$</span><span className="term-cmd">cat contact.json</span></div>
          <div className="term-out">{'{'}</div>
          <div className="term-out">  "email":    <a href="mailto:bryanvarela2411@gmail.com">"bryanvarela2411@gmail.com"</a>,</div>
          <div className="term-out">  "github":   <a href="https://github.com/JustSidus" target="_blank" rel="noreferrer">"github.com/JustSidus"</a>,</div>
          <div className="term-out">  "linkedin": <a href="https://linkedin.com/in/bryanvarela" target="_blank" rel="noreferrer">"linkedin.com/in/bryanvarela"</a>,</div>
          <div className="term-out">  "timezone": "America/Lima · UTC−5",</div>
          <div className="term-out">  "open_to":  ["backend", "cloud", "arquitectura", "tech-lead"]</div>
          <div className="term-out">{'}'}</div>
          <div className="term-line" style={{ marginTop: 12 }}>
            <span className="term-prompt">bryan@portfolio:~$</span>
            <span className="term-cmd">echo "ready"<span className="term-cur"></span></span>
          </div>
        </div>
      </div>

      <div className="kv" style={{ marginTop: 28 }}>
        <div className="k">prefer</div>     <div className="v">Email para contexto largo · LinkedIn para intros · GitHub para código</div>
        <div className="k">format</div>     <div className="v">Si me escribes por un rol, mándame el JD o el problema concreto. Respondo mejor a casos que a "tengo una vacante".</div>
        <div className="k">no-thanks</div>  <div className="v">Recruiters genéricos, "oportunidades únicas" sin detalles, take-homes de 8h.</div>
      </div>
    </div>
  )
}
