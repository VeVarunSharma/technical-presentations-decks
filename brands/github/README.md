# GitHub brand profile

GitHub is the default profile. Load `tokens.css`, then one theme file, and set
the matching root attribute:

```html
<link rel="stylesheet" href="/brands/github/tokens.css">
<link rel="stylesheet" href="/brands/github/themes/copilot-dark.css">
<main data-theme="copilot-dark">…</main>
```

Components should consume semantic variables (`--brand-bg-canvas`,
`--brand-text-primary`, `--brand-accent`, and related tokens), not raw palette
variables. Shared runtime aliases use the `--color-*`, `--font-*`,
`--shadow-stage`, and `--radius-*` names declared in `tokens.css`; theme
overrides flow through those aliases. Theme files only override semantics.

The primary palette and the purple, orange, blue, and lime values in
`brand.json` were checked against the official public sources on 2026-07-15.
Exact pink values could not be independently verified from the accessible
source, so they are intentionally omitted. Do not guess missing values; consult
the current [GitHub Brand Toolkit](https://brand.github.com/foundations/color).

The visual ratios are guidance: default is roughly 90% neutral / 10% green;
Copilot is 80% black or white / 10% neutral / 5% green / 5% purple; Security is
80% black or white / 10% neutral / 5% green / 5% blue.
