import { createRequire } from "node:module";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "@playwright/test";

const require = createRequire(import.meta.url);
const axePath = require.resolve("axe-core/axe.min.js");
const root = process.cwd();
const decks = readdirSync(resolve(root, "decks"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => JSON.parse(readFileSync(resolve(root, "decks", entry.name, "deck.json"), "utf8")));
const activeDecks = decks
  .filter((deck) => deck.status === "active")
  .sort(
    (left, right) =>
      Number(Boolean(right.default)) - Number(Boolean(left.default)) ||
      left.title.localeCompare(right.title),
  );

test.describe("homepage", () => {
  test("renders the active presentation catalog from deck metadata", async ({ page }) => {
    const errors = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/");

    await expect(page).toHaveTitle("Technical presentations");
    await expect(page.locator("body")).toHaveAttribute("data-home-catalog", "");
    await expect(page.locator("body")).toHaveAttribute("data-color-mode", "auto");
    await expect(page.locator("body")).toHaveAttribute("data-light-theme", "light");
    await expect(page.locator("body")).toHaveAttribute("data-dark-theme", "dark");
    await expect(page.getByRole("heading", { name: "Ideas built to be presented." })).toBeVisible();
    await expect(page.locator("#deck-grid")).toHaveAttribute("aria-busy", "false");

    const cards = page.locator(".deck-card");
    await expect(cards).toHaveCount(activeDecks.length);
    expect(await cards.evaluateAll((elements) => elements.map((element) => element.dataset.deckId))).toEqual(
      activeDecks.map((deck) => deck.id),
    );
    await expect(cards.first()).toHaveAttribute("data-default", "true");
    await expect(page.locator("#deck-count")).toHaveText(
      `${activeDecks.length} active presentation${activeDecks.length === 1 ? "" : "s"}`,
    );

    for (const deck of activeDecks) {
      const card = page.locator(`[data-deck-id="${deck.id}"]`);
      await expect(card).toHaveAttribute("href", `./decks/${deck.id}/`);
      await expect(card.getByRole("heading", { name: deck.title })).toBeVisible();
    }

    expect(errors).toEqual([]);
  });

  test("has no horizontal overflow or serious accessibility violations", async ({ page }) => {
    for (const colorScheme of ["light", "dark"]) {
      await page.emulateMedia({ colorScheme });
      await page.goto("/");
      await page.addScriptTag({ path: axePath });

      const result = await page.evaluate(async () => {
        const axeResults = await window.axe.run(document.body, {
          resultTypes: ["violations"],
        });

        return {
          hasHorizontalOverflow:
            document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
          violations: axeResults.violations
            .filter((violation) => ["serious", "critical"].includes(violation.impact))
            .map((violation) => `${violation.id}: ${violation.help}`),
        };
      });

      expect(result.hasHorizontalOverflow, colorScheme).toBe(false);
      expect(result.violations, colorScheme).toEqual([]);
    }
  });

  test("uses one, two, and three column layouts responsively", async ({ page }) => {
    const layouts = [
      { width: 390, height: 844, columns: 1 },
      { width: 900, height: 900, columns: 2 },
      { width: 1200, height: 796, columns: 3 },
    ];

    for (const layout of layouts) {
      await page.setViewportSize({ width: layout.width, height: layout.height });
      await page.goto("/");

      const columnCount = await page.locator(".deck-card").evaluateAll((cards) => {
        const leftEdges = cards.map((card) => Math.round(card.getBoundingClientRect().left));
        return new Set(leftEdges).size;
      });
      const hasHorizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      );

      expect(columnCount).toBe(layout.columns);
      expect(hasHorizontalOverflow).toBe(false);
    }
  });
});

