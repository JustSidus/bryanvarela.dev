import { readFileSync } from "node:fs";
const pdf = readFileSync(new URL("../public/resume.pdf", import.meta.url));
if (pdf.subarray(0, 5).toString() !== "%PDF-" || pdf.length < 8000)
  throw new Error("Falta un CV real en public/resume.pdf");
console.log("CV PDF presente");
