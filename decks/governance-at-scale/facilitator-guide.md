# Facilitator / session guide — Govern GitHub Copilot at Scale

## Contract
45–60 minutes, including a 10–15 minute live demo. Open with: “The question is not whether Copilot is enabled. It is what is enabled, for whom, under which boundaries, and with what evidence.”

## Timing and transitions
- 0–4: Opening control plane over Plan → Learn. Ask: who owns the safe path?
- 4–8: Governance stack. Emphasize scope, ownership, and inheritance are distinct.
- 8–13: Decision rights. Ask who approves policy, operates it, and handles exceptions.
- 13–18: Identity and access. Authentication establishes identity; authorization determines action and scope.
- 18–23: Paved repository. Show templates, CODEOWNERS, checks, Actions permissions, and security signals.
- 23–28: Rulesets and exceptions. Stage Evaluate → Active; make expiry prominent.
- 28–35: Copilot tiers. Explore / Deliver / Act; increase containment as autonomy increases.
- 35–40: GHAS positioning. Connect code scanning, secret protection, and dependency review to PR evidence.
- 40–52: Demo. Transition with “Now watch the same policy become developer experience and audit evidence.”
- 52–55: Close. Leave owner, repository classification, and first evidence review.

## Demo runbook
Use a disposable organization and synthetic repository. Pre-stage a known failing check and screenshots. Inspect enterprise → org → repo; show inherited versus local. Open an Evaluate ruleset; explain target, conditions, required reviews/checks, bypass, and monitoring. Open a PR that cannot merge, fix the check, request CODEOWNER review, then show a narrow expiring exception and audit event. Finish with a synthetic Copilot proposal and a GHAS signal linked to the PR.

If permissions, plan, or workflow behavior differs, stop and use screenshots. Never expose real identities, tokens, customer content, or production settings. Do not imply universal inheritance or guaranteed AI behavior.

## Audience adaptations
- Executives: decision rights, risk appetite, outcome measures, rollback.
- Platform/security: inheritance, least privilege, auditability, exceptions.
- Developers: paved roads, prompt boundaries, review expectations, unblock path.

## Close / follow-up
Name one baseline owner; inventory organizations, repositories, teams, identities, and exceptions; pilot two rulesets; define policy coverage, bypass volume, review latency, and security findings; review monthly and revise defaults quarterly.
