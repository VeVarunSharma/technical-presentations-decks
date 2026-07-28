# GitHub Agentic Workflows deck sources

Last reviewed: 2026-07-16

| Source | Purpose |
|---|---|
| <https://www.microsoft.com/en-us/security/blog/2026/06/05/securing-ci-cd-in-agentic-world-claude-code-github-action-case/?msockid=2d5ff4b38a6f64cc0049e38c8bec65b6> | Microsoft Threat Intelligence case study: prompt injection plus runner secret and tool access can create an exfiltration path. The reported issue was fixed in Claude Code 2.1.128; the case does not establish that the Claude Code CLI is inherently insecure. |
| <https://github.github.com/gh-aw/> | GH-AW overview, supported coding-agent engines, security-first positioning, compilation model, and cost visibility. |
| <https://github.github.com/gh-aw/reference/markdown/> | Guidance for writing explicit Markdown intent, criteria, constraints, expected outcomes, and error handling. |
| <https://github.github.com/gh-aw/reference/workflow-structure/> | Markdown source plus compiled `.lock.yml` structure and the frontmatter/body recompilation boundary. |
| <https://github.github.com/gh-aw/reference/frontmatter/> | Declarative trigger, permission, engine, tool, budget, observability, and strict-mode controls. |
| <https://github.github.com/gh-aw/patterns/deterministic-ops/> | Deterministic-first preprocessing, trigger filtering, artifacts, and hybrid deterministic/agent execution. |
| <https://github.github.com/gh-aw/reference/steps-jobs/> | Supported deterministic `steps`, `pre-agent-steps`, `post-steps`, custom jobs, and `noop` short-circuiting. |
| <https://github.github.com/gh-aw/reference/cost-management/> | AI Credits, skip filters, `noop`, schedules and batching, budgets, turns, models, logs, audit, and optimization guidance. |
| <https://github.github.com/gh-aw/reference/concurrency/> | Workflow, engine, safe-output, queue, job-discriminator, and conclusion-job concurrency behavior. |
| <https://github.github.com/gh-aw/reference/rate-limiting-controls/> | User rate limits, timeouts, stop-after controls, safe-output limits, and event-storm defenses. |
| <https://github.github.com/gh-aw/reference/billing/> | Separation of GitHub Actions compute charges from model-provider inference billing. |
| <https://github.github.com/gh-aw/reference/engines/> | Engine/model selection, retry harness, continuations, Copilot SDK mode, and engine-specific controls. |
| <https://github.github.com/gh-aw/reference/tools/> | Tool allowlists, MCP configuration, shell restrictions, and per-tool/startup timeouts. |
| <https://github.github.com/gh-aw/introduction/architecture/> | Defense-in-depth architecture: compilation, substrate isolation, network mediation, read-only agent execution, staged plans, and separated write jobs. |
| <https://github.github.com/gh-aw/reference/permissions/> | Least-privilege read permissions for the agent and permission separation for writes. |
| <https://github.github.com/gh-aw/reference/safe-outputs/> | Structured, validated, rate-limited writes performed by separate permission-scoped jobs. |
| <https://github.github.com/gh-aw/reference/safe-outputs-pull-requests/> | Draft pull requests, protected-file handling, and pull-request output constraints. |
| <https://github.github.com/gh-aw/reference/threat-detection/> | Prompt-injection, secret-leak, and malicious-patch detection before outputs are applied. |
| <https://github.github.com/gh-aw/reference/network/> | Agent Workflow Firewall allowlists and controlled network egress. |
| <https://github.github.com/gh-aw/reference/triggers/> | Roles, approvals, deterministic skip filters, schedules, batching, and stop-after controls. |
| <https://github.github.com/gh-aw/reference/staged-mode/> | Previewing requested writes without applying them. |
| <https://github.github.com/gh-aw/guides/open-telemetry/> | OTLP export, built-in spans, trace artifacts, and organization-level observability. |
| <https://github.github.com/gh-aw/reference/outcomes/> | Repository-observed accepted/rejected/pending outcomes and AI Credits per accepted outcome. |
| <https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/> | Controlled study in which participants using Copilot completed a specific JavaScript HTTP-server task 55% faster; used only as a task-capacity proxy, not a LOC claim. |
| <https://github.blog/news-insights/research/the-economic-impact-of-the-ai-powered-developer-lifecycle-and-lessons-from-github-copilot/> | Historical adoption context: up to 46% code completion in enabled files and more than three billion accepted lines during Copilot's first year. |
| <https://github.blog/news-insights/research/survey-ai-wave-grows/> | 2024 survey context: more than 97% of 2,000 respondents across four countries reported having used AI coding tools at work at some point. |
| <https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent> | Copilot cloud agent capabilities, ephemeral GitHub Actions environment, review workflow, usage costs, and outcome metrics. |
| <https://github.com/github/copilot-sdk> | Copilot SDK positioning, supported languages, CLI-server architecture, authentication, tools, and billing model. |
| <https://github.github.com/gh-aw/setup/cli/> | CLI setup, validation, and compilation commands. |

## Metric and case-study context

- **55% faster** is a result from a controlled task completed by 95 professional developers. In this deck it is a measured task-speed/capacity proxy, not a claim about lines of code, every task, or every team.
- **Up to 46% code completion** is historical context for files where Copilot was enabled, not a current universal share of production code.
- **More than three billion accepted lines** is a cumulative first-year adoption statistic, not a quality or productivity measure.
- **More than 97% usage** is a 2024 survey response about having used AI coding tools at work at some point; it does not measure frequency, organizational approval, or production deployment.
- **Claude Code Action case:** Microsoft reported a specific secret-access path involving untrusted content and tool/runtime boundaries. Anthropic fixed the issue in **Claude Code 2.1.128** by blocking access to sensitive `/proc` files. The lesson is to isolate secrets, untrusted input, tools, and write/communication capabilities—not to characterize the CLI itself as inherently insecure.
