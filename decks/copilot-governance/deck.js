import { initDeck } from "../../src/runtime/deck.js";
import "../../src/styles/base.css";
import "../../src/styles/components.css";
import "../../src/styles/layouts.css";
import "../../src/styles/print.css";
import flexibleRaw from "./examples/flexible/managed-settings.json?raw";
import verySecureRaw from "./examples/very-secure/managed-settings.json?raw";
import hardLockdownRaw from "./examples/hard-lockdown/managed-settings.json?raw";
import teamMappingsRaw from "./examples/team-mappings.json?raw";
import developersRaw from "./examples/teams/developers.json?raw";
import pioneersRaw from "./examples/teams/ai-pioneers.json?raw";
import regulatedRaw from "./examples/teams/regulated.json?raw";
import mcpOpenRaw from "./examples/mcp/open-ecosystem.json?raw";
import mcpDenyRaw from "./examples/mcp/denylist-guardrail.json?raw";
import mcpCuratedRaw from "./examples/mcp/curated-hybrid.json?raw";
import mcpManagedPluginRaw from "./examples/mcp/managed-plugin-distribution.json?raw";
import mcpDirectRaw from "./examples/mcp/direct-mcp-only.json?raw";
import mcpNoCustomRaw from "./examples/mcp/no-custom-mcp.json?raw";

const deck = initDeck();
const flexible = JSON.parse(flexibleRaw);
const teamMappings = JSON.parse(teamMappingsRaw);
const strictMarketplaceLines = flexible.strictKnownMarketplaces
  .map((source) => `    ${JSON.stringify(source)}`)
  .join(",\n");
const spotlightRaw = `{
  "model": ${JSON.stringify(flexible.model)},
  "permissions": {
    "disableBypassPermissionsMode": ${JSON.stringify(flexible.permissions.disableBypassPermissionsMode)},
    "deny": { "overridable": [${JSON.stringify(flexible.permissions.deny.overridable[0])}] },
    "ask": { "overridable": [${JSON.stringify(flexible.permissions.ask.overridable[0])}] },
    "allow": { "overridable": [${JSON.stringify(flexible.permissions.allow.overridable[0])}] }
  },
  "enabledPlugins": ${JSON.stringify(flexible.enabledPlugins)},
  "extraKnownMarketplaces": { "company-copilot": { "autoUpdate": ${flexible.extraKnownMarketplaces["company-copilot"].autoUpdate} } },
  "strictKnownMarketplaces": [
${strictMarketplaceLines}
  ],
  "telemetry": {
    "enabled": ${flexible.telemetry.enabled},
    "captureContent": ${flexible.telemetry.captureContent},
    "lockCaptureContent": ${flexible.telemetry.lockCaptureContent}
  },
  "remoteControl": ${JSON.stringify(flexible.remoteControl)},
  "allowedMcpServers": ${JSON.stringify(flexible.allowedMcpServers)},
  "deniedMcpServers": {
    "overridable": [${JSON.stringify(flexible.deniedMcpServers.overridable[0])}]
  },
  "sandbox": {
    "enabled": ${flexible.sandbox.enabled},
    "allowBypass": ${flexible.sandbox.allowBypass},
    "sandboxMcpServers": ${flexible.sandbox.sandboxMcpServers}
  }
}`;

const focusDetails = {
  all: ["Complete policy", "One file defines the enterprise baseline", "Model, permissions, extension supply chain, telemetry, remote control, MCP servers, and sandboxing are reviewable together.", "Policy becomes versioned infrastructure."],
  model: ["Model default", "Set the starting model without freezing every conversation", "The enterprise can default new conversations to automatic selection or a named model. Team specialization can leave model choice unmanaged.", "Default is not the same as an immutable model lock."],
  permissions: ["Human control", "Separate block, fresh approval, and fast-path operations", "Deny overrides ask and allow. Managed ask rules require a fresh approval and cannot be satisfied by bypass mode or remembered grants.", "Put consequential effects behind intent."],
  plugins: ["Extension supply chain", "Control installed capability bundles", "Plugins may package agents, skills, hooks, and MCP configuration. Enterprise and team plugin entries compose additively.", "Govern the bundle and its source."],
  marketplaces: ["Distribution boundary", "Curate where plugins can come from", "Extra marketplaces add approved sources; strict marketplaces bound installation. Automatic update policy can be fixed per marketplace.", "Discovery is part of the supply chain."],
  telemetry: ["Evidence", "Export operational telemetry without capturing content", "OpenTelemetry can route usage signals to an enterprise collector while captureContent remains false and locked.", "Measure behavior without normalizing prompt collection."],
  remote: ["Session control", "Require SSO alignment for remote control", "Remote control can be enabled, disabled, or limited to controllers authorized for named GitHub organizations.", "Device-hosted sessions need an identity boundary."],
  mcp: ["External tools", "Allow known MCP servers and deny dangerous identities", "Remote servers match by URL, local servers by exact command, and assigned names only by exact label. Deny rules win.", "Treat MCP as privileged integration inventory."],
  sandbox: ["Local isolation", "Enforce minimum runtime restrictions", "Require sandboxing, prohibit bypass, and contain locally started MCP and language servers. Users may tighten these restrictions, not loosen them.", "The runtime boundary is managed, not suggested."]
};

