import Link from "next/link";
import { Magnet } from "@/components/magnet";

export default function NotFound() {
  return (
    <section className="container not-found">
      <p className="eyebrow">404 / lost in the system</p>
      <h1>That page hasn&apos;t<br /><em>been built yet.</em></h1>
      <Magnet padding={50} magnetStrength={22}><Link className="button button-dark" href="/">Return home</Link></Magnet>
    </section>
  );
}
