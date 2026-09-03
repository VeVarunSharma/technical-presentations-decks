# GitHub Copilot Governance deck sources

Last reviewed: 2026-09-03

Official GitHub sources only. Product behavior and supported-client coverage can change; verify the current reference before reusing these examples as production policy.

| Source | Purpose |
|---|---|
| <https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/configure-enterprise-managed-settings> | Deployment methods, `.github-private` repository layout, server-managed settings, team mappings, refresh behavior, and dedicated Copilot Business guidance. |
| <https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings> | Current `managed-settings.json` schema, precedence, permissions, plugins, marketplaces, telemetry, remote control, MCP, sandbox, and team override semantics. |
| <https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/overview> | Relationship among Copilot CLI instructions, hooks, skills, agents, MCP servers, plugins, and personal settings. |
| <https://docs.github.com/en/copilot/concepts/agents/about-plugins> | Plugin concepts and installable customization bundles. |
| <https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-finding-installing> | Default and added marketplaces, plugin discovery, installation, update, and removal workflows. |
| <https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-marketplace> | Marketplace structure, `marketplace.json`, supported hosting locations, and distribution workflow. |
| <https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-creating> | Plugin structure and the supported bundle components: agents, skills, hooks, and MCP server configuration. |
| <https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference> | Plugin and marketplace manifest reference. |
| <https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference> | Copilot CLI configuration and managed MCP allow/deny behavior. |
| <https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference> | MCP source loading priority, enterprise evaluation behavior, and CLI configuration locations. |
| <https://docs.github.com/en/copilot/concepts/mcp-management> | Comparison of managed-settings MCP allowlists and custom registry restrictions. |
| <https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist> | Recommended enterprise allow/deny implementation through `managed-settings.json`. |
| <https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/restrict-based-on-registry> | Public-preview registry restriction method, limitations, and migration guidance. |

## Example policy context

- The example files are illustrative governance postures, not compliance certifications or universal best practices.
- Placeholder organization names, repositories, URLs, and collector endpoints must be replaced before use.
- Do not commit real bearer tokens or collector credentials into `managed-settings.json`; distribute secrets through an approved secure mechanism.
- The unmanaged posture is represented by the absence of centrally deployed managed settings.
- First-party trusted Copilot MCP servers have documented exemptions and are not presented as blockable by these examples.
- The custom MCP registry restriction is presented as an alternative, weaker enforcement method. GitHub recommends using the `managed-settings.json` allowlist and disabling registry-only restriction to avoid conflicting sources of truth.
- MCP source loading priority is labeled as Copilot CLI behavior.
- `allowedMcpServers` and `deniedMcpServers` evaluate server identity after source collision resolution; plugin packaging does not create a documented allowlist bypass.
- An empty `allowedMcpServers` array blocks all non-default servers, including plugin-contributed servers. Built-in default servers remain exempt.
- The examples intentionally omit `strictPluginOnlyCustomization` and `allowManagedMcpServersOnly` because those keys are not present in the current official enterprise-managed settings schema reviewed on 2026-09-03.
