import { test, expect } from "@playwright/test";

async function scrollToStep(page: import("@playwright/test").Page, progress: number) {
  await page.locator(".scroll-work-scene").evaluate((element, value) => {
    const sticky = element.querySelector<HTMLElement>(".scroll-work-sticky")!;
    const start = window.scrollY + element.getBoundingClientRect().top - parseFloat(getComputedStyle(sticky).top);
    const range = (element as HTMLElement).offsetHeight - sticky.offsetHeight;
    window.scrollTo({ top: start + range * value, behavior: "instant" });
  }, progress);
}

test("scrolling advances and reverses the featured CardSwap stack", async ({ page }) => {
  await page.goto("/");
  const scene = page.locator(".scroll-work-scene");
  await expect(scene).toHaveAttribute("data-active-project", "nutaan-cli");
  await scrollToStep(page, 0.5);
  await expect(scene).toHaveAttribute("data-active-project", "medikiosk");
  await expect(scene.getByRole("link", { name: "Explore the project" })).toHaveAttribute("href", "/work/medikiosk");
  await expect(scene.locator("[data-front]")).toHaveAttribute("data-swap-index", "1");
  await scrollToStep(page, 1);
  await expect(scene).toHaveAttribute("data-active-project", "sih-2026-portal");
  await expect(scene.getByRole("button", { name: "Next featured project" })).toBeDisabled();
  await scrollToStep(page, 0);
  await expect(scene).toHaveAttribute("data-active-project", "nutaan-cli");
  await expect(scene.locator("[data-front]")).toHaveAttribute("data-swap-index", "0");
  await expect(scene.getByRole("button", { name: "Previous featured project" })).toBeDisabled();
});

test("keyboard controls select a project and keep its link usable", async ({ page }) => {
  await page.goto("/");
  await scrollToStep(page, 0);
  const scene = page.locator(".scroll-work-scene");
  await scene.getByRole("button", { name: "Next featured project" }).focus();
  await page.keyboard.press("Enter");
  await expect(scene).toHaveAttribute("data-active-project", "medikiosk");
  await scene.getByRole("button", { name: "Previous featured project" }).focus();
  await page.keyboard.press("Space");
  await expect(scene).toHaveAttribute("data-active-project", "nutaan-cli");
  await scene.getByRole("link", { name: "Explore the project" }).click();
  await expect(page).toHaveURL(/\/work\/nutaan-cli$/);
});

test("paused, reduced-motion, and short viewports show regular project cards", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Pause motion" }).click();
  await expect(page.locator(".scroll-work-scene")).toHaveCount(0);
  await expect(page.locator(".home-work-grid .project-card")).toHaveCount(3);
  await page.getByRole("button", { name: "Play motion" }).click();
  await expect(page.locator(".scroll-work-scene")).toBeAttached();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".scroll-work-scene")).toHaveCount(0);
  await expect(page.locator(".home-work-grid .project-card")).toHaveCount(3);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 844, height: 390 });
  await expect(page.locator(".scroll-work-scene")).toHaveCount(0);
  await expect(page.locator(".home-work-grid .project-card")).toHaveCount(3);
});

test("mobile scrolling changes cards without blocking page scrolling", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  try {
    await page.goto("http://127.0.0.1:3000/");
    await expect(page.locator(".scroll-work-scene")).toBeAttached();
    await scrollToStep(page, 0.5);
    await expect(page.locator(".scroll-work-scene")).toHaveAttribute("data-active-project", "medikiosk");
    const sticky = await page.locator(".scroll-work-sticky").boundingBox();
    expect(sticky?.x).toBeGreaterThanOrEqual(0);
    expect((sticky?.x ?? 0) + (sticky?.width ?? 0)).toBeLessThanOrEqual(391);
    await scrollToStep(page, 1);
    await expect(page.locator(".scroll-work-scene")).toHaveAttribute("data-active-project", "sih-2026-portal");
    await page.locator(".capability-section").scrollIntoViewIfNeeded();
    await expect(page.locator(".capability-section")).toBeInViewport();
  } finally {
    await context.close();
  }
});
