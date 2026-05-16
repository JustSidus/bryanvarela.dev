// vscode-paste-image-to-terminal
// Extensión publicable para VS Code · TypeScript · multi-plataforma
//
// Repo: https://github.com/JustSidus/vscode-paste-image-to-terminal

interface Proyecto {
  rol:    'Autor y mantenedor'
  stack:  ['TypeScript', 'VS Code Extension API', 'Node.js']
  estado: 'Publicada, en uso diario'
}

// EL PROBLEMA ────────────────────────────────────────────────────────────────
//
// Trabajás dentro de un Dev Container. El agente de IA (OpenCode) corre ahí
// adentro. Tomás una captura de pantalla y querés mostrársela.
//
// Ctrl+V no funciona: la imagen vive en el portapapeles del host, el agente
// vive en el contenedor, y no hay puente directo entre los dos.
//
// Las otras extensiones guardan la imagen en /tmp del host — una ruta que
// dentro del contenedor no existe.

// LA SOLUCIÓN ────────────────────────────────────────────────────────────────
//
// La extensión corre en el host (extensionKind: "ui") y escribe el archivo
// vía vscode.workspace.fs, que es el mismo canal IPC que VS Code usa para
// sincronizar con Dev Containers, SSH y Codespaces. La imagen aparece dentro
// del contenedor sin montajes extra.

const WORKFLOW = [
  '1. Usuario copia una imagen (Ctrl+C, screenshot)',
  '2. Pulsa Ctrl+Alt+V con la terminal enfocada',
  '3. Extensión lee el portapapeles del host con la herramienta nativa',
  '4. Calcula SHA-256 → si ya existe, reusa el archivo',
  '5. Escribe el PNG vía vscode.workspace.fs (sincroniza al contenedor)',
  '6. Inserta la ruta en la terminal como paste real (no como texto tipeado)',
] as const

// DECISIONES TÉCNICAS QUE IMPORTARON ─────────────────────────────────────────

// 1) Bracketed paste sequences en vez de sendText plano.
//    terminal.sendText() inyecta caracteres como si fueran tipeados. OpenCode
//    CLI distingue paste de tipeo — solo trata como imagen lo que llega como
//    paste real. Resolverlo requirió envolver el texto en escapes ANSI:

const ESC_PASTE_START = '\x1b[200~'
const ESC_PASTE_END   = '\x1b[201~'

function sendAsRealPaste(terminal: Terminal, path: string): void {
  terminal.sendText(ESC_PASTE_START + path + ESC_PASTE_END, false)
}

// 2) Deduplicación por SHA-256.
//    El nombre del archivo es el prefijo de 12 chars del hash del contenido.
//    Dos capturas idénticas → mismo nombre → cero duplicados en disco.

function fileName(bytes: Uint8Array): string {
  return sha256(bytes).slice(0, 12) + '.png'
}

// 3) Multi-plataforma sin npm deps.
//    El portapapeles se lee con la herramienta nativa de cada SO. Cero
//    dependencias agregadas al package.json.

const CLIPBOARD_TOOL = {
  win32:  'PowerShell + System.Windows.Forms.Clipboard',
  darwin: 'AppleScript + osascript',
  linux:  'wl-paste (Wayland) con fallback a xclip (X11)',
} as const

// 4) Concurrencia segura.
//    Un mutex de un solo bit evita que dos invocaciones rápidas peleen por el
//    portapapeles. Antes del lock, dos Ctrl+Alt+V seguidos rompían el archivo.

let isProcessing = false

// 5) Espera de archivo estable.
//    En remoto (Dev Container, SSH) el write llega async. Antes de pasar la
//    ruta a la terminal, polling de fs.stat hasta que el tamaño se mantenga
//    igual durante 3 lecturas seguidas — sin esto, OpenCode leía el PNG a
//    medio escribir.

// IMPACTO ────────────────────────────────────────────────────────────────────
//
// Uso diario propio, primero. Resolvió un loop molesto: tomar captura,
// guardarla manual, copiar la ruta, pegarla. Ahora es Ctrl+Alt+V y listo.
//
// Publicada como VSIX, código abierto. Empaquetada y firmada con vsce.

export const REPO = 'https://github.com/JustSidus/vscode-paste-image-to-terminal'
