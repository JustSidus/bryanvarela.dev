// arelify-platform.cs · SaaS B2B multi-tenant
// Producto:     https://arelify.com
// Arquitectura: https://github.com/JustSidus/arelify-architecture   (próximamente)

namespace Portafolio.Arelify;

public sealed record DecisionTecnica(string Nombre, string ComoFunciona);

public static class ArelifyPlatform
{
    public static readonly object Resumen = new
    {
        Rol     = "Cofundador técnico — 100% del backend, infraestructura y frontend",
        Promesa = "Reservas online para PYMEs de servicios que hoy operan por WhatsApp",
        Stack   = ".NET 10 · PostgreSQL 16 · React 19 · Cloudflare Workers · Google Cloud Run",
        Estado  = "En producción, pilotos activos en República Dominicana"
    };

    public const string ElProblema =
        """
        Una peluquería, una barbería o una clínica pequeña vive en WhatsApp:
        el dueño agenda a mano, pierde citas, duplica horarios y no aparece en
        Google. Las herramientas grandes (Square, Fresha) son caras, en inglés
        y diseñadas para otro tipo de negocio. Arelify es la versión simple,
        en español, pensada para el contexto LATAM.
        """;

    public const string DiagramaInfraestructura =
        """
        ┌─────────────────────────────────────────────────────────────────┐
        │  Cliente final                                                  │
        └────────────────────────────┬────────────────────────────────────┘
                                     │ HTTPS
                                     ▼
        ┌─────────────────────────────────────────────────────────────────┐
        │  Cloudflare Worker  (BFF / Edge)                                │
        │   · Resuelve el subdominio del tenant                           │
        │   · Server-side rendering con HTML + JSON-LD para SEO real      │
        │   · Proxy seguro de /api/*  (cookies httpOnly opacas)           │
        └─────┬──────────────────────────────────────────┬────────────────┘
              │ assets                                   │ /api/*
              ▼                                          ▼
        ┌────────────────────────────┐         ┌────────────────────────────┐
        │  Cloudflare Pages          │         │  Google Cloud Run          │
        │   · React 19 + Vite        │         │   · .NET 10 ASP.NET Core   │
        │   · Landing · Portal       │         │   · Global Query Filter    │
        │     público · Admin        │         │     por TenantId           │
        └────────────────────────────┘         └────────────┬───────────────┘
                                                            │ SQL
                                                            ▼
                                               ┌────────────────────────────┐
                                               │  PostgreSQL 16             │
                                               │   · Aislamiento por        │
                                               │     TenantId               │
                                               │   · Índice único filtrado  │
                                               └────────────────────────────┘
        """;

    public static readonly DecisionTecnica[] DecisionesTecnicas =
    [
        new(
            Nombre:       "Doble reserva imposible por diseño",
            ComoFunciona: "Índice único filtrado en PostgreSQL sobre (TenantId, ServiceOfferingId, StartsAtUtc) hace que el segundo INSERT concurrente falle a nivel de transacción. La aplicación solo traduce el conflicto a un 409. La regla vive en la base de datos, no en el código."
        ),
        new(
            Nombre:       "Aislamiento multi-tenant sin confiar en el equipo",
            ComoFunciona: "EF Core inyecta WHERE TenantId = @current en cada consulta vía Global Query Filters. El TenantId sale del JWT firmado por el servidor, nunca de un header enviado por el cliente."
        ),
        new(
            Nombre:       "Borde como BFF — SEO real y API oculta",
            ComoFunciona: "Cloudflare Worker resuelve el subdominio del negocio, prerendera HTML + JSON-LD para que Google indexe contenido real, y proxea /api/* hacia Cloud Run manteniendo las cookies httpOnly opacas al navegador."
        ),
        new(
            Nombre:       "Despliegue serverless con costo casi cero en idle",
            ComoFunciona: "Backend .NET 10 sobre Google Cloud Run (escala a cero), frontend React 19 sobre Cloudflare Pages, base de datos administrada. Costo mensual fijo bajo incluso sin tráfico."
        )
    ];

    public static readonly string[] Enlaces =
    [
        "Producto en vivo:  https://arelify.com",
    ];
}
