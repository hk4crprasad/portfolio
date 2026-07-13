import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { GlobalBlur } from "@/components/global-blur";

export const metadata: Metadata = {
  title: {
    default: "Haraprasad Hota — AI Architect & Agentic Builder",
    template: "%s — Haraprasad Hota",
  },
  description:
    "Portfolio of Haraprasad Hota, an AI architect and CTO building agentic systems, thoughtful products, and production-ready AI infrastructure.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <GlobalBlur />
        <div className="site-shell">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
