"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { PixelTransition } from "./pixel-transition";
import { ProjectVisual } from "./project-visual";
import { Magnet } from "./magnet";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="project-card">
      <PixelTransition
        className="project-pixel-transition"
        gridSize={12}
        pixelColor="#f5f5ef"
        animationStepDuration={.38}
        aspectRatio="75%"
        firstContent={<ProjectVisual slug={project.slug} title={project.title} />}
        secondContent={
          <div className={`project-hover-reveal project-hover-${project.slug}`}>
            <p>HK4CRPRASAD / {project.category}</p>
            <strong>{project.title}</strong>
            <span>Hover reveal · Explore below ↘</span>
          </div>
        }
      />
      <div className="project-card-copy">
        <div className="project-card-meta">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <h2>{project.title}</h2>
        <p>{project.summary}</p>
        <Magnet padding={35} magnetStrength={26}>
          <Link href={`/work/${project.slug}`} className="text-link">
            Explore the project <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </Magnet>
      </div>
    </article>
  );
}