const sectionGroups = {
  model: "model",
  permissions: "permissions",
  enabledPlugins: "plugins",
  extraKnownMarketplaces: "marketplaces",
  strictKnownMarketplaces: "marketplaces",
  telemetry: "telemetry",
  remoteControl: "remote",
  allowedMcpServers: "mcp",
  deniedMcpServers: "mcp",
  sandbox: "sandbox"
};

const postures = {
  unmanaged: {
    label: "No central policy",
    title: "Unmanaged",
    body: "No enterprise-managed settings are deployed. Users and workspaces select models, permissions, plugins, marketplaces, MCP servers, telemetry, remote control, and sandbox behavior.",
    use: "Labs, individual experimentation, or environments with no central-control requirement.",
    tradeoff: "Maximum variation, limited assurance, and no consistent enterprise evidence.",
    autonomy: 100,
    assurance: 10,
    filename: "No managed-settings.json",
    href: "./examples/unmanaged/README.md",
    link: "Download note",
    raw: `// This posture intentionally has no managed-settings.json.\n// \"unmanaged\" is not a universal disable-all-policy value.`
  },
  flexible: {
    label: "Broad engineering default",
    title: "Flexible baseline",
    body: "Blocks dangerous edges, requires approval for consequential effects, preserves common development flow, curates extensions, and exports content-free telemetry.",
    use: "Most product and platform engineering teams.",
    tradeoff: "Requires thoughtful allow/ask rules and periodic review as tools evolve.",
    autonomy: 78,
    assurance: 66,
    filename: "flexible/managed-settings.json",
    href: "./examples/flexible/managed-settings.json",
    link: "Download JSON",
    raw: flexibleRaw
  },
  secure: {
    label: "Sensitive production work",
    title: "Very secure",
    body: "Narrows network, MCP, marketplace, credential, and write capability while preserving bounded read, test, and approval-led workflows.",
    use: "Sensitive services, production platforms, and high-value repositories.",
    tradeoff: "More approval friction and a smaller extension ecosystem.",
    autonomy: 42,
    assurance: 88,
    filename: "very-secure/managed-settings.json",
    href: "./examples/very-secure/managed-settings.json",
    link: "Download JSON",
    raw: verySecureRaw
  },
  lockdown: {
    label: "Exceptional restricted zone",
    title: "Hard lockdown",
    body: "Denies shell, writes, network, added MCP servers, and remote control while allowing only approved read-only context and a pinned enterprise plugin source.",
    use: "Regulated enclaves, incident response, or narrowly defined read-only assistance.",
    tradeoff: "Many normal development tasks are intentionally impossible.",
    autonomy: 12,
    assurance: 98,
    filename: "hard-lockdown/managed-settings.json",
    href: "./examples/hard-lockdown/managed-settings.json",
    link: "Download JSON",
    raw: hardLockdownRaw
  }
};

const teams = {
  developers: {
    label: "Developers",
    file: "developers.json",
    raw: developersRaw,
    title: "Fast daily engineering inside enterprise edges",
    body: "Developers retain source edits, tests, diffs, and the approved registry. Pushes and workflow changes still require approval.",
    facts: ["Bypass remains disabled", "Frontend plugin added", "No additional marketplace"]
  },
  pioneers: {
    label: "AI pioneers",
    file: "ai-pioneers.json",
    raw: pioneersRaw,
    title: "Broader experimentation with explicit membership",
    body: "The team may choose models and bypass mode, adds an approved lab marketplace, and receives a wider MCP allowlist.",
    facts: ["Model is unmanaged", "Bypass choice is unmanaged", "Lab marketplace and plugin added"]
  },
  regulated: {
    label: "Regulated",
    file: "regulated.json",
    raw: regulatedRaw,
    title: "Narrow team specialization under the baseline",
    body: "The team receives stricter permission rules, no added MCP servers, and a regulated controls plugin.",
    facts: ["Network denied", "MCP allowlist empty", "Regulated plugin added"]
  }
};

