import { initDeck } from "../../src/runtime/deck.js";
import "../../src/styles/base.css";
import "../../src/styles/components.css";
import "../../src/styles/layouts.css";
import "../../src/styles/print.css";
import changelog from "./data/application-security-changelog.json";

const categoryOrder = [
  "AI & agent security",
  "Code scanning & CodeQL",
  "Secret protection",
  "Code quality & coverage",
  "Supply chain & runtime",
  "Governance & platform",
];

const lifecycleStages = {
  generate: {
    kicker: "Before commit",
    title: "Review AI-assisted changes while context is fresh",
    body: "Run Copilot security review and MCP secret scanning locally. Keep developers in their terminal or Copilot workspace while preventing obvious issues from reaching a pull request.",
    platform: "Copilot app, Copilot CLI, GitHub MCP Server",
    security: "Security review, secret scanning, push-protection policy",
    outcome: "Cleaner changes enter the repository.",
  },
  review: {
    kicker: "Pull request",
    title: "Combine deterministic and AI-powered findings",
    body: "CodeQL, dependency review, secret scanning, Code Quality, and AI security detections attach evidence to the exact change that introduced risk.",
    platform: "Pull requests, checks, review comments, rulesets",
    security: "Code scanning, dependency review, AI detections, Autofix",
    outcome: "Developers resolve issues before merge.",
  },
  build: {
    kicker: "Continuous integration",
    title: "Secure the artifact and its dependency chain",
    body: "GitHub Actions executes policy-backed analysis while dependency graph, attestations, and OIDC-based integrations establish provenance and minimize standing credentials.",
    platform: "GitHub Actions, OIDC, environments, artifact attestations",
    security: "CodeQL, Dependabot, dependency graph, SBOM",
    outcome: "Build evidence stays linked to source.",
  },
  deploy: {
    kicker: "Release",
    title: "Connect source, artifact, and deployment context",
    body: "Deployment records and artifact metadata preserve traceability from the repository to deployed workloads and enable downstream runtime correlation.",
    platform: "Deployments, environments, attestations, APIs",
    security: "Deployment context and code-to-cloud correlation",
    outcome: "Security findings remain traceable after release.",
  },
  operate: {
    kicker: "Runtime",
    title: "Prioritize vulnerabilities by real exposure",
    body: "Microsoft Defender for Cloud and Dynatrace can map deployed artifacts to repositories and add internet exposure or sensitive-data context to alerts and campaigns.",
    platform: "Deployment Record API and partner integrations",
    security: "Runtime risk filters and deployed-artifact context",
    outcome: "Teams fix what creates the greatest business risk first.",
  },
  learn: {
    kicker: "Continuous improvement",
    title: "Turn findings into policy and engineering programs",
    body: "Security overview, campaigns, APIs, budgets, and risk assessments show where coverage, prevention, and remediation need to improve across the enterprise.",
    platform: "Enterprise policies, REST APIs, audit, billing",
    security: "Risk assessments, configurations, campaigns, budgets",
    outcome: "Security becomes measurable platform behavior.",
  },
};

const demoModes = {
  cli: {
    windowTitle: "Copilot CLI",
    kicker: "On-demand review",
    title: "Focused findings without leaving the terminal",
    body: "The security review command analyzes in-flight changes, returns severity and confidence, and suggests actions. It complements CodeQL, Dependabot, and secret scanning.",
    takeaway: "Fix while implementation context is still in the developer's head.",
    command: `<span class="prompt">$</span> copilot
<span class="command">/security-review</span>

Scanning current worktree changes...

<span class="finding">HIGH · Path traversal</span>
src/uploads/saveReceipt.ts:42
User-controlled filename reaches a filesystem path.

<span class="suggestion">Suggested action:</span>
Normalize the path, enforce an allowlisted directory,
and re-run tests before commit.`,
  },
  app: {
    windowTitle: "GitHub Copilot app",
    kicker: "In-flight workstream",
    title: "Security review inside the Copilot app",
    body: "The same /security-review experience returns prioritized, high-confidence findings and actionable suggestions while the developer is still shaping the change.",
    takeaway: "Security guidance becomes another natural Copilot interaction.",
    command: `<span class="prompt">copilot&gt;</span> <span class="command">/security-review</span>

Reviewing current workstream changes...

<span class="finding">HIGH confidence · Insecure file handling</span>
Potential path traversal in receipt upload flow.

<span class="suggestion">Apply suggestion</span>
Use basename(), resolve(), and an inside-directory check.

Reverify after editing?  <span class="command">Yes</span>`,
  },
  mcp: {
    windowTitle: "GitHub MCP Server",
    kicker: "Secret prevention",
    title: "Scan current changes before a credential is pushed",
    body: "GitHub secret scanning tools in the MCP Server honor existing push-protection customization, keeping agent detections and bypass behavior consistent with repository policy.",
    takeaway: "Existing Secret Protection investment extends into AI coding workflows.",
    command: `<span class="prompt">$</span> copilot
<span class="command">/plugin install advanced-security@copilot-plugins</span>

<span class="prompt">copilot&gt;</span> Scan my current changes for exposed
secrets and show the files and lines to update.

<span class="finding">ACTIVE SECRET</span>
tests/checkout.env:3
PAYMENTS_API_TOKEN matches a validated provider pattern.

<span class="suggestion">Action:</span> revoke, replace, and remove from history.`,
  },
};

