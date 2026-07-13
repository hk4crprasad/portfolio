"use client";

import dynamic from "next/dynamic";

const Strands = dynamic(() => import("./strands"), { ssr: false });

export function ContactStrands() {
  return (
    <div className="contact-strands" aria-hidden="true">
      <Strands colors={["#c7f46d", "#fa8559", "#9fb5ff"]} count={7} speed={.42} amplitude={1.05} waviness={2} thickness={.82} glow={2.5} taper={3.5} spread={1} intensity={.18} saturation={1.35} opacity={.92} scale={2.2} />
    </div>
  );
}