const mcpModes = {
  open: ["Open with exceptions", "Omitting the allowlist permits servers subject to deny rules", "This maximizes flexibility but gives administrators the least positive control over external tools and data sources.", `"deniedMcpServers": [\n  { "serverCommand": ["npx", "-y", "unsafe-server"] }\n]`],
  curated: ["Positive allowlist", "Only matched servers are permitted", "Use URL patterns for remote services and exact commands for local stdio servers. A server must satisfy every applicable managed allowlist source.", `"allowedMcpServers": [\n  { "serverUrl": "https://mcp.example.com/*" }\n]`],
  closed: ["Closed to added servers", "An empty allowlist blocks all non-default additions", "This is appropriate when agent access to external tools or data is not required. Trusted built-in servers remain subject to documented platform behavior.", `"allowedMcpServers": []`],
  denied: ["Unconditional block", "A matching deny entry always wins", "Denylists combine across sources, so any managed source can block a matching server for everyone it governs.", `"deniedMcpServers": [\n  { "serverCommand": ["npx", "-y", "blocked-server"] }\n]`]
};

const mcpSources = {
  session: {
    rank: "Priority 1 · Session",
    title: "One invocation can add temporary MCP servers",
    body: "The --additional-mcp-config option is the highest-priority definition source. It is useful for bounded experiments and automation that must not persist configuration.",
    path: "copilot --additional-mcp-config <json-or-file>"
  },
  plugin: {
    rank: "Priority 2 · Plugin",
    title: "A plugin can package MCP with related capabilities",
    body: "Plugin-provided MCP definitions outrank workspace and user definitions with the same name. The plugin may also contain agents, skills, hooks, and instructions.",
    path: "plugin.json → mcpServers"
  },
  workspace: {
    rank: "Priority 3 · Workspace",
    title: "Repositories can declare project-scoped servers",
    body: "Workspace or repository MCP configuration travels with the project. Its selected server must still satisfy enterprise allow and deny rules.",
    path: ".mcp.json or .github/mcp.json"
  },
  user: {
    rank: "Priority 4 · User",
    title: "Personal servers provide the lowest-priority defaults",
    body: "User configuration is convenient for individual tools. Enterprise allow and deny rules evaluate the selected server identity after source priority resolves any name collision.",
    path: "~/.copilot/mcp-config.json"
  }
};

const mcpLockdownLevels = {
  open: {
    label: "Level 1 · Open eligibility",
    title: "Direct and plugin definitions can load",
    body: "Omitting allowedMcpServers permits selected servers from session, plugin, workspace, and user sources, subject to deny rules.",
    code: `{\n  "deniedMcpServers": [...]\n}`,
    paths: { direct: true, userPlugin: true, managedPlugin: true, builtIn: true }
  },
  curated: {
    label: "Level 2 · Curated identities",
    title: "The same allowlist filters every source",
    body: "Direct and plugin-provided definitions remain possible, but each selected non-default server must match the effective allowlist and avoid every deny rule.",
    code: `{\n  "allowedMcpServers": [\n    { "serverUrl": "https://mcp.example.com/*" }\n  ]\n}`,
    paths: { direct: "If matched", userPlugin: "If matched", managedPlugin: "If matched", builtIn: true }
  },
  distributed: {
    label: "Level 3 · Managed distribution",
    title: "Force the plugin and still allowlist its server",
    body: "enabledPlugins and marketplace controls govern plugin delivery. The plugin's MCP server still needs an identity match in allowedMcpServers.",
    code: `{\n  "enabledPlugins": {\n    "secure-development@company-copilot": true\n  },\n  "allowedMcpServers": [\n    { "serverUrl": "https://plugins.example.com/*" }\n  ]\n}`,
    paths: { direct: "If matched", userPlugin: "If matched", managedPlugin: "If matched", builtIn: true }
  },
  closed: {
    label: "Level 4 · Closed custom MCP",
    title: "Only trusted first-party servers remain",
    body: "An empty allowedMcpServers array blocks all non-default servers, including servers contributed by plugins. Built-in default servers remain exempt.",
    code: `{\n  "allowedMcpServers": []\n}`,
    paths: { direct: false, userPlugin: false, managedPlugin: false, builtIn: true }
  }
};

