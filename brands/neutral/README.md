# Neutral brand profile

Use this profile for non-GitHub decks when no approved external brand system is
available. It is intentionally brand-agnostic and does not represent or imply
endorsement by GitHub, Microsoft, or another organization.

Load `tokens.css` and use `data-theme="neutral-light"` or
`data-theme="neutral-dark"`. The equivalent profile form uses
`data-brand="neutral"` with optional `data-mode="dark"`:

```html
<main data-brand="neutral" data-mode="dark">…</main>
```

Keep compositions roughly 90% neutral and 10% accent. Use system fonts, preserve
the 16:9 grid, and meet WCAG AA for normal text. Replace this profile only when
an authorized brand owner supplies approved tokens and assets.

`tokens.css` also exposes the shared runtime's `--color-*`, `--font-*`,
`--shadow-stage`, and `--radius-*` semantic aliases in both modes.
