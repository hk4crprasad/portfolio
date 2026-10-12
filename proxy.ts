import { NextRequest, NextResponse } from "next/server";
import { contentSecurityPolicy } from "@/lib/security";
import { siteUrl } from "@/lib/site";

export function proxy(request: NextRequest) {
  const loopback = ["localhost", "127.0.0.1", "[::1]"].includes(
    new URL(`http://${request.headers.get("host") ?? request.nextUrl.host}`)
      .hostname,
  );
  if (
    !loopback &&
    process.env.NODE_ENV === "production" &&
    request.headers.get("x-forwarded-proto")?.split(",")[0].trim() === "http"
  ) {
    const destination = new URL(
      request.nextUrl.pathname + request.nextUrl.search,
      siteUrl,
    );
    return NextResponse.redirect(destination, 308);
  }
  const path = request.nextUrl.pathname;
  if (
    path.startsWith("/_next/") ||
    path.startsWith("/fonts/") ||
    [
      "/favicon.svg",
      "/portrait.jpg",
      "/social-preview.png",
      "/robots.txt",
      "/sitemap.xml",
    ].includes(path)
  ) {
    return NextResponse.next();
  }
  const nonce = Buffer.from(
    crypto.getRandomValues(new Uint8Array(24)),
  ).toString("base64");
  const csp = contentSecurityPolicy(
    nonce,
    process.env.NODE_ENV !== "production",
    siteUrl.protocol === "https:",
  );
  const requestHeaders = new Headers(request.headers);
  // Overwrite client-supplied values; Next uses the policy to nonce its own scripts.
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  // Per-response nonces must never be shared through document/CDN caches.
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  return response;
}
export const config = { matcher: ["/:path*"] };
