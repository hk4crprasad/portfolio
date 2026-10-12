import { test } from "node:test";
import assert from "node:assert/strict";
import { contentSecurityPolicy, securityHeaders } from "../lib/security";
import { projects } from "../data/portfolio";
test("production CSP permits nonce scripts and denies untrusted execution/embedding", () => {
  const csp = contentSecurityPolicy("test-nonce", false, true);
  const scripts = csp
    .split(";")
    .find((value) => value.trim().startsWith("script-src"))!;
  assert.ok(scripts.includes("'nonce-test-nonce' 'strict-dynamic'"));
  assert.ok(
    !scripts.includes("unsafe-inline") && !scripts.includes("unsafe-eval"),
  );
  for (const directive of [
    "object-src 'none'",
    "base-uri 'none'",
    "frame-ancestors 'none'",
    "form-action 'none'",
    "upgrade-insecure-requests",
  ])
    assert.ok(csp.includes(directive));
  assert.ok(
    !contentSecurityPolicy("test", true, false).includes(
      "upgrade-insecure-requests",
    ),
  );
  assert.ok(
    securityHeaders.some(
      (header) =>
        header.key === "X-Content-Type-Options" && header.value === "nosniff",
    ),
  );
});
test("curated project routes and external destinations remain safe and unique", () => {
  assert.equal(
    new Set(projects.map((project) => project.slug)).size,
    projects.length,
  );
  for (const project of projects) {
    assert.match(project.slug, /^[a-z0-9-]+$/);
    if (project.repository) {
      const url = new URL(project.repository);
      assert.equal(url.protocol, "https:");
      assert.equal(url.hostname, "github.com");
    }
  }
});
