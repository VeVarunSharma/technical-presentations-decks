# Technical presentations

Reusable, source-controlled HTML presentations for GitHub and broader technical topics.

The repository uses Vite as a multi-page static build. Each deck lives at an independent path under `decks/` and shares a small presentation runtime, layout system, accessibility behavior, and explicit brand profile.

## Current deck

- [GitHub Agentic Workflows](decks/gh-aw/)
- [GitHub Advanced Security in the AI SDLC](decks/ghas-ai-sdlc/)

## Repository principles

- GitHub is the default brand; every deck still declares its brand and theme.
- Decks remain plain HTML, CSS, and JavaScript.
- Shared behavior belongs in `src/`; deck-specific narrative and visuals stay in the deck folder.
- Every deck includes metadata and a complete `sources.md`.
- External templates and brand guides are referenced rather than committed.
- Built output must work at a direct GitHub Pages deck URL.

Read [design.md](design.md) before creating or substantially editing a deck.

Repository-local Copilot instructions are available in
[`.github/skills/technical-presentations/SKILL.md`](.github/skills/technical-presentations/SKILL.md).

## Setup

```bash
npm install
npx playwright install chromium
npm run dev
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

GitHub Pages deploys the Vite `dist/` output. Individual decks are available at paths such as:

```text
/decks/gh-aw/
/decks/ghas-overview/
/decks/ghcp-overview/
```

The root page redirects to the deck marked `"default": true`.
