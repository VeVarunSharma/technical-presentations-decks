# Live GitHub Governance Demo Runbook

## Purpose and demo contract

**Audience:** executives, platform engineering, security, developer experience, and engineering leaders.  
**Duration:** 45–60 minutes total; reserve 14–18 minutes for the live flow.  
**Thesis:** governance is the control plane that makes Copilot acceleration trustworthy, repeatable, and measurable.

The demo uses a disposable GitHub Enterprise Cloud organization and one synthetic repository. It demonstrates control inheritance, enforcement, evidence, and recovery—not production readiness or every available product setting.

## Prerequisites

- GitHub Enterprise Cloud trial/demo enterprise with an organization and disposable repository (`governance-demo-app`).
- Presenter account: enterprise/org owner plus repository admin; separate demo developer account with normal write access.
- Optional security account/team for reviewing alerts and audit evidence.
- Copilot enabled for a small demo team; use synthetic code and prompts only.
- Repository prepared with:
  - default branch and a `demo/change` branch;
  - `CODEOWNERS`, pull request template, README, and a simple GitHub Actions test workflow;
  - one intentionally failing or missing required check;
  - a harmless secret-like test fixture excluded from real credentials;
  - a dependency update or small code change suitable for a draft PR.
- Pre-created organization ruleset in **Evaluate** mode, then a second ruleset ready to activate.
- A documented exception record: scope, reason, compensating control, approver, owner, expiry, and review date.
- Browser profiles/tabs pre-authenticated; no personal repositories, customer data, tokens, or real secrets visible.
- Screenshot pack captured from the same seeded state (see fallback list below).

## Environment setup and reset

### Before the session

1. Snapshot the seeded repository commit, branch protection/ruleset JSON, Actions workflow, and demo team membership.
2. Verify the presenter can inspect enterprise, organization, repository, ruleset, audit-log, Copilot, and security pages.
3. Verify the developer account can open a PR but cannot bypass required review/checks.
4. Run the workflow once successfully; then prepare the known failing-check state.
5. Confirm audit events are visible and timestamps are easy to identify.
6. Open fallback screenshots locally and test screen sharing at the intended resolution.

### Reset between rehearsals

1. Close/delete demo PRs and draft PRs; restore the default branch to the seed commit.
2. Recreate `demo/change` from the seed commit.
3. Restore ruleset to Evaluate mode; clear temporary bypasses and remove test collaborators.
4. Restore the known failing check only after the baseline successful run is recorded.
5. Remove the demo exception or recreate it with a fresh expiry.
6. Confirm Copilot demo team, repository classification, and Actions permissions.
7. Verify audit history contains only expected rehearsal events.

If reset cannot be completed in five minutes, switch to screenshots rather than changing live settings under pressure.

## Exact demo sequence

