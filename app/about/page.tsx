import { pageMetadata } from "@/lib/site";
import Link from "next/link";
import { ArrowUpRight, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { ProfilePixelTransition } from "@/components/profile-pixel-transition";
import { achievements, certifications, education, profile, skills } from "@/data/portfolio";

export const metadata = pageMetadata(
  "About",
  "Meet Haraprasad Hota, an AI/ML engineer, AI prompt and loop designer, and MCA student at IMIT Cuttack with 3+ years of remote industry experience.",
  "/about",
);

const principles = [
  [
    "01",
    "Start with the human move",
    "The best technical answer begins with what somebody is actually trying to accomplish.",
  ],
  [
    "02",
    "Make intelligence legible",
    "AI should clarify and amplify a person’s thinking—not hide a vague process behind a clever interface.",
  ],
  [
    "03",
    "Keep the path to production visible",
    "A prototype matters. A system that can be run, observed, improved, and trusted matters more.",
  ],
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About"
        index="03 / 04"
        title={
          <>
            Curious by nature.
            <br />
            <em>Useful by choice.</em>
          </>
        }
        intro="I’m an AI/ML engineer, AI prompt & loop designer, and MCA student building LLM applications, AI agents, RAG pipelines, and FastAPI backends—with 3+ years of remote industry experience alongside my studies."
      />
      <section className="container about-portrait-section">
        <div className="about-portrait">
          <ProfilePixelTransition variant="about" />
        </div>
        <div className="about-portrait-copy">
          <p className="eyebrow">A little context</p>
          <h2>
            I turn <em>curiosity</em> into things that work.
          </h2>
          <p>
            I&apos;m an AI/ML Engineer at Cynerza Systems Pvt. Ltd., building
            LLM-based agents, automation workflows, REST APIs, and generative
            and multimodal features for a company serving 200+ paying
            customers. I deploy services on Azure and AWS with Docker and CI/CD.
          </p>
          <p>
            At Tecosys AI, I worked on Nutaan&apos;s multilingual voice-AI
            backend and single-handedly built nutaan-cli, an autonomous coding
            agent published on PyPI. Earlier, I worked part-time on backend and
            DevOps services at Kreaitor. My prompt and loop design work connects
            model reasoning, tool use, and human approval in practical agent
            workflows.
          </p>
          <div className="about-contact-line">
            <span>
              <MapPin size={16} /> {profile.location}
            </span>
            <a href={`mailto:${profile.email}`}>
              <Mail size={16} /> Write me
            </a>
          </div>
        </div>
      </section>
      <section className="container resume-section" aria-labelledby="education-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Education</p>
            <h2 id="education-heading">Learning, with<br /><em>practical application.</em></h2>
          </div>
        </div>
        <div className="resume-education">
          {education.map((item) => (
            <article className="resume-card" key={item.qualification}>
              <p className="eyebrow">{item.period}</p>
              <h3>{item.qualification}</h3>
              <p>{item.institution}</p>
              <p className="resume-result">{item.result}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="container resume-section resume-qualifications">
        <div>
          <h2>Certifications</h2>
          <ul className="resume-records">
            {certifications.map((item) => (
              <li key={item.title}>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.title}<ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <p>{item.issuer} · {item.date}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Achievements</h2>
          <ul className="resume-records">
            {achievements.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="container principles-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Working principles</p>
            <h2>
              Less theater.
              <br />
              <em>More signal.</em>
            </h2>
          </div>
          <p className="section-aside-copy">
            The things I return to when turning fuzzy ambitions into concrete,
            testable work.
          </p>
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
            <h2>
              A stack is a language.
              <br />
              <em>These are mine.</em>
            </h2>
          </div>
          <div className="skills-cloud">
            {skills.map((skill, index) => (
              <span
                className={index % 5 === 0 ? "is-featured" : ""}
                key={skill}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>
      <section className="container about-links">
        <a href={profile.resume} download="Haraprasad-Hota-Resume.pdf">
          <Download size={19} aria-hidden="true" />
          <span>Download the latest resume</span>
          <ArrowUpRight size={19} aria-hidden="true" />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
          <Linkedin size={19} aria-hidden="true" />
          <span>Connect on LinkedIn</span>
          <ArrowUpRight size={19} aria-hidden="true" />
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer">
          <Github size={19} />
          <span>Explore the open-source trail</span>
          <ArrowUpRight size={19} />
        </a>
        <Link href="/contact">
          <Mail size={19} />
          <span>Bring a good question</span>
          <ArrowUpRight size={19} />
        </Link>
      </section>
    </>
  );
}
