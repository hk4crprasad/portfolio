import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { projects } from "../../data/portfolio";
const routes = [
  "/",
  "/about",
  "/experience",
  "/work",
  "/contact",
  "/privacy",
  "/terms",
  ...projects.map((project) => `/work/${project.slug}`),
];
for (const width of [320, 390, 768, 1440]) {
  test(`Firefox: all public pages at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      await page.waitForFunction(() => document.fonts.status === "loaded");
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        `${route} at ${width} in Firefox`,
      ).toBe(true);
      await expect(page.locator("main h1")).toHaveCount(1);
    }
  });
}
test("Firefox: keyboard navigation, filters, contact validation and prepared draft", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(
    page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Home" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeFocused();
  await page.goto("/work");
  await page.getByRole("button", { name: "Voice", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await page.goto("/contact");
  const form = page.getByRole("form", {
    name: "Contact email draft",
    exact: true,
  });
  await form.getByRole("button", { name: "Prepare email" }).click();
  await expect(form.getByLabel("Your name")).toBeFocused();
  await form.getByLabel("Your name").fill("Browser check");
  await form.getByLabel("Email address").fill("check@example.com");
  await form
    .getByLabel("What’s on your mind?")
    .fill("A test draft, not an email delivery.");
  await form.getByRole("button", { name: "Prepare email" }).click();
  await expect(form.getByRole("status")).toContainText("Nothing has been sent");
  await expect(form.getByLabel("Your prepared draft")).toContainText(
    "check@example.com",
  );
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});
