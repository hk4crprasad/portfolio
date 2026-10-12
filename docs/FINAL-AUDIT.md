# Production-readiness audit — Haraprasad Hota portfolio

Date: 12 October 2026. Repository: https://github.com/hk4crprasad/portfolio. Baseline: ad20273. Target: https://hk4crprasad.site/ on Heroku. Implementation branch: improve/production-readiness. This is a source implementation and local production audit, not a deployment or a certification of complete security/accessibility.

## 1. Executive summary

The existing portfolio was implemented as a refined, accessible, responsive Next.js site with its projects, experience, original portrait, contact address and mailto workflows preserved. Eleven public pages now include factual privacy/cookie and terms information. The original dependency findings were addressed; repeated full dependency audits report zero known vulnerabilities. Production builds, static analysis and meaningful regression checks are included. No live infrastructure, credentials, database or user data were changed.

The discovery inventory is [ISSUE-INVENTORY.md](ISSUE-INVENTORY.md). Launch operations are documented in [LAUNCH-CHECKLIST.md](LAUNCH-CHECKLIST.md). Evidence is in [audit/](audit/).

## 2. Security audit

| Finding | Severity | Implementation / evidence |
| --- | --- | --- |
| Resolved Next.js 16.2.10 critical advisory and five other vulnerable records | Critical / High / Medium | Next.js 16.4.0, React 19.3.0, compatible transitive updates; dependency-baseline.json and dependencies-final.json |
| Missing browser response protections | High | Per-response 192-bit random nonce CSP; client-supplied nonce overwritten; frame-ancestors/object/base restrictions, MIME/referrer/permissions/COOP/framing headers |
| Missing transport policy | High | Production HTTPS origin validation, forwarded-protocol redirect to the configured domain, one-year HSTS without preload/subdomain claims; actual Heroku router/TLS verification still required |
| Email form validation bypass and misleading delivery state | Medium | Shared bounded validation, CR/control-character checks, encoded mailto parameters, explicit draft status and manual/clipboard fallback; no submission endpoint added |
| Remote assets and exposed debug/build behavior | Medium | Local image/fonts; no production debug stack presentation; generated build/incremental files ignored; application error boundary shows generic recovery actions |
| Environment handling | Low | Validated server-only SITE_URL; safe .env.example, real env files ignored; no application credentials required |

Gitleaks 8.30.1 scanned the one reachable baseline commit and the authored working tree without findings. A broad diagnostic directory scan found six Next-generated preview/RSC/encryption entries only in ignored .next artifacts; its retained report is redacted. The reproducible scan exports git-tracked and nonignored authored files, omitting generated build/dependency directories, and also scans reachable history. No actual leaked credential was identified; no credential values are included and no rotation was performed. This does not inspect unreachable/deleted remote branches or provider accounts.

CSP allows inline **styles** for Next/image rendering, but production scripts require a nonce and trusted dynamic loading; unsafe-inline/unsafe-eval scripts are absent. Dynamic HTML is private/no-store to avoid nonce reuse through shared caches. Static assets retain caching. Do not enable shared HTML/CDN caching without changing the nonce design.

OWASP applicability: there are no auth/admin flows, sessions, API handlers, database queries, uploads, webhook handlers or background jobs. Password hashing, role/ownership enforcement, CSRF of authenticated mutations, SQL/NoSQL injection, upload validation and server login/contact rate limiting are consequently not applicable to this implementation. There is no wildcard credentialed CORS, browser auth token storage, client-side secret, unsafe HTML insertion, command execution from visitors, or visitor-supplied server fetch. Existing application output uses React encoding. This was source/local verification, not destructive production exploitation or a full external penetration test.

## 3. UI/UX improvements

Two locally hosted fonts (DM Sans and italic Playfair Display), lime/blue accents, readable neutral surfaces, shared spacing/radius/color/focus tokens and one Lucide icon library replace the fragmented styling. The responsive grid and clearer hierarchy apply to the home, about, experience, work, project and contact pages. Interactive controls no longer chase the pointer. Static abstract project illustrations retain their identities and are clearly described as illustrations; no screenshots, testimonials, clients or achievements were fabricated.

The original GitHub portrait is preserved as a local asset, resolving the failed remote portrait visible in baseline screenshots. Existing employment, outcome, budget and availability claims were retained from supplied source/résumé and still require owner verification. A changing hardcoded repository count was replaced by a link to the real repository list. All original technology documentation links remain available. Hover-reveal, GPU particles, global blur and scrolling duplicate logos were decorative; removing them preserved the actual navigation/content journeys.

## 4. Responsive and accessibility audit

