import { pageMetadata } from "@/lib/site";
import { profile } from "@/data/portfolio";
import { PageIntro } from "@/components/page-intro";
export const metadata = pageMetadata(
  "Privacy & cookies",
  "How this portfolio handles email drafts, hosting requests, cookies, and external links.",
  "/privacy",
);
export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Privacy & cookies"
        index="Information"
        title={
          <>
            Your details.
            <br />
            <em>Your choice.</em>
          </>
        }
        intro="A plain-language description of how this portfolio works."
      />
      <div className="container legal-content">
        <section>
          <h2>About this website</h2>
          <p>
            This is the personal portfolio of {profile.name}, based in{" "}
            {profile.location}. For privacy questions, email{" "}
            <a href={`mailto:${profile.email}`}>{profile.email}</a>.
          </p>
        </section>
        <section>
          <h2>Contact and email drafts</h2>
          <p>
            The contact forms prepare an email in your own email app. Your name,
            email address and message stay in the current browser page; this
            website does not submit them to a server or save them in browser
            storage. Reloading clears the draft. The copy button writes a draft
            to your clipboard only when you choose it.
          </p>
          <p>
            If you send an email, your email provider and the recipient’s
            provider process it. The recipient address uses Gmail. Avoid
            including passwords, financial details or other sensitive
            information. You can request deletion of correspondence using the
            address above; retention practices and legal obligations require
            owner review.
          </p>
        </section>
        <section>
          <h2>Hosting and technical requests</h2>
          <p>
            The planned hosting provider is Heroku. Like other hosting services,
            it may process IP addresses, request paths and technical logs needed
            to deliver and operate the site. This application does not add
            visitor analytics, error tracking services or a contact database.
            Provider logging, retention, international processing and any
            domain/CDN configuration must be confirmed before launch.
          </p>
        </section>
        <section>
          <h2>Cookies and browser storage</h2>
          <p>
            The application does not set cookies, use local storage, or run
            advertising or nonessential analytics. There are no optional
            tracking preferences to enable or withdraw in this implementation,
            so a consent banner is not currently shown. Hosting-level behavior
            must be checked at launch. Adding tracking requires a fresh privacy
            and consent review.
          </p>
        </section>
        <section>
          <h2>Images, fonts and external links</h2>
          <p>
            The existing GitHub profile portrait and fonts are served locally.
            Links to GitHub and technology documentation open external websites
            with their own policies. Your email application opens when you
            choose to prepare an email; the website cannot confirm that an email
            was sent.
          </p>
        </section>
        <p className="legal-notice">
          Owner and legal review required before launch: confirm correspondence
          retention, hosting logs, service-provider arrangements and notices
          required in the relevant jurisdictions. This page describes the code’s
          behavior and does not claim regulatory compliance.
        </p>
      </div>
    </>
  );
}
