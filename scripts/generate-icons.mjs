import sharp from "sharp";
import { writeFile } from "node:fs/promises";

// Initials are the identity itself, kept legible at browser-tab size.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><rect width="256" height="256" rx="56" fill="#3e50c6"/><text x="128" y="174" text-anchor="middle" font-family="Arial,sans-serif" font-size="151" font-weight="700" letter-spacing="-12" fill="#f8f9fd">bv</text></svg>`;
await writeFile("public/favicon.svg", svg + "\n");
await sharp(Buffer.from(svg))
  .resize(32, 32)
  .png()
  .toFile("public/favicon-32.png");
await sharp(Buffer.from(svg))
  .resize(180, 180)
  .png()
  .toFile("public/apple-touch-icon.png");
