namespace Portafolio.CasosDeEstudio;

public sealed class PlataformaArelify
{
    public static readonly Ficha Proyecto = new(
        Nombre: "Arelify",
        Promesa: "Reservas online para PYMEs que hoy operan exclusivamente por WhatsApp.",
        Rol: "Backend & Cloud Software Engineer, fundador técnico",
        Tecnologias: ".NET 10 · C# 14 · PostgreSQL 16 · React 19 · Cloudflare Workers · Google Cloud Run · WorkOS",
        Estado: "En producción, con pilotos activos en República Dominicana",
        Industria: "SaaS B2B multi-tenant · salud, belleza y servicios profesionales",
        UrlProduccion: "https://arelify.com"
    );

    public sealed record Ficha(
        string Nombre,
        string Promesa,
        string Rol,
        string Tecnologias,
        string Estado,
        string Industria,
        string UrlProduccion
    );

    // ──────────────────────────────────────────────────────────────────────────
    //  CASO DE NEGOCIO
    // ──────────────────────────────────────────────────────────────────────────

    public static readonly CasoDeNegocio Contexto = new()
    {
        Mercado = "En República Dominicana la mayoría de las PYMEs de servicios (clínicas, barberías, salones, spas, consultorios) reciben sus citas por WhatsApp. No tienen página web, no aparecen en Google y toda la operación depende de que alguien responda a tiempo.",

        Dolor = "Tres puntos que les generan pérdidas cada semana: las dobles reservas cuando dos clientes piden el mismo horario, el tiempo que se invierte respondiendo mensajes fuera de horario, y la invisibilidad en buscadores. Si un negocio no aparece en Google, prácticamente no existe para los clientes nuevos.",

        Solucion = "Arelify le entrega a cada negocio una página propia bajo su subdominio (negocio.arelify.com) indexable por Google, agendamiento 24/7 con prevención de colisiones a nivel de base de datos, y un editor visual de arrastrar y soltar para que el dueño actualice su sitio sin depender de un desarrollador.",

        PromesaOmnicanal = "El cliente final reserva en segundos desde el subdominio público. El dueño administra horarios, servicios, excepciones de calendario y catálogo desde un panel aparte. Yo opero como SuperAdmin únicamente para soporte y onboarding, sin afectar la propiedad de los datos del negocio.",

        ModeloComercial = "Un mes gratis para cualquier nuevo suscriptor, sin solicitar tarjeta y sin cobro automático. La continuidad se confirma manualmente al cerrar el mes de prueba. Esto reduce la fricción de entrada y nos obliga a entregar valor real antes de cobrar."
    };

    public sealed class CasoDeNegocio
    {
        public string Mercado { get; init; } = "";
        public string Dolor { get; init; } = "";
        public string Solucion { get; init; } = "";
        public string PromesaOmnicanal { get; init; } = "";
        public string ModeloComercial { get; init; } = "";
    }

    // [UI_SNAPSHOT: Landing comercial de arelify.com con el hero, la propuesta de valor y el CTA "Empieza gratis"]

    // ──────────────────────────────────────────────────────────────────────────
    //  ARQUITECTURA
    // ──────────────────────────────────────────────────────────────────────────

