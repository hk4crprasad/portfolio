import type { Metadata } from "next";
import { Github, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { ContactQuickReach } from "@/components/contact-quick-reach";
import { ContactStrands } from "@/components/contact-strands";
import { PageIntro } from "@/components/page-intro";
import { profile } from "@/data/portfolio";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        index="04 / 04"
        title={<>A good idea needs<br />a <em>first move.</em></>}
        intro="Whether you&apos;re building an AI product, need an agentic workflow with real constraints, or want to compare notes—say hello."
      />
      <section className="container contact-layout">
        <div className="contact-info">
          <p>For product ideas, technical collaborations, AI architecture, and conversations with a little ambition.</p>
          <ContactQuickReach />
          <a className="big-email" href={`mailto:${profile.email}`}>{profile.email}</a>
          <div className="contact-meta">
            <span><MapPin size={16} /> {profile.location}</span>
            <a href={profile.github} target="_blank" rel="noreferrer"><Github size={16} /> github.com/hk4crprasad</a>
            <a href={`mailto:${profile.email}`}><Mail size={16} /> Email directly</a>
          </div>
        </div>
        <ContactForm />
      </section>
      <section className="contact-signoff-section">
        <ContactStrands />
        <div className="contact-signoff container">
          <span>It starts with a small message.</span>
          <p>Build something <em>worth remembering.</em></p>
        </div>
      </section>
    </>
  );
}
