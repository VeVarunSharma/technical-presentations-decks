import { initDeck } from "../../src/runtime/deck.js";
import "../../src/styles/base.css";
import "../../src/styles/components.css";
import "../../src/styles/layouts.css";
import "../../src/styles/print.css";

const yamlViews = {
  all: {
    label: "Complete declaration",
    title: "One graph carries the deployment intent",
    body: "Project, model, connection, toolbox, agent, runtime, resources, and environment references are reviewed together.",
    takeaway: "Topology travels with the code.",
    code: `name: repository-support

services:
  ai-project:
    host: azure.ai.project
    deployments: [ ... ]
  github-conn:
    host: azure.ai.connection
    uses: [ai-project]
  agent-tools:
    host: azure.ai.toolbox
    uses: [ai-project, github-conn]
  repository-agent:
    host: azure.ai.agent
    uses: [ai-project, github-conn, agent-tools]
    kind: hosted
    project: src/repository-agent
    protocols: [ ... ]
    env: { ... }
    container: { ... }`,
  },
  project: {
    label: "Project + model",
    title: "Declare the shared runtime foundation",
    body: "The project service either provisions a Foundry project or connects to an existing endpoint and owns model deployments managed by azd.",
    takeaway: "Model capacity is a reviewed dependency.",
    code: `services:
  ai-project:
    host: azure.ai.project
    deployments:
      - name: repository-model
        model:
          format: OpenAI
          name: gpt-5.4-mini
          version: "2026-03-17"
        sku:
          name: GlobalStandard
          capacity: 10`,
  },
  tools: {
    label: "Connection + toolbox",
    title: "Separate external access from tool composition",
    body: "Connections describe external resources. Toolboxes assemble the capabilities an agent can consume. Both remain explicit dependencies.",
    takeaway: "Capability should be visible before runtime.",
    code: `github-conn:
  host: azure.ai.connection
  uses: [ai-project]
  category: RemoteTool
  target: https://api.githubcopilot.com/mcp
  authType: CustomKeys
  credentials:
    Authorization: \${GITHUB_PAT}

agent-tools:
  host: azure.ai.toolbox
  uses: [ai-project, github-conn]
  tools:
    - type: web_search
    - type: mcp
      connection: github-conn`,
  },
  agent: {
    label: "Hosted agent",
    title: "Bind source, protocol, tools, and compute",
    body: "The agent service identifies the source directory, runtime contract, startup command, toolboxes, environment references, and resource bounds.",
    takeaway: "Behavior and operating constraints change together.",
    code: `repository-agent:
  host: azure.ai.agent
  project: src/repository-agent
  language: docker
  uses:
    - ai-project
    - github-conn
    - agent-tools
  kind: hosted
  name: repository-agent
  protocols:
    - protocol: responses
      version: 2.0.0
  startupCommand: python main.py
  toolboxes: [agent-tools]`,
  },
  environment: {
    label: "Environment + resources",
    title: "Resolve environment differences at deploy time",
    body: "Commit variable references and resource intent. Resolve model names, endpoints, credentials, and environment-specific values through azd and GitHub environments.",
    takeaway: "Configuration is versioned; secrets are not.",
    code: `repository-agent:
  env:
    MICROSOFT_FOUNDRY_MODEL_DEPLOYMENT_NAME:
      \${MICROSOFT_FOUNDRY_MODEL_DEPLOYMENT_NAME}
  container:
    resources:
      cpu: "0.5"
      memory: 1Gi

# FOUNDRY_PROJECT_ENDPOINT is injected
# by the hosted-agent platform.`,
  },
};

const runtimeViews = {
  hosted: {
    filename: "kind: hosted",
    kicker: "Custom code in a managed agent runtime",
    title: "Hosted agent",
    body: "Best when the product needs custom orchestration, libraries, protocols, or runtime behavior.",
    source: "Repository code + startup command",
    deploy: "Code upload or container image",
    review: "Protocol, image/build path, env, CPU, memory",
    code: `repository-agent:
  host: azure.ai.agent
  kind: hosted
  project: src/repository-agent
  language: docker
  startupCommand: python main.py
  protocols:
    - protocol: responses
      version: 2.0.0
  container:
    resources:
      cpu: "0.5"
      memory: 1Gi`,
  },
  prompt: {
    filename: "kind: prompt",
    kicker: "Declarative instructions and managed tools",
    title: "Prompt agent",
    body: "Best when the behavior fits a managed prompt-agent definition and custom container code is unnecessary.",
    source: "Instructions, model, and managed tool configuration",
    deploy: "Foundry data-plane definition",
    review: "Instructions, model, tools, connections, safety",
    code: `support-agent:
  host: azure.ai.agent
  kind: prompt
  name: repository-support
  uses:
    - ai-project
    - agent-tools
  toolboxes:
    - agent-tools`,
  },
  voice: {
    filename: "kind: voice",
    kicker: "Audio experience with explicit conversation engine",
    title: "Voice agent",
    body: "Best when the product needs real-time audio, telephony, or a hosted conversation engine behind a voice wrapper.",
    source: "Audio/greeting config plus model or hosted target",
    deploy: "Voice service and optional hosted target",
    review: "Audio, greeting, bindings, target version, protocol",
    code: `voice-support:
  host: azure.ai.agent
  kind: voice
  uses:
    - repository-agent
  conversationEngine:
    type: hosted_agent
    name: repository-agent
    version: deployed
  voice: alloy
  greeting: "How can I help?"`,
  },
};

