# Design contract

This document is the normative design contract for generated decks and visual
content in this repository. **MUST**, **SHOULD**, and **MAY** have their RFC 2119
meanings. GitHub is the default profile. Neutral and Microsoft are opt-in,
explicit profiles.

## Source authority

Use current official guidance in this order:

1. [GitHub Brand Guidelines 2026](https://brand.github.com/GitHub-BrandGuidelines-2026.pdf)
2. GitHub Brand Toolkit: [color](https://brand.github.com/foundations/color),
   [layouts](https://brand.github.com/graphic-elements/layouts),
   [diagrams](https://brand.github.com/graphic-elements/diagrams), and
   [presentations](https://brand.github.com/brand-in-action/presentations)
3. This contract and the machine-readable files under `brands/`

Official guidance remains authoritative when this contract is incomplete or
becomes stale. Protected artwork and long passages MUST NOT be copied into the
repository. The internal Microsoft presentation resource is reference-only: it
MUST NOT be downloaded, committed, redistributed, or treated as a source of
publicly licensed assets.

## Brand selection

- Omitted brand selection means `github`.
- `github` MUST use `brands/github/brand.json`, `tokens.css`, and exactly one
  GitHub theme file.
- `neutral` MUST use `brands/neutral/brand.json` and `tokens.css`. It MUST NOT
  imply GitHub endorsement.
- `microsoft` is a documented placeholder only. No Microsoft tokens or assets
  may be inferred. Work MUST remain neutral until approved Microsoft resources
  are supplied by an authorized owner.
- A deck MUST use one profile. Cross-brand content uses the override rules below,
  not blended token sets.

## Voice

GitHub content MUST be:

- **Nerdy:** technically specific and comfortable with developer vocabulary.
- **Confident:** direct, evidence-led, and free of inflated claims.
- **Authentic:** candid about trade-offs, uncertainty, and source limits.
- **Imaginative:** make difficult ideas memorable without sacrificing accuracy.
- **Empathetic:** design for the audience's context, ability, and time.

Prefer active voice, concrete verbs, short headings, and useful examples. Avoid
empty superlatives, forced slang, unexplained acronyms, and anthropomorphizing
systems in ways that obscure responsibility.

## Colors

GitHub is neutral-first with GitHub Green as the hero. A default composition
SHOULD be approximately 90% neutral and 10% green. Green is an accent, not a
large text color on white unless the selected token passes contrast.

Copilot compositions SHOULD be approximately 80% black/white, 10% neutral, 5%
green, and 5% purple. Security compositions SHOULD be approximately 80%
black/white, 10% neutral, 5% green, and 5% blue. These ratios are visual
budgets, not pixel-level quotas.

Use semantic variables such as `--brand-bg-canvas` and `--brand-text-primary`;
do not bind components directly to raw palette values. Secondary colors are for
meaningful emphasis and illustration. The official source remains authoritative
for any family or value omitted from the local token set.

## Typography

Use Mona Sans for headings and body copy, with the system fallbacks declared in
the tokens. Use Mona Sans Mono for code, data labels, and eyebrows. Both are
served from `brands/github/fonts/` under the SIL Open Font License.

- Headings SHOULD use 600–800 weight and compact line height.
- Body text SHOULD use 400–500 weight and comfortable line height.
- Eyebrows MAY use mono, uppercase, and modest tracking; never use long uppercase
  passages.
- Code MUST preserve whitespace and SHOULD wrap only at deliberate breakpoints.
- Keep live text as text. Do not rasterize text to imitate a branded sample.

## Layout

Slides MUST use a 16:9 canvas. Establish a consistent parent grid, outer
margins, gutters, and inset rhythm before placing content. Preserve negative
space. Borders MAY reveal the grid sparingly, but a fully boxed layout SHOULD be
avoided.

Text and visuals SHOULD occupy distinct regions, optionally separated by one
solid green rule. Do not place body copy over busy imagery. Use a stable reading
order, align related edges, and keep titles in predictable positions. Normal
text MUST meet WCAG AA contrast.

## Reusable slide layouts

Implement the smallest layout set that covers the story:

1. **Title:** one concise promise, optional subtitle and metadata.
2. **Section:** short transition statement with generous negative space.
3. **Statement:** one claim plus a source or proof point.
4. **Split:** text and visual in distinct grid regions.
5. **Comparison:** two or three aligned options with common criteria.
6. **Process:** ordered stages with explicit direction and outcome.
7. **Data:** chart first, takeaway second, source always visible.
8. **Code/demo:** task context, legible code or product frame, result.
9. **Summary/action:** decisions, next steps, owners, and timing.

Every layout MUST preserve safe margins and hierarchy. Do not shrink text to fit;
edit content or add a slide.

## Diagrams and charts

Diagrams MUST feel clear, technical, and instructional. Charts MUST prioritize
trust, legibility, accessibility, and accurate scales.

- Do not use decorative gradients, 3D effects, or adjacent colors that blur.
- Use color only when it groups complex data or marks a meaningful state.
- Prefer direct labels over legends; label units and time ranges.
- Include a source and, when relevant, the retrieval date.
- Avoid dual axes unless the relationship cannot be shown more honestly.
- Never encode meaning by color alone; add text, shape, pattern, or position.
- Keep decorative illustration separate from quantitative graphics.

## Themes

GitHub supports `default-light`, `default-dark`, `copilot-light`,
`copilot-dark`, `security-light`, and `security-dark`. Apply a theme at the
document root, for example `data-theme="copilot-dark"`.

Themes MUST override semantic variables rather than component rules. Light and
dark are presentation modes, not automatic inversions. Validate all foreground,
background, border, code, focus, and chart combinations independently.

## Logos, icons, and mascots

Use only approved, supplied assets and preserve their clear space, proportions,
and integrity. Do not redraw, recolor, crop, stretch, animate, combine, or use
logos as decorative patterns. Do not invent Octocat, Copilot, or mascot artwork.
Use Octicons only where their meaning is clear and their license/provenance is
retained. A text label is preferred when an icon could be ambiguous.

## Motion and interaction

Motion MUST communicate sequence, causality, focus, or state. Prefer subtle
opacity and position changes; avoid decorative looping and gratuitous parallax.
Honor `prefers-reduced-motion`. Interactive controls MUST have visible focus,
keyboard operation, clear labels, and a non-interactive fallback for export.

## Accessibility

- Normal text and essential graphical text MUST meet WCAG AA contrast.
- Use a logical reading order and meaningful headings.
- Provide alt text for informative images; mark decoration as decorative.
- Captions or transcripts MUST accompany meaningful audio/video.
- Minimum type size SHOULD be chosen for the actual room and display, not only a
  laptop preview.
- Do not rely on color, hover, animation, or sound alone.
- Test at 100% export scale and in grayscale.

## Content and learning design

Start with the audience's job-to-be-done and one measurable outcome. Build from
context to model to example to practice to recap. Each slide SHOULD express one
primary idea. Examples MUST be technically correct, representative, and safe to
reuse. Clearly distinguish facts, opinions, forecasts, and illustrative data.
Provide citations close to claims. End instructional sequences with a practical
next action or retrieval prompt.

## QA

Before release, verify:

- correct brand and theme are explicitly selected;
- all content fits the 16:9 safe area with no clipping or overflow;
- type, spacing, alignment, and grid use are consistent;
- contrast, reading order, keyboard use, alt text, and reduced motion;
- charts have accurate scales, direct labels, units, and sources;
- claims, code, links, dates, names, and citations are correct;
- logos and external assets are approved and retain provenance;
- no protected reference images, internal templates, or guessed brand tokens are
  committed;
- exported PDF and presentation views match the authored version.

## Cross-brand overrides

External brand requirements override this contract only for the slides or
artifacts that the authorized brand owner requires. Keep those sections
visually bounded and record the source of approval. Do not recolor another
organization's logo to fit a GitHub theme.

For co-branded work, use a neutral composition and give marks independent clear
space. GitHub tokens MAY frame the surrounding deck only when GitHub is the
presenting brand. Microsoft content MUST stay on the neutral profile until an
authorized Microsoft design system is supplied; the internal reference link is
not permission to reproduce its tokens or assets.
