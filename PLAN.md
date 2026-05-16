# Plan de mejoras — bryanvarela.dev

Plan preparado por Opus. Será ejecutado por Sonnet. Marcar tareas con `[x]` al completar.

## Contexto

Portfolio React + Vite con estética IDE (VSCode/GitHub Dark). Tema en `THEME` de `App.jsx` ya no está — ahora `useAccentColor` hook. FILE_META vive en `src/data/files.js`. Stack: shell components en `src/components/shell/`, content en `src/components/content/`, ui en `src/components/ui/`. Estilos en `src/styles/*.css`.

NO añadir comentarios al código a menos que el WHY no sea obvio. NO crear archivos `.md` nuevos. Editar siempre que sea posible.

---

## 1. Tech Stack del sidebar — separación visual

**Archivo:** [src/components/shell/panels/ExtensionsPanel.jsx](src/components/shell/panels/ExtensionsPanel.jsx)

**Problema:** Las tecnologías están demasiado pegadas al borde derecho del sidebar (donde está la línea vertical del resizer). El dot verde de estado roza el borde.

**Tareas:**
- [x] Aumentar `paddingRight` de `.tree-row` dentro de `ExtensionsPanel` de `14` a `20px` para dejar respiración con el resizer/scrollbar.
- [x] El separador de categoría (`──── LENGUAJES ────────`) se ve crudo. Reemplazar por estructura más limpia: una `<div>` con label + una línea CSS (`border-bottom: 1px solid var(--bg-3)`) tipo divisor de VSCode. Mantener el label en mono uppercase con letter-spacing.
- [x] Espaciado vertical: entre categorías usar `marginTop: 14px` (no solo `marginBottom: 16` en cada bloque) para que primera categoría no tenga gap raro arriba.
- [x] Eliminar el `<span>` con `'—'` (el placeholder al lado del dot verde) — no aporta nada, solo añade ruido visual.
- [x] Verificar alineación del dot verde de status: que tenga al menos 10px de aire al borde derecho.

---

## 2. Vista inicial y onboarding

**Decisión:** Mantener `about-me.md` como archivo abierto por defecto (es lo más estándar en un portfolio IDE-style, equivalente al README) PERO añadir una pestaña adicional de bienvenida `welcome.md` (sin extensión `.md` real, solo decorativa) que se abre **solo en primera visita** detectada por `localStorage`. Cuando el usuario la cierra, ya no se vuelve a abrir.

**Archivos:**
- [src/App.jsx](src/App.jsx) — lógica de detección de primera visita
- Crear: [src/components/content/Welcome.jsx](src/components/content/Welcome.jsx) — el contenido del welcome (reutilizar el componente Welcome existente que está en `shell/Welcome.jsx`, moverlo o adaptarlo).
- [src/data/files.js](src/data/files.js) — registrar el archivo welcome
- [src/data/tree.js](src/data/tree.js) — opcionalmente añadirlo al árbol

**Tareas:**
- [x] Crear un archivo "virtual" `welcome` (sin ext, o con `.md`) en FILE_META con icono especial (una estrella o un `i` info). Path: `~/portfolio`.
- [x] Contenido del Welcome (rehacer, no reusar `shell/Welcome.jsx` tal cual, hacerlo más narrativo):
  - Header grande "Bienvenido a bryanvarela.dev"
  - Sección "¿Qué es esto?": "Este es mi portfolio personal, diseñado como un IDE. Cada archivo es una sección. Navegá por el explorador a la izquierda, o usá Ctrl+P para buscar."
  - Sección "Cómo navegar" con 3-4 tips visuales (atajos de teclado en cards)
  - Sección "Por dónde empezar" con 3 cards clickeables que abren archivos: `about-me.md`, `arelify-platform.cs`, `contact.sh`
  - Footer: "Cerrá esta pestaña cuando quieras — no volverá a aparecer"
- [x] En `App.jsx`:
  - useEffect inicial que lee `localStorage.getItem('bv-visited')`. Si es `null` → set `openFiles` a `['welcome', 'about-me.md']`, `activeId` = `'welcome'`. Si no es null → comportamiento actual.
  - Al cerrar la pestaña welcome, hacer `localStorage.setItem('bv-visited', '1')`.
- [x] Registrar `Welcome` en `FILE_COMPONENTS`.

---

## 3. Status bar — limpiar esquina inferior derecha

**Archivos:** [src/components/shell/StatusBar.jsx](src/components/shell/StatusBar.jsx), [src/hooks/useKeyboardShortcuts.js](src/hooks/useKeyboardShortcuts.js)

