import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const root = process.cwd();
const decksDirectory = resolve(root, "decks");
const errors = [];
const attributePattern = /\b(?:href|src)=["']([^"']+)["']/g;

const isExternal = (value) =>
  value.startsWith("#") ||
  value.startsWith("data:") ||
  value.startsWith("mailto:") ||
  value.startsWith("tel:") ||
  /^[a-z]+:\/\//i.test(value);

function validateHtmlLinks(label, htmlPath) {
  if (!existsSync(htmlPath)) return;

  const html = readFileSync(htmlPath, "utf8");
  for (const match of html.matchAll(attributePattern)) {
    const value = match[1].split(/[?#]/)[0];
    if (!value || isExternal(value)) continue;

    const target = resolve(dirname(htmlPath), value);
    if (!existsSync(target)) {
      errors.push(`${label}: ${match[1]} does not resolve from index.html`);
    }
  }
}

validateHtmlLinks("root", resolve(root, "index.html"));

for (const entry of readdirSync(decksDirectory, { withFileTypes: true }).filter((item) => item.isDirectory())) {
  validateHtmlLinks(entry.name, resolve(decksDirectory, entry.name, "index.html"));
}

if (errors.length) {
  console.error("Local link validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Validated local page links and assets.");
