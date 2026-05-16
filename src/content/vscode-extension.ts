// vscode-paste-image-to-terminal · extensión personal para VS Code
// Repo: https://github.com/JustSidus/vscode-paste-image-to-terminal

interface DecisionTecnica {
  nombre: string
  comoFunciona: string
}

interface ExtensionProject {
  rol: string
  stack: string
  estado: string
  elProblema: string
  laSolucion: string
  workflow: readonly string[]
  decisionesTecnicas: readonly DecisionTecnica[]
  impacto: string
  repo: string
}

export const project: ExtensionProject = {
  rol:    'Autor y mantenedor',
  stack:  'TypeScript · VS Code Extension API · Node.js',
  estado: 'En uso personal diario',

  elProblema: `Trabajo dentro de un Dev Container con un agente de IA (OpenCode) corriendo adentro. Tomo una captura de pantalla y quiero pasársela al agente.

Ctrl+V no funciona: la imagen vive en el portapapeles del host, el agente vive en el contenedor, y no hay puente directo entre los dos. Las otras extensiones guardan la imagen en /tmp del host, una ruta que dentro del contenedor no existe.`,

  laSolucion: `La extensión corre en el host (extensionKind: "ui") y escribe el archivo vía vscode.workspace.fs, el mismo canal IPC que VS Code usa para sincronizar con Dev Containers, SSH y Codespaces. La imagen aparece dentro del contenedor sin montajes extra.`,

  workflow: [
    'Usuario copia una imagen (Ctrl+C, screenshot)',
    'Pulsa Ctrl+Alt+V con la terminal enfocada',
    'Extensión lee el portapapeles del host con la herramienta nativa del SO',
    'Calcula SHA-256; si ya existe, reusa el archivo',
    'Escribe el PNG vía vscode.workspace.fs (sincroniza al contenedor)',
    'Inserta la ruta en la terminal como paste real, no como texto tipeado',
  ],

  decisionesTecnicas: [
    {
      nombre: 'Bracketed paste sequences en vez de sendText plano',
      comoFunciona: `Envuelvo la ruta en ESC[200~ … ESC[201~ para que el terminal lo interprete como paste real. OpenCode CLI distingue paste de tipeo y solo trata como imagen lo que llega como paste real.`,
    },
    {
      nombre: 'Deduplicación por SHA-256',
      comoFunciona: `El nombre del archivo es el prefijo de 12 caracteres del SHA-256 del contenido. Dos capturas idénticas terminan con el mismo nombre y cero duplicados en disco.`,
    },
    {
      nombre: 'Multi-plataforma sin dependencias de npm',
      comoFunciona: `PowerShell en Windows, osascript en macOS, wl-paste con fallback a xclip en Linux. Cero dependencias agregadas al package.json.`,
    },
    {
      nombre: 'Concurrencia segura con mutex de un bit',
      comoFunciona: `Un flag booleano evita que dos invocaciones rápidas peleen por el portapapeles. Antes del lock, dos Ctrl+Alt+V seguidos rompían el archivo.`,
    },
    {
      nombre: 'Espera de archivo estable en remoto',
      comoFunciona: `En Dev Container o SSH el write llega async. Polling de fs.stat hasta que el tamaño se mantenga igual durante 3 lecturas seguidas; sin esto, OpenCode leía el PNG a medio escribir.`,
    },
  ],

  impacto: `Uso diario propio. Resolvió un loop molesto: tomar captura, guardarla manual, copiar la ruta, pegarla. Ahora es Ctrl+Alt+V y listo.`,

  repo: 'https://github.com/JustSidus/vscode-paste-image-to-terminal',
}
