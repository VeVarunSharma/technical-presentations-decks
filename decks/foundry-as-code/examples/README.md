# Foundry as Code examples

These files illustrate a source-controlled Microsoft Foundry hosted-agent lifecycle for a repository support agent.

## Files

- `azure.yaml` declares the Foundry project, model deployment, GitHub MCP connection, toolbox, and hosted agent.
- `eval.yaml` defines a small azd evaluation suite for fast development and smoke evaluation.
- `repository-assistant-evals.json` provides the dataset and evaluators consumed by the Microsoft Foundry Evaluation GitHub Action.
- `foundry-agent-ci.yml` shows a path-filtered GitHub Actions workflow that authenticates with OIDC, deploys to an existing staging environment, smoke-tests the agent, and runs candidate-versus-baseline evaluation.

## Before reuse

1. Verify current Microsoft Foundry preview status and extension versions.
2. Replace illustrative model names, versions, capacity, paths, and agent identifiers.
3. Configure GitHub OIDC and assign the minimum Azure roles required for deployment and evaluation.
4. Store secrets and environment-specific values in azd environments or protected GitHub environments. Do not commit them.
5. Define explicit release thresholds and approvals. The evaluation action creates evidence; your policy decides whether to promote.
6. Validate network isolation, outbound access, model quota, responsible AI policy, telemetry, and rollback requirements for the target environment.
