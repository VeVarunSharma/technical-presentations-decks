# Contributing presentations

## Before authoring

1. Read [design.md](design.md).
2. Define the audience, delivery duration, learning objectives, brand, and theme.
3. Create the deck with `npm run new:deck`.
4. Record source URLs before drafting claims or diagrams.

## Content requirements

- Use one narrative spine or scenario.
- Prefer progressive disclosure over dense, all-at-once slides.
- Cite product claims and external diagrams.
- Keep deterministic facts separate from interpretation or recommendations.
- Include a specific audience action or adoption recommendation.

## Design requirements

- Use only the selected brand profile's semantic tokens.
- Meet WCAG AA contrast for normal text.
- Do not communicate meaning through color alone.
- Use approved logos, icons, fonts, and imagery only.
- Keep charts technical and directly labeled; avoid decorative gradients.
- Verify the deck at 1366x768, 1200x796, and a large 16:9 viewport.

## Pull request checklist

- `deck.json` is complete and valid.
- `sources.md` includes every external claim and asset.
- Keyboard navigation and build reversal work.
- Fullscreen, touch, reduced motion, and print remain usable.
- No browser console errors occur.
- Primary layouts and code blocks do not clip or scroll unexpectedly.
- The build and Playwright tests pass.
- Visual review was completed with fresh eyes.
