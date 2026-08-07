# Technical presentations

Reusable, source-controlled HTML presentations for GitHub and broader technical topics.

The repository uses Vite as a multi-page static build. Each deck lives at an independent path under `decks/` and shares a small presentation runtime, layout system, accessibility behavior, and explicit brand profile.

## Current decks

- [GitHub Agentic Workflows](decks/gh-aw/)
- [GitHub Advanced Security in the AI SDLC](decks/ghas-ai-sdlc/)
- [Govern GitHub Copilot at Scale](decks/governance-at-scale/)

## Repository principles

- GitHub is the default brand; every deck still declares its brand and theme.
- Decks remain plain HTML, CSS, and JavaScript.
- Shared behavior belongs in `src/`; deck-specific narrative and visuals stay in the deck folder.
- Every deck includes metadata and a complete `sources.md`.
- External templates and brand guides are referenced rather than committed.
- Built output must work at a direct GitHub Pages deck URL.
- The root catalog uses Primer Primitives and Octicons without changing the vanilla deck runtime.

Read [design.md](design.md) before creating or substantially editing a deck.

Repository-local Copilot instructions are available in
[`.github/skills/technical-presentations/SKILL.md`](.github/skills/technical-presentations/SKILL.md).

## Setup

Use Node.js 24, matching the GitHub Actions build:

```bash
nvm use
npm ci
npx playwright install chromium
npm run dev
```

Open the presentation catalog at <http://localhost:5173/> or browse a deck directly:

```text
http://localhost:5173/decks/gh-aw/
http://localhost:5173/decks/ghas-ai-sdlc/
http://localhost:5173/decks/governance-at-scale/
```

To test the exact static output that GitHub Pages receives:

```bash
npm run build
npm run preview
```

## Commands

```bash
npm run dev
npm run validate
npm run build
npm test
```

Create a new deck:

```bash
npm run new:deck -- \
  --id ghas-overview \
  --title "GitHub Advanced Security" \
  --brand github \
  --theme security-dark
```

Common GitHub themes:

- `default-dark`
- `default-light`
- `copilot-dark`
- `copilot-light`
- `security-dark`
- `security-light`

## Deck structure

```text
decks/<id>/
├── index.html
├── deck.js
├── deck.css
├── deck.json
└── sources.md
```

Deck-specific examples and downloadable artifacts belong in a subfolder such as `examples/` or `assets/`.

## Publishing

The published site is:

<https://vevarunsharma.github.io/technical-presentations-decks/>

The root page is a system-themed catalog generated from active `deck.json`
manifests. It uses
[Primer Primitives](https://github.com/primer/primitives) and
[Octicons](https://primer.style/octicons/) while the presentations retain their
existing shared runtime and deck-specific themes.

GitHub Pages is configured to use GitHub Actions. A push to `main` runs
`.github/workflows/deploy-pages.yml`, which installs dependencies from the lockfile,
builds the Vite site, tests the generated `dist/` output at all supported
viewports, validates the GH-AW example, and deploys the Pages artifact. The
workflow can also be run manually from the Actions tab.

Individual decks retain direct URLs:

```text
https://vevarunsharma.github.io/technical-presentations-decks/decks/gh-aw/
https://vevarunsharma.github.io/technical-presentations-decks/decks/ghas-ai-sdlc/
https://vevarunsharma.github.io/technical-presentations-decks/decks/governance-at-scale/
```

The deck marked `"default": true` appears first and is labeled as featured.
