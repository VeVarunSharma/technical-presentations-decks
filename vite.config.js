import { cpSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const root = process.cwd();
const decksDirectory = resolve(root, "decks");

const deckInputs = existsSync(decksDirectory)
  ? Object.fromEntries(
      readdirSync(decksDirectory, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .filter((entry) => existsSync(resolve(decksDirectory, entry.name, "index.html")))
        .map((entry) => [`deck-${entry.name}`, resolve(decksDirectory, entry.name, "index.html")]),
    )
  : {};

function copyDeckFiles() {
  return {
    name: "copy-deck-files",
    writeBundle() {
      if (!existsSync(decksDirectory)) return;

      for (const entry of readdirSync(decksDirectory, { withFileTypes: true }).filter((item) => item.isDirectory())) {
        const sourceDirectory = resolve(decksDirectory, entry.name);
        const destinationDirectory = resolve(root, "dist", "decks", entry.name);
        mkdirSync(destinationDirectory, { recursive: true });

        for (const file of readdirSync(sourceDirectory, { withFileTypes: true })) {
          if (["index.html", "deck.js", "deck.css"].includes(file.name)) continue;
          cpSync(
            resolve(sourceDirectory, file.name),
            resolve(destinationDirectory, file.name),
            { recursive: true },
          );
        }
      }
    },
  };
}

export default defineConfig({
  base: "./",
  plugins: [copyDeckFiles()],
  build: {
    rollupOptions: {
      input: {
        root: resolve(root, "index.html"),
        ...deckInputs,
      },
    },
  },
});
