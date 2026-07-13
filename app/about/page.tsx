import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Github, Mail, MapPin } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { ProfilePixelTransition } from "@/components/profile-pixel-transition";
import { profile, skills } from "@/data/portfolio";

export const metadata: Metadata = { title: "About" };

const principles = [
  ["01", "Start with the human move", "The best technical answer begins with what somebody is actually trying to accomplish."],
  ["02", "Make intelligence legible", "AI should clarify and amplify a person’s thinking—not hide a vague process behind a clever interface."],
  ["03", "Keep the path to production visible", "A prototype matters. A system that can be run, observed, improved, and trusted matters more."],
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About"
        index="03 / 04"
        title={<>Curious by nature.<br /><em>Useful by choice.</em></>}
        intro="I&apos;m a builder with an architect&apos;s appetite for the whole system—technical foundation, human behavior, product payoff, and all the connections between them."
      />
      <section className="container about-portrait-section">
        <div className="about-portrait">
          <ProfilePixelTransition variant="about" />
          <span className="about-spark spark-one">✦</span>
          <span className="about-spark spark-two">✦</span>
        </div>
        <div className="about-portrait-copy">
          <p className="eyebrow">A little context</p>
          <h2>I turn <em>curiosity</em> into things that work.</h2>
          <p>My work lives across generative AI, agentic systems, backend architecture, and full-stack delivery. I&apos;m currently CTO & AI Researcher at Cynerza, where I lead an AI-first technical strategy across product, automation, custom APIs, and multimodal experiences.</p>
          <p>Before that, I helped shape enterprise AI systems at Tecosys and strengthened the production foundations behind AI services at Kreaitor. I&apos;m at my best where an ambitious technical direction needs an honest, working path forward.</p>
          <div className="about-contact-line">
            <span><MapPin size={16} /> {profile.location}</span>
            <a href={`mailto:${profile.email}`}><Mail size={16} /> Write me</a>
          </div>
        </div>
      </section>
      <section className="container principles-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Working principles</p>
            <h2>Less theater.<br /><em>More signal.</em></h2>
          </div>
          <p className="section-aside-copy">The things I return to when turning fuzzy ambitions into concrete, testable work.</p>
        </div>
        <div className="principles-list">
          {principles.map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="skills-section">
        <div className="container skills-layout">
          <div>
            <p className="eyebrow">Tools of the trade</p>
            <h2>A stack is a language.<br /><em>These are mine.</em></h2>
          </div>
          <div className="skills-cloud">{skills.map((skill, index) => <span className={index % 5 === 0 ? "is-featured" : ""} key={skill}>{skill}</span>)}</div>
        </div>
      </section>
      <section className="container about-links">
        <a href={profile.github} target="_blank" rel="noreferrer"><Github size={19} /><span>Explore the open-source trail</span><ArrowUpRight size={19} /></a>
        <Link href="/contact"><Mail size={19} /><span>Bring a good question</span><ArrowUpRight size={19} /></Link>
      </section>
    </>
  );
}
