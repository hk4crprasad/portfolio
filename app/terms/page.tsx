import { pageMetadata } from "@/lib/site";
import { profile } from "@/data/portfolio";
import { PageIntro } from "@/components/page-intro";
export const metadata = pageMetadata(
  "Terms of use",
  "Use of Haraprasad Hota’s personal portfolio, project links, and contact information.",
  "/terms",
);
export default function TermsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Terms of use"
        index="Information"
        title={
          <>
            A little clarity.
            <br />
            <em>Before we build.</em>
          </>
        }
        intro="This portfolio presents professional work and provides a way to start a conversation."
      />
      <div className="container legal-content">
        <section>
          <h2>Portfolio information</h2>
          <p>
            Project descriptions and experience are supplied by the portfolio
            owner. They are informational and do not establish a service
            contract, guarantee an outcome, or promise availability. Any
            collaboration needs separately agreed scope and terms.
          </p>
        </section>
        <section>
          <h2>Projects and external resources</h2>
          <p>
            Linked repositories and websites have their own licenses and terms.
            Check a repository’s license before reusing its code. Third-party
            names identify the technologies and organizations described; they do
            not imply endorsement.
          </p>
        </section>
        <section>
          <h2>Contact responsibly</h2>
          <p>
            Contact forms prepare drafts; they do not send messages. Please use
            the published contact address for relevant enquiries and avoid
            sending sensitive credentials or unsolicited bulk messages.
          </p>
        </section>
        <section>
          <h2>Questions and corrections</h2>
          <p>
            For questions, inaccuracies or permission requests, email{" "}
            <a href={`mailto:${profile.email}`}>{profile.email}</a>.
          </p>
        </section>
        <p className="legal-notice">
          Owner and legal review required before launch. These use notes do not
          assert a governing jurisdiction, liability waiver, company
          registration, or statutory compliance. Additional contractual or legal
          terms should be supplied if the site’s operations require them.
        </p>
      </div>
    </>
  );
}
