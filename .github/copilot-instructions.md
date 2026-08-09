# Presentation repository instructions

For any request to create, edit, run, build, test, publish, or troubleshoot a presentation, follow `.github/skills/technical-presentations/SKILL.md`.

Before editing a presentation:

1. Read `/design.md`.
2. Read the deck's `/decks/<id>/deck.json` and `sources.md`.
3. Read the selected `/brands/<brand>/README.md` and theme tokens.

## Authoring rules

- Keep the platform in vanilla HTML, CSS, and JavaScript.
- Reuse `/src/runtime/deck.js` and shared styles; do not duplicate navigation, progressive-build, print, or accessibility logic.
- Keep deck-specific narrative, diagrams, and interaction data in the deck folder.
- Every deck must declare `data-brand`, `data-theme`, and matching `deck.json` values.
- Use semantic brand variables instead of hard-coded brand colors.
- Do not download or commit external brand guides, PowerPoint templates, logos, mascots, or imagery unless redistribution is explicitly approved.
- Claims, metrics, and external diagrams require entries in `sources.md`.
- GitHub decks default to GitHub Green with neutral foundations. Copilot purple and Security blue are supporting accents, not replacement brands.
- Charts must be direct, technical, accessible, and free of decorative gradients.
- Preserve keyboard navigation, reversible builds, reduced motion, print, touch, and semantic HTML.

## Completion requirements

- Run `npm run validate`.
- Run `npm run build`.
- Run `npm test`.
- Run any optional validator declared in the deck's `deck.json`.
- Inspect affected slides at the repository's three target viewports.
