# Govern GitHub Copilot at Scale

## Session brief

- **Framing:** governance-at-scale
- **Audience:** mixed stakeholders: executives, engineering leaders, platform owners, security/privacy, developers, and delivery teams
- **Format:** 45–60 minutes, including a 10–15 minute live demo
- **Core promise:** Copilot can accelerate every SDLC handoff; governance makes that acceleration trustworthy, repeatable, and measurable.
- **Learning outcome:** participants can choose an enablement tier, define the minimum guardrails, and name the evidence required before expanding access.

## Narrative spine

**Governance is not a gate placed in front of AI. It is the control plane that makes the safe path the fast path.** Start with the decision leaders must make—where Copilot creates value and where it must be constrained—then show how identity, policy, data boundaries, human review, and telemetry turn that decision into an operating model.

The story moves from **permission** to **practice** to **proof**:

1. **Permission:** who may use which capability, in which repositories, with which data.
2. **Practice:** how developers use Copilot, how agents act, and where humans review.
3. **Proof:** what telemetry, quality signals, and incidents show whether the model is working.

## Suggested flow and slide/story guidance

### 1. Opening — “The question is not whether to enable Copilot” (3–5 min)

- **Claim:** At scale, “enabled” is not a governance decision. The decision is what is enabled, for whom, under which boundaries, and with what evidence.
- **Visual:** control-plane-over-delivery-loop: identity and access → enterprise/org/repository policy → AI/Copilot governance over Plan → Code → Review → Build → Release → Operate → Learn.
- **Presenter move:** ask the room to name one benefit they want and one risk they will not accept.

### 2. Enablement decisions — “Choose the capability, not the brand” (5–7 min)

Use a decision matrix with rows for chat/completions, code review, cloud/agentic features, and custom integrations. For each, decide:

- value hypothesis and target users;
- repository/data eligibility;
- required human approval;
- allowed tools, network access, and write actions;
- success and stop criteria.

**Decision rule:** default to the least powerful capability that can test the value hypothesis; expand only when evidence supports it.

### 3. Audience and risk tiers — “One policy does not fit every workflow” (5–6 min)

Present three practical tiers:

| Tier | Typical use | Minimum posture |
|---|---|---|
| **Explore** | low-risk learning, documentation, tests, prototypes | approved users, training, no sensitive inputs, normal review |
| **Deliver** | production code and pull requests | repository classification, branch protection/rulesets, required review, audit evidence |
| **Act** | agents that change code, issues, workflows, or deployments | explicit scopes, isolated runtime, least privilege, staged/draft outputs, human approval, kill switch |

Map people and repositories to tiers rather than assuming a user's job title determines risk. A developer may be Explore in one repository and Act in another.

### 4. Data and privacy boundaries — “Know what may cross the boundary” (6–8 min)

Make the boundary operational:

- classify repositories and prompts: public, internal, confidential, regulated/secrets;
- prohibit secrets, credentials, regulated personal data, and unapproved customer content in prompts or context;
- define retention, access, residency, and vendor/processor expectations with privacy and legal owners;
- separate retrieval permissions from write permissions;
- document what telemetry is collected, who can see it, and how long it is retained;
- provide a safe escalation path for uncertain data.

**Presenter prompt:** “If we cannot explain where a prompt, retrieved file, generated patch, and audit event go, we are not ready to scale that capability.”

### 5. Human accountability and review expectations — “AI can propose; owners remain accountable” (5–7 min)

Clarify non-delegable ownership:

- the code owner owns correctness, security, licensing, and operational fitness;
- the approver owns the merge/deploy decision, even when an agent authored the change;
- security/privacy owners define exceptions and response paths;
- platform owners own policy inheritance, logging, and rollback.

Review expectations should be risk-proportionate: inspect diffs and tests, verify dependencies and licenses, run security checks, confirm provenance where required, and reject output that cannot be explained. “AI-generated” is not a substitute for a review record.

