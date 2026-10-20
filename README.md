# bryanvarela.dev

Portafolio de Bryan Varela para oportunidades remotas en español. Una página legible en móvil y escritorio con proyectos, experiencia, contacto y CV real.

## Desarrollo

```sh
npm ci --ignore-scripts
npm run dev
npm run build
npm run preview
```

React 18 + Vite 8, CSS nativo y prerender del contenido real. Sin fuentes remotas ni efectos de terminal. Tema claro/oscuro según el sistema y movimiento reducido. Contenido en `src/Portfolio.jsx`; estilos en `src/portfolio.css`. Los componentes IDE anteriores se conservan fuera del bundle activo.

La fuente canónica de hechos y CV está en el repositorio privado job-search-hub. No copiar información sensible ni enlaces privados al sitio. `public/resume.pdf` es una variante pública real, confirmado por Bryan. El build comprueba que exista; nunca lo reemplaza por un marcador temporal.

Hosting existente: Cloudflare Pages, despliegue automático desde main. Publicación del rediseño autorizada por Bryan el 20/10/2026; mantener noindex en todas las respuestas.

## Indexación

Todo el sitio y el CV deben devolver `X-Robots-Tag: noindex, nofollow, noarchive`; HTML incluye meta robots equivalente. `robots.txt` permite rastreo para leer esas reglas y no anuncia sitemap. El build ejecuta `scripts/verify-publication.mjs` para prevenir regresiones. Noindex no es control de acceso ni garantiza retirada instantánea de resultados existentes.

El PDF de `public/resume.pdf` es una copia exacta del maestro proporcionado por Bryan, también guardado en el hub privado. No regenerarlo con el script histórico.