**Tareas:**
- [x] Eliminar el botón `Ctrl+K` del StatusBar.jsx (línea 37-39). Si querés mantener un trigger del palette ahí, reemplazar por un icono pequeño de búsqueda + texto `Ctrl+P`. Recomendación: eliminarlo entero — ya está en el caption arriba.
- [x] En `useKeyboardShortcuts.js`: que SOLO `Ctrl+P` abra el palette. Quitar `'k' || 'K'` del condicional (línea 9). El comentario debe actualizarse a "Ctrl+P → command palette".
- [x] Revisar `Caption.jsx` línea 24 y 27 — ya muestra Ctrl+P correctamente, no tocar.
- [x] Revisar `Welcome.jsx` (shell) línea 59 — ya usa Ctrl+P, no tocar.

---

## 4. Middle-click para cerrar pestañas

**Archivo:** [src/components/shell/Tabs.jsx](src/components/shell/Tabs.jsx)

**Tareas:**
- [x] En el `<div className="tab">` agregar handler `onMouseDown={(e) => { if (e.button === 1) { e.preventDefault(); closeFile(id) } }}`.
- [x] `e.preventDefault()` es importante en mouseDown para evitar el modo auto-scroll del navegador con middle-click.
- [x] Verificar que el sistema de focus/active no se rompa.

---

## 5. Mejoras adicionales propuestas (detalles pequeños)

### 5.1 Tabs — mejor UX
**Archivo:** [src/components/shell/Tabs.jsx](src/components/shell/Tabs.jsx)
- [x] Soporte `Ctrl+Click` (o `Cmd+Click`) en el nombre de un archivo del explorador para abrirlo en background (sin activarlo). Avanzado, opcional.
- [x] Cuando hay muchos tabs y se desborda: añadir scroll horizontal con `overflow-x: auto` en `.tabs` (verificar shell.css). Asegurar que el scrollbar sea sutil (mismo estilo que el resto).
- [x] Drag-to-reorder de tabs: opcional, puede quedar para futura iteración. NO implementar ahora salvo que sea trivial con HTML5 drag API.

### 5.2 Empty state — cuando se cierran todos los archivos
**Archivo:** [src/components/shell/EmptyStateDashboard.jsx](src/components/shell/EmptyStateDashboard.jsx)
- [x] Verificar que el empty state actual (server rack + binary streams) sea visible y bonito. Si no hay archivos abiertos, mostrar también un hint "Ctrl+P para abrir un archivo" en la parte inferior centrada. Sutil, mono, opacidad baja.

### 5.3 Accesibilidad y feedback
- [x] Añadir `aria-label` a los `rail-btn` del ActivityRail si no lo tienen (verificar). Mejora accesibilidad.
- [x] Verificar contraste de los textos `--fg-3` sobre `--bg-0` — el separador de categorías en el sidebar puede ser difícil de leer.
- [x] Cursor `pointer` consistente en todo lo clickeable (rail buttons, tabs, file rows). Auditar con CSS.

### 5.4 Performance / detalles
- [x] `useEffect` de `App.jsx` líneas 42-48 — mueve `--sidebar-w` y `data-sidebar` al root. OK, pero asegurarse que no haya parpadeo. Considerar inicializarlo desde el primer render (`useLayoutEffect`).
- [x] BootTerminal — verificar que en mobile no se rompa. Ya hay `MobileGate` pero revisar.

### 5.5 Branding — pequeño detalle
- [x] El caption muestra `bryan / portfolio` — está bien. Pero el `· about-me.md` después del branch-pill se ve apretado. Aumentar gap.

### 5.6 SEO y meta
- [x] Verificar [index.html](index.html) — que tenga `<meta name="description">`, Open Graph tags, favicon. Si falta algo, añadirlo.

### 5.7 Sidebar — file tree
**Archivo:** [src/components/shell/panels/FilesPanel.jsx](src/components/shell/panels/FilesPanel.jsx)
- [x] Verificar indicador visual de archivo activo vs abierto vs cerrado. En VSCode los abiertos quedan en italic/dimmed. Implementar si no está.

### 5.8 Animación de transición entre archivos
**Archivo:** [src/App.jsx](src/App.jsx) — el `key={activeId}` en el div content fuerza remount
- [x] Añadir una transición suave (fade-in muy corto, 120ms) al cambiar archivo activo. Usar CSS, no JS. Que se vea profesional pero no lento.

### 5.9 Quitar el watermark gigante del welcome si no aporta
- Revisar visualmente. Solo quitar/atenuar si efectivamente compite con el contenido.

---

## Orden de ejecución sugerido

1. Status bar (rápido, alto impacto visual) — sección 3
2. Middle-click para cerrar tabs — sección 4
3. Tech Stack sidebar — sección 1
4. Welcome screen + first-visit logic — sección 2 (la más larga)
5. Detalles del 5.x — uno por uno, en orden de impacto

## Reglas

- Probar `npm run dev` al final para verificar que no hay errores.
- NO añadir comentarios redundantes al código.
- NO crear documentación nueva.
- Hacer commits granulares por sección si el usuario lo pide; si no, esperar instrucción.
- Marcar `[x]` en este archivo al completar cada tarea.
