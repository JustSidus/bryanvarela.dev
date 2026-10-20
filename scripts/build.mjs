import "./verify-resume.mjs";
import "./generate-og-image.mjs";
import "./generate-icons.mjs";
import { createServer, build } from "vite";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
process.env.NODE_ENV = "production";
const server = await createServer({
  mode: "production",
  server: { middlewareMode: true },
  appType: "custom",
});
let content;
try {
  const { default: App } = await server.ssrLoadModule("/src/Portfolio.jsx");
  content = renderToStaticMarkup(createElement(App));
} finally {
  await server.close();
}
await build({
  mode: "production",
  define: { "process.env.NODE_ENV": '"production"' },
  plugins: [
    {
      name: "portfolio-prerender",
      transformIndexHtml: {
        order: "pre",
        handler: (html) => html
          .replace("<!--app-html-->", content)
          .replace('<script type="module" src="/src/main.jsx"></script>', '<link rel="stylesheet" href="/src/portfolio.css" />'),
      },
    },
  ],
});
await import("./verify-publication.mjs");
