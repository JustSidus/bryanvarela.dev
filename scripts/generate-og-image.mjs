import sharp from "sharp";
import { mkdir } from "node:fs/promises";
await mkdir("public/images", { recursive: true });
const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#f8f9fd"/><rect x="70" y="70" width="40" height="5" fill="#3e50c6"/><g font-family="Segoe UI,Arial,sans-serif"><text x="70" y="155" font-size="28" fill="#566078">SANTO DOMINGO / DISPONIBLE PARA TRABAJO REMOTO</text><text x="65" y="290" font-size="88" font-weight="600" fill="#20273b">Soy Bryan Varela.</text><text x="65" y="390" font-size="88" font-weight="600" fill="#3e50c6">Desarrollador web.</text><text x="70" y="520" font-size="27" fill="#566078">Aplicaciones web / APIs / Automatización</text><text x="70" y="575" font-size="24" fill="#3e50c6">bryanvarela.dev</text></g></svg>`;
await sharp(Buffer.from(svg)).png().toFile("public/images/og-preview.png");
