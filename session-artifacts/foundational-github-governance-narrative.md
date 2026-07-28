# Foundational GitHub Governance

## Approved framing

- **Deck:** `governance-at-scale`
- **Title:** *Govern GitHub Copilot at Scale*
- **Audience:** mixed stakeholders: executives, platform engineering, security, developer experience, and engineering leaders
- **Format:** 45–60 minutes, including a live demo
- **Thesis:** Governance is the control plane that makes Copilot acceleration trustworthy, repeatable, and measurable—not a checklist added after adoption.

## Learning outcomes

By the end, participants can:

1. Explain how enterprise, organization, repository, team, and identity boundaries fit together.
2. Assign ownership and decision rights for policy, repositories, teams, and exceptions.
3. Distinguish inherited controls from local standards and explicit exceptions.
4. Use rulesets and repository standards to make the safe path the default.
5. Describe an audit loop that proves policy effectiveness and drives tuning.

## Story spine

Follow one representative product team as it scales from one repository to many:
**“Who may act?” → “Where is the rule defined?” → “What does the developer experience?” → “How do we know it worked?”**

The same question should recur at every level: *What is centrally governed, what is locally owned, and what evidence is required to change it?*

## Suggested running order (50 minutes)

| Time | Slide / story beat | Core message | Presenter guidance |
|---:|---|---|---|
| 0–4 | **Opening: acceleration needs a control plane** | Copilot scale multiplies identities, repositories, prompts, pull requests, and workflows. | Start with the risk of inconsistent defaults, not fear. Ask who currently owns “the safe path.” |
| 4–8 | **The governance stack** | Enterprise sets the outer boundary; organizations, repositories, teams, and identities operate inside it. | Use nested layers, but say inheritance is a policy relationship—not merely an org chart. |
| 8–13 | **Ownership and decision rights** | Every control needs an accountable owner, an operator, and an escalation path. | Show a compact RACI: enterprise/platform, org admins, repo maintainers, team leads, security, audit. |
| 13–18 | **Identity and access** | Authentication establishes identity; authorization determines allowed actions and scope. | Connect SSO/managed identities, teams, roles, and least privilege to actual developer tasks. |
| 18–23 | **Policy inheritance** | Central defaults should be strong, visible, and overridable only where the business case is explicit. | Contrast inherited baseline, local configuration, and blocked/required settings. Avoid claiming every setting inherits identically. |
| 23–28 | **Repository and team standards** | Templates, CODEOWNERS, required files, branch conventions, and team ownership turn policy into repeatable repository behavior. | Emphasize paved roads and discoverability over manual compliance reviews. |
| 28–33 | **Rulesets: enforce the critical path** | Rulesets make merge and branch protections consistent while preserving repository context. | Explain targeting, bypass actors, required reviews/status checks, and why rulesets should be staged before enforcement. |
| 33–38 | **Exceptions without policy drift** | Exceptions are time-bound, owned, justified, and observable—not informal admin favors. | Show an exception record: scope, reason, compensating control, approver, expiry, review date. |
| 38–43 | **Auditability and evidence** | Audit logs, settings inventory, ruleset status, review history, and adoption signals make governance provable. | Separate activity evidence (“what happened”) from effectiveness evidence (“did risk decrease?”). |
| 43–48 | **Live demo: one change, inherited impact** | A central policy or ruleset change should produce an observable, explainable effect downstream. | Demo a safe path: inspect hierarchy → show inherited setting → open PR that fails a required check → approved exception or remediation → audit trail. |
| 48–52 | **Operating model** | Governance is a product with a service owner, release cadence, telemetry, and feedback loop. | Give each stakeholder one next action. |
| 52–55 | **Close: one platform, inherited policy, continuous evidence** | Adoption scales when the organization can change defaults safely and prove outcomes. | Recap using the four recurring questions and invite a maturity self-assessment. |

