"use client";

import { useState } from "react";
import { projects } from "@/data/portfolio";
import { ProjectCard } from "./project-card";
import { Magnet } from "./magnet";

const filters = ["All", "AI Systems", "Product", "Voice", "Research"] as const;

export function WorkExplorer() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const visibleProjects = activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter);

  return (
    <section className="container work-explorer">
      <div className="filter-row" aria-label="Filter projects by type">
        {filters.map((filter) => (
          <Magnet padding={26} magnetStrength={28} key={filter}>
            <button
              type="button"
              className={activeFilter === filter ? "is-selected" : ""}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          </Magnet>
        ))}
      </div>
      <div className="work-grid">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} index={projects.indexOf(project)} />
        ))}
      </div>
    </section>
  );
}
