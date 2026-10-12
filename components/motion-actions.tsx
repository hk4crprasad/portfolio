"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useMotionEnabled } from "./motion-provider";
import StarBorder from "./react-bits/StarBorder";

export function MotionLink({ children, ...props }: Omit<ComponentProps<typeof Link>, "ref" | "as">) {
  const enabled = useMotionEnabled();
  if (!enabled) return <Link {...props}>{children}</Link>;
  return (
    <StarBorder
      as={Link}
      color="#435d97"
      trailColor="#435d97"
      backgroundColor="#c7ef87"
      textColor="#17241f"
      borderColor="#435d97"
      radius={999}
      duration={5}
      glow={0.4}
      {...props}
    >
      {children}
    </StarBorder>
  );
}

export function MotionButton({ children, ...props }: ComponentProps<"button">) {
  const enabled = useMotionEnabled();
  if (!enabled) return <button {...props}>{children}</button>;
  return (
    <StarBorder
      color="#c7ef87"
      trailColor="#c7ef87"
      backgroundColor="#17241f"
      textColor="#f7f8f2"
      borderColor="#c7ef87"
      radius={999}
      duration={5}
      glow={0.4}
      {...props}
    >
      {children}
    </StarBorder>
  );
}
