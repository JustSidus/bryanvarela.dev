# bryanvarela.dev

Personal portfolio for Bryan Varela — Backend & Cloud Software Engineer.

Live at [bryanvarela.dev](https://bryanvarela.dev)

## Stack

- **React 18 + Vite 5** — single-page app, IDE-inspired design (GitHub Dark aesthetic)
- **GitHub Actions** → Docker build (Node 22 + nginx) → static files → **GitHub Pages**
- Custom domain via `public/CNAME`

## Dev

```bash
npm install
npm run dev      # localhost:5173
npm run build    # outputs to dist/
```

## Deploy

Push to `main` triggers the workflow: Docker builds the Vite app, nginx serves it, the static files are extracted and deployed to GitHub Pages automatically.

One-time repo setup: **Settings → Pages → Source → GitHub Actions**
