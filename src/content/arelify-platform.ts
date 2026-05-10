/**
 * @project    Arelify Platform
 * @type       SaaS B2B · Multi-tenant
 * @role       Tech lead · Backend & arquitectura
 * @stack      .NET 8 · PostgreSQL · React · Cloud Run · Cloudflare
 * @status     En producción
 * @tenants    12+
 * @p95_api    ~180ms
 * @uptime     99.9% — últimos 6m
 */

// ── CONTEXTO ─────────────────────────────────────────────────────────────────
//
// Plataforma multi-tenant para clientes que necesitan operar su propio
// backoffice sobre una infraestructura compartida. El reto no era hacerla
// funcionar; era hacer que escalara de 3 a 30 tenants sin reescribir el
// backend.
//
// El producto entró al mercado como un sistema dedicado por cliente. Cada
// instancia era un fork del backend con configuración propia. Funcionaba a 3
// clientes; a 8 ya era inmanejable: cada parche se aplicaba N veces, los
// despliegues tomaban horas y la cobranza por tenant era manual.
//
// La decisión: rearquitectar como plataforma multi-tenant real, sin perder
// el aislamiento de datos que ya prometíamos por contrato.

// ── ARQUITECTURA · ALTO NIVEL ─────────────────────────────────────────────────
//
//  ┌─────────────────────────────────────────────────────────────┐
//  │                    Cloudflare (edge)                        │
//  │  tenant.arelify.app ──► WAF · cache · resolución tenant     │
//  └─────────────────────────────────────────────────────────────┘
//                               │
//                ┌──────────────┴──────────────┐
//                ▼                             ▼
//      ┌──────────────────┐       ┌──────────────────────┐
//      │  Web (React)     │       │  API (.NET 8)        │
//      │  Cloudflare Pages│ ──►   │  Cloud Run           │
//      │  · auth · ui     │       │  · resolver tenant   │
//      └──────────────────┘       │  · CQRS handlers     │
//                                 └──────────┬───────────┘
//                                            │
//                          ┌─────────────────┼──────────────────┐
//                          ▼                 ▼                  ▼
//                   ┌────────────┐  ┌────────────────┐  ┌──────────────┐
//                   │ PostgreSQL │  │ Cloud Storage  │  │ Pub/Sub      │
//                   │ schema-    │  │ (assets/PDFs)  │  │ (events)     │
//                   │ per-tenant │  │ tenant prefix  │  │ async work   │
//                   └────────────┘  └────────────────┘  └──────────────┘

// ── DECISIÓN: Schema-per-tenant ───────────────────────────────────────────────
//
// Schema-per-tenant en PostgreSQL. Un solo cluster, una conexión por request,
// el tenant se resuelve por subdominio y se inyecta como SET search_path al
// inicio de cada unidad de trabajo. Los clientes obtienen aislamiento real sin
// pagar el costo operativo de N bases.

// ── COMMAND HANDLER (Clean Architecture) ─────────────────────────────────────

public sealed record CreateInvoiceCommand(
    Guid    CustomerId,
    decimal Amount,
    string  Currency) : IRequest<Result<Invoice>>;

public sealed class CreateInvoiceHandler
    : IRequestHandler<CreateInvoiceCommand, Result<Invoice>>
{
    // dependencias inyectadas — no hay 'new' en el dominio
    private readonly ITenantContext    _tenant;
    private readonly IInvoiceRepository _invoices;
    private readonly IDomainEventBus   _events;

    public async Task<Result<Invoice>> Handle(
        CreateInvoiceCommand cmd,
        CancellationToken    ct)
    {
        var invoice = Invoice.Open(_tenant.Id, cmd.CustomerId, cmd.Amount);
        await _invoices.AddAsync(invoice, ct);
        await _events.PublishAsync(invoice.DomainEvents, ct);
        return Result.Ok(invoice);
    }
}

// ── TENANT RESOLVER (Cloudflare Worker edge) ──────────────────────────────────
//
// Worker antes del API: lee el subdominio, valida que el tenant exista y esté
// activo, inyecta un header firmado X-Tenant-Id. El API confía en el header
// pero no lo lee del cliente — solo del worker autenticado. Esto saca lógica
// caliente del backend y la pone en CDN.

// ── PROBLEMAS → SOLUCIONES ────────────────────────────────────────────────────
//
// PROBLEMA: Los despliegues paraban a todos los tenants 30s mientras EF
//           aplicaba migraciones a la base compartida.
// SOLUCIÓN: Migraciones por tenant, ejecutadas en background al primer request
//           del schema. El despliegue es instantáneo; los esquemas migran en
//           perezoso, en paralelo, con flag de cierre.
//
// PROBLEMA: Un tenant grande satura conexiones y degrada a los demás (noisy neighbor).
// SOLUCIÓN: Pool dedicado por tenant en PgBouncer + cuotas por minuto en
//           Cloud Run con concurrency limits.
//
// PROBLEMA: El equipo de soporte pedía datos cruzados sin tocar prod.
// SOLUCIÓN: Read replica con vista materializada por tenant + portal interno
//           con scopes por rol.

// ── LO QUE APRENDÍ ────────────────────────────────────────────────────────────
//
// · Multi-tenant no es una decisión de base de datos; es una decisión de
//   contratos operacionales. Los SLAs por tenant te obligan a observar por tenant.
// · El borde es tu amigo — sacar resolución de tenant, rate-limit y cache a
//   Cloudflare bajó la latencia p95 ~40ms sin tocar el API.
// · Una hoja de cálculo con tenants activos, su ring de despliegue y su SLO
//   sigue siendo más útil que cualquier dashboard.

// stack: .NET 8 · React · PostgreSQL · Cloud Run · Cloudflare Workers · MediatR · EF Core