for (const deck of decks) {
  test.describe(deck.id, () => {
    test("loads without console errors and matches metadata", async ({ page }) => {
      const errors = [];
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      page.on("pageerror", (error) => errors.push(error.message));

      await page.goto(`/decks/${deck.id}/`);

      await expect(page.locator("html")).toHaveAttribute("data-brand", deck.brand);
      await expect(page.locator("html")).toHaveAttribute("data-theme", deck.theme);
      await expect(page.locator(".slide")).not.toHaveCount(0);
      await expect(page.locator(".slide.active")).toHaveCount(1);
      expect(errors).toEqual([]);
    });

    test("primary slide regions and code windows do not clip", async ({ page }) => {
      await page.goto(`/decks/${deck.id}/`);

      const issues = await page.evaluate(() => {
        document.querySelectorAll("[data-build-step]").forEach((element) => {
          element.classList.add("build-visible");
          element.setAttribute("aria-hidden", "false");
        });

        const slides = Array.from(document.querySelectorAll(".slide"));
        const overflows = [];

        slides.forEach((slide, index) => {
          slides.forEach((candidate, candidateIndex) => {
            candidate.classList.toggle("active", candidateIndex === index);
          });

          const slideRect = slide.getBoundingClientRect();
          for (const child of slide.children) {
            const rect = child.getBoundingClientRect();
            if (
              rect.left < slideRect.left - 1 ||
              rect.right > slideRect.right + 1 ||
              rect.top < slideRect.top - 1 ||
              rect.bottom > slideRect.bottom + 1
            ) {
              overflows.push(`slide ${index + 1}: ${child.className || child.tagName}`);
            }
          }
        });

        const codeOverflows = Array.from(document.querySelectorAll(".code-window"))
          .filter((element) => element.scrollWidth > element.clientWidth + 1 || element.scrollHeight > element.clientHeight + 1)
          .map((element) => `code window on slide ${slides.indexOf(element.closest(".slide")) + 1}`);

        return [...overflows, ...codeOverflows];
      });

      expect(issues).toEqual([]);
    });

    test("keyboard builds reveal before slide navigation and reverse in place", async ({ page }) => {
      await page.goto(`/decks/${deck.id}/`);

      const buildSlide = await page.evaluate(() =>
        Array.from(document.querySelectorAll(".slide")).findIndex((slide) => slide.querySelector("[data-build-step]")),
      );

      test.skip(buildSlide < 0, "Deck has no progressive builds.");

      await page.getByRole("button", { name: new RegExp(`Go to slide ${buildSlide + 1}:`) }).click();
      const before = await page.locator(".slide.active [data-build-step].build-visible").count();

      await page.keyboard.press("ArrowRight");
      const afterReveal = await page.locator(".slide.active [data-build-step].build-visible").count();
      expect(afterReveal).toBeGreaterThan(before);

      await page.keyboard.press("ArrowLeft");
      const afterReverse = await page.locator(".slide.active [data-build-step].build-visible").count();
      expect(afterReverse).toBe(before);
    });

    test("active slide has no serious accessibility violations", async ({ page }) => {
      await page.goto(`/decks/${deck.id}/`);
      await page.addScriptTag({ path: axePath });

      const violations = await page.evaluate(async () => {
        const results = await window.axe.run(document.querySelector(".slide.active"), {
          resultTypes: ["violations"],
        });
        return results.violations
          .filter((violation) => ["serious", "critical"].includes(violation.impact))
          .map((violation) => `${violation.id}: ${violation.help}`);
      });

      expect(violations).toEqual([]);
    });

    test("print reveals all builds", async ({ page }) => {
      await page.goto(`/decks/${deck.id}/`);
      await page.emulateMedia({ media: "print" });

      const hiddenBuilds = await page.evaluate(() =>
        Array.from(document.querySelectorAll("[data-build-step]")).filter((element) => {
          const style = getComputedStyle(element);
          return style.opacity === "0" || style.visibility === "hidden";
        }).length,
      );

      expect(hiddenBuilds).toBe(0);
    });
  });
}

test("navigation buttons expose and confirm their actual action", async ({ page }) => {
  await page.goto("/decks/copilot-governance/");

  const nextButton = page.locator("#nextButton");
  const previousButton = page.locator("#previousButton");

  await expect(nextButton).toContainText("Next");
  await nextButton.click();
  await expect(page.locator(".slide.active")).toHaveAttribute("data-title", "Govern the action path");
  await expect(nextButton).toHaveClass(/nav-activated/);
  await expect(nextButton).toContainText("Reveal");

  await nextButton.click();
  await expect(page.locator(".slide.active")).toHaveAttribute("data-title", "Govern the action path");
  await expect(page.locator(".slide.active [data-build-step].build-visible")).toHaveCount(1);
  await expect(previousButton).toContainText("Hide");
  await expect(page.locator("#buildCount")).toHaveText("1/5 revealed");

  await previousButton.click();
  await expect(page.locator(".slide.active [data-build-step].build-visible")).toHaveCount(0);
  await expect(previousButton).toContainText("Back");
});

