export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container not-found">
      <p className="eyebrow">404 / lost in the system</p>
      <h1>
        That page is
        <br />
        <em>out of reach.</em>
      </h1>
      <Link className="button button-dark" href="/">
        Return home
      </Link>
    </section>
  );
}
