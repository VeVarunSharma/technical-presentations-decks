# Opening visual: Govern GitHub Copilot at Scale

## Briefing frame

- **Audience:** mixed executive, platform, security, and developer-leadership stakeholders
- **Format:** 45–60 minute briefing with a live demo
- **Framing:** governance-at-scale
- **Opening promise:** Copilot can accelerate every SDLC handoff; governance makes that acceleration trustworthy, repeatable, and measurable.

## Visual model

Use a left-to-right **control-plane over delivery-loop** composition on a 16:9 slide.

```text
                         GOVERNANCE CONTROL PLANE
  Identity & access → Enterprise / org / repo policy → AI / Copilot governance
          │                    │                          │
          ▼                    ▼                          ▼
  ┌─────────────────────────────────────────────────────────────────────┐
  │  PLAN → CODE → REVIEW → BUILD → RELEASE → OPERATE → LEARN           │
  │   │       │       │        │        │         │         │             │
  │   └────── developer workflow + pull requests + Actions ─────────────┘
  └─────────────────────────────────────────────────────────────────────┘
          ▲             ▲                ▲                 ▲
          │             │                │                 │
     GHAS / Code Security: code scanning · secret protection · supply chain
                         Auditability + measurement
```

### Composition

1. **Top rail — “Set the boundaries”**  
   Three connected cards: **Identity & access**, **Enterprise / org / repository policy**, **AI / Copilot governance**. Use thin directional connectors to show inheritance and decision flow, not a hierarchy of products.
2. **Middle loop — “Make the safe path the fast path”**  
   Seven compact lifecycle nodes: Plan, Code, Review, Build, Release, Operate, Learn. Put developer workflows and Actions beneath the nodes as the execution substrate.
3. **Bottom rail — “Prove and improve”**  
   GHAS / Code Security spans the loop as continuous checks; Auditability + measurement closes the loop back to policy. Label the feedback arrow **evidence → tuning → adoption**.
4. **Center emphasis**  
   Place a small green callout at the intersection of policy and workflow: **“Governance is a connected system, not a checklist.”**

## Presenter narrative

> “At scale, the question is not whether GitHub Copilot is enabled. The question is whether every identity, repository, prompt, pull request, workflow, build, and deployment inherits the right guardrails—and whether we can prove those guardrails worked.  
> 
> This model starts with the control plane: who can act, where policy is defined, and how Copilot is governed. It then follows the developer’s path through the GitHub SDLC, where workflows and Actions make the safe path executable. GHAS and code security provide continuous signals at the points where risk enters. Finally, auditability and measurement turn activity into evidence, so leaders can tune policy without slowing delivery.”

## Progressive reveal

1. Reveal the top control-plane rail.
2. Animate the SDLC loop from Plan through Learn.
3. Reveal Actions and developer workflow as the substrate.
4. Draw GHAS checks across the loop.
5. Close the loop with auditability and measurement.
6. Land the thesis: **“One platform, inherited policy, continuous evidence.”**

## Design notes

- Reuse the existing `ghas-ai-sdlc` patterns: `section-heading`, `slide-index`, `source-note`, progressive `data-build-step`, and semantic GitHub theme tokens.
- Prefer `copilot-dark` for this deck: black/white foundation, green connective accent, purple reserved for Copilot governance.
- Use solid lines for execution flow, dashed lines for governance/evidence feedback, and labels in addition to color.
- Avoid product-logo tiles; the visual is an operating model, not a feature catalog.
- Keep each node to one or two words so the opening reads from the back of a room.

## Suggested source anchors

- GitHub Enterprise Cloud documentation: enterprise, organization, and repository policies
- GitHub documentation: authentication, authorization, rulesets, audit log, and Actions
- GitHub Copilot trust center / policy documentation
- GitHub Advanced Security overview, code scanning, secret scanning, and dependency review
- GitHub security overview and audit-log documentation for measurement and evidence
