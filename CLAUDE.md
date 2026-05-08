# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio for Bryan Varela — Backend & Cloud Software Engineer. IDE-inspired design (VSCode/GitHub Dark aesthetic) built with React + Vite. Deployed to GitHub Pages via GitHub Actions using a Docker build container. Live at `bryanvarela.dev`.

## Commands

```bash
npm install        # install dependencies
npm run dev        # dev server at http://localhost:5173
npm run build      # build to dist/
npm run preview    # preview the dist/ build locally
```

## Architecture

The app is a single-page React app with no router — it's a fake IDE shell where "files" are portfolio sections.

**`src/App.jsx`** — Shell layout and all UI chrome: title bar (`Caption`), activity rail, sidebar file tree (`Sidebar`/`TreeRow`), tabs, breadcrumbs, status bar, command palette (`Ctrl+K`). The `FILES` constant is the single source of truth mapping file IDs to their metadata and content components. `TREE` defines the sidebar folder structure.

**`src/Content.jsx`** — All portfolio content as React components: `AboutMe`, `ArelifyPlatform`, `VisitorManagement`, `LayeredEcommerce`, `TechStack`, `ContactSh`. Each maps to a "file" in the IDE. To add a new section: add a component here, register it in `FILES` in App.jsx, and add it to `TREE`.

**`src/Icons.jsx`** — All SVG icons (`Icon` object) and file-type indicators (`FileIcon`, `FolderIcon`).

**`src/index.css`** — Full CSS. Uses CSS custom properties extensively (`--bg-0..4`, `--fg-0..4`, `--accent`, `--lang-*`). The `--accent` color is overridden per active file type in App.jsx's `useEffect` (e.g. TypeScript files turn the accent blue, C# files turn it purple).

## Deployment

Push to `main` → GitHub Actions builds via Docker → deploys `dist/` to GitHub Pages.

**One-time GitHub setup required:**
1. Repo Settings → Pages → Source: **GitHub Actions**
2. The `CNAME` file in `public/` handles the custom domain automatically.

The Dockerfile is a two-stage build: Node 22 Alpine builds the Vite app, nginx Alpine serves it. GitHub Actions extracts `/usr/share/nginx/html` from the container and uploads it as a Pages artifact.

## Personalizing

- Contact links (email, GitHub, LinkedIn) are in `src/Content.jsx` (`ContactSh`) and `src/App.jsx` (`StatusBar`).
- The `THEME` constant in `src/App.jsx` controls accent color, density, font, and whether the activity rail shows.