Chromium layout checks cover all eleven public pages at 320, 360, 375, 390, 430, 768, 1024, 1280, 1440 and 1920 px (110 page/width combinations). Checks examine document width and meaningful element bounds; clipping is confined to abstract illustration internals, not used to hide broken layout. Fluid portraits, project aspect-ratio sizing, flexible headings, wrapping email text, natural card heights and consistent mobile-first spacing address the baseline overflow.

Automated axe WCAG A/AA checks cover all pages at 390 and 1440 px, plus open navigation and the Firefox contact flow. Keyboard checks cover skip-to-main, visible focus, mobile-menu initial focus, Escape restoration, Tab exit, route closing and desktop resize. Project filters expose pressed states and live result counts. Forms have visible labels, invalid state, inline descriptions and live status. Primary targets are at least 44px; inline prose links remain inline. Reduced-motion support and 200% root text sizing are exercised. Manual screenshot review covers mobile, tablet and desktop.

These tests do not establish full WCAG 2.2 AA conformance. Screen-reader announcements in actual assistive technology, real iOS Safari/Android behavior and all combinations of user fonts/zoom still need manual verification. WebKit could not run because required Linux libraries are missing and this workspace cannot install system dependencies with root access.

## 5. Functional audit

All public pages retain one main heading and distinct titles/descriptions/canonical/social metadata. The brand and footer email/GitHub links work; copyright uses the current year. Existing 404 behavior is retained and given a noindex title; unknown projects, admin/API/env/source paths return 404. The error boundary provides understandable recovery. A global streaming loading boundary was deliberately omitted after it caused unknown project responses to commit HTTP 200 before notFound; these local-data pages do not perform slow API requests. Duplicate enterprise status and a literally displayed apostrophe entity were corrected.

Work filters, four project detail routes and next-project navigation remain functional. Fifteen unique external destinations returned HTTP 200 after following redirects; this is a point-in-time availability check. Internal navigation and legal links are covered by browser checks and sitemap route checks.

Both forms validate missing/malformed input, preserve entered details, encode a mailto draft, prevent duplicate preparation until editing, and clearly state that nothing has been sent. Separate-window handoff preserves the portfolio when external protocols are blocked. Clipboard denial leaves selectable draft text. Automated tests verify preparation and recovery; they cannot verify a real OS mail app or email delivery. No server form or spam target exists, so adding a honeypot/rate limiter or consent database would create unnecessary infrastructure.

## 6. Performance

| Lighthouse mobile category | Baseline | Final |
| --- | ---: | ---: |
| Performance | 89 | 95 |
| Accessibility | 92 | 100 |
| Best practices | 96 | 100 |
| SEO | 100 | 100 |

| Laboratory metric | Baseline | Final |
| --- | ---: | ---: |
| First contentful paint | 1.071 s | 0.833 s |
| Largest contentful paint | 2.631 s | 2.546 s |
| Total blocking time | 0.327 s | 0.164 s |
| Speed index | 1.071 s | 1.042 s |
| Cumulative layout shift | 0.000 | 0.000 |

An interim cold-font run measured CLS 0.211; Next.js local-font preload and fallback metric adjustment fixed it to 0.000 in the final run. Lighthouse’s visible-label check also passes after simplifying redundant card interaction and preserving the logo as a graphic. Final local LCP is about 2.55 s, slightly above the 2.5 s “good” threshold; verify and tune delivery on real Heroku infrastructure. No field INP/LCP/CLS dataset exists yet.


Measurements are local Lighthouse laboratory runs on a production server, not field Core Web Vitals. Baseline and final use the same Chromium/mobile simulation and categories. The baseline's remote portrait failed in this environment; the final correctly includes a local portrait, so results reflect that difference. Dynamic nonce rendering removes the old long-lived document cache; local timings do not predict Heroku cold starts or dyno load. Fonts are locally served through Next.js preload and metric-adjusted fallbacks; optimized images are local; Next serves AVIF/WebP with responsive sizes; no runtime Google Fonts/GitHub-image request remains. Client GPU loops, GSAP pixel grids and global pointer rendering were removed. No database/API optimization applies.

## 7. Code quality and maintainability

Shared EmailDraftForm, pure contact validation/draft helpers, centralized metadata/origin and security policies, reusable CSS tokens and simple server-rendered visuals replace duplicated and decoration-heavy components. Strict TypeScript remains enabled. Formatting was standardized. Removed unused packages: @react-three/fiber, gsap, mathjs, ogl, react-icons, three, and @types/three. Runtime dependencies are Next, React, React DOM, Lucide and server-only. ESLint 9 is retained because the JSX accessibility plugin does not yet declare ESLint 10 support; npm marks ESLint 9 deprecated, which is a Low maintenance item to revisit when compatible support is available. No vulnerable dev-tool dependency was accepted to make the audit pass; the lint stack uses compatible TypeScript, hooks and JSX accessibility rules instead.

