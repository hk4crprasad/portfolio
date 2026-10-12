import "server-only";
import type { Metadata } from "next";

export function readSiteUrl(
  value = process.env.SITE_URL ?? "https://hk4crprasad.site/",
) {
  const url = new URL(value);
  if (
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== "/" ||
    !["http:", "https:"].includes(url.protocol)
  )
    throw new Error(
      "SITE_URL must be an origin without credentials, path, query or fragment.",
    );
  if (process.env.NODE_ENV === "production" && url.protocol !== "https:")
    throw new Error("Production SITE_URL must use HTTPS.");
  return url;
}
export const siteUrl = readSiteUrl();
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const url = new URL(path, siteUrl);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — Haraprasad Hota`,
      description,
      url,
      type: "website",
      siteName: "Haraprasad Hota",
      images: [
        {
          url: new URL("/social-preview.png", siteUrl),
          width: 1200,
          height: 630,
          alt: "Haraprasad Hota — AI architecture and product engineering",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Haraprasad Hota`,
      description,
      images: [new URL("/social-preview.png", siteUrl).href],
    },
  };
}
