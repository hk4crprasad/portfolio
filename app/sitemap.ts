import type { MetadataRoute } from "next";
import { projects } from "@/data/portfolio";
import { siteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/work",
    "/experience",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    ...projects.map((project) => `/work/${project.slug}`),
  ].map((path) => ({ url: new URL(path, siteUrl).href }));
}