| Elapsed | Segment and action | Expected state / proof | Recovery path |
|---:|---|---|---|
| 0:00–1:00 | **Orient.** State the four questions: who may act, where the rule lives, what the developer experiences, and what evidence proves it. | Synthetic org/repo and named policy owner are visible. | Use opening architecture screenshot. |
| 1:00–3:00 | **Foundational inspection.** Navigate enterprise/org/repo administration; identify identity, team, repository, and security boundaries. | Viewer can distinguish inherited baseline, local setting, and repository-owned convention. Do not claim all settings inherit identically. | Use hierarchy/settings inventory screenshots. |
| 3:00–5:00 | **Policy inheritance.** Show the organization baseline and repository view of the inherited control; point out a local overlay that remains repository-owned. | Same policy is visible at parent and child scope; scope and owner are explicit. | Show captured before/after settings comparison. |
| 5:00–8:00 | **Rulesets.** Open Evaluate ruleset; show target pattern, conditions, required reviews/status checks, bypass actors, and enforcement mode. Activate the staged ruleset only if the audience is ready. | Ruleset targets the demo repo; evaluate/active status and bypass list are legible. | Keep Evaluate mode and use ruleset anatomy screenshot. |
| 8:00–11:00 | **Developer experience.** Open PR from `demo/change`; show required check/review preventing merge, then run/fix the check and request CODEOWNER review. | Merge is blocked for an explainable reason; remediation path is visible; approval does not silently bypass checks. | Use pre-captured blocked PR and successful remediation screenshots. |
| 11:00–13:00 | **Exception and audit evidence.** Show narrowly scoped, expiring bypass/exception record, then audit log/settings history for ruleset or policy change. | Exception has owner, approver, compensating control, expiry; evidence shows who/what/when. | Use exception card and audit-log screenshots. Never create a permanent bypass live. |
| 13:00–15:00 | **Copilot/AI governance.** In the demo repo, ask Copilot to explain a test failure or propose a small change. Contrast Explore/Deliver/Act: no secrets, human review, draft PR/read-only planning, explicit tools and approval. | Copilot output is treated as a proposal; PR still requires checks/review; prohibited synthetic instruction/file is refused or contained where supported. | Use recorded prompt/output and policy matrix screenshots; narrate that behavior varies by enabled capability and plan. |
| 15:00–17:00 | **Light GHAS touchpoint.** Open security overview or code-scanning/secret-scanning/dependency-review result associated with the PR; show how a finding becomes another required signal. | Finding is synthetic/non-sensitive, linked to a commit/PR, and has a remediation owner. | Use security overview screenshot or a prepared SARIF result; do not enable a new paid feature mid-session. |
| 17:00–18:00 | **Debrief.** Map each observed state to permission → practice → proof and the control-plane thesis. | Audience can name owner, enforcement point, exception evidence, and next metric. | Skip to close slide if live flow consumed time. |

### 45-minute variant

Use 12–14 minutes: combine foundational inspection with inheritance, show one ruleset state, one blocked PR, one audit event, and a 60-second Copilot/GHAS touchpoint.

### 60-minute variant

Use 18 minutes live, then add a five-minute audience exercise: classify three controls as enterprise baseline, organization standard, repository convention, or time-bound exception.

## Expected end state

- Central baseline is visible and its owner is named.
- Repository-local standards are distinguishable from inherited controls.
- Ruleset is targeted correctly and blocks unsafe merge behavior.
- PR remediation is clear; human approval remains accountable.
- Exception is narrow, approved, compensating-controlled, and expiring.
- Audit evidence records the policy/action change.
- Copilot interaction stays within data, permission, review, and approval boundaries.
- GHAS signal is connected to the same PR workflow without distracting from governance.
- Repository is reset or left in a documented post-demo state.

## Fallback screenshot pack

Capture these at the same browser size and label each with timestamp/state:

1. Enterprise → organization → repository hierarchy and ownership.
2. Parent policy and child repository inherited/local settings.
3. Ruleset anatomy: target, conditions, enforcement, bypass, monitoring.
4. Blocked PR showing missing required check/review.
5. Successful remediation and approved PR.
6. Exception register/card with expiry and compensating control.
7. Audit log/settings history for the policy or ruleset change.
8. Copilot policy/capability matrix and synthetic prompt/output.
9. Draft/read-only agent plan with human approval checkpoint.
10. Security overview/code scanning or dependency-review finding linked to PR.

## Recovery paths

- **Authentication/permissions:** switch to presenter profile; if unavailable, narrate from screenshots and state the missing permission.
- **Settings page unavailable or plan mismatch:** do not improvise claims; show the documented screenshot and label plan/scope dependency.
- **Ruleset fails to block:** stop before merge, restore Evaluate mode, show blocked-PR capture, and explain target/condition diagnostics.
- **Workflow hangs:** use the pre-recorded successful run and explain required-check semantics; do not wait beyond two minutes.
- **Copilot unavailable or output is unexpected:** use synthetic recorded output; emphasize proposal/review boundaries rather than model behavior.
- **GHAS alert absent:** show prepared security overview/SARIF result and explain the signal-to-remediation path.
- **Audience asks for production changes:** defer; record owner, scope, evidence threshold, rollback, and change window as follow-up.

## Presenter guardrails

Say “in this configured scope” and “this demo illustrates” rather than implying universal inheritance or guaranteed AI behavior. Keep “guardrail,” “default,” and “paved road” as the primary framing. Never expose real secrets, customer content, personal identities, or production settings.
