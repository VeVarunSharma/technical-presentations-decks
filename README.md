```text
  +------------------+     +-------------------+     +------------------+
  | Explain the work | --> | Rehearse the demo | --> | Decide the pilot |
  +------------------+     +-------------------+     +------------------+
               Technical presentations | source-controlled HTML
```

# Technical presentations

Customer-ready conversations start with a clear problem, inspectable evidence,
and an explicit next decision—not a promise of autonomous production delivery.
This repository provides reusable technical briefings for platform engineers,
security teams, developers, and technical leaders. Use the decks for discovery,
workshops, and review-first pilot planning; adapt the narrative to the customer's
constraints.

**Start here:** [published catalog](https://vevarunsharma.github.io/technical-presentations-decks/)
· [GH-AW handoff guide](decks/gh-aw/accelerator/guide.html)
· [deterministic replay](decks/gh-aw/accelerator/replay.html)

## Five decks

| Deck | Customer conversation |
|---|---|
| [GitHub Agentic Workflows](decks/gh-aw/) | Bound repository automation with written intent, deterministic evidence, staged outputs, and human review. |
| [Microsoft Foundry as Code](decks/foundry-as-code/) | Discuss source-controlled AI platform configuration. |
| [GitHub Advanced Security in the AI SDLC](decks/ghas-ai-sdlc/) | Explore security controls across AI-assisted software delivery. |
| [GitHub Copilot Governance: Managed Settings at Scale](decks/copilot-governance/) | Discuss managed settings and organizational governance. |
| [Govern GitHub Copilot at Scale](decks/governance-at-scale/) | Structure an enterprise adoption and governance conversation. |

## Readiness: a handoff candidate, not a production certification

The GH-AW package supplies a briefing, synthetic replay, handoff instructions,
and walkthrough references. Replay is deterministic illustrative data, **not a
live workflow run**, customer evidence, or measured business results.
The supplied [workflow](decks/gh-aw/examples/repo-care.md) has
`safe-outputs.staged: true`: requested writes are previewed rather than
automatically applied. That is not a claim that execution is risk-free.

Release blockers remain explicit: independent presenter rehearsal, maintainer
confirmation, asset/licensing review, customer-specific security and execution
approval, and external catalog acceptance. The
[`mcaps-microsoft/accelerators-catalog`](https://github.com/mcaps-microsoft/accelerators-catalog)
lookup returned HTTP 404 through an authenticated tool; its schema and submission
process have **not** been verified. Catalog submission is blocked pending access
and owner guidance. No live execution, authentication, entitlement, approval, or
production architecture validation is implied. See the
[release checklist](decks/gh-aw/accelerator/guide.html#release) for handoff gates.

## Local setup

Use **Node.js 24**, matching `.nvmrc` and CI, plus npm. From the repository root:

```bash
nvm use
npm ci
npx playwright install chromium
npm run dev
```

If nvm is unavailable, install Node.js 24 through your approved mechanism.
Linux browser dependencies may require the CI-style
`npx playwright install --with-deps chromium` and administrator approval.
Open <http://localhost:5173/> or
<http://localhost:5173/decks/gh-aw/accelerator/guide.html>.
Static replay requires no GitHub credentials or model entitlement.

## Preview, build, and test

```bash
npm run validate
npm run build
npm test
npm run preview
```

Preview the generated site at <http://localhost:4173/>. To run browser tests
against built output rather than the development server:

```bash
PLAYWRIGHT_SERVER=preview npm test
```

The GH-AW deck also declares a compiler validator. With an approved GitHub CLI
and GH-AW extension installed:

```bash
cd decks/gh-aw
gh aw compile examples/repo-care.md \
  --dir examples --no-emit --validate --strict \
  --schedule-seed demo/gh-agentic-workflows --no-check-update
```

Compilation checks source configuration; it does not execute or certify the
workflow. Before release, inspect 1366×768, 1200×796, and 1920×1080 layouts,
keyboard controls, reduced motion, captions/transcript, and print.

## Architecture and trust boundary

```text
Source HTML/CSS/JS --> Vite build --> dist/ --> static hosting --> browser
                                                       |
                                          synthetic replay only

Optional, separately approved execution:
Reviewed Markdown --> GH-AW compiler --> GitHub Actions + approved engine
                                           --> staged output --> human review
```

Static hosting serves presentation content; it does not run GH-AW, provision
credentials, or grant repository writes. Optional execution introduces separate
GitHub permissions, runner/network controls, model authentication and billing,
environment approvals, and operational ownership. Treat repository and model
content as untrusted. The guide is a reference model, not a production security
guarantee.

```text
decks/<id>/       Narrative, visuals, metadata, sources, examples
src/runtime/     Shared navigation, progressive builds, accessibility
src/styles/      Shared layout and print behavior
brands/          Explicit brand tokens and themes
scripts/         Scaffolding and validation
tests/           Playwright checks
```

Keep vanilla HTML, CSS, and JavaScript. Do not duplicate runtime behavior.
Decks declare matching brand/theme metadata and cite external claims in
`sources.md`. GitHub is neutral-first with Green as its connective accent;
Copilot and Security themes provide supporting accents.
Read [design.md](design.md), [CONTRIBUTING.md](CONTRIBUTING.md), and the
[presentation skill](.github/skills/technical-presentations/SKILL.md) before
authoring.

## Publishing and rollback

GitHub Pages must be configured for **GitHub Actions**. A push to `main` or a
manual run of [Deploy presentations to Pages](.github/workflows/deploy-pages.yml)
builds, tests built output, validates the GH-AW example, and deploys `dist/`.
The root catalog derives its entries from active deck manifests; individual
deck URLs remain under `decks/<id>/`.

Review every published file first: decks, examples, JSON fixtures, recordings,
captions, transcripts, and source references can all become publicly accessible.
**Never publish credentials, customer data, internal URLs, private repository
content, or unapproved brand assets.** A private source repository does not by
itself establish the hosting site's access policy. Confirm visibility with the
hosting owner.

For rollback, pause further publication, submit a reviewed revert to the
last approved source revision, and redeploy through the same gates. Verify the
catalog, nested guide/replay/media paths, and deck URLs after deployment.
Revoking exposed credentials and handling cached public content require a
separate incident response; rollback alone does not remove disclosure.

## Reuse, support, and limits

Repository-authored material is covered by [LICENSE](LICENSE); fonts,
trademarks, references, and other assets have separate obligations described in
[NOTICE.md](NOTICE.md). Source access is not permission to redistribute
third-party imagery or internal templates. Review customer adaptations before
publication.

Report reproducible issues at
<https://github.com/vevarunsharma/technical-presentations-decks/issues>.
Include the deck/path, revision, browser, viewport, and sanitized reproduction.
Do not attach secrets or private customer evidence. Support is best-effort:
**no SLA, named support commitment, or production support entitlement is offered**.
