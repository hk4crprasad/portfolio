import { test, expect } from "@playwright/test";

test("motion components render, the loop moves, and pause keeps the stack usable", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".hero-tech-text.tech-text")).toHaveAttribute("data-ready", "true");
  await expect(page.locator(".star-border__light").first()).toBeVisible();
  const strip = page.locator(".tech-strip");
  await strip.scrollIntoViewIfNeeded();
  const track = strip.locator(".logoloop__track");
  await expect(track).toBeVisible();
  const before = await track.evaluate((element) => getComputedStyle(element).transform);
  await expect.poll(() => track.evaluate((element) => getComputedStyle(element).transform)).not.toBe(before);
  await page.getByText("Explore the stack", { exact: true }).click();
  await expect(strip.getByRole("link")).toHaveCount(11);
  await strip.getByRole("link", { name: "Python", exact: true }).focus();
  await expect(strip.getByRole("link", { name: "Python", exact: true })).toBeFocused();
  await page.getByRole("button", { name: "Pause motion" }).click();
  await expect(page.locator(".tech-strip .logoloop")).toHaveCount(0);
  await expect(strip.getByRole("link")).toHaveCount(11);
  await expect(page.locator(".tech-text-canvas, .star-border__light, .target-cursor")).toHaveCount(0);
  await page.getByRole("button", { name: "Play motion" }).click();
  await expect(page.locator(".tech-strip .logoloop")).toBeVisible();
});

test("portrait swaps by keyboard and touch-compatible clicks without duplicate accessible content", async ({ page }) => {
  await page.goto("/");
  const portrait = page.locator(".portrait-pixel-swap");
  await expect(portrait).toHaveAccessibleName("Reveal profile note");
  await portrait.focus();
  await page.keyboard.press("Enter");
  await expect(portrait).toHaveAttribute("data-transitioning", "true");
  await expect(portrait.locator(".pixel-swap__pixel").first()).toBeAttached();
  await expect(page.getByRole("button", { name: "Show portrait" })).toHaveAttribute("data-transitioning", "false");
  await expect(page.locator(".pixel-swap__layer[data-visible='true']")).toContainText("Building useful intelligence.");
  await page.keyboard.press("Space");
  await expect(portrait).toHaveAttribute("data-active", "false");
  await expect(page.getByRole("button", { name: "Reveal profile note" })).toHaveAttribute("data-transitioning", "false");
  await expect(page.locator(".profile-source-image")).toBeVisible();
  await page.getByRole("button", { name: "Pause motion" }).click();
  await page.getByRole("button", { name: "Reveal profile note" }).click();
  await expect(page.getByRole("button", { name: "Show portrait" })).toHaveAttribute("data-transitioning", "false");
  await expect(page.locator(".pixel-swap__pixel")).toHaveCount(0);
});

test("system reduced-motion changes stop effects and the desktop cursor preserves native interaction", async ({ page }) => {
  await page.goto("/");
  const action = page.getByRole("link", { name: "See selected work" });
  await action.hover();
  await expect(page.locator(".target-cursor")).toHaveCSS("pointer-events", "none");
  await expect.poll(() => page.locator(".target-cursor").evaluate((element) => Number(getComputedStyle(element).opacity))).toBeGreaterThan(0.9);
  expect(await action.evaluate((element) => getComputedStyle(element).cursor)).not.toBe("none");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".target-cursor, .tech-text-canvas, .star-border__light, .logoloop")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Pause motion" })).toHaveCount(0);
  await expect(page.locator(".hero-tech-text-static")).toHaveText("Agentic builder");
  await expect(page.locator(".technology-list a")).toHaveCount(11);
  await action.click();
  await expect(page).toHaveURL(/\/work$/);
});

test("touch devices retain the portrait interaction without a custom cursor", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  try {
    await page.goto("http://127.0.0.1:3000/");
    await expect(page.getByRole("button", { name: "Pause motion" })).toBeVisible();
    await expect(page.locator(".target-cursor")).toHaveCount(0);
    await page.getByRole("button", { name: "Reveal profile note" }).tap();
    await expect(page.locator(".portrait-pixel-swap")).toHaveAttribute("data-active", "true");
    await expect(page.getByRole("button", { name: "Show portrait" })).toHaveAttribute("data-transitioning", "false");
    await expect(page.locator(".pixel-swap__layer[data-visible='true']")).toContainText("Haraprasad Hota");
  } finally {
    await context.close();
  }
});
