# Heroku launch checklist — hk4crprasad.site

No live infrastructure was changed and no deployment was authorized or performed.

## Before release

- Apply the supplied source/Git bundle to a feature branch using a GitHub connection with repository write permission, then open a PR and review its CI status. The attempted push from this workspace was denied with HTTP 403; no remote PR exists. Merge only after review.
- Confirm the portfolio's existing employment, availability, outcome and budget claims. These were supplied by the repository/résumé, not independently verified.
- Approve portrait usage; the image is the pre-existing GitHub profile portrait, now served locally. No new photography or testimonials were invented.
- Obtain owner/legal review of `/privacy` and `/terms`, especially email retention, Heroku logging, international processing and applicable local notices. Public source `resume.txt` retains the owner's original personal information; confirm that public sharing is intended.
- Confirm a Heroku app and current supported stack/Node version. This release was tested on Node 24; Node 22 is allowed but not separately exercised here.
- Set `SITE_URL=https://hk4crprasad.site/` and `NEXT_TELEMETRY_DISABLED=1` before build. Heroku supplies `PORT` and runs the existing `web: npm start` Procfile. Use Heroku's Node buildpack and locked `npm ci` dependencies; production requires build tools during the build stage.
- Disable Review App/public staging indexing at the platform if creating public previews. This repository targets the specified public production domain.
- Confirm that Heroku router overwrites `X-Forwarded-Proto`, terminates TLS, and does not publicly expose the application port directly. Loopback HTTP remains enabled for local checks. The application's redirect always uses `SITE_URL`, never a user-supplied hostname as a destination.
- Configure the custom domain, DNS target and managed certificate through Heroku and the DNS provider. No DNS/TLS/account changes were made here.
- Verify both apex and any intended www domain redirect policy. No www ownership or additional domain was assumed.

## Authorized release and post-release verification

Deploy only after explicit user authorization. Verify the following on the actual Heroku domain:

- HTTPS certificate chain, renewal, HTTP 308 redirect and expected domain.
- CSP, HSTS, MIME, referrer, permissions and frame headers on documents and 404s.
- The existing Procfile start command and dynamic pages respond reliably after cold starts and restarts; monitor dyno memory and response time.
- Fresh per-request nonces; dynamic HTML is not shared through a CDN/cache. Hashed static assets remain cacheable.
- Eleven public pages, custom 404, sitemap, robots, canonical links and social preview asset.
- Navigation and forms on real iOS Safari, Android Chrome, desktop Firefox and Chromium. WebKit engine could not run in this workspace because system libraries are unavailable; real assistive-technology verification remains manual.
- Mailto opens the user's actual email app; clipboard and manual draft fallback work. Automated tests cannot verify OS mail delivery, and the site does not send messages.
- Validate analytics/cookie behavior at the hosting layer. No application cookies or analytics exist in this release.
- Save a previous known-good release for Heroku rollback. There is no application database to back up; keep source and domain/account recovery access backed up.
- Confirm who reviews Heroku platform logs and their retention/access. Do not add message-body logging. No external error monitoring service was configured or assumed.
- Re-run Lighthouse and collect real-user Core Web Vitals after launch. Local laboratory scores do not establish field performance or compliance.

## Recommendation

Do not publicly launch until owner/legal review, actual Heroku DNS/TLS/router verification, and real-device mail/Safari checks are complete. The source checks can pass independently of those operational release gates. No unresolved discovered critical/high application vulnerability should be accepted for launch.
