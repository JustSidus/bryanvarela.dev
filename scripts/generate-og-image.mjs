import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(__dirname, '../public/images/og-preview.png')

const W = 1200
const H = 630

const BG_0 = '#0d1117'
const BG_1 = '#161b22'
const BG_3 = '#21262d'
const FG_0 = '#e6edf3'
const FG_2 = '#7d8590'
const ACCENT = '#7ee787'

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BG_0}" />
      <stop offset="100%" stop-color="${BG_1}" />
    </linearGradient>
    <style>
      .name { font: 700 88px 'JetBrains Mono', 'Inter', system-ui, sans-serif; fill: ${FG_0}; }
      .role { font: 500 40px 'Inter', system-ui, sans-serif; fill: ${FG_2}; letter-spacing: -0.01em; }
      .tag  { font: 500 22px 'JetBrains Mono', monospace; fill: ${FG_0}; }
      .url  { font: 500 26px 'JetBrains Mono', monospace; fill: ${ACCENT}; }
      .meta { font: 500 20px 'JetBrains Mono', monospace; fill: ${FG_2}; }
    </style>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#grad)" />

  <!-- top chrome strip resembling editor tabs -->
  <rect x="0" y="0" width="${W}" height="48" fill="${BG_1}" />
  <circle cx="22" cy="24" r="7" fill="#ff5f56" />
  <circle cx="46" cy="24" r="7" fill="#ffbd2e" />
  <circle cx="70" cy="24" r="7" fill="#27c93f" />
  <text x="${W / 2}" y="30" text-anchor="middle" class="meta">bryanvarela.dev</text>

  <!-- main content -->
  <g transform="translate(80, 168)">
    <text x="0" y="0" class="name">Bryan Varela</text>
    <text x="0" y="68" class="role">Backend &amp; Cloud Software Engineer</text>

    <!-- tag pills -->
    <g transform="translate(0, 124)">
      <rect x="0"   y="0" width="92"  height="40" rx="6" fill="${BG_3}" />
      <text x="46"  y="27" text-anchor="middle" class="tag">.NET 10</text>

      <rect x="108" y="0" width="142" height="40" rx="6" fill="${BG_3}" />
      <text x="179" y="27" text-anchor="middle" class="tag">TypeScript</text>

      <rect x="266" y="0" width="134" height="40" rx="6" fill="${BG_3}" />
      <text x="333" y="27" text-anchor="middle" class="tag">PostgreSQL</text>

      <rect x="416" y="0" width="138" height="40" rx="6" fill="${BG_3}" />
      <text x="485" y="27" text-anchor="middle" class="tag">Cloudflare</text>

      <rect x="570" y="0" width="170" height="40" rx="6" fill="${BG_3}" />
      <text x="655" y="27" text-anchor="middle" class="tag">Google Cloud</text>
    </g>

    <!-- footer line -->
    <g transform="translate(0, 290)">
      <text x="0" y="0" class="meta">Santo Domingo · UTC-4 · disponible para roles remotos</text>
      <text x="0" y="40" class="url">https://bryanvarela.dev</text>
    </g>
  </g>
</svg>
`

await mkdir(dirname(OUT), { recursive: true })
await sharp(Buffer.from(svg)).png({ quality: 92 }).toFile(OUT)
console.log(`✓ Generated ${OUT}`)
