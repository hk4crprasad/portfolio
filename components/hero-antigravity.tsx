"use client";

import dynamic from "next/dynamic";

const Antigravity = dynamic(() => import("./antigravity"), { ssr: false });

export function HeroAntigravity() {
  return (
    <div className="hero-antigravity" aria-hidden="true">
      <Antigravity count={165} magnetRadius={8} ringRadius={6.3} waveSpeed={.45} waveAmplitude={.9} particleSize={.85} lerpSpeed={.07} color="#c7f46d" autoAnimate particleVariance={.65} rotationSpeed={.09} depthFactor={.7} pulseSpeed={2.5} fieldStrength={11} />
    </div>
  );
}
