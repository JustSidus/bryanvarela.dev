const DIAGRAM = `
┌──────────────────────────────────────────────────────────────────────────────┐
│                       ARELIFY · FLUJO DE PRODUCCIÓN                          │
└──────────────────────────────────────────────────────────────────────────────┘

       Cliente final                Dueño del negocio              Bot de Google
            │                              │                            │
            │ slug.arelify.com             │ slug.arelify.com           │ slug.arelify.com
            │ (reservar cita)              │ /workspace                 │ (rastreo SEO)
            ▼                              ▼                            ▼
    ┌────────────────────────────────────────────────────────────────────────┐
    │                CLOUDFLARE EDGE  ·  DNS + WAF + TLS                     │
    │                *.arelify.com  →  Worker BFF                            │
    └────────────────────────────────────────────────────────────────────────┘
                                          │
                                          ▼
    ┌────────────────────────────────────────────────────────────────────────┐
    │           CLOUDFLARE WORKER  (Backend-for-Frontend)                    │
    │                                                                        │
    │   ├─ Resuelve el subdominio del negocio                                │
    │   ├─ Pre-renderiza HTML + JSON-LD para SEO                             │
    │   ├─ Proxea /api/* al backend (oculta el origen real)                  │
    │   └─ Sirve sitemap.xml y robots.txt dinámicos                          │
    └────────────────────────────────────────────────────────────────────────┘
                    │                                            │
                    │ /api/v1/*                                  │ Bundle SPA
                    │ (BFF con cookies opacas)                   │ (assets versionados)
                    ▼                                            ▼
    ┌───────────────────────────────────────┐    ┌────────────────────────────┐
    │   GOOGLE CLOUD RUN  (us-east4)        │    │   CLOUDFLARE PAGES         │
    │   arelify-backend  ·  .NET 10         │    │   React 19 + Vite          │
    │                                       │    │   Rutas por host + ruta    │
    │   ├─ JWT en cookie httpOnly           │    └────────────────────────────┘
    │   ├─ Límite de peticiones por capa    │
    │   ├─ Aislamiento multi-tenant (EF)    │
    │   ├─ Disponibilidad calculada en UTC  │
    │   └─ Auditoría inmutable              │
    └───────────────────────────────────────┘
          │                            │
          │ TLS interno                │ OIDC (login sin contraseña)
          ▼                            ▼
    ┌──────────────────────────┐    ┌──────────────────────────────┐
    │   POSTGRESQL 16          │    │   WORKOS                     │
    │   (administrada)         │    │                              │
    │                          │    │   ├─ Código de verificación  │
    │   ├─ TenantId por fila   │    │   │  enviado por email       │
    │   ├─ Índice único        │    │   └─ Identidad federada      │
    │   │  anti-doble-reserva  │    └──────────────────────────────┘
    │   └─ Auditoría inmutable │    
    └──────────────────────────┘
`;

export function AsciiDiagram() {
  return (
    <div className="ascii-diagram-wrap">
      <div className="ascii-diagram-label">ASCII</div>
      <pre className="ascii-diagram">{DIAGRAM}</pre>
    </div>
  );
}
