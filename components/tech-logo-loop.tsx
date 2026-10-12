"use client";

import { SiPython, SiDjango, SiFastapi, SiHuggingface, SiLanggraph, SiMongodb, SiDocker, SiPostgresql, SiNextdotjs, SiReact, SiTypescript } from "react-icons/si";
import { Cloud, Layers, Server } from "lucide-react";
import { useMotionEnabled } from "./motion-provider";
import LogoLoop from "./react-bits/LogoLoop";

const technologies = [
  { name: "Python", url: "https://www.python.org", Icon: SiPython },
  { name: "Django", url: "https://www.djangoproject.com", Icon: SiDjango },
  { name: "FastAPI", url: "https://fastapi.tiangolo.com", Icon: SiFastapi },
  { name: "Hugging Face", url: "https://huggingface.co", Icon: SiHuggingface },
  { name: "LangGraph", url: "https://docs.langchain.com/oss/python/langgraph/overview", Icon: SiLanggraph },
  { name: "Azure", url: "https://azure.microsoft.com", Icon: Layers },
  { name: "AWS", url: "https://aws.amazon.com", Icon: Cloud },
  { name: "Heroku", url: "https://www.heroku.com", Icon: Server },
  { name: "MongoDB", url: "https://www.mongodb.com", Icon: SiMongodb },
  { name: "Docker", url: "https://www.docker.com", Icon: SiDocker },
  { name: "PostgreSQL", url: "https://www.postgresql.org", Icon: SiPostgresql },
  { name: "Next.js", url: "https://nextjs.org", Icon: SiNextdotjs },
  { name: "React", url: "https://react.dev", Icon: SiReact },
  { name: "TypeScript", url: "https://www.typescriptlang.org", Icon: SiTypescript },
];

const logos = technologies.map(({ name, Icon }) => ({
  title: name,
  node: <span className="tech-logo"><Icon aria-hidden="true" /><span>{name}</span></span>,
}));

function TechnologyLinks() {
  return (
    <ul className="technology-list container">
      {technologies.map(({ name, url, Icon }) => (
        <li key={name}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Icon size={20} aria-hidden="true" />{name}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function TechLogoLoop() {
  const enabled = useMotionEnabled();
  if (!enabled) return <TechnologyLinks />;
  return (
    <div className="tech-loop">
      <div aria-hidden="true">
        <LogoLoop logos={logos} speed={42} logoHeight={26} gap={48} hoverSpeed={0} fadeOut fadeOutColor="#c7ef87" scaleOnHover />
      </div>
      <details className="tech-details">
        <summary>Explore the stack</summary>
        <TechnologyLinks />
      </details>
    </div>
  );
}
