import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 45000,
  fullyParallel: true,
  workers: 2,
  reporter: [["list"], ["json", { outputFile: "docs/audit/e2e-results.json" }]],
  use: { baseURL: "http://127.0.0.1:3000", trace: "retain-on-failure" },
  projects: [
    {
      name: "chromium",
      testIgnore: "**/browser-compatibility.spec.ts",
      use: {
        browserName: "chromium",
        launchOptions: process.env.CHROMIUM_PATH
          ? {
              executablePath: process.env.CHROMIUM_PATH,
              args: ["--no-sandbox"],
            }
          : {},
      },
    },
    {
      name: "firefox",
      testMatch: "**/browser-compatibility.spec.ts",
      use: { browserName: "firefox" },
    },
  ],
  webServer: {
    command: "npm start",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
});