const pipelineStages = [
  {
    id: "identity",
    label: "OIDC",
    kicker: "Identity",
    title: "Authenticate without a stored cloud secret",
    body: "GitHub OIDC exchanges the workflow identity for an Azure token scoped through RBAC.",
    evidence: "Federated login and scoped permissions",
    failure: "Identity or required role assignment is invalid",
  },
  {
    id: "deploy",
    label: "Deploy",
    kicker: "Candidate version",
    title: "Deploy the changed source to staging",
    body: "azd applies the unified project definition and creates or updates the hosted-agent version on existing infrastructure.",
    evidence: "Agent version, deployment logs, resolved environment",
    failure: "Build, configuration, dependency, or runtime deployment fails",
  },
  {
    id: "smoke",
    label: "Smoke",
    kicker: "Availability",
    title: "Verify the agent can answer",
    body: "A deterministic invocation catches startup, protocol, endpoint, and empty-response failures before expensive evaluation begins.",
    evidence: "Status output and non-empty response",
    failure: "Agent is unavailable, unhealthy, or returns no response",
  },
  {
    id: "evaluate",
    label: "Evaluate",
    kicker: "Behavior",
    title: "Run the use-case dataset and evaluators",
    body: "The official preview action invokes the candidate, scores configured evaluators, and writes a GitHub Actions summary.",
    evidence: "Scores, confidence intervals, evaluation report",
    failure: "Evaluation execution fails or required evidence is missing",
  },
  {
    id: "compare",
    label: "Compare",
    kicker: "Regression",
    title: "Compare candidate and baseline versions",
    body: "Multiple agent IDs can be evaluated together so statistically meaningful changes are visible before promotion.",
    evidence: "Pairwise comparison and protected metric deltas",
    failure: "A protected metric regresses beyond policy tolerance",
  },
  {
    id: "promote",
    label: "Promote",
    kicker: "Governance",
    title: "Apply the product release policy",
    body: "Thresholds, approvals, protected environments, and rollback rules turn evaluation evidence into a controlled release decision.",
    evidence: "Approval, release record, promoted version",
    failure: "Policy, reviewer, or environment protection blocks release",
  },
];

const evalViews = {
  pass: {
    decisionLabel: "Policy satisfied",
    decisionTitle: "Promote the candidate with recorded evidence",
    decisionBody: "Required metrics meet their floors, no protected dimension regresses beyond tolerance, and the smoke test passed.",
    rows: [
      ["Task adherence", "0.86", "0.91", "+0.05", "pass"],
      ["Intent resolution", "0.88", "0.90", "+0.02", "pass"],
      ["Unsafe action refusal", "0.96", "0.98", "+0.02", "pass"],
      ["P95 latency", "5.2s", "4.8s", "-0.4s", "pass"],
    ],
  },
  review: {
    decisionLabel: "Human review required",
    decisionTitle: "The aggregate improved, but one product dimension moved",
    decisionBody: "The candidate is statistically stronger overall, yet tool-call accuracy is below the protected floor. Review traces before deciding.",
    rows: [
      ["Task adherence", "0.86", "0.92", "+0.06", "pass"],
      ["Tool-call accuracy", "0.91", "0.84", "-0.07", "review"],
      ["Unsafe action refusal", "0.96", "0.97", "+0.01", "pass"],
      ["P95 latency", "5.2s", "5.1s", "-0.1s", "pass"],
    ],
  },
  fail: {
    decisionLabel: "Promotion blocked",
    decisionTitle: "The candidate regressed on protected behavior",
    decisionBody: "Task adherence and unsafe-action refusal fell below policy. Keep the baseline active, inspect failures, update the dataset or agent, and rerun.",
    rows: [
      ["Task adherence", "0.86", "0.73", "-0.13", "fail"],
      ["Intent resolution", "0.88", "0.79", "-0.09", "fail"],
      ["Unsafe action refusal", "0.96", "0.88", "-0.08", "fail"],
      ["P95 latency", "5.2s", "4.5s", "-0.7s", "pass"],
    ],
  },
};

function setActiveButtons(selector, activeButton) {
  document.querySelectorAll(selector).forEach((button) => {
    const active = button === activeButton;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });
}

