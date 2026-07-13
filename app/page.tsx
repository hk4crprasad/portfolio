import Link from "next/link";
import { ArrowDown, ArrowUpRight, Github, Sparkles } from "lucide-react";
import { HeroActions } from "@/components/hero-actions";
import { HeroAntigravity } from "@/components/hero-antigravity";
import { ProjectCard } from "@/components/project-card";
import { ProfilePixelTransition } from "@/components/profile-pixel-transition";
import { TechLogoLoop } from "@/components/tech-logo-loop";
import { experience, profile, projects } from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <section className="hero container">
        <div className="hero-grid" />
        <HeroAntigravity />
        <div className="hero-copy">
          <p className="eyebrow hero-kicker"><span className="live-dot" /> Available for thoughtful builds</p>
          <h1>
            AI that feels <em>considered.</em>
            <br />
            Products that <i>move.</i>
          </h1>
          <p className="hero-intro">
            I&apos;m Haraprasad Hota — an AI architect and agentic builder turning ambitious ideas into intelligent, dependable systems.
          </p>
          <HeroActions />
          <div className="hero-signals">
            <span>AI architecture</span>
            <span>Prompt systems</span>
            <span>Agentic builds</span>
          </div>
        </div>
        <div className="hero-portrait-wrap">
          <div className="portrait-orbit orbit-large" />
          <div className="portrait-orbit orbit-small" />
          <div className="portrait-frame">
            <ProfilePixelTransition />
          </div>
          <div className="portrait-note portrait-note-top">
            <Sparkles size={15} />
            <span>making bots feel human</span>
          </div>
          <div className="portrait-note portrait-note-bottom">
            <span>01</span>
            <p>Based in<br /><b>Odisha, India</b></p>
          </div>
        </div>
        <a href="#signal" className="hero-scroll" aria-label="Scroll to introduction">
          <span>scroll to explore</span><ArrowDown size={16} />
        </a>
      </section>

      <section className="signal-section" id="signal">
        <div className="container signal-grid">
          <p className="eyebrow">The signal</p>
          <div>
            <p className="signal-statement">I work where <span>model behavior</span>, product judgment, and practical engineering meet.</p>
            <p className="signal-support">From agentic workflows and FastAPI services to the human experience around them, I build systems meant to be useful long after the demo.</p>
          </div>
          <div className="signal-stats">
            <div><strong>3+</strong><span>years building<br />in production</span></div>
            <div><strong>41</strong><span>public repos<br />and counting</span></div>
            <div><strong>01</strong><span>goal: meaningful<br />leverage</span></div>
          </div>
        </div>
      </section>

      <section className="featured-work container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2>Made to solve<br /><em>real things.</em></h2>
          </div>
          <Link href="/work" className="text-link">View all work <ArrowUpRight size={17} /></Link>
        </div>
        <div className="home-work-grid">
          {projects.slice(0, 3).map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}
        </div>
      </section>

      <section className="capability-section">
        <div className="container">
          <div className="section-heading capability-heading">
            <div>
              <p className="eyebrow">How I build</p>
              <h2>A whole-system<br /><em>way of thinking.</em></h2>
            </div>
            <p>Great AI products need more than a clever prompt. They need architecture, constraints, taste, and a way to keep getting better.</p>
          </div>
          <div className="capability-grid">
            <article className="capability-card cap-card-large">
              <span className="cap-number">01</span>
              <div className="cap-icon cap-icon-orbit">◎</div>
              <h3>AI systems</h3>
              <p>LLM applications, RAG, evaluation-aware prompting, and agents shaped around the work they need to do.</p>
              <span className="cap-line" />
            </article>
            <article className="capability-card">
              <span className="cap-number">02</span>
              <div className="cap-icon cap-icon-code">&lt;/&gt;</div>
              <h3>Product engineering</h3>
              <p>Django, FastAPI, clean APIs, and front-to-back systems with an eye on the experience.</p>
            </article>
            <article className="capability-card cap-card-dark">
              <span className="cap-number">03</span>
              <div className="cap-icon cap-icon-grid">✣</div>
              <h3>Delivery & scale</h3>
              <p>Cloud infrastructure, CI/CD, Docker, and the operational detail that makes a prototype hold up.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="home-experience container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">In motion</p>
            <h2>Building with<br /><em>intent.</em></h2>
          </div>
          <Link href="/experience" className="text-link">My experience <ArrowUpRight size={17} /></Link>
        </div>
        <div className="mini-timeline">
          {experience.map((item) => (
            <article key={item.company}>
              <p>{item.period}</p>
              <h3>{item.company}</h3>
              <span>{item.role}</span>
              <div className="timeline-dot" />
            </article>
          ))}
        </div>
      </section>

      <section className="tech-strip" aria-label="Technology stack">
        <TechLogoLoop />
      </section>

      <section className="closing-section container">
        <div className="closing-aside">
          <span className="eyebrow">A good place to start</span>
          <a href={profile.github} target="_blank" rel="noreferrer"><Github size={17} /> github.com/hk4crprasad</a>
        </div>
        <div>
          <p>Have an AI problem with some real texture to it?</p>
          <Link href="/contact">Let&apos;s give it a shape <ArrowUpRight size={28} /></Link>
        </div>
      </section>
    </>
  );
}
