/**
 * Tech stack data — edit this file to update your skills and proficiency levels.
 * `lvl` is a 0–1 float representing proficiency (displayed as a percentage bar).
 * `dot` is a CSS variable for the language color dot (optional).
 */
export const skillCategories = [
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