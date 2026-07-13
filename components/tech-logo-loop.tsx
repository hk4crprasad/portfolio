"use client";

import { SiDjango, SiDocker, SiFastapi, SiGooglecloud, SiHuggingface, SiMongodb, SiNextdotjs, SiPostgresql, SiPython, SiReact, SiTypescript } from "react-icons/si";
import { LogoLoop } from "./logo-loop";

const technologyLogos = [
  { node: <SiPython />, title: "Python", href: "https://www.python.org" },
  { node: <SiDjango />, title: "Django", href: "https://www.djangoproject.com" },
  { node: <SiFastapi />, title: "FastAPI", href: "https://fastapi.tiangolo.com" },
  { node: <SiHuggingface />, title: "Hugging Face", href: "https://huggingface.co" },
  { node: <SiDocker />, title: "Docker", href: "https://www.docker.com" },
  { node: <SiGooglecloud />, title: "Google Cloud", href: "https://cloud.google.com" },
  { node: <SiPostgresql />, title: "PostgreSQL", href: "https://www.postgresql.org" },
  { node: <SiMongodb />, title: "MongoDB", href: "https://www.mongodb.com" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
];

export function TechLogoLoop() {
  return <LogoLoop logos={technologyLogos} speed={54} logoHeight={27} gap={42} hoverSpeed={0} fadeOut fadeOutColor="#c7f46d" scaleOnHover ariaLabel="Haraprasad's technology stack" />;
}
