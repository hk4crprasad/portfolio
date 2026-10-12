"use client";
import { useState } from "react";
import { projects } from "@/data/portfolio";
import { ProjectCard } from "./project-card";
const filters = ["All", "AI Systems", "Product", "Voice", "Research"] as const;
export function WorkExplorer() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");
  const visibleProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);
  return (
    <section className="container work-explorer">
      <div
        className="filter-row"
        role="group"
        aria-label="Filter projects by type"
      >
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={activeFilter === filter ? "is-selected" : ""}
            aria-pressed={activeFilter === filter}
            aria-controls="project-results"
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <p className="results-count" role="status">
        {visibleProjects.length}{" "}
        {visibleProjects.length === 1 ? "project" : "projects"}
        {activeFilter !== "All"
          ? ` in ${activeFilter}`
          : " across AI and product engineering"}
      </p>
      <div className="work-grid" id="project-results">
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={projects.indexOf(project)}
          />
        ))}
      </div>
    </section>
  );
}
