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

La fuente canónica de hechos y CV está en el repositorio privado job-search-hub. No copiar información sensible ni enlaces privados al sitio. `public/resume.pdf` es una variante pública real, sin teléfono. El build comprueba que exista; nunca lo reemplaza por un marcador temporal.

Hosting existente: Cloudflare Pages, despliegue automático desde main. Revisar la rama de rediseño antes de publicar.
