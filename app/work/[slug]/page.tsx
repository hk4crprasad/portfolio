import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { notFound } from "next/navigation";
import { ProjectVisual } from "@/components/project-visual";
import { Magnet } from "@/components/magnet";
import { projects } from "@/data/portfolio";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return { title: project ? project.title : "Project" };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const nextProject = projects[(projects.findIndex((item) => item.slug === project.slug) + 1) % projects.length];

  return (
    <>
      <section className="project-hero container">
        <Link href="/work" className="back-link"><ArrowLeft size={16} /> Back to selected work</Link>
        <div className="project-hero-grid">
          <div>
            <p className="eyebrow">{project.category} · {project.year}</p>
            <h1>{project.title}</h1>
            <p className="project-kicker">{project.kicker}</p>
            <p className="project-lead">{project.detail}</p>
            <div className="project-hero-actions">
              {project.repository ? <Magnet padding={45} magnetStrength={22}><a className="button button-dark" href={project.repository} target="_blank" rel="noreferrer"><Github size={17} /> View repository</a></Magnet> : <span className="project-status">{project.status}</span>}
              <span>{project.status}</span>
            </div>
          </div>
          <ProjectVisual slug={project.slug} title={project.title} />
        </div>
      </section>
      <section className="container project-outcome-section">
        <p className="eyebrow">The outcome</p>
        <p>{project.outcome}</p>
      </section>
      <section className="container project-detail-grid">
        <div className="project-detail-aside">
          <p className="eyebrow">The building blocks</p>
          <div className="tag-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
        </div>
        <div className="feature-list">
          {project.features.map((feature, index) => (
            <article key={feature.title}>
              <span>0{index + 1}</span>
              <div><h2>{feature.title}</h2><p>{feature.body}</p></div>
            </article>
          ))}
        </div>
      </section>
      <section className="container next-project">
        <p className="eyebrow">Next project</p>
        <Link href={`/work/${nextProject.slug}`}>
          <span>{nextProject.category}</span>
          <strong>{nextProject.title}</strong>
          <ArrowUpRight size={32} />
        </Link>
      </section>
    </>
  );
}
