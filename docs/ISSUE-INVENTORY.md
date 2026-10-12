# Discovery and prioritized inventory

Baseline revision: ad20273 (all one reachable commit inspected). Next.js 16 App Router, React 19, strict TypeScript, plain CSS/module CSS; Node process through Procfile. Nine public HTML routes: /, /work, four /work/[slug] pages, /experience, /about, /contact; custom 404. Data is curated in data/portfolio.ts and resume.txt. No API handlers, database, uploads, cookies, analytics, authentication, registration, admin, sessions, webhooks or background jobs. Both contact journeys generate mailto drafts; neither sends or stores submissions on a server. External services: Google Fonts, GitHub avatar, outbound GitHub and technology documentation links. No deployment domain/provider/backup/monitoring configuration is specified. npm ci and baseline production build pass. Baseline browser and Lighthouse artifacts are in docs/audit.

| Severity | Actual issue | Planned remedy |
| --- | --- | --- |
| Critical | npm audit reports critical Next.js advisory in resolved 16.2.10; six vulnerable dependency records total | Compatible patched Next.js and transitive updates; repeat audit |
| High | No CSP, framing restriction, MIME protection or production transport policy | Nonce CSP, restrictive response headers, HTTPS-aware HSTS |
| High | Collapsed mobile links remain focusable; menu has no Escape, focus restoration, or active indication | Accessible disclosure navigation with hidden content and keyboard management |
| Medium | Mailto form shows a check implying delivery; quick-reach bypasses validation and puts button inside aria-hidden SVG | Shared validated draft workflow, honest status and explicit fallback copy |
| Medium | GPU animation and hundreds of generated pixel elements; global pointer-driven renders and remote fonts | Static project visuals/portrait, remove decorative render loops; self-host two fonts |
| Medium | Fixed 310px portrait and nowrap email; clipping wrappers mask content overflow; baseline portrait is absent in browser capture | Fluid layout and real bounds checks across public routes |
| Medium | No skip link, global visible focus, filter pressed state/results announcement; inconsistent touch targets | Shared focus/touch rules and semantic controls |
| Medium | No canonical, sitemap, robots, social image or route descriptions | Server-only validated SITE_URL and shared route metadata |
| Medium | No privacy/terms disclosure | Factual pages describing mailto, hosting, external links; owner/legal review before launch |
| Medium | No lint/test scripts, CI or operational documentation | Lint/typecheck/unit/browser/security checks and release instructions |
| Low | Three typefaces, excessive palette, moving controls and inconsistent surfaces | Two-font pairing, two accent colors, shared tokens and restrained layout |
| Low | Duplicate enterprise status, apostrophe HTML entity shown literally, unverifiable changing repo count | Remove duplicate, correct text, link to live repository list |
| Low | Tracked incremental TypeScript artifact and broad env ignores without safe example | Ignore generated artifacts; provide safe example environment |

Do not add login, a database, server mail delivery, analytics, or consent storage without a real requirement. Authentication/database-specific audit items are not applicable to the existing architecture. Claims already present in source/resume are retained, not independently verified; owner review remains necessary. Scan tracked files and reachable history without displaying secrets. Do not deploy, rewrite history, rotate credentials or alter user data.
