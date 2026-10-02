import { defineConfig } from "@playwright/test";

const testBuiltOutput = process.env.PLAYWRIGHT_SERVER === "preview";
const chromiumExecutablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:4175",
    browserName: "chromium",
    launchOptions: chromiumExecutablePath ? { executablePath: chromiumExecutablePath } : undefined,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium-1366",
      use: { viewport: { width: 1366, height: 768 } },
    },
    {
      name: "chromium-1200",
      use: { viewport: { width: 1200, height: 796 } },
    },
    {
      name: "chromium-large",
      use: { viewport: { width: 1920, height: 1080 } },
    },
  ],
  webServer: {
    command: testBuiltOutput
      ? "npm run preview -- --host 127.0.0.1 --port 4175"
      : "npm run dev -- --host 127.0.0.1 --port 4175",
    url: "http://127.0.0.1:4175",
    reuseExistingServer: false,
  },
});