const mcpPermutations = {
  open: {
    label: "Maximum flexibility",
    title: "Open ecosystem",
    body: "Direct user/workspace definitions and plugin-provided servers coexist. Only explicit deny rules constrain eligibility.",
    use: "Labs and low-risk experimentation.",
    tradeoff: "The enterprise has limited positive control over which integrations appear.",
    file: "open-ecosystem.json",
    raw: mcpOpenRaw,
    paths: { direct: "Allowed", userPlugin: "Allowed", managedPlugin: "Allowed", builtIn: "Exempt" }
  },
  deny: {
    label: "Block known risk",
    title: "Denylist guardrail",
    body: "Direct and plugin MCP can coexist, while known-dangerous URLs or exact local commands are blocked unconditionally.",
    use: "Early governance when the enterprise knows specific integrations to prohibit.",
    tradeoff: "Everything not denied remains eligible, so this is not positive control.",
    file: "denylist-guardrail.json",
    raw: mcpDenyRaw,
    paths: { direct: "Except denied", userPlugin: "Except denied", managedPlugin: "Except denied", builtIn: "Exempt" }
  },
  curated: {
    label: "Recommended general default",
    title: "Curated hybrid",
    body: "Direct and plugin MCP coexist, but every selected non-default server must match the managed allowlist and avoid the denylist.",
    use: "Broad engineering enablement with approved integrations.",
    tradeoff: "Administrators must maintain server identities as versions and commands change.",
    file: "curated-hybrid.json",
    raw: mcpCuratedRaw,
    paths: { direct: "If matched", userPlugin: "If matched", managedPlugin: "If matched", builtIn: "Exempt" }
  },
  plugin: {
    label: "Governed bundle delivery",
    title: "Managed plugin distribution",
    body: "The enterprise force-enables a plugin from a pinned marketplace and separately allowlists the server identity packaged by that plugin.",
    use: "Repeatable enterprise workflows that bundle agents, skills, hooks, and MCP.",
    tradeoff: "A matching direct definition can still be eligible; the allowlist governs identity, not provenance.",
    file: "managed-plugin-distribution.json",
    raw: mcpManagedPluginRaw,
    paths: { direct: "If matched", userPlugin: "If matched", managedPlugin: "If matched", builtIn: "Exempt" }
  },
  direct: {
    label: "Separate integration path",
    title: "Direct MCP, plugin installs locked",
    body: "A curated MCP allowlist remains available while strictKnownMarketplaces blocks plugin marketplace installation.",
    use: "Teams that approve integrations individually instead of shipping capability bundles.",
    tradeoff: "Configuration lifecycle stays with users or repositories, and previously installed plugins require separate review.",
    file: "direct-mcp-only.json",
    raw: mcpDirectRaw,
    paths: { direct: "If matched", userPlugin: "No new installs", managedPlugin: "Not configured", builtIn: "Exempt" }
  },
  closed: {
    label: "Strictest documented boundary",
    title: "No custom MCP",
    body: "An empty MCP allowlist blocks direct and plugin-contributed non-default servers. An empty strict marketplace list also locks plugin installation.",
    use: "Exceptional zones where external tools and data are not required.",
    tradeoff: "Only trusted first-party MCP capability remains available.",
    file: "no-custom-mcp.json",
    raw: mcpNoCustomRaw,
    paths: { direct: "Blocked", userPlugin: "Blocked", managedPlugin: "Blocked", builtIn: "Exempt" }
  }
};

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function highlightJson(line) {
  return escapeHtml(line)
    .replace(/(&quot;|")([^"]+)(&quot;|")(?=\s*:)/g, '<span class="tok-key">"$2"</span>')
    .replace(/:\s*(&quot;|")([^"]*)(&quot;|")/g, ': <span class="tok-string">"$2"</span>')
    .replace(/\b(true|false|null)\b/g, '<span class="tok-literal">$1</span>');
}

function groupJsonLines(raw) {
  let current = "all";
  return raw.trim().split("\n").map((text) => {
    const match = text.match(/^  "([^"]+)":/);
    if (match) current = sectionGroups[match[1]] || current;
    return { text, group: current };
  });
}

function renderCode(target, raw, grouped = false) {
  const element = typeof target === "string" ? document.getElementById(target) : target;
  const lines = grouped ? groupJsonLines(raw) : raw.trim().split("\n").map((text) => ({ text, group: "all" }));
  element.innerHTML = lines.map((line, index) => `<span class="code-line" data-line="${index + 1}" data-group="${line.group}">${highlightJson(line.text)}</span>`).join("");
}

function renderFocusMenu() {
  const menu = document.getElementById("settingsFocusMenu");
  for (const id of Object.keys(focusDetails)) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.settingsFocus = id;
    button.textContent = id === "all" ? "All" : id[0].toUpperCase() + id.slice(1);
    button.addEventListener("click", () => setSettingsFocus(id));
    menu.appendChild(button);
  }
  renderCode("managedSettingsCode", spotlightRaw, true);
  setSettingsFocus("all");
}