const releaseInsights = {
  "AI & agent security": {
    title: "Security is moving into AI-assisted creation",
  },
  "Code scanning & CodeQL": {
    title: "CodeQL is becoming faster, broader, and more precise",
  },
  "Secret protection": {
    title: "Secret protection now reaches beyond repository boundaries",
  },
  "Code quality & coverage": {
    title: "Quality and security are converging in pull-request review",
  },
  "Supply chain & runtime": {
    title: "Runtime and artifact context are flowing back to source",
  },
  "Governance & platform": {
    title: "Enterprise rollout is becoming policy-driven and measurable",
  },
};

const lifecycleButtons = Array.from(document.querySelectorAll("[data-lifecycle]"));
const demoTabs = Array.from(document.querySelectorAll("[data-demo]"));
const releaseButton = document.getElementById("releaseButton");
const changelogDialog = document.getElementById("changelogDialog");
const closeChangelog = document.getElementById("closeChangelog");
const changelogMonth = document.getElementById("changelogMonth");
let activeReleaseCategory = categoryOrder[0];
let activeChangelogCategory = "all";

function setLifecycle(stageId) {
  const stage = lifecycleStages[stageId];
  lifecycleButtons.forEach((button) => {
    const active = button.dataset.lifecycle === stageId;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });
  document.getElementById("lifecycleKicker").textContent = stage.kicker;
  document.getElementById("lifecycleTitle").textContent = stage.title;
  document.getElementById("lifecycleBody").textContent = stage.body;
  document.getElementById("lifecyclePlatform").textContent = stage.platform;
  document.getElementById("lifecycleSecurity").textContent = stage.security;
  document.getElementById("lifecycleOutcome").textContent = stage.outcome;
}

function setDemo(modeId) {
  const demo = demoModes[modeId];
  demoTabs.forEach((button) => {
    const active = button.dataset.demo === modeId;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });
  document.getElementById("demoWindowTitle").textContent = demo.windowTitle;
  document.getElementById("demoKicker").textContent = demo.kicker;
  document.getElementById("demoTitle").textContent = demo.title;
  document.getElementById("demoBody").textContent = demo.body;
  document.getElementById("demoTakeaway").textContent = demo.takeaway;
  document.querySelector("#demoCommand code").innerHTML = demo.command;
}

function createReleaseCategories() {
  const container = document.getElementById("releaseCategories");
  for (const category of categoryOrder) {
    const button = document.createElement("button");
    button.className = "release-category";
    button.type = "button";
    button.dataset.category = category;
    button.setAttribute("aria-selected", "false");
    button.innerHTML = `<strong>${changelog.categoryCounts[category]}</strong>${category}`;
    button.addEventListener("click", () => setReleaseCategory(category));
    container.appendChild(button);
  }
}