### 6. Agentic features — “More autonomy requires more containment” (6–8 min)

Use a ladder: **suggest → draft → propose → execute**. For every step rightward, add:

- narrower permissions and explicit tool allowlists;
- isolated/ephemeral execution and controlled network egress;
- read-only planning before any write;
- staged or draft pull requests/issues rather than direct merge/deploy;
- rate limits, budgets, timeouts, concurrency controls, and stop conditions;
- prompt-injection and secret-leak detection;
- a human approval checkpoint and a tested kill switch.

**Key line:** The unit of governance is not the model; it is the complete action path: identity + context + tools + permissions + outputs.

### 7. Telemetry and metrics — “Measure outcomes, not activity” (5–6 min)

Organize metrics into four layers:

1. **Adoption:** enabled users, active users, capability mix, training completion.
2. **Flow:** time to first review, cycle time, review load, accepted/rejected/pending outputs.
3. **Quality and risk:** escaped defects, security findings, secret events, policy exceptions, rollback/incident rate.
4. **Value and trust:** task completion time, developer sentiment, rework, support burden, cost per accepted outcome.

Segment by team, repository risk tier, capability, and time period. Avoid using acceptance rate or lines of code as a standalone productivity score. Pair quantitative signals with sampled review quality and incident narratives.

### 8. Staged rollout — “Earn the next capability” (4–5 min)

Recommend four gates:

1. **Prepare:** inventory repositories/data, define owners, baseline metrics, publish acceptable-use guidance.
2. **Pilot:** small representative cohort; Explore/Deliver only; weekly review of outcomes and incidents.
3. **Expand:** add higher-risk teams or agentic features only after guardrails, training, and rollback are proven.
4. **Operate:** quarterly policy review, continuous telemetry, exception expiry, and incident exercises.

Every gate needs an owner, evidence threshold, go/no-go decision, and rollback plan.

### 9. Live demo — “Governance in the workflow” (10–15 min)

Use one repository and show the same task under escalating controls:

1. **Explore:** Copilot explains a test failure without access to secrets or production data.
2. **Deliver:** Copilot proposes a pull request; branch protection, required checks, and human review remain in force.
3. **Act:** an agent plans a dependency update in read-only mode, produces a draft PR, records tool/audit events, and pauses for approval.
4. **Boundary test:** introduce an untrusted instruction or prohibited file; show refusal/containment and the audit trail.
5. **Evidence view:** compare accepted outcome, review result, cost/usage, and security checks; explain what would trigger rollback.

Keep the demo synthetic and disposable. Narrate the control that caused each behavior; do not imply that a successful demo proves production readiness.

### 10. Close — “One platform, inherited policy, continuous evidence” (2–4 min)

Leave three actions:

- choose one low-risk value hypothesis and one accountable owner;
- classify the repositories and define the minimum boundary;
- schedule the first evidence review before expanding access.

Final prompt: **“What is the next capability we can enable safely—and what evidence would change our mind?”**

## Facilitation notes

- For executives, foreground decision rights, risk appetite, measurable outcomes, and rollback.
- For platform/security, foreground inheritance, least privilege, auditability, exception handling, and incident response.
- For developers, foreground practical defaults, low-friction review, safe prompts, and how to get unblocked.
- Treat “privacy” and “security” as operating constraints, not a fear segment.
- Do not promise perfect detection, zero risk, or universal productivity gains.
- Label illustrative metrics as illustrative; cite product behavior and current policy from authoritative documentation in the eventual deck.

## Evidence and source checklist for the eventual deck

- GitHub Copilot trust, privacy, and policy documentation
- GitHub Enterprise, organization/repository policy, rulesets, branch protection, and audit-log documentation
- GitHub Actions permissions, environments, and deployment protection documentation
- GitHub Advanced Security/code scanning/secret scanning/dependency review documentation
- Current agent/cloud-agent capability, review, usage, and outcome documentation
- Organization privacy, legal, records-retention, and acceptable-use policies

