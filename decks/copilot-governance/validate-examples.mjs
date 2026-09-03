import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const required = [
  "examples/flexible/managed-settings.json",
  "examples/very-secure/managed-settings.json",
  "examples/hard-lockdown/managed-settings.json",
  "examples/team-mappings.json",
  "examples/teams/developers.json",
  "examples/teams/ai-pioneers.json",
  "examples/teams/regulated.json",
  "examples/mcp/open-ecosystem.json",
  "examples/mcp/denylist-guardrail.json",
  "examples/mcp/curated-hybrid.json",
  "examples/mcp/managed-plugin-distribution.json",
  "examples/mcp/direct-mcp-only.json",
  "examples/mcp/no-custom-mcp.json"
];
const errors = [];
const documents = new Map();

for (const relativePath of required) {
  const path = resolve(root, relativePath);
  if (!existsSync(path)) {
    errors.push(`Missing ${relativePath}`);
    continue;
  }
  try {
    documents.set(relativePath, JSON.parse(readFileSync(path, "utf8")));
  } catch (error) {
    errors.push(`${relativePath}: ${error.message}`);
  }
}

const baseline = documents.get("examples/flexible/managed-settings.json");
const mappings = documents.get("examples/team-mappings.json");
const additiveKeys = new Set(["enabledPlugins", "extraKnownMarketplaces"]);

function collectOverridable(value, prefix = "", output = new Set()) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return output;
  for (const [key, child] of Object.entries(value)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (child && typeof child === "object" && !Array.isArray(child) && "overridable" in child) {
      output.add(path);
    } else {
      collectOverridable(child, path, output);
    }
  }
  return output;
}

function collectLeaves(value, prefix = "", output = new Set()) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    if (prefix) output.add(prefix);
    return output;
  }
  for (const [key, child] of Object.entries(value)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (additiveKeys.has(key)) output.add(key);
    else collectLeaves(child, path, output);
  }
  return output;
}

function sourceIdentity(source) {
  return JSON.stringify(source);
}

function validateMarketplaceSources(document, label, allowedExternalSources = new Set()) {
  if (!document || !Array.isArray(document.strictKnownMarketplaces)) return;
  const knownSources = new Set(
    Object.values(document.extraKnownMarketplaces || {})
      .map((marketplace) => marketplace?.source)
      .filter(Boolean)
      .map(sourceIdentity)
  );
  for (const source of document.strictKnownMarketplaces) {
    const identity = sourceIdentity(source);
    if (!knownSources.has(identity) && !allowedExternalSources.has(identity)) {
      errors.push(`${label}: strict marketplace ${identity} is not declared in extraKnownMarketplaces`);
    }
  }
}

if (baseline && mappings) {
  const overridable = collectOverridable(baseline);
  const baselineStrictSources = new Set((baseline.strictKnownMarketplaces || []).map(sourceIdentity));
  for (const [teamFile, teamSlugs] of Object.entries(mappings)) {
    if (!Array.isArray(teamSlugs) || teamSlugs.length === 0) {
      errors.push(`examples/team-mappings.json: ${teamFile} must map to at least one team slug`);
    }
    const relativePath = `examples/teams/${teamFile}`;
    const team = documents.get(relativePath);
    if (!team) {
      errors.push(`Mapping target does not exist: ${relativePath}`);
      continue;
    }
    for (const path of collectLeaves(team)) {
      if (!overridable.has(path) && !additiveKeys.has(path)) {
        errors.push(`${relativePath}: ${path} is not overridable or additive in the flexible baseline`);
      }
    }
    for (const marketplace of Object.values(team.extraKnownMarketplaces || {})) {
      const identity = marketplace?.source && sourceIdentity(marketplace.source);
      if (identity && !baselineStrictSources.has(identity)) {
        errors.push(`${relativePath}: added marketplace ${identity} is blocked by the enterprise strictKnownMarketplaces list`);
      }
    }
  }
}