The tracked tsconfig.tsbuildinfo was removed and ignored. package-lock.json pins installed dependencies. ESLint, typecheck, unit tests, Chromium/Firefox browser tests, dependency audit and redacted secret scanning are reproducible. The added GitHub workflow uses read-only repository permissions and verifies a pinned Gitleaks binary checksum. The workflow is prepared but has not run remotely because the branch push was denied. Local passing results are not a claim that remote CI ran.

## 8. Files changed

See [FILES-CHANGED.md](FILES-CHANGED.md) for exact added, modified and removed source/configuration paths and evidence artifacts. Original data/portfolio.ts content is retained apart from local portrait location; resume.txt and Procfile remain unchanged.

## 9. Test results

| Command / check | Result |
| --- | --- |
| npm ci | Pass, fresh locked install |
| npm run lint | Pass, no rules disabled |
| npm run typecheck | Pass, strict TypeScript |
| npm test | 5/5 meaningful unit/security tests passed |
| npm run build | Pass, production Next.js 16.4.0 build |
| CHROMIUM_PATH=/usr/bin/chromium npm run test:e2e | 44/44 passed: 39 Chromium, 5 Firefox |
| npm audit --json | Zero known vulnerabilities across production/development dependency audit |
| GITLEAKS_PATH=… npm run scan:secrets | Reachable history and authored-source scans passed, redacted output |
| git diff --check | Pass |
| External HEAD/redirect checks | 15/15 HTTP 200 |

Browser evidence: [audit/e2e-results.json](audit/e2e-results.json). Responsive coverage: 110 Chromium plus 44 Firefox page/width combinations, all public pages. Axe coverage: 22 page/viewport scans plus open-menu and Firefox contact checks, no violations in those tested states. Main navigation's application console/page-error check passed. Trace capture remains enabled for failures; the final run has no failing traces.

Initial failures and measured regressions were corrected: mobile illustration aspect-ratio overflow, root canonical serialization expectation, blocked external mail protocol replacing the page, forwarded-host handling, streaming 404 status, Firefox FontFaceSet serialization in the test harness, cold-font layout shift, visible-label naming, and CSP testing through privileged DevTools evaluation. The CSP regression injects a nonce-free script at the network/HTML parser boundary, which represents an actual document injection rather than privileged automation evaluation. No lint/test rule was disabled to achieve a passing result.

Untested/not applicable: real production certificates/router/storage/log retention, Heroku restarts/load/rollback, OS email delivery, Safari/WebKit, real assistive technology and field CWV. Auth/admin/database/API submission tests are not applicable because those components do not exist. Node 24 was exercised; Node 22 is allowed but was not separately tested. There is no configured external error-monitoring service.

## 10. Launch blockers and remaining risks

No known discovered critical/high dependency vulnerability remains after the recorded audit. The security and application checks remain bounded by their scope, not a guarantee of complete security.

Operational **High** release gate: actual Heroku custom-domain DNS, certificate, HTTPS forwarding, response headers and cold-start behavior have not been verified because the site has not been deployed and deployment is explicitly outside authorization.

Owner/legal **Medium** release gate: approve legal notices and confirm retention/provider facts, existing professional claims, portrait rights and publicly retained résumé information. Notices intentionally do not invent jurisdiction or claim compliance.

QA **Medium** release gate: confirm the actual mail app and Safari/real-mobile/assistive-technology flows. Managed Chromium blocks external email protocols; the tested copy/select fallback works, but automated preparation is not proof of email delivery.

Preserve a known-good Heroku release and source backup for rollback; no database backup procedure is required for this database-free site. Provider monitoring, account recovery and log access/retention need owner configuration.

## 11. Final release checklist and recommendation

**GO for source review / integration:** local build, static, unit, browser, accessibility, dependency and secret checks pass. The local feature branch, source archive and complete evidence make the implementation reviewable. GitHub rejected the branch push with HTTP 403 because the current authenticated connection lacks repository write permission; no remote branch or PR was created and remote CI did not run.

**NO-GO for public launch today** until the documented owner/legal, real-device and Heroku operational gates are completed. No deployment, merge, credential rotation or DNS change was performed. Follow [LAUNCH-CHECKLIST.md](LAUNCH-CHECKLIST.md); keep critical/high security findings as blockers if any appear in subsequent audits.
