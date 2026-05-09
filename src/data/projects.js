/**
 * Project metadata — edit this file to update project frontmatter, metrics, and chips.
 * Prose content (descriptions, problem/solution pairs) lives in the content components.
 */
export const projects = {
  arelify: {
    frontmatter: [
      { key: 'project', value: 'Arelify Platform', accent: true },
      { key: 'type', value: 'SaaS B2B · Multi-tenant' },
      { key: 'role', value: 'Tech lead · Backend & arquitectura' },
      { key: 'stack', value: '.NET 8 · PostgreSQL · React · Cloud Run · Cloudflare' },
      { key: 'status', value: 'En producción', statusDot: 'var(--ok)' },
    ],
    metrics: [
      { value: '12', unit: '+ tenants', label: 'en producción' },
      { value: '~180', unit: ' ms', label: 'p95 API' },
      { value: '99.9', unit: '%', label: 'uptime últimos 6m' },
      { value: '1', unit: ' · ingeniero', label: 'backend principal' },
    ],
    chips: [
      { label: '.NET 8', dot: 'var(--lang-cs)' },
      { label: 'React', dot: 'var(--lang-ts)' },
      { label: 'PostgreSQL' },
      { label: 'Cloud Run' },
      { label: 'Cloudflare Workers' },
      { label: 'MediatR' },
      { label: 'EF Core' },
      { label: 'Multi-tenant', accent: true },
    ],
  },
  visitorManagement: {
    frontmatter: [
      { key: 'project', value: 'Visitor Management System', accent: true },
      { key: 'type', value: 'Aplicación interna · gestión de accesos' },
      { key: 'role', value: 'Full-stack engineer' },
      { key: 'stack', value: 'Vue 3 · TypeScript · .NET · SQL Server · Azure' },
    ],
    metrics: [
      { value: '~28', unit: ' s', label: 'tiempo registro' },
      { value: '3', unit: ' · roles', label: 'recepción / anfitrión / guardia' },
      { value: '100', unit: '%', label: 'trazabilidad QR' },
    ],
    chips: [
      { label: 'Vue 3', dot: 'var(--lang-vue)' },
      { label: 'TypeScript' },
      { label: '.NET' },
      { label: 'SQL Server' },
      { label: 'Azure App Service' },
      { label: 'SignalR' },
      { label: 'Offline-first', accent: true },
    ],
  },
  layeredEcommerce: {
    frontmatter: [
      { key: 'project', value: 'Layered E-commerce', accent: true },
      { key: 'type', value: 'Plataforma e-commerce · Arquitectura N-Tier' },
      { key: 'role', value: 'Backend engineer · Diseño de capas' },
      { key: 'stack', value: 'C# · ASP.NET Core · SQL Server · Redis · Docker' },
    ],
    chips: [
      { label: 'C#', dot: 'var(--lang-cs)' },
      { label: 'ASP.NET Core' },
      { label: 'SQL Server' },
      { label: 'Redis' },
      { label: 'Docker' },
      { label: 'N-Tier', accent: true },
      { label: 'Clean Arch', accent: true },
    ],
  },
}