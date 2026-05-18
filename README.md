# bryanvarela.dev

Personal portfolio for Bryan Varela — Backend & Cloud Software Engineer.

Live at [bryanvarela.dev](https://bryanvarela.dev)

## Stack

- **React 18 + Vite 5** — single-page app, IDE-inspired design (GitHub Dark aesthetic)
- **Cloudflare Pages** — deploy automático desde `main`

## Dev

```bash
npm install
npm run dev      # localhost:5173
npm run build    # outputs to dist/
```

## Deploy

Push to `main` → Cloudflare Pages builds and deploys automatically.

One-time setup: conectar el repo en [dash.cloudflare.com](https://dash.cloudflare.com) → Pages → build command `npm run build`, output dir `dist`.