For a 45-minute version, combine ownership with identity/access, and standards with rulesets. For 60 minutes, add a short audience exercise: classify three controls as enterprise baseline, org standard, repo convention, or exception.

## Slide-level visual guidance

1. **Opening control-plane-over-delivery-loop:** top rail for identity/access, enterprise-org-repo policy, and Copilot governance; middle SDLC loop; bottom evidence rail. Land “Governance is a connected system, not a checklist.”
2. **Hierarchy:** nested enterprise → organization → repository, with teams and identities shown as cross-cutting relationships. Label “scope,” “ownership,” and “inheritance” separately.
3. **Decision-rights matrix:** rows are policy, access, repository standards, rulesets, exceptions, evidence; columns are accountable, operating, consulted, informed.
4. **Inheritance map:** solid arrows for inherited controls, local overlays for standards, dashed arrows for exception review. Include a legend in text, not color alone.
5. **Paved repository:** a repository anatomy visual: default branch, CODEOWNERS, required checks, security settings, workflow permissions, and template source.
6. **Ruleset anatomy:** target → conditions → enforcement → bypass → monitoring. Keep this technical and directly labeled.
7. **Exception card:** “why / who / what scope / compensating control / expires when / evidence.” Make expiry visually prominent.
8. **Evidence loop:** policy change → developer behavior → control signal → audit evidence → tuning. Distinguish leading indicators from outcome measures.
9. **Operating model:** a quarterly governance cycle with intake, design, pilot, rollout, measure, and retire; show named forums and service ownership.

## Live demo runbook (8–10 minutes)

1. **Orient (60s):** show enterprise/org/repo context and identify the current policy owner.
2. **Inspect (90s):** navigate from organization settings to repository settings, highlighting what is inherited versus local.
3. **Enforce (2m):** open a ruleset and show target scope, required review/checks, and bypass configuration.
4. **Experience (2m):** create or show a pull request that cannot merge because the safe-path requirement is missing; explain the remediation path.
5. **Exception (90s):** show a narrowly scoped, expiring bypass with an owner and compensating control; do not normalize permanent bypasses.
6. **Prove (90s):** show audit/event history or settings evidence that records the change and resulting action.
7. **Debrief (60s):** map the demo to the four questions: who, where, experience, evidence.

Use a disposable demonstration organization/repository. Pre-stage accounts, permissions, branch state, and a known failing check. Avoid exposing real identities, customer data, tokens, or production settings.

## Session guidance

- Use “guardrails,” “defaults,” and “paved road” before “restriction.” Governance should sound like enablement with accountability.
- Keep product facts, recommendations, and illustrative examples visually distinct.
- Do not imply that every enterprise setting automatically cascades to every repository; state the documented scope of each control.
- Treat Copilot governance as part of the wider GitHub operating model: identity, repository controls, code security, Actions, and evidence.
- When challenged on centralization, acknowledge the trade-off: local autonomy is valuable when boundaries, owners, and expiry are explicit.
- Pause after the hierarchy and exception slides for stakeholder-specific questions; collect unresolved items as operating-model backlog.

## Suggested close and adoption actions

- Name one enterprise/platform owner for the governance baseline.
- Inventory organizations, repositories, teams, identities, and current exceptions.
- Define a minimum repository standard and two pilot rulesets.
- Establish an exception register with expiry and review ownership.
- Choose a small evidence set: policy coverage, ruleset compliance, bypass volume, review latency, and security findings.
- Review telemetry monthly; revise defaults quarterly; retire stale exceptions continuously.

## Source plan

Before implementation, populate `sources.md` with current official GitHub documentation for:

- enterprise, organization, repository, and team administration;
- authentication, SSO/managed users, roles, and authorization;
- rulesets, branch protection, CODEOWNERS, repository templates, and Actions permissions;
- GitHub Copilot policy and enterprise controls;
- audit log, security overview, code scanning, secret scanning, and dependency review.

Claims about inheritance, availability, or plan-level behavior must cite the exact documentation page and retrieval date.
