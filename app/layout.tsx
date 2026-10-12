import localFont from "next/font/local";
import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MotionProvider } from "@/components/motion-provider";
import { siteUrl, pageMetadata } from "@/lib/site";

const sans = localFont({
  src: "../public/fonts/dm-sans-latin.9fea608a.woff2",
  variable: "--font-sans",
  weight: "100 1000",
  display: "swap",
  adjustFontFallback: "Arial",
});
const serif = localFont({
  src: "../public/fonts/playfair-display-latin-italic.8f074624.woff2",
  variable: "--font-serif",
  weight: "500",
  style: "italic",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

export const metadata: Metadata = {
  ...pageMetadata(
    "AI/ML Engineer · AI Prompt & Loop Designer",
    "Haraprasad Hota: AI/ML engineer, AI prompt and loop designer, and MCA student building LLM applications, AI agents, RAG pipelines, and FastAPI backends.",
    "/",
  ),
  metadataBase: siteUrl,
  title: {
    default: "Haraprasad Hota — AI/ML Engineer · AI Prompt & Loop Designer",
    template: "%s — Haraprasad Hota",
  },
  icons: { icon: "/favicon.svg" },
};
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Dynamic rendering ensures each response's scripts match its fresh CSP nonce.
  await headers();
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <MotionProvider>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <div className="site-shell">
            <Header />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
