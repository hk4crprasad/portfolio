import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { experience } from "@/data/portfolio";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  return (
    <>
      <PageIntro
        eyebrow="Experience"
        index="02 / 04"
        title={<>From fast ideas to<br /><em>steady systems.</em></>}
        intro="A progression through product delivery, enterprise AI architecture, and technical leadership—with the same through-line: make smart systems genuinely usable."
      />
      <section className="container full-timeline">
        {experience.map((item, index) => (
          <article className="experience-row" key={item.company}>
            <div className="experience-year"><span>0{index + 1}</span><p>{item.period}</p></div>
            <div className="experience-main">
              <p className="experience-location">{item.location}</p>
              <h2>{item.company}</h2>
              <h3>{item.role}</h3>
              <p className="experience-copy">{item.copy}</p>
              <div className="tag-list">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
          </article>
        ))}
      </section>
      <section className="container evidence-section">
        <p className="eyebrow">A few numbers, in context</p>
        <div className="evidence-grid">
          <article><strong>70%</strong><p>reduction in deployment time through Docker and CI/CD practices at Tecosys.</p></article>
          <article><strong>$200K</strong><p>development budget behind the Nutaan AI enterprise LLM platform.</p></article>
          <article><strong>95%</strong><p>accuracy in the FastAPI-based YouTube summarizer and LinkedIn scraper content processing work.</p></article>
        </div>
      </section>
      <section className="container experience-cta">
        <p>Want to see how that experience could apply to your next system?</p>
        <Link href="/contact" className="text-link">Open a conversation <ArrowUpRight size={17} /></Link>
      </section>
    </>
  );
}