function setSettingsFocus(id) {
  document.querySelectorAll("[data-settings-focus]").forEach((button) => {
    const active = button.dataset.settingsFocus === id;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  const code = document.getElementById("managedSettingsCode");
  code.classList.toggle("focus-active", id !== "all");
  code.querySelectorAll(".code-line").forEach((line) => line.classList.toggle("is-focus", id === "all" || line.dataset.group === id));
  const [label, title, body, takeaway] = focusDetails[id];
  document.getElementById("settingsFocusLabel").textContent = label;
  document.getElementById("settingsFocusTitle").textContent = title;
  document.getElementById("settingsFocusBody").textContent = body;
  document.getElementById("settingsFocusTakeaway").textContent = takeaway;
}

function renderPostures() {
  const tabs = document.getElementById("postureTabs");
  for (const [id, posture] of Object.entries(postures)) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.posture = id;
    button.textContent = posture.title;
    button.addEventListener("click", () => setPosture(id));
    tabs.appendChild(button);
  }
  setPosture("unmanaged");
}

function setPosture(id) {
  const posture = postures[id];
  document.querySelectorAll("[data-posture]").forEach((button) => {
    const active = button.dataset.posture === id;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  document.getElementById("postureFilename").textContent = posture.filename;
  const download = document.getElementById("postureDownload");
  download.href = posture.href;
  download.textContent = posture.link;
  document.getElementById("postureLabel").textContent = posture.label;
  document.getElementById("postureTitle").textContent = posture.title;
  document.getElementById("postureBody").textContent = posture.body;
  document.getElementById("postureUse").textContent = posture.use;
  document.getElementById("postureTradeoff").textContent = posture.tradeoff;
  document.getElementById("autonomyMeter").style.width = `${posture.autonomy}%`;
  document.getElementById("assuranceMeter").style.width = `${posture.assurance}%`;
  renderCode("postureCode", posture.raw);
}

function renderTeams() {
  const tabs = document.getElementById("teamTabs");
  for (const [id, team] of Object.entries(teams)) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.team = id;
    button.textContent = team.label;
    button.addEventListener("click", () => setTeam(id));
    tabs.appendChild(button);
  }
  setTeam("developers");
}

function setTeam(id) {
  const team = teams[id];
  document.querySelectorAll("[data-team]").forEach((button) => {
    const active = button.dataset.team === id;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  const mappingEntry = { [team.file]: teamMappings[team.file] };
  document.getElementById("teamMappingCode").textContent = JSON.stringify(mappingEntry, null, 2);
  document.getElementById("teamFilename").textContent = `teams/${team.file}`;
  const download = document.getElementById("teamDownload");
  download.href = `./examples/teams/${team.file}`;
  renderCode("teamCode", team.raw);
  document.getElementById("teamEffectiveTitle").textContent = team.title;
  document.getElementById("teamEffectiveBody").textContent = team.body;
  document.getElementById("teamEffectiveFacts").innerHTML = team.facts.map((fact) => `<span>${escapeHtml(fact)}</span>`).join("");
}

function renderMcpModes() {
  document.querySelectorAll("[data-mcp-mode]").forEach((button) => button.addEventListener("click", () => setMcpMode(button.dataset.mcpMode)));
  setMcpMode("open");
}

function renderMcpSources() {
  const container = document.getElementById("mcpSourcePriority");
  for (const [id, source] of Object.entries(mcpSources)) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.mcpSource = id;
    button.textContent = source.rank.replace("Priority ", "");
    button.addEventListener("click", () => setMcpSource(id));
    container.appendChild(button);
  }
  setMcpSource("session");
}

function setMcpSource(id) {
  const source = mcpSources[id];
  document.querySelectorAll("[data-mcp-source]").forEach((button) => {
    const active = button.dataset.mcpSource === id;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  document.getElementById("mcpSourceRank").textContent = source.rank;
  document.getElementById("mcpSourceTitle").textContent = source.title;
  document.getElementById("mcpSourceBody").textContent = source.body;
  document.getElementById("mcpSourcePath").textContent = source.path;
}

function pathStatusMarkup(paths) {
  const labels = {
    direct: "User/workspace MCP",
    userPlugin: "User-enabled plugin MCP",
    managedPlugin: "Managed plugin MCP",
    builtIn: "Trusted first-party"
  };
  return Object.entries(labels).map(([id, label]) => {
    const value = paths[id];
    const text = value === true ? "Allowed" : value === false ? "Blocked" : value;
    const state = text === "Blocked" ? "blocked" : text === "Managed only" || text === "If matched" ? "conditional" : "allowed";
    return `<span class="${state}"><b>${escapeHtml(label)}</b><em>${escapeHtml(text)}</em></span>`;
  }).join("");
}

function renderMcpLockdown() {
  const tabs = document.getElementById("mcpLockdownTabs");
  for (const [id, level] of Object.entries(mcpLockdownLevels)) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.mcpLockdown = id;
    button.textContent = level.label.replace("Level ", "");
    button.addEventListener("click", () => setMcpLockdown(id));
    tabs.appendChild(button);
  }
  setMcpLockdown("open");
}

function setMcpLockdown(id) {
  const level = mcpLockdownLevels[id];
  document.querySelectorAll("[data-mcp-lockdown]").forEach((button) => {
    const active = button.dataset.mcpLockdown === id;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  document.getElementById("mcpLockdownLabel").textContent = level.label;
  document.getElementById("mcpLockdownTitle").textContent = level.title;
  document.getElementById("mcpLockdownBody").textContent = level.body;
  document.getElementById("mcpLockdownCode").textContent = level.code;
  document.getElementById("mcpLockdownEligibility").innerHTML = pathStatusMarkup(level.paths);
}

function renderMcpPermutations() {
  const tabs = document.getElementById("mcpPermutationTabs");
  for (const [id, permutation] of Object.entries(mcpPermutations)) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.mcpPermutation = id;
    button.textContent = permutation.title;
    button.addEventListener("click", () => setMcpPermutation(id));
    tabs.appendChild(button);
  }
  setMcpPermutation("curated");
}

function setMcpPermutation(id) {
  const permutation = mcpPermutations[id];
  document.querySelectorAll("[data-mcp-permutation]").forEach((button) => {
    const active = button.dataset.mcpPermutation === id;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  document.getElementById("mcpPermutationFilename").textContent = `mcp/${permutation.file}`;
  document.getElementById("mcpPermutationDownload").href = `./examples/mcp/${permutation.file}`;
  renderCode("mcpPermutationCode", permutation.raw);
  document.getElementById("mcpPermutationLabel").textContent = permutation.label;
  document.getElementById("mcpPermutationTitle").textContent = permutation.title;
  document.getElementById("mcpPermutationBody").textContent = permutation.body;
  document.getElementById("mcpPathStatus").innerHTML = pathStatusMarkup(permutation.paths);
  document.getElementById("mcpPermutationUse").textContent = permutation.use;
  document.getElementById("mcpPermutationTradeoff").textContent = permutation.tradeoff;
}

function setMcpMode(id) {
  document.querySelectorAll("[data-mcp-mode]").forEach((button) => {
    const active = button.dataset.mcpMode === id;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  const [label, title, body, code] = mcpModes[id];
  document.getElementById("mcpLabel").textContent = label;
  document.getElementById("mcpTitle").textContent = title;
  document.getElementById("mcpBody").textContent = body;
  document.getElementById("mcpCode").textContent = code;
}

document.getElementById("copyBaseline").addEventListener("click", async (event) => {
  await navigator.clipboard.writeText(flexibleRaw);
  event.currentTarget.textContent = "Copied";
  window.setTimeout(() => { event.currentTarget.textContent = "Copy full file"; }, 1200);
});

renderFocusMenu();
renderPostures();
renderTeams();
renderMcpSources();
renderMcpModes();
renderMcpLockdown();
renderMcpPermutations();
deck.showSlide(deck.currentSlide);