const defaultMarketplace = sourceIdentity({ source: "github", repo: "github/copilot-plugins" });
const teamMarketplaceSources = new Set(
  [...documents.entries()]
    .filter(([relativePath]) => relativePath.startsWith("examples/teams/"))
    .flatMap(([, document]) => Object.values(document.extraKnownMarketplaces || {}))
    .map((marketplace) => marketplace?.source)
    .filter(Boolean)
    .map(sourceIdentity)
);
validateMarketplaceSources(
  baseline,
  "flexible/managed-settings.json",
  new Set([defaultMarketplace, ...teamMarketplaceSources])
);

const unsupportedKeys = new Set(["strictPluginOnlyCustomization", "allowManagedMcpServersOnly"]);
for (const [relativePath, document] of documents) {
  for (const key of unsupportedKeys) {
    if (key in document) {
      errors.push(`${relativePath}: ${key} is not in the current documented enterprise-managed settings schema`);
    }
  }
}

const mcpExamples = {
  open: documents.get("examples/mcp/open-ecosystem.json"),
  deny: documents.get("examples/mcp/denylist-guardrail.json"),
  curated: documents.get("examples/mcp/curated-hybrid.json"),
  managedPlugin: documents.get("examples/mcp/managed-plugin-distribution.json"),
  direct: documents.get("examples/mcp/direct-mcp-only.json"),
  noCustom: documents.get("examples/mcp/no-custom-mcp.json")
};

if (mcpExamples.open && "allowedMcpServers" in mcpExamples.open) {
  errors.push("open-ecosystem.json must omit allowedMcpServers");
}
if (mcpExamples.deny) {
  if ("allowedMcpServers" in mcpExamples.deny) errors.push("denylist-guardrail.json must omit allowedMcpServers");
  if (!Array.isArray(mcpExamples.deny.deniedMcpServers) || mcpExamples.deny.deniedMcpServers.length === 0) {
    errors.push("denylist-guardrail.json must define at least one denied server");
  }
}
if (mcpExamples.curated) {
  if (!Array.isArray(mcpExamples.curated.allowedMcpServers) || mcpExamples.curated.allowedMcpServers.length === 0) {
    errors.push("curated-hybrid.json must define a non-empty MCP allowlist");
  }
  validateMarketplaceSources(mcpExamples.curated, "curated-hybrid.json", new Set([defaultMarketplace]));
}
if (mcpExamples.managedPlugin) {
  if (!Array.isArray(mcpExamples.managedPlugin.allowedMcpServers) || mcpExamples.managedPlugin.allowedMcpServers.length === 0) {
    errors.push("managed-plugin-distribution.json must allowlist the plugin's MCP server identity");
  }
  if (!Object.values(mcpExamples.managedPlugin.enabledPlugins || {}).includes(true)) {
    errors.push("managed-plugin-distribution.json must force-enable a plugin");
  }
  validateMarketplaceSources(mcpExamples.managedPlugin, "managed-plugin-distribution.json");
}
if (mcpExamples.direct) {
  if (!Array.isArray(mcpExamples.direct.allowedMcpServers) || mcpExamples.direct.allowedMcpServers.length === 0) {
    errors.push("direct-mcp-only.json must define a non-empty MCP allowlist");
  }
  if (!Array.isArray(mcpExamples.direct.strictKnownMarketplaces) || mcpExamples.direct.strictKnownMarketplaces.length !== 0) {
    errors.push("direct-mcp-only.json must use an empty strictKnownMarketplaces list");
  }
}
if (mcpExamples.noCustom) {
  if (!Array.isArray(mcpExamples.noCustom.allowedMcpServers) || mcpExamples.noCustom.allowedMcpServers.length !== 0) {
    errors.push("no-custom-mcp.json must use an empty MCP allowlist");
  }
  if (!Array.isArray(mcpExamples.noCustom.strictKnownMarketplaces) || mcpExamples.noCustom.strictKnownMarketplaces.length !== 0) {
    errors.push("no-custom-mcp.json must use an empty strictKnownMarketplaces list");
  }
  if (Object.values(mcpExamples.noCustom.enabledPlugins || {}).includes(true)) {
    errors.push("no-custom-mcp.json must not force-enable a plugin");
  }
}

if (errors.length) {
  console.error("Copilot governance example validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Validated ${documents.size} Copilot governance JSON examples.`);
