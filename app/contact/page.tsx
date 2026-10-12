import { pageMetadata } from "@/lib/site";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { ContactQuickReach } from "@/components/contact-quick-reach";
import { PageIntro } from "@/components/page-intro";
import { profile } from "@/data/portfolio";

export const metadata = pageMetadata(
  "Contact",
  "Contact Haraprasad Hota for AI/ML engineering, AI prompt and loop design, software engineering roles, and technical collaboration.",
  "/contact",
);

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        index="04 / 04"
        title={
          <>
            A good idea needs
            <br />a <em>first move.</em>
          </>
        }
        intro="Whether you're building an AI product, need an agentic workflow with real constraints, or want to compare notes—say hello."
      />
      <section className="container contact-layout">
        <div className="contact-info">
          <p>
            For AI/ML Engineer or Software Engineer roles, prompt and agent-loop
            design, AI projects, and technical collaborations.
          </p>
          <ContactQuickReach />
          <a className="big-email" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <div className="contact-meta">
            <span>
              <MapPin size={16} /> {profile.location}
            </span>
            <a href={profile.github} target="_blank" rel="noreferrer">
              <Github size={16} /> github.com/hk4crprasad
            </a>
            <a href={`mailto:${profile.email}`}>
              <Mail size={16} /> Email directly
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin size={16} aria-hidden="true" /> Connect on LinkedIn
            </a>
            <a href={profile.phoneHref}>
              <Phone size={16} aria-hidden="true" /> {profile.phone}
            </a>
          </div>
        </div>
        <ContactForm />
      </section>
      <section className="contact-signoff-section">
        <div className="contact-signoff container">
          <span>It starts with a small message.</span>
          <p>
            Build something <em>worth remembering.</em>
          </p>
        </div>
      </section>
    </>
  );
}