function renderYamlFocus(key) {
  const view = yamlViews[key];
  document.getElementById("yamlFilename").textContent = `azure.yaml · ${view.label.toLowerCase()}`;
  document.getElementById("yamlCode").textContent = view.code;
  document.getElementById("yamlFocusLabel").textContent = view.label;
  document.getElementById("yamlFocusTitle").textContent = view.title;
  document.getElementById("yamlFocusBody").textContent = view.body;
  document.getElementById("yamlFocusTakeaway").textContent = view.takeaway;
}

function initializeYamlFocus() {
  const menu = document.getElementById("yamlFocusMenu");
  const labels = {
    all: "All",
    project: "Project",
    tools: "Tools",
    agent: "Agent",
    environment: "Environment",
  };

  Object.keys(labels).forEach((key, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = labels[key];
    button.dataset.yamlFocus = key;
    button.setAttribute("aria-selected", index === 0 ? "true" : "false");
    button.classList.toggle("active", index === 0);
    button.addEventListener("click", () => {
      setActiveButtons("[data-yaml-focus]", button);
      renderYamlFocus(key);
    });
    menu.appendChild(button);
  });

  renderYamlFocus("all");
}

function renderRuntime(key) {
  const view = runtimeViews[key];
  document.getElementById("runtimeFilename").textContent = view.filename;
  document.getElementById("runtimeCode").textContent = view.code;
  document.getElementById("runtimeKicker").textContent = view.kicker;
  document.getElementById("runtimeTitle").textContent = view.title;
  document.getElementById("runtimeBody").textContent = view.body;
  document.getElementById("runtimeSource").textContent = view.source;
  document.getElementById("runtimeDeploy").textContent = view.deploy;
  document.getElementById("runtimeReview").textContent = view.review;
}

function initializeRuntimeTabs() {
  document.querySelectorAll("[data-runtime]").forEach((button) => {
    button.addEventListener("click", () => {
      setActiveButtons("[data-runtime]", button);
      renderRuntime(button.dataset.runtime);
    });
  });
  renderRuntime("hosted");
}

function renderPipeline(activeId) {
  const stage = pipelineStages.find((item) => item.id === activeId);
  const map = document.getElementById("pipelineMap");
  map.replaceChildren();

  pipelineStages.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = item.id === activeId ? "active" : "";
    card.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><strong>${item.label}</strong>`;
    map.appendChild(card);
  });

  document.getElementById("pipelineKicker").textContent = stage.kicker;
  document.getElementById("pipelineTitle").textContent = stage.title;
  document.getElementById("pipelineBody").textContent = stage.body;
  document.getElementById("pipelineEvidence").textContent = stage.evidence;
  document.getElementById("pipelineFailure").textContent = stage.failure;
}

function initializePipeline() {
  const menu = document.getElementById("pipelineMenu");
  pipelineStages.forEach((stage, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = stage.label;
    button.dataset.pipelineStage = stage.id;
    button.setAttribute("aria-selected", index === 0 ? "true" : "false");
    button.classList.toggle("active", index === 0);
    button.addEventListener("click", () => {
      setActiveButtons("[data-pipeline-stage]", button);
      renderPipeline(stage.id);
    });
    menu.appendChild(button);
  });
  renderPipeline("identity");
}

function renderEval(viewName) {
  const view = evalViews[viewName];
  const table = document.getElementById("evalComparison");
  table.replaceChildren();
  table.insertAdjacentHTML(
    "beforeend",
    "<div class=\"comparison-header\"><span>Metric</span><span>Baseline</span><span>Candidate</span><span>Delta</span></div>",
  );

  view.rows.forEach(([metric, baseline, candidate, delta, state]) => {
    const row = document.createElement("div");
    row.className = `comparison-row ${state}`;
    row.innerHTML = `<strong>${metric}</strong><span>${baseline}</span><span>${candidate}</span><span>${delta}</span>`;
    table.appendChild(row);
  });

  document.getElementById("evalDecisionLabel").textContent = view.decisionLabel;
  document.getElementById("evalDecisionTitle").textContent = view.decisionTitle;
  document.getElementById("evalDecisionBody").textContent = view.decisionBody;
}

function initializeEvalTabs() {
  document.querySelectorAll("[data-eval-view]").forEach((button) => {
    button.addEventListener("click", () => {
      setActiveButtons("[data-eval-view]", button);
      renderEval(button.dataset.evalView);
    });
  });
  renderEval("pass");
}

initializeYamlFocus();
initializeRuntimeTabs();
initializePipeline();
initializeEvalTabs();

const deck = initDeck({
  onReset() {
    document.querySelector('[data-yaml-focus="all"]')?.click();
    document.querySelector('[data-runtime="hosted"]')?.click();
    document.querySelector('[data-pipeline-stage="identity"]')?.click();
    document.querySelector('[data-eval-view="pass"]')?.click();
  },
});
deck.showSlide(deck.currentSlide);
