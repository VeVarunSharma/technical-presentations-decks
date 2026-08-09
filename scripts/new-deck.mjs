import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, extname, resolve } from "node:path";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    id: { type: "string" },
    title: { type: "string" },
    brand: { type: "string", default: "github" },
    theme: { type: "string" },
  },
});

const id = values.id;
const title = values.title;
const brand = values.brand;
const theme = values.theme || (brand === "neutral" ? "neutral-dark" : "default-dark");

if (!id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
  console.error("Provide --id using lowercase kebab-case.");
  process.exit(1);
}
if (!title) {
  console.error("Provide --title.");
  process.exit(1);
}

const root = process.cwd();
const templateDirectory = resolve(root, "templates", "technical-deck");
const destination = resolve(root, "decks", id);
const brandDirectory = resolve(root, "brands", brand);
const themePath = resolve(brandDirectory, "themes", `${theme}.css`);

if (existsSync(destination)) {
  console.error(`Deck already exists: ${destination}`);
  process.exit(1);
}
if (!existsSync(themePath)) {
  console.error(`Theme is not configured: brands/${brand}/themes/${theme}.css`);
  process.exit(1);
}

mkdirSync(resolve(root, "decks"), { recursive: true });
cpSync(templateDirectory, destination, { recursive: true });

const replacements = new Map([
  ["{{DECK_ID}}", id],
  ["{{DECK_TITLE}}", title],
  ["{{DECK_BRAND}}", brand],
  ["{{DECK_THEME}}", theme],
]);

for (const fileName of readdirSync(destination)) {
  const path = resolve(destination, fileName);
  if (![".html", ".js", ".css", ".json", ".md"].includes(extname(path))) continue;

  let content = readFileSync(path, "utf8");
  for (const [token, value] of replacements) content = content.replaceAll(token, value);
  writeFileSync(path, content);
}

console.log(`Created decks/${basename(destination)}.`);
