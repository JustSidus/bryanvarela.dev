/**
 * Tech stack data — edit this file to update your skills and proficiency levels.
 * `lvl` is a 0–1 float representing proficiency (displayed as a percentage bar).
 * `dot` is a CSS variable for the language color dot (optional).
 */
export const skillCategories = [
  {
    title: 'Lenguajes',
    items: [
      { name: 'C#', lvl: 0.95, dot: 'var(--lang-cs)' },
      { name: 'TypeScript', lvl: 0.85, dot: 'var(--lang-ts)' },
      { name: 'SQL', lvl: 0.85, dot: 'var(--lang-json)' },
    ],
  },
  {
    title: 'Backend',
    items: [
      { name: '.NET 10', lvl: 0.95 },
      { name: 'ASP.NET Core', lvl: 0.95 },
      { name: 'Node.js', lvl: 0.75 },
    ],
  },
  {
    title: 'Bases de Datos',
    items: [
      { name: 'PostgreSQL', lvl: 0.85 },
      { name: 'SQL Server', lvl: 0.9 },
      { name: 'MySQL', lvl: 0.75 },
    ],
  },
  {
    title: 'Cloud & Infra',
    items: [
      { name: 'Google Cloud Run', lvl: 0.85 },
      { name: 'Azure', lvl: 0.75 },
      { name: 'Cloudflare', lvl: 0.8 },
      { name: 'Docker', lvl: 0.85 },
      { name: 'GitHub Actions', lvl: 0.8 },
    ],
  },
  {
    title: 'Frontend',
    items: [
      { name: 'React', lvl: 0.75, dot: 'var(--lang-ts)' },
      { name: 'Vue.js', lvl: 0.8, dot: 'var(--lang-vue)' },
      { name: 'Vite', lvl: 0.75 },
      { name: 'Tailwind CSS', lvl: 0.7 },
    ],
  },
  {
    title: 'Otros',
    items: [
      { name: 'Python', lvl: 0.55, dot: 'var(--fg-2)' },
      { name: 'Django', lvl: 0.5 },
      { name: 'PHP', lvl: 0.55 },
      { name: 'Laravel', lvl: 0.5 },
    ],
  },
]
