# Microsoft Foundry as Code deck sources

Last reviewed: 2026-10-02

| Source | Purpose |
|---|---|
| <https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/azure-yaml-reference> | Current unified `azure.yaml` model, service hosts, dependency graph, agent kinds, deploy modes, environments, private networking, extension compatibility, and lifecycle behavior. |
| <https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/author-azure-yaml> | Step-by-step composition guidance for projects, model deployments, connections, toolboxes, hosted agents, file references, deployment modes, and optional IaC ejection. |
| <https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-yaml-reference> | Deprecation notice and migration context for legacy `agent.yaml` and `agent.manifest.yaml`; retained only to explain older samples. |
| <https://learn.microsoft.com/en-us/azure/foundry/agents/quickstarts/set-up-cicd-hosted-agent> | Official GitHub Actions pattern for OIDC authentication, azd environment configuration, deployment, status inspection, and smoke invocation. |
| <https://learn.microsoft.com/en-us/azure/foundry/how-to/evaluation-github-action> | Official preview GitHub Action for offline agent evaluation, supported inputs, path-trigger guidance, evaluator categories, confidence intervals, and statistical comparison. |
| <https://github.com/microsoft/ai-agent-evals> | Source repository and current `microsoft/ai-agent-evals@v3-beta` usage for Microsoft Foundry agents. |
| <https://learn.microsoft.com/en-us/azure/foundry/observability/quickstarts/quickstart-evaluate-hosted-agent> | Hosted-agent evaluation using `eval.yaml`, JSONL datasets, built-in evaluators, azd, portal, and SDK paths. |
| <https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/evaluate-agent> | Rubric evaluators, agent-target evaluation, built-in quality and safety evaluators, dataset upload, result interpretation, and release thresholds. |
| <https://learn.microsoft.com/en-us/azure/foundry/observability/how-to/cloud-evaluation> | Cloud evaluation concepts and SDK-based evaluation workflow for scalable automation. |
| <https://learn.microsoft.com/en-us/azure/developer/github/connect-from-azure-openid-connect> | GitHub Actions authentication to Azure with OpenID Connect and federated identity. |
| <https://microsoft.github.io/AgentSchema/> | Open AgentSchema specification referenced by the legacy Foundry agent schema documentation. |

## Preview and version context

- Microsoft marks standalone `agent.yaml` and `agent.manifest.yaml` as deprecated in favor of unified `azure.yaml` for current hosted-agent projects.
- Microsoft Foundry hosted agents, some azd agent commands, azd evaluation commands, voice capabilities, and the `microsoft/ai-agent-evals@v3-beta` GitHub Action may be preview experiences. Preview status and required extension versions can change; verify current Microsoft Learn guidance before production adoption.
- The model names, versions, SKU, and capacity in the downloadable `azure.yaml` are illustrative. Teams must resolve supported models, quota, region, and responsible AI requirements for their environment.
- The evaluation score examples in the presentation are illustrative policy scenarios, not measured product benchmarks.

## Example provenance

- `examples/azure.yaml` is adapted from the current Microsoft Learn unified hosted-agent examples and uses parameterized credentials.
- `examples/eval.yaml` follows the current hosted-agent evaluation quickstart shape.
- `examples/repository-assistant-evals.json` follows the input contract for the official Microsoft Foundry Evaluation GitHub Action.
- `examples/foundry-agent-ci.yml` combines the official hosted-agent CI/CD and evaluation-action patterns. It is intentionally parameterized and requires project-specific environment, identity, role, agent-version, and promotion-policy configuration.
