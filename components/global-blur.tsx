"use client";

import { GradualBlur } from "./gradual-blur";

/** Shared soft focus at the viewport edges, present on every page. */
export function GlobalBlur() {
  return (
    <>
      <GradualBlur target="page" position="top" height="3rem" strength={.22} divCount={6} curve="bezier" opacity={.72} zIndex={0} />
      <GradualBlur target="page" position="bottom" height="3.5rem" strength={.28} divCount={6} curve="bezier" exponential opacity={.78} zIndex={0} />
    </>
  );
}
