# Haraprasad Hota — portfolio

Next.js App Router, React, TypeScript, CSS, and Lucide. Content lives in `data/portfolio.ts`; the original résumé remains in `resume.txt`. Project illustrations are abstract visuals, not product screenshots. The portrait is the existing GitHub profile image, stored locally. Locally served DM Sans and Playfair Display fonts include their licenses.

## Local development

Use Node 22 or 24. Run `npm ci` and `npm run dev`. Copy `.env.example` to `.env.local` if overriding the domain. `SITE_URL` is server-only, defaults to the owner-supplied `https://hk4crprasad.site/`, and must be an HTTPS origin in production. There are no application secrets, accounts, database, API routes, or uploads.

## Validation

```sh
npm ci
npm audit --audit-level=high
npm run check
npx playwright install --with-deps chromium firefox
npm run test:e2e
# Install Gitleaks 8.30.1 separately, then:
npm run scan:secrets
```

Set `CHROMIUM_PATH=/usr/bin/chromium` to use a system Chromium. Set `GITLEAKS_PATH` to a non-default Gitleaks executable. The test suite starts the production server after a build. Firefox coverage requires its Playwright browser download. The GitHub quality workflow performs dependency, secret, static, build, Chromium, and Firefox checks with read-only repository permissions.

The email forms validate and compose `mailto` drafts; they never send email or submit data to a server. The mail app opens separately so blocked handoffs do not discard the portfolio page. Users can copy or select a draft when the mail app or clipboard is unavailable. No server validation or rate limiter is needed because there is no submission endpoint. If adding server email delivery, implement schema validation, origin checks, abuse controls, and updated privacy notices before enabling it.

## Deployment and release

See [Heroku release instructions](docs/LAUNCH-CHECKLIST.md). No deployment has been performed. The production start command honors Heroku's `PORT`; the existing `Procfile` is preserved. Run the build with production `SITE_URL` configured so sitemap and robots output match the domain.

HTML is rendered dynamically to attach fresh per-response CSP nonces. Document responses are private/no-store; immutable caching is reserved for hashed fonts and Next-managed assets. Do not add shared document caching without redesigning the CSP strategy. HTTPS forwarding is trusted at the Heroku router boundary; external HTTP requests redirect to the configured domain, and loopback connections remain available for local validation. HSTS does not assert preload or subdomain readiness.

Legal notices describe the implementation and planned Heroku hosting; owner/legal review and live DNS/TLS verification are release requirements. No analytics or nonessential cookies are configured. Adding them requires consent and privacy review.

See [discovery inventory](docs/ISSUE-INVENTORY.md), [final audit](docs/FINAL-AUDIT.md), and [evidence](docs/audit/).

## Applying the delivery

The implementation is committed on local branch `improve/production-readiness`. GitHub rejected the push with HTTP 403; no remote PR or CI run was created. The supplied source ZIP is standalone. To preserve the commit using the supplied Git bundle from a clone containing baseline `ad20273`:

```sh
git fetch /path/to/portfolio-improvements.bundle improve/production-readiness:improve/production-readiness
git switch improve/production-readiness
```

Use a GitHub connection with repository write access to push that branch and open a PR. The local validation evidence is included; deploy only after explicit authorization and the release gates above.
