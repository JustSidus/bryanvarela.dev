import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";

const html = readFileSync("dist/index.html", "utf8");
const headers = readFileSync("dist/_headers", "utf8");
const robots = readFileSync("dist/robots.txt", "utf8");
assert.match(html, /name="robots"\s+content="noindex,nofollow,noarchive"/);
assert.match(
  headers,
  /^\/\*\r?\n\s+X-Robots-Tag: noindex, nofollow, noarchive/m,
);
assert.doesNotMatch(robots, /^Disallow:\s*\/\s*$/m);
assert.doesNotMatch(robots, /^Sitemap:/m);
assert.equal(existsSync("dist/sitemap.xml"), false);
assert.match(
  readFileSync("dist/404.html", "utf8"),
  /noindex,nofollow,noarchive/,
);
for (const asset of [
  "favicon.svg",
  "favicon-32.png",
  "apple-touch-icon.png",
  "resume.pdf",
]) {
  assert.ok(existsSync(`dist/${asset}`), `Missing ${asset}`);
}
console.log(
  "Publication verified: noindex meta/header, crawlable robots, CV and icons.",
);
