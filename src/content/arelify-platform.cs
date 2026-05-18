// arelify-platform.cs · SaaS B2B multi-tenant
// Producto:     https://arelify.com

namespace Portafolio.Arelify;

public sealed record DecisionTecnica(string Nombre, string ComoFunciona);

public static class ArelifyPlatform
{
    public static readonly object Resumen = new
    {
        Rol     = "Cofundador técnico - 100% del backend, infraestructura y frontend",
        Promesa = "Web propia indexable + agenda viva en 24h para PYMEs de servicios en RD",
        Stack   = ".NET 10 · PostgreSQL 16 · React 19 · Cloudflare Workers · Google Cloud Run",
        Estado  = "MVP funcional end-to-end · plataforma en producción, en pausa comercial"
    };

    public const string ElProblema =
        """
        Una peluquería, una barbería o una clínica pequeña no existe en Google
        y vive en WhatsApp: el dueño agenda a mano, pierde citas y depende de
        que el cliente sepa su número. Las herramientas grandes (Square, Fresha)
        son caras, en inglés y diseñadas para otro tipo de negocio. Arelify
        resuelve dos problemas a la vez: le da al negocio un sitio web propio
        indexable en Google con su catálogo y marca, conectado a una agenda
        donde los clientes reservan 24/7.
        """;

    // [UI_DIAGRAM]

    public static readonly DecisionTecnica[] DecisionesTecnicas =
    [
        new(
            Nombre:       "Motor de sitios automático con SEO real",
            ComoFunciona: "Cada negocio recibe un subdominio (slug.arelify.com) con HTML prerenderizado en el edge + JSON-LD schema.org generado por tenant. Sitemap, robots y meta tags por negocio, sin que el dueño toque una línea de código. Google indexa el catálogo como si fuera un sitio independiente."
        ),
        new(
            Nombre:       "Doble reserva imposible por diseño",
            ComoFunciona: "Índice único filtrado en PostgreSQL sobre (TenantId, ServiceOfferingId, StartsAtUtc) hace que el segundo INSERT concurrente falle a nivel de transacción. La aplicación solo traduce el conflicto a un 409. La regla vive en la base de datos, no en el código."
        ),
        new(
            Nombre:       "Aislamiento multi-tenant a prueba de errores humanos",
            ComoFunciona: "EF Core inyecta WHERE TenantId = @current en cada consulta vía Global Query Filters. El TenantId sale del JWT firmado por el servidor, nunca de un header enviado por el cliente."
        ),
        new(
            Nombre:       "Borde como BFF - cookies httpOnly y API oculta",
            ComoFunciona: "Cloudflare Worker resuelve el subdominio del negocio, sirve el HTML prerenderizado, y proxea /api/* hacia Cloud Run manteniendo las cookies httpOnly opacas al navegador. El origin de Cloud Run nunca queda expuesto."
        ),
        new(
            Nombre:       "Despliegue serverless con costo casi cero en idle",
            ComoFunciona: "Backend .NET 10 sobre Google Cloud Run (escala a cero), frontend React 19 sobre Cloudflare Pages, base de datos administrada. Costo mensual fijo bajo incluso sin tráfico."
        )
    ];

}
