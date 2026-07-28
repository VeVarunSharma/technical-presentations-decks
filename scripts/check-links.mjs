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

for (const entry of readdirSync(decksDirectory, { withFileTypes: true }).filter((item) => item.isDirectory())) {
  const htmlPath = resolve(decksDirectory, entry.name, "index.html");
  if (!existsSync(htmlPath)) continue;

  const html = readFileSync(htmlPath, "utf8");
  for (const match of html.matchAll(attributePattern)) {
    const value = match[1].split(/[?#]/)[0];
    if (!value || isExternal(value)) continue;

    const target = resolve(dirname(htmlPath), value);
    if (!existsSync(target)) {
      errors.push(`${entry.name}: ${match[1]} does not resolve from index.html`);
    }
  }
}

if (errors.length) {
  console.error("Local link validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Validated local deck links and assets.");