test("GH-AW deck-specific interactions remain available", async ({ page }) => {
  await page.goto("/decks/gh-aw/");

  await page.getByRole("button", { name: /Go to slide 2: The code supply has multiplied/ }).click();
  const originalTotal = Number(await page.locator("#supplyTotal").textContent());
  await page.locator('[data-producer="cloud-agent"]').click();
  expect(Number(await page.locator("#supplyTotal").textContent())).toBeLessThan(originalTotal);

  await page.getByRole("button", { name: /Go to slide 4: DIY versus platform-built/ }).click();
  await page.locator('[data-threat="Cost runaway"]').click();
  await expect(page.locator("#platformVerdictTitle")).toContainText("unexpected inference");

  await page.getByRole("button", { name: /Go to slide 6: Intent is a first-class artifact/ }).click();
  await expect(page.locator(".spec-sidebar strong")).toHaveText("Written intent");
  await page.locator('[data-spec-view="controls"]').click();
  await expect(page.locator(".spec-sidebar strong")).toHaveText("Controls");

  await page.getByRole("button", { name: /Go to slide 7: Deterministic operations before AI/ }).click();
  await page.locator('[data-scenario="prepare"]').click();
  await expect(page.locator("#deterministicTitle")).toContainText("Code gathers facts");

  await page.getByRole("button", { name: /Go to slide 8: Declarative control plane/ }).click();
  await page.locator('[data-yaml-focus="outputs"]').click();
  expect(await page.locator("#annotatedYaml .is-focus").count()).toBeGreaterThan(0);

  await page.getByRole("button", { name: /Go to slide 9: Engines and execution bounds/ }).click();
  await page.locator('[data-engine="claude"]').click();
  await expect(page.locator("#engineTitle")).toHaveText("Claude Code");

  await page.getByRole("button", { name: /Go to slide 10: Security architecture/ }).click();
  await page.locator('[data-threat="CI environment read"]').click();
  await expect(page.locator("#threatTitle")).toContainText("dangerous capability combination");

  await page.getByRole("button", { name: /Go to slide 11: Cost governance/ }).click();
  await page.locator('[data-cost-layer="measure-value"]').click();
  await expect(page.locator("#costTitle")).toContainText("observable outcomes");

  await page.getByRole("button", { name: /Go to slide 12: Concurrency and queuing/ }).click();
  await page.locator('[data-concurrency-scenario="fanout"]').click();
  await expect(page.locator("#concurrencyTitle")).toContainText("cancelling");

  await page.getByRole("button", { name: /Go to slide 13: Observability and outcomes/ }).click();
  await page.locator('[data-observability="outcome"]').click();
  await expect(page.locator("#observabilityTitle")).toContainText("after the safe output");
});

test("GH-AW live-room typography meets the expanded deck thresholds", async ({ page }) => {
  await page.goto("/decks/gh-aw/");

  const undersized = await page.evaluate(() => {
    const checks = [
      [".section-subtitle", 16],
      [".classification-card p", 14],
      [".deterministic-flow p", 13],
      [".governance-detail > p", 14],
      [".concurrency-detail p", 14],
      [".observability-detail > p", 14],
      [".patterns-slide .pattern-card p", 14],
      [".adoption-ladder p", 14],
      [".spec-code", 12],
      [".source-note", 11],
    ];

    return checks.flatMap(([selector, minimum]) =>
      Array.from(document.querySelectorAll(selector))
        .filter((element) => Number.parseFloat(getComputedStyle(element).fontSize) + 0.01 < minimum)
        .map((element) => `${selector}: ${getComputedStyle(element).fontSize} < ${minimum}px`),
    );
  });

  expect(undersized).toEqual([]);
});

