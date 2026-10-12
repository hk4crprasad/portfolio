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
const widths = [320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
for (const route of routes) {
  test(`responsive layout and metadata: ${route}`, async ({ page }) => {
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await page.locator("main").waitFor();
      await page.evaluate(() => document.fonts.ready);
      expect(await page.locator("h1").count()).toBe(1);
      expect(
        new URL(
          (await page.locator('link[rel="canonical"]').getAttribute("href"))!,
        ).href,
      ).toBe(`https://hk4crprasad.site${route === "/" ? "/" : route}`);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        /.+/,
      );
      const overflow = await page.evaluate(() => {
        const targets = [
          ...document.querySelectorAll<HTMLElement>(
            "h1,h2,h3,p,a,button,input,textarea,.container,.hero-portrait-wrap,.project-visual",
          ),
        ];
        return {
          document: document.documentElement.scrollWidth > innerWidth + 1,
          elements: targets
            .filter((element) => {
              const rect = element.getBoundingClientRect();
              // Only decorative illustration internals are clipped by design.
              return (
                rect.width > 0 &&
                (!element.closest(".project-visual") ||
                  element.matches(".project-visual")) &&
                (rect.left < -1 || rect.right > innerWidth + 1)
              );
            })
            .map((element) => `${element.tagName}.${element.className}`),
        };
      });
      expect(overflow, `${route} at ${width}px`).toEqual({
        document: false,
        elements: [],
      });
    }
  });
  for (const width of [390, 1440]) {
    test(`WCAG automated checks: ${route} at ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(result.violations).toEqual([]);
    });
  }
}

test("mobile navigation: hidden links, focus, Escape, route changes and desktop resize", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeHidden();
  await toggle.click();
  const menu = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(menu.getByRole("link", { name: "Home" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await menu.getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(menu).toBeHidden();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await menu.getByRole("link", { name: "Contact", exact: true }).focus();
  await page.keyboard.press("Tab");
  await expect(menu).toBeHidden();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.setViewportSize({ width: 1280, height: 800 });
  await expect(menu).toBeHidden();
  await expect(
    page.getByRole("navigation", { name: "Primary navigation" }),
  ).toBeVisible();
});

test("filters expose pressed state and announce matching projects", async ({
  page,
}) => {
  await page.goto("/work");
  for (const category of ["AI Systems", "Product", "Voice", "Research"]) {
    const button = page.getByRole("button", { name: category, exact: true });
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".project-card")).toHaveCount(1);
    await expect(page.getByRole("status")).toContainText(
      `1 project in ${category}`,
    );
  }
  await page.getByRole("button", { name: "All", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(4);
});

test("email drafts validate, preserve input, hand off honestly, and provide clipboard recovery", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/contact");
  const form = page.getByRole("form", {
    name: "Contact email draft",
    exact: true,
  });
  await form.getByRole("button", { name: "Prepare email" }).click();
  await expect(form.getByLabel("Your name")).toBeFocused();
  await expect(form.locator('[aria-invalid="true"]')).toHaveCount(3);
  await form.getByLabel("Your name").fill("Ada");
  await form.getByLabel("Email address").fill("invalid");
  await form
    .getByLabel("What’s on your mind?")
    .fill("Let’s build <script>alert(1)</script> & test.");
  await form.getByRole("button", { name: "Prepare email" }).click();
  await expect(form.getByLabel("Email address")).toBeFocused();
  await form.getByLabel("Email address").fill("ada@example.com");
  await form.getByRole("button", { name: "Prepare email" }).click();
  await expect(form.getByRole("status")).toContainText("Nothing has been sent");
  await expect(
    form.getByRole("button", { name: "Draft prepared", exact: true }),
  ).toBeDisabled();
  await expect(form.getByLabel("Your name")).toHaveValue("Ada");
  await form.getByRole("button", { name: "Copy draft" }).click();
  await expect(form.getByRole("status")).toContainText("Draft copied");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "ada@example.com",
  );
  await form.getByLabel("Your name").fill("Noor");
  await expect(
    form.getByRole("button", { name: "Prepare email" }),
  ).toBeEnabled();
  await page.evaluate(() =>
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: () => Promise.reject(new Error("denied")) },
    }),
  );
  await form.getByRole("button", { name: "Prepare email" }).click();
  await form.getByRole("button", { name: "Copy draft" }).click();
  await expect(form.getByRole("status")).toContainText("Copy is unavailable");
  await expect(form.getByLabel("Your prepared draft")).toContainText("Noor");
  const quick = page.getByRole("form", { name: "Quick email draft" });
  await quick.getByLabel("Email address").fill("bad");
  await quick.getByRole("button", { name: "Say hello" }).click();
  await expect(quick.getByLabel("Email address")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await quick.getByLabel("Email address").fill("quick@example.com");
  await quick.getByRole("button", { name: "Say hello" }).click();
  await expect(quick.getByRole("status")).toContainText(
    "Nothing has been sent",
  );
  expect(
    await page.evaluate(() => ({
      cookies: document.cookie,
      local: localStorage.length,
      session: sessionStorage.length,
    })),
  ).toEqual({ cookies: "", local: 0, session: 0 });
});

test("security headers, fresh nonces, injection blocking, https redirect and safe 404", async ({
  page,
  request,
}) => {
  const first = await request.get("/", {
    headers: { "x-nonce": "attacker-supplied" },
  });
  const second = await request.get("/");
  const headers = first.headers();
  expect(headers["content-security-policy"]).toContain(
    "frame-ancestors 'none'",
  );
  expect(headers["content-security-policy"]).not.toContain("attacker-supplied");
  expect(headers["content-security-policy"]).not.toBe(
    second.headers()["content-security-policy"],
  );
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["strict-transport-security"]).toBe("max-age=31536000");
  expect(headers["cache-control"]).toContain("no-store");
  expect(headers["x-powered-by"]).toBeUndefined();
  expect(headers["access-control-allow-origin"]).toBeUndefined();
  const redirect = await request.get("/work?type=all", {
    headers: { "x-forwarded-proto": "http", host: "hk4crprasad.site" },
    maxRedirects: 0,
  });
  expect(redirect.status()).toBe(308);
  expect(redirect.headers().location).toBe(
    "https://hk4crprasad.site/work?type=all",
  );
  for (const path of [
    "/sitemap.xml",
    "/robots.txt",
    "/portrait.jpg",
    "/fonts/DM-Sans-LICENSE.txt",
    "/_next/static/test.js",
  ]) {
    const result = await request.get(path, {
      headers: { "x-forwarded-proto": "http", host: "hk4crprasad.site" },
      maxRedirects: 0,
    });
    expect(result.status()).toBe(308);
    expect(result.headers().location).toBe(`https://hk4crprasad.site${path}`);
  }
  const failures: string[] = [];
  page.on("pageerror", (error) => failures.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error" && !message.text().includes("mailto:"))
      failures.push(message.text());
  });
  await page.goto("/");
  await page.getByRole("link", { name: "See selected work" }).click();
  await expect(page).toHaveURL(/\/work$/);
  expect(failures).toEqual([]);
  // Inject into HTML at the network boundary: parser-inserted XSS must be blocked.
  // DevTools evaluation executes with special browser privileges and is not an XSS source.
  await page.route("**/csp-regression", async (route) => {
    const response = await request.get("/");
    await route.fulfill({
      response,
      body: (await response.text()).replace(
        "</head>",
        "<script>window.__unsafeExecuted = true</script></head>",
      ),
    });
  });
  await page.goto("/csp-regression");
  expect(await page.evaluate(() => "__unsafeExecuted" in window)).toBe(false);
  for (const path of [
    "/missing-page",
    "/work/missing-project",
    "/admin",
    "/api/contact",
    "/.env",
    "/resume.txt",
  ])
    expect((await request.get(path)).status()).toBe(404);
  const missing = await request.get("/work/missing-project");
  expect(await missing.text()).not.toContain("stack trace");
  await page.goto("/missing-page");
  await expect(page.getByRole("link", { name: "Return home" })).toBeVisible();
});

test("crawl infrastructure, sitemap routes, social asset and local-only page requests", async ({
  page,
  request,
}) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  for (const route of routes)
    expect(xml).toContain(
      `https://hk4crprasad.site${route === "/" ? "/" : route}`,
    );
  await expect((await request.get("/robots.txt")).text()).resolves.toContain(
    "https://hk4crprasad.site/sitemap.xml",
  );
  expect(
    (await request.get("/social-preview.png")).headers()["content-type"],
  ).toContain("image/png");
  const destinations: string[] = [];
  page.on("request", (req) => {
    if (!req.url().startsWith("http://127.0.0.1:3000"))
      destinations.push(req.url());
  });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".profile-source-image")).toBeVisible();
  expect(destinations).toEqual([]);
  await expect(page.locator(".footer-legal a")).toHaveCount(2);
});

test("keyboard skip link, reduced motion, 200% text sizing and open-menu accessibility", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  await page.getByRole("button", { name: "Open navigation" }).click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await page.addStyleTag({ content: "html { font-size: 200%; }" });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
});
