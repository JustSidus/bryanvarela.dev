/**
 * Generates a minimal valid PDF used as a placeholder until the real resume is ready.
 * Outputs to public/resume.pdf.
 *
 * REPLACE THIS FILE by dropping your real CV at public/resume.pdf (this script
 * will not overwrite if a file already exists with a non-zero size larger than
 * 2 KB - see the guard below).
 */
import { writeFileSync, statSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../public/resume.pdf");

// Don't clobber a real CV someone dropped in.
if (existsSync(OUT)) {
  const size = statSync(OUT).size;
  if (size > 2048) {
    console.log(`✓ ${OUT} already exists (${size} bytes) - keeping it.`);
    process.exit(0);
  }
}

const lines = [
  "Bryan Varela",
  "Backend & Cloud Software Engineer",
  "",
  "Santo Domingo, Republica Dominicana · UTC-4",
  "bryanvarela.dev · github.com/JustSidus",
  "hola@bryanvarela.dev",
  "",
  "Este documento es un marcador temporal.",
  "El CV completo se entrega bajo solicitud.",
  "",
  "Escribime al correo de arriba y te lo paso",
  "en menos de 24 horas.",
];

// Build a single-page PDF 1.4 with Helvetica text.
function buildPdf(textLines) {
  const escape = (s) =>
    s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

  let content = "BT\n/F1 14 Tf\n72 760 Td\n";
  textLines.forEach((line, i) => {
    if (i === 0) {
      content += `/F1 22 Tf\n(${escape(line)}) Tj\n`;
    } else if (i === 1) {
      content += `0 -28 Td\n/F1 14 Tf\n(${escape(line)}) Tj\n`;
    } else {
      content += `0 -22 Td\n(${escape(line)}) Tj\n`;
    }
  });
  content += "ET";

  const objects = [];
  objects.push("<< /Type /Catalog /Pages 2 0 R >>");
  objects.push("<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
  objects.push(
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>",
  );
  objects.push(
    `<< /Length ${Buffer.byteLength(content, "latin1")} >>\nstream\n${content}\nendstream`,
  );
  objects.push(
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
  );

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((obj, i) => {
    offsets.push(Buffer.byteLength(pdf, "latin1"));
    pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return Buffer.from(pdf, "latin1");
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, buildPdf(lines));
console.log(`✓ Generated placeholder ${OUT} (${statSync(OUT).size} bytes)`);