test("Copilot governance configuration explorers remain available", async ({ page }) => {
  await page.goto("/decks/copilot-governance/");

  await page.getByRole("button", { name: /Managed settings JSON spotlight/ }).click();
  await page.locator('[data-settings-focus="mcp"]').click();
  expect(await page.locator("#managedSettingsCode .is-focus").count()).toBeGreaterThan(0);
  await expect(page.locator("#settingsFocusTitle")).toContainText("MCP servers");

  await page.getByRole("button", { name: /MCP source priority/ }).click();
  await page.locator('[data-mcp-source="plugin"]').click();
  await expect(page.locator("#mcpSourceTitle")).toContainText("package MCP");
  await expect(page.locator("#mcpSourcePath")).toContainText("plugin.json");

  await page.getByRole("button", { name: /MCP allow and deny evaluation/ }).click();
  await page.locator('[data-mcp-mode="closed"]').click();
  await expect(page.locator("#mcpTitle")).toContainText("empty allowlist");

  await page.getByRole("button", { name: /MCP customization lockdown/ }).click();
  await page.locator('[data-mcp-lockdown="distributed"]').click();
  await expect(page.locator("#mcpLockdownTitle")).toContainText("Force the plugin");
  await expect(page.locator("#mcpLockdownEligibility")).toContainText("If matched");

  await page.getByRole("button", { name: /MCP permutation explorer/ }).click();
  await page.locator('[data-mcp-permutation="plugin"]').click();
  await expect(page.locator("#mcpPermutationTitle")).toHaveText("Managed plugin distribution");
  await expect(page.locator("#mcpPathStatus")).toContainText("Managed plugin MCP");
  await expect(page.locator("#mcpPathStatus")).toContainText("If matched");
  await expect(page.locator("#mcpPermutationCode")).toContainText('"enabledPlugins"');
  await expect(page.locator("#mcpPermutationCode")).toContainText('"allowedMcpServers"');

  await page.locator('[data-mcp-permutation="closed"]').click();
  await expect(page.locator("#mcpPermutationTitle")).toHaveText("No custom MCP");
  await expect(page.locator("#mcpPathStatus")).toContainText("Trusted first-party");

  await page.getByRole("button", { name: /Posture explorer/ }).click();
  await page.locator('[data-posture="lockdown"]').click();
  await expect(page.locator("#postureTitle")).toHaveText("Hard lockdown");
  await expect(page.locator("#postureCode")).toContainText('"allowedMcpServers": []');
  await expect(page.locator("#postureCode")).not.toContainText("strictPluginOnlyCustomization");

  await page.getByRole("button", { name: /Team mapping explorer/ }).click();
  await page.locator('[data-team="pioneers"]').click();
  await expect(page.locator("#teamEffectiveTitle")).toContainText("Broader experimentation");
  await expect(page.locator("#teamCode")).toContainText('"model": "unmanaged"');
});

test("GHAS deck demos and complete release explorer remain available", async ({ page }) => {
  await page.goto("/decks/ghas-ai-sdlc/");

  await page.getByRole("button", { name: /Go to slide 4: AI SDLC controls/ }).click();
  await page.locator('[data-lifecycle="operate"]').click();
  await expect(page.locator("#lifecycleTitle")).toContainText("Prioritize vulnerabilities");

  await page.getByRole("button", { name: /Go to slide 6: Demo: local security review/ }).click();
  await page.locator('[data-demo="app"]').click();
  await expect(page.locator("#demoWindowTitle")).toHaveText("GitHub Copilot app");
  await page.locator('[data-demo="mcp"]').click();
  await expect(page.locator("#demoTitle")).toContainText("Scan current changes");

  await page.getByRole("button", { name: /Go to slide 11: Release radar/ }).click();
  await page.locator('.release-category[data-category="Secret protection"]').click();
  await expect(page.locator("#releaseShowing")).toHaveText("Showing 4 of 19 latest updates");

  await page.locator("#releaseButton").click();
  await expect(page.locator(".changelog-entry")).toHaveCount(79);
  await expect(page.locator("#changelogSummary")).toContainText("79 of 79 updates");
});