    public static readonly Servicio[] Servicios =
    [
        new Servicio(
            Capa: "Borde / BFF",
            Tecnologia: "Cloudflare Worker (frontend/public/_worker.js)",
            Responsabilidad: "Punto de entrada único para arelify.com y para todos los *.arelify.com. Resuelve el slug del negocio desde el host, construye el HTML de la landing pública en el servidor (con metadatos SEO y el JSON-LD de schema.org/LocalBusiness), y proxea /api/* hacia Cloud Run inyectando el host original. El navegador nunca se comunica con la API de forma directa."
        ),
        new Servicio(
            Capa: "Frontend",
            Tecnologia: "React 19 + Vite + TailwindCSS sobre Cloudflare Pages",
            Responsabilidad: "Tres superficies dentro de un mismo SPA: la landing comercial de Arelify, el portal público del negocio (slug.arelify.com) y el panel de administración (workspace), que atiende tanto al SuperAdmin como al dueño del negocio. El enrutamiento combina host y ruta, de modo que el mismo bundle se comporta diferente según el subdominio."
        ),
        new Servicio(
            Capa: "Backend API",
            Tecnologia: ".NET 10 + ASP.NET Core Web API en Google Cloud Run (us-east4)",
            Responsabilidad: "Arquitectura limpia en cuatro capas: Dominio, Aplicación, Infraestructura y API. Expone REST autenticado, calcula la disponibilidad de citas en UTC, aplica límites de peticiones por superficie, registra auditoría de las acciones sensibles y orquesta el flujo OIDC con WorkOS. Despliegue continuo con Cloud Build."
        ),
        new Servicio(
            Capa: "Identidad",
            Tecnologia: "WorkOS · OIDC con verificación por código en email",
            Responsabilidad: "Login sin contraseña. El backend recibe el código que el usuario digitó, lo verifica contra WorkOS, firma su propio JWT y lo guarda en una cookie httpOnly del mismo origen. El token nunca queda expuesto en el frontend."
        ),
        new Servicio(
            Capa: "Persistencia",
            Tecnologia: "PostgreSQL 16 + EF Core 10",
            Responsabilidad: "Los Global Query Filters de EF Core aplican un filtro por TenantId a cada consulta de forma automática, lo que elimina la posibilidad de olvidar el WHERE. Adicionalmente, un índice único filtrado a nivel de Postgres bloquea la doble reserva incluso cuando dos peticiones llegan en el mismo milisegundo."
        ),
        new Servicio(
            Capa: "CI/CD",
            Tecnologia: "Google Cloud Build · Artifact Registry · Cloud Run",
            Responsabilidad: "Pipeline declarativo en cloudbuild.yaml: build de la imagen Docker, push a Artifact Registry y despliegue a Cloud Run con límites explícitos (máximo 3 instancias, concurrencia 80). Mantiene los costos predecibles durante la fase de piloto."
        )
    ];

    public sealed record Servicio(string Capa, string Tecnologia, string Responsabilidad);

// [UI_SNAPSHOT: Diagrama ASCII · flujo de producción Arelify]

    // ──────────────────────────────────────────────────────────────────────────
    //  LOGROS TÉCNICOS
    // ──────────────────────────────────────────────────────────────────────────

    public static readonly Logro[] Hitos =
    [
        new Logro(
            Titulo: "Prevención de doble reserva con garantía de base de datos",
            Resumen: "La regla vive en Postgres, no en el código de aplicación. Vender el mismo horario dos veces deja de ser posible.",
            Detalles: "Implementé un índice único filtrado en la tabla de citas sobre (TenantId, ServiceOfferingId, StartsAtUtc) que solo aplica a las citas activas. Si dos clientes intentan reservar el mismo slot con milisegundos de diferencia, Postgres rechaza el segundo INSERT. La garantía es transaccional y sobrevive a cualquier bug de aplicación o condición de carrera. La capa de aplicación traduce ese error a un 409 Conflict legible para el usuario."
        ),
        new Logro(
            Titulo: "Aislamiento multi-tenant a prueba de olvidos",
            Resumen: "El aislamiento entre negocios es automático, no algo que cada desarrollador deba recordar agregar manualmente.",
            Detalles: "Configuré los Global Query Filters de EF Core para que toda consulta a la base de datos filtre por el TenantId del usuario autenticado. El WHERE no se escribe a mano: lo inyecta el ORM. La autorización se valida contra los claims del JWT, nunca contra un header del cliente, y cada controlador de negocio extiende una clase base que rechaza el acceso cruzado por defecto. Resultado: una defensa que escala con el equipo y no depende de la disciplina individual."
        ),
        new Logro(
            Titulo: "Borde inteligente que oculta la API y entrega SEO real",
            Resumen: "Cada negocio aparece en Google con contenido indexable, no con un esqueleto vacío de SPA.",
            Detalles: "Diseñé el Cloudflare Worker como un Backend-for-Frontend. En el borde resuelve el subdominio del negocio, consulta al backend y devuelve el HTML ya renderizado con título, descripción, Open Graph y el JSON-LD de schema.org/LocalBusiness. Para el bot de Google, slug.arelify.com responde con un documento completo en menos de 200 ms; el usuario humano recibe lo mismo y el SPA hidrata encima. Ese mismo Worker proxea /api/* y mantiene las cookies httpOnly opacas al navegador, así el frontend nunca llega a ver la URL de Cloud Run."
        ),
        new Logro(
            Titulo: "Identidad sin contraseñas con WorkOS y cookies httpOnly",
            Resumen: "Login empresarial sin almacenar tokens en el navegador.",
            Detalles: "Integré WorkOS OIDC con verificación por código en email. El backend recibe el código, lo valida contra WorkOS, emite un JWT propio firmado y lo coloca en una cookie httpOnly del mismo origen. El frontend obtiene la identidad únicamente vía /api/me. No existe ningún token en localStorage, sessionStorage ni en headers Authorization manejados por JavaScript, lo que descarta toda la familia de ataques de robo de tokens por XSS."
        ),
        new Logro(
            Titulo: "Editor de landing pages drag-and-drop sin redeploy",
            Resumen: "El dueño del negocio actualiza su sitio en vivo, sin involucrar al equipo técnico.",
            Detalles: "Construí un editor visual sobre Puck que permite al dueño componer su landing arrastrando bloques: hero, servicios, galería, testimonios, mapa y formulario de reserva. El diseño se guarda como JSON versionado en Postgres y el Worker del borde lo materializa en HTML server-side para SEO. Cero deploys y cero tickets técnicos por cada cambio comercial."
        )
    ];

