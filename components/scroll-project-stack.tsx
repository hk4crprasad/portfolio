"use client";

import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { projects } from "@/data/portfolio";
import { useMotionEnabled } from "./motion-provider";
import { ProjectCard } from "./project-card";
import { ProjectVisual } from "./project-visual";
import CardSwap, { Card, type CardSwapHandle } from "./react-bits/CardSwap";

const featured = projects.slice(0, 3);
const heightQuery = "(min-height: 720px)";
const subscribe = (callback: () => void) => {
  const media = window.matchMedia(heightQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const getSnapshot = () => window.matchMedia(heightQuery).matches;
const getServerSnapshot = () => false;
const clamp = (value: number) => Math.max(0, Math.min(1, value));

function ScrollScene() {
  const scene = useRef<HTMLDivElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const deck = useRef<CardSwapHandle>(null);
  const requested = useRef(0);
  const [active, setActive] = useState(0);
  const project = featured[active];

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!scene.current || !sticky.current) return;
      const top = parseFloat(getComputedStyle(sticky.current).top) || 0;
      const range = scene.current.offsetHeight - sticky.current.offsetHeight;
      const progress = clamp((top - scene.current.getBoundingClientRect().top) / Math.max(1, range));
      const next = Math.round(progress * (featured.length - 1));
      if (next === requested.current) return;
      requested.current = next;
      deck.current?.goTo(next);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    if (scene.current) observer.observe(scene.current);
    if (sticky.current) observer.observe(sticky.current);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const navigate = (index: number) => {
    if (!scene.current || !sticky.current) return;
    const top = parseFloat(getComputedStyle(sticky.current).top) || 0;
    const start = window.scrollY + scene.current.getBoundingClientRect().top - top;
    const range = scene.current.offsetHeight - sticky.current.offsetHeight;
    window.scrollTo({ top: start + (index / (featured.length - 1)) * range, behavior: "smooth" });
  };

  return (
    <div className="scroll-work-scene" ref={scene} data-active-project={project.slug}>
      <div className="scroll-work-sticky" ref={sticky}>
        <div className="scroll-project-story">
          <p className="eyebrow">{project.category}{project.year && ` · ${project.year}`}</p>
          <h3>{project.title}</h3>
          <p className="scroll-project-summary">{project.summary}</p>
          <p className="scroll-project-outcome">{project.outcome}</p>
          <Link className="text-link" href={`/work/${project.slug}`}>
            Explore the project <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
          <div className="scroll-project-controls" role="group" aria-label="Featured project controls">
            <button type="button" aria-label="Previous featured project" disabled={active === 0} onClick={() => navigate(active - 1)}>
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <span role="status" aria-live="polite">{active + 1} / {featured.length}</span>
            <button type="button" aria-label="Next featured project" disabled={active === featured.length - 1} onClick={() => navigate(active + 1)}>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
          <p className="scroll-project-hint"><ArrowDown size={14} aria-hidden="true" /> Scroll to explore</p>
        </div>
        <div className="scroll-work-stage" aria-hidden="true" inert>
          <CardSwap
            ref={deck}
            width={500}
            height={350}
            cardDistance={28}
            verticalDistance={26}
            depth={65}
            skewAmount={2}
            visibleCards={3}
            autoplay={false}
            draggable={false}
            intro={false}
            parallax={0}
            hoverSpread={0}
            speed={1.4}
            bounce={0.2}
            dim={0.35}
            theme="light"
            onChange={setActive}
          >
            {featured.map((item, index) => (
              <Card className="scroll-swap-card" key={item.slug}>
                <div className="scroll-swap-card-head"><span>{String(index + 1).padStart(2, "0")}</span><span>{item.category}</span></div>
                <ProjectVisual slug={item.slug} title={item.title} compact />
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </div>
  );
}

export function ScrollProjectStack() {
  const enabled = useMotionEnabled();
  const tallEnough = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (enabled && tallEnough) return <ScrollScene />;
  return (
    <div className="home-work-grid">
      {featured.map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}
    </div>
  );
}