function setReleaseCategory(category) {
  activeReleaseCategory = category;
  document.querySelectorAll(".release-category").forEach((button) => {
    const active = button.dataset.category === category;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });
  document.getElementById("releaseKicker").textContent = category;
  document.getElementById("releaseTitle").textContent = releaseInsights[category].title;

  const categoryEntries = changelog.entries.filter((entry) => entry.category === category);
  const items = categoryEntries.slice(0, 4);
  document.getElementById("releaseShowing").textContent =
    `Showing ${items.length} of ${categoryEntries.length} latest updates`;
  const container = document.getElementById("releaseItems");
  container.replaceChildren();
  for (const entry of items) {
    const row = document.createElement("div");
    row.className = "release-item";
    const time = document.createElement("time");
    time.dateTime = entry.date;
    time.textContent = entry.date.slice(5);
    const link = document.createElement("a");
    link.href = entry.url;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = entry.title;
    row.append(time, link);
    container.appendChild(row);
  }
}

function createMonthlyBars() {
  const container = document.getElementById("monthlyBars");
  const months = Object.entries(changelog.monthCounts).sort(([left], [right]) => left.localeCompare(right));
  const max = Math.max(...months.map(([, count]) => count));
  for (const [month, count] of months) {
    const wrapper = document.createElement("div");
    wrapper.className = "month-bar";
    const bar = document.createElement("div");
    bar.style.height = `${Math.max(10, (count / max) * 100)}%`;
    const label = document.createElement("span");
    label.innerHTML = `<strong>${count}</strong>${new Date(`${month}-01T00:00:00Z`).toLocaleString("en", { month: "short", timeZone: "UTC" })}`;
    wrapper.append(bar, label);
    container.appendChild(wrapper);
  }
}

function createChangelogControls() {
  const filters = document.getElementById("changelogFilters");
  for (const category of ["all", ...categoryOrder]) {
    const button = document.createElement("button");
    button.className = "changelog-filter";
    button.type = "button";
    button.dataset.category = category;
    button.textContent = category === "all" ? "All updates" : category;
    button.addEventListener("click", () => {
      activeChangelogCategory = category;
      renderChangelog();
    });
    filters.appendChild(button);
  }

  const months = [...new Set(changelog.entries.map((entry) => entry.month))].sort().reverse();
  for (const month of months) {
    const option = document.createElement("option");
    option.value = month;
    option.textContent = new Date(`${month}-01T00:00:00Z`).toLocaleString("en", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
    changelogMonth.appendChild(option);
  }
  changelogMonth.addEventListener("change", renderChangelog);
}

function renderChangelog() {
  document.querySelectorAll(".changelog-filter").forEach((button) => {
    const active = button.dataset.category === activeChangelogCategory;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });

  const month = changelogMonth.value;
  const entries = changelog.entries.filter((entry) => (
    (activeChangelogCategory === "all" || entry.category === activeChangelogCategory) &&
    (month === "all" || entry.month === month)
  ));

  document.getElementById("changelogSummary").textContent =
    `${entries.length} of ${changelog.total} updates · ${changelog.range.start} through ${changelog.range.end}`;

  const list = document.getElementById("changelogList");
  list.replaceChildren();
  for (const entry of entries) {
    const article = document.createElement("article");
    article.className = "changelog-entry";

    const time = document.createElement("time");
    time.dateTime = entry.date;
    time.textContent = entry.date;

    const category = document.createElement("span");
    category.className = "entry-category";
    category.textContent = entry.category;

    const content = document.createElement("div");
    const link = document.createElement("a");
    link.href = entry.url;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = entry.title;
    const summary = document.createElement("p");
    summary.textContent = entry.summary;
    content.append(link, summary);

    article.append(time, category, content);
    list.appendChild(article);
  }
}

function resetDeckInteractions() {
  setLifecycle("generate");
  setDemo("cli");
  setReleaseCategory(categoryOrder[0]);
  activeChangelogCategory = "all";
  changelogMonth.value = "all";
  renderChangelog();
}

lifecycleButtons.forEach((button) => button.addEventListener("click", () => setLifecycle(button.dataset.lifecycle)));
demoTabs.forEach((button) => button.addEventListener("click", () => setDemo(button.dataset.demo)));
releaseButton.addEventListener("click", () => changelogDialog.showModal());
closeChangelog.addEventListener("click", () => changelogDialog.close());
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && changelogDialog.open) changelogDialog.close();
});

createReleaseCategories();
createMonthlyBars();
createChangelogControls();
setLifecycle("generate");
setDemo("cli");
setReleaseCategory(activeReleaseCategory);
renderChangelog();

const deck = initDeck({ onReset: resetDeckInteractions });
deck.showSlide(deck.currentSlide);