    public sealed record Logro(string Titulo, string Resumen, string Detalles);

    // [UI_SNAPSHOT: Editor visual de landing pages con Puck, paleta de bloques a la izquierda y preview en vivo a la derecha]

    // ──────────────────────────────────────────────────────────────────────────
    //  SALVAGUARDAS DE PRODUCCIÓN
    // ──────────────────────────────────────────────────────────────────────────

    public static readonly Salvaguarda[] Endurecimiento =
    [
        new Salvaguarda(
            Area: "CSP estricta en Cloudflare Pages",
            Decision: "Content-Security-Policy sin 'unsafe-inline' en scripts, con base-uri y form-action limitados a 'self' y frame-ancestors a 'none' (contra clickjacking). La desplegué primero en modo reporte para detectar falsos positivos y luego la activé en modo forzado."
        ),
        new Salvaguarda(
            Area: "Límite de peticiones diferenciado por superficie",
            Decision: "Políticas separadas para login, lectura pública, escritura pública, lectura administrativa y escritura administrativa. El endpoint público de reservas no comparte cuota con el panel administrativo, de modo que un abuso externo no degrada la operación interna del negocio."
        ),
        new Salvaguarda(
            Area: "Persistencia en UTC, presentación en hora local",
            Decision: "Toda fecha y hora se almacena en UTC y se calcula en el backend. El frontend la convierte a America/Santo_Domingo solo al momento de mostrarla. Esto elimina las ambigüedades de zona horaria en el cálculo de disponibilidad."
        ),
        new Salvaguarda(
            Area: "Auditoría inmutable de acciones sensibles",
            Decision: "Cada creación, edición o borrado de entidades operativas queda registrado con actor, rol, tenant y correlation id. Es la base de trazabilidad para cuando corresponda presentarla ante una auditoría regulatoria."
        )
    ];

    public sealed record Salvaguarda(string Area, string Decision);

    // [UI_SNAPSHOT: Panel del dueño del negocio, vista de calendario con citas confirmadas, excepciones y configuración de servicios]

    // [UI_SNAPSHOT: Portal público de un negocio (slug.arelify.com), selección de servicio, fecha y hora con disponibilidad real]

    // ──────────────────────────────────────────────────────────────────────────
    //  IMPACTO
    // ──────────────────────────────────────────────────────────────────────────

    public static readonly Impacto[] Resultados =
    [
        new Impacto(
            Metrica: "Tiempo de puesta en marcha de un negocio nuevo",
            Resultado: "De semanas (cuando implicaba contratar diseñador y desarrollador) a minutos. El dueño se registra, recibe su subdominio indexable y edita su landing visualmente el mismo día."
        ),
        new Impacto(
            Metrica: "Dobles reservas en producción",
            Resultado: "Cero. La garantía proviene de una restricción de base de datos, no de código de aplicación susceptible de fallar bajo concurrencia."
        ),
        new Impacto(
            Metrica: "Costo marginal por negocio adicional",
            Resultado: "Tiende a cero. El backend en Cloud Run y la capa del borde en Cloudflare sirven a todos los tenants sobre la misma infraestructura, de modo que el costo fijo se amortiza sobre la base completa de negocios y no crece linealmente con cada incorporación. La arquitectura serverless aporta encima reducción de consumo en las ventanas sin tráfico."
        ),
        new Impacto(
            Metrica: "Superficie de ataque del frontend",
            Resultado: "Reducida desde la arquitectura: sin tokens en el almacenamiento del navegador, CSP estricta, BFF que oculta el origen real de la API y aislamiento multi-tenant validado en cada consulta del ORM."
        )
    ];

    public sealed record Impacto(string Metrica, string Resultado);
}
