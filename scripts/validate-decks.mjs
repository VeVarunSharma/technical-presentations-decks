import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import Ajv2020 from "ajv/dist/2020.js";

const root = process.cwd();
const decksDirectory = resolve(root, "decks");
const schemaPath = resolve(root, "schemas", "deck.schema.json");
const schema = JSON.parse(readFileSync(schemaPath, "utf8"));
const ajv = new Ajv2020({ allErrors: true, strict: false });
const validate = ajv.compile(schema);

const errors = [];
const manifests = [];

if (!existsSync(decksDirectory)) {
  errors.push("Missing decks/ directory.");
} else {
  for (const entry of readdirSync(decksDirectory, { withFileTypes: true }).filter((item) => item.isDirectory())) {
    const deckDirectory = resolve(decksDirectory, entry.name);
    const manifestPath = resolve(deckDirectory, "deck.json");

    if (!existsSync(manifestPath)) {
      errors.push(`${entry.name}: missing deck.json`);
      continue;
    }

    let manifest;
    try {
      manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    } catch (error) {
      errors.push(`${entry.name}: deck.json is not valid JSON (${error.message})`);
      continue;
    }

    if (!validate(manifest)) {
      for (const validationError of validate.errors || []) {
        errors.push(`${entry.name}${validationError.instancePath || ""}: ${validationError.message}`);
      }
      continue;
    }

    manifests.push(manifest);

    if (manifest.id !== entry.name) {
      errors.push(`${entry.name}: directory name must match deck id "${manifest.id}"`);
    }

    for (const requiredFile of ["index.html", manifest.sources]) {
      if (!existsSync(resolve(deckDirectory, requiredFile))) {
        errors.push(`${entry.name}: missing ${requiredFile}`);
      }
    }

    const brandDirectory = resolve(root, "brands", manifest.brand);
    if (!existsSync(resolve(brandDirectory, "brand.json")) || !existsSync(resolve(brandDirectory, "tokens.css"))) {
      errors.push(`${entry.name}: brand "${manifest.brand}" is not fully configured`);
    }

    const themePath = resolve(brandDirectory, "themes", `${manifest.theme}.css`);
    if (!existsSync(themePath)) {
      errors.push(`${entry.name}: missing theme file brands/${manifest.brand}/themes/${manifest.theme}.css`);
    }

    const html = readFileSync(resolve(deckDirectory, "index.html"), "utf8");
    if (!html.includes(`data-brand="${manifest.brand}"`)) {
      errors.push(`${entry.name}: index.html must declare data-brand="${manifest.brand}"`);
    }
    if (!html.includes(`data-theme="${manifest.theme}"`)) {
      errors.push(`${entry.name}: index.html must declare data-theme="${manifest.theme}"`);
    }
  }
}

const ids = manifests.map((manifest) => manifest.id);
for (const id of ids.filter((value, index) => ids.indexOf(value) !== index)) {
  errors.push(`Duplicate deck id: ${id}`);
}

const defaults = manifests.filter((manifest) => manifest.default);
if (manifests.length && defaults.length !== 1) {
  errors.push(`Exactly one deck must set "default": true; found ${defaults.length}.`);
} else if (defaults.length === 1) {
  const rootIndex = readFileSync(resolve(root, "index.html"), "utf8");
  const expectedPath = `./decks/${defaults[0].id}/`;
  if (!rootIndex.includes("data-home-catalog")) {
    errors.push("Root index.html must declare the presentation catalog with data-home-catalog.");
  }
  if (!rootIndex.includes('src="./src/home/home.js"')) {
    errors.push("Root index.html must load ./src/home/home.js.");
  }
  if (/<meta\b[^>]*http-equiv=["']refresh["']/i.test(rootIndex)) {
    errors.push("Root index.html must render the catalog instead of redirecting.");
  }
  if (!rootIndex.includes(expectedPath)) {
    errors.push(`Root index.html must include a fallback link to the default deck at ${expectedPath}`);
  }
}

if (errors.length) {
  console.error("Deck validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Validated ${manifests.length} deck manifest(s).`);
