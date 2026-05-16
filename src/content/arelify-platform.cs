// arelify-platform.cs
// SaaS B2B multi-tenant · cofundador técnico, 100% del desarrollo
//
// Producto:     https://arelify.com
// Arquitectura: https://github.com/JustSidus/arelify-architecture   (próximamente)

namespace Portafolio.Arelify;

public sealed record Proyecto(
    string Promesa,
    string Rol,
    string Stack,
    string Estado
);

public static class Ficha
{
    public static readonly Proyecto Resumen = new(
        Promesa: "Reservas online para PYMEs de servicios que hoy operan por WhatsApp",
        Rol:     "Cofundador técnico — 100% del backend, infra y frontend",
        Stack:   ".NET 10 · PostgreSQL 16 · React 19 · Cloudflare Workers · Google Cloud Run",
        Estado:  "En producción, pilotos activos en República Dominicana"
    );
}

// EL PROBLEMA ────────────────────────────────────────────────────────────────
//
// Una peluquería, una barbería o una clínica chica vive en WhatsApp: el dueño
// agenda a mano, pierde citas, duplica horarios y no aparece en Google. Las
// herramientas grandes (Square, Fresha) son caras, en inglés y diseñadas para
// otro tipo de negocio. Arelify es la versión simple, en español, pensada para
// el contexto LATAM.

// [UI_SNAPSHOT: Diagrama ASCII · infraestructura Arelify]

// LO QUE LO HACE INTERESANTE TÉCNICAMENTE ────────────────────────────────────

// 1) Doble reserva imposible por diseño.
//    La regla vive en Postgres, no en el código de aplicación. Un índice
//    único filtrado sobre (TenantId, ServiceOfferingId, StartsAtUtc) hace
//    que el segundo INSERT concurrente falle a nivel de transacción. La
//    capa de aplicación solo traduce el conflicto a un 409.

public sealed class BookingIndex
{
    // CREATE UNIQUE INDEX ix_bookings_no_overlap
    //   ON bookings (tenant_id, service_offering_id, starts_at_utc)
    //   WHERE status <> 'cancelled';
}

// 2) Aislamiento multi-tenant que no depende de la disciplina del equipo.
//    EF Core inyecta el WHERE TenantId = @current en cada consulta vía
//    Global Query Filters. El TenantId sale del JWT, nunca de un header
//    enviado por el cliente.

public interface ITenantContext { Guid TenantId { get; } }

// 3) Borde como BFF: SEO real y API oculta.
//    Un Cloudflare Worker resuelve el subdominio del negocio, prerendera
//    HTML + JSON-LD para que Google indexe contenido completo, y proxea
//    /api/* hacia Cloud Run manteniendo las cookies httpOnly opacas al
//    navegador.

public sealed record EdgeWorker(
    string Responsabilidad = "Server-side rendering, JSON-LD, proxy de API"
);

// CÓMO VER MÁS ───────────────────────────────────────────────────────────────
//
// Producto en vivo:  https://arelify.com
// Diagramas y ADRs:  https://github.com/JustSidus/arelify-architecture
// Walkthrough técnico bajo NDA — escribime y lo conversamos.
