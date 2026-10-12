import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { ProjectVisual } from "./project-visual";
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article className="project-card">
      <ProjectVisual slug={project.slug} title={project.title} />
      <div className="project-card-copy">
        <div className="project-card-meta">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{project.category}</span>
          {project.year && <span>{project.year}</span>}
        </div>
        <h2>{project.title}</h2>
        <p>{project.summary}</p>
        <Link href={`/work/${project.slug}`} className="text-link">
          Explore the project
          <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
