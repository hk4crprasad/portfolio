"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="container not-found" role="alert">
      <p className="eyebrow">Something went wrong</p>
      <h1>
        Let’s try
        <br />
        <em>that again.</em>
      </h1>
      <p>The page could not be loaded. Please retry or return home.</p>
      <div className="hero-actions">
        <button className="button button-dark" onClick={reset} type="button">
          Try again
        </button>
        <Link href="/" className="text-link">
          Return home
        </Link>
      </div>
    </section>
  );
}
