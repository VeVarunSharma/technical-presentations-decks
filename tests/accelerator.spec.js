import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

const require = createRequire(import.meta.url);
const axePath = require.resolve("axe-core/axe.min.js");
const fixtures = JSON.parse(readFileSync(new URL("../decks/gh-aw/accelerator/fixtures.json", import.meta.url)));
const replay = "/decks/gh-aw/accelerator/replay.html";

test("synthetic decisions trace to fixtures without operational calls", async ({ page }) => {
  const externalRequests = [];
  const errors = [];
  page.on("request", (request) => {
    if (new URL(request.url()).origin !== "http://127.0.0.1:4175") externalRequests.push(request.url());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(replay);
  await expect(page.locator("#case")).toBeEnabled();
  await expect(page.getByText("Synthetic replay — not a live agent.")).toBeVisible();

  for (const fixture of fixtures.cases) {
    await page.locator("#case").selectOption(fixture.id);
    await expect(page.locator("#outcome")).toBeHidden();
    await expect(page.locator("#request")).toHaveText(fixture.request);
    expect(JSON.parse(await page.locator("#input").textContent())).toEqual(fixture.context);
    await page.locator("#preview").click();
    await expect(page.locator("#decision")).toHaveText(fixture.expected.decision);
    await expect(page.locator("#evidence")).toHaveText(fixture.expected.evidence);
    await expect(page.locator("#applied")).toHaveText("0");
  }

  await page.locator("#reset").click();
  await expect(page.locator("#case")).toHaveValue("useful");
  await expect(page.locator("#case")).toBeFocused();
  await expect(page.locator("#outcome")).toBeHidden();
  expect(externalRequests).toEqual([]);
  expect(errors).toEqual([]);
});

test("replay is accessible, printable, and usable on a narrow screen", async ({ page }) => {
  for (const width of [390, test.info().project.use.viewport.width]) {
    await page.setViewportSize({ width, height: 796 });
    await page.goto(replay);
    await page.locator("#preview").click();
    await page.addScriptTag({ path: axePath });
    const results = await page.evaluate(async () => ({
      overflow: document.documentElement.scrollWidth > innerWidth + 1,
      violations: (await window.axe.run(document.body)).violations
        .filter((item) => ["serious", "critical"].includes(item.impact))
        .map((item) => `${item.id}: ${item.help}`),
    }));
    expect(results.overflow).toBe(false);
    expect(results.violations).toEqual([]);
  }
  await page.emulateMedia({ media: "print", reducedMotion: "reduce" });
  await expect(page.locator("#outcome")).toBeVisible();
  await expect(page.locator("#applied")).toHaveText("0");
});

test("replay fails safely when local fixtures are unavailable", async ({ page }) => {
  await page.route("**/fixtures.json", (route) => route.fulfill({ status: 503, body: "Unavailable" }));
  await page.goto(replay);
  await expect(page.locator("#status")).toContainText("Local fixtures could not be loaded");
  await expect(page.locator("#preview")).toBeDisabled();
  await expect(page.locator("#outcome")).toBeHidden();
});

test("flagship accessibility covers every slide with builds revealed", async ({ page }) => {
  await page.goto("/decks/gh-aw/");
  await page.addScriptTag({ path: axePath });
  const count = await page.locator(".slide").count();
  for (let index = 0; index < count; index += 1) {
    await page.getByRole("button", { name: new RegExp(`^Go to slide ${index + 1}:`) }).click();
    while (await page.locator("#nextButton").getAttribute("aria-label") === "Reveal next build step") {
      await page.locator("#nextButton").click();
    }
    const violations = await page.evaluate(async () =>
      (await window.axe.run(document.querySelector(".slide.active"))).violations
        .filter((item) => ["serious", "critical"].includes(item.impact))
        .map((item) => `${item.id}: ${item.help}`),
    );
    expect(violations, `slide ${index + 1}`).toEqual([]);
  }
});
