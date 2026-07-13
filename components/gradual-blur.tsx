"use client";

import { CSSProperties, memo, useEffect, useMemo, useRef, useState } from "react";
import styles from "./gradual-blur.module.css";

type BlurPosition = "top" | "bottom" | "left" | "right";
type BlurCurve = "linear" | "bezier" | "ease-in" | "ease-out" | "ease-in-out";
type BlurTarget = "parent" | "page";

type GradualBlurProps = {
  position?: BlurPosition;
  strength?: number;
  height?: string;
  width?: string;
  divCount?: number;
  exponential?: boolean;
  curve?: BlurCurve;
  opacity?: number;
  animated?: boolean | "scroll";
  duration?: string;
  easing?: string;
  hoverIntensity?: number;
  target?: BlurTarget;
  zIndex?: number;
  className?: string;
  style?: CSSProperties;
  onAnimationComplete?: () => void;
};

const curves: Record<BlurCurve, (progress: number) => number> = {
  linear: (progress) => progress,
  bezier: (progress) => progress * progress * (3 - 2 * progress),
  "ease-in": (progress) => progress * progress,
  "ease-out": (progress) => 1 - (1 - progress) ** 2,
  "ease-in-out": (progress) => progress < .5 ? 2 * progress * progress : 1 - (-2 * progress + 2) ** 2 / 2,
};

const directions: Record<BlurPosition, string> = {
  top: "to top",
  bottom: "to bottom",
  left: "to left",
  right: "to right",
};

/**
 * React Bits GradualBlur, adapted to avoid runtime style injection and to work
 * inside the shared Next.js layout. It uses layered backdrop-filter masks to
 * give page edges a soft optical falloff.
 */
export const GradualBlur = memo(function GradualBlur({
  position = "bottom",
  strength = 2,
  height = "6rem",
  width,
  divCount = 5,
  exponential = false,
  curve = "linear",
  opacity = 1,
  animated = false,
  duration = ".3s",
  easing = "ease-out",
  hoverIntensity,
  target = "parent",
  zIndex = 1000,
  className = "",
  style,
  onAnimationComplete,
}: GradualBlurProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(animated !== "scroll");

  useEffect(() => {
    if (animated !== "scroll" || !containerRef.current) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: .1 });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [animated]);

  useEffect(() => {
    if (!isVisible || animated !== "scroll" || !onAnimationComplete) return;
    const timer = window.setTimeout(onAnimationComplete, Number.parseFloat(duration) * 1000);
    return () => window.clearTimeout(timer);
  }, [animated, duration, isVisible, onAnimationComplete]);

  const layers = useMemo(() => {
    const increment = 100 / divCount;
    const activeStrength = isHovered && hoverIntensity ? strength * hoverIntensity : strength;
    const curveFunction = curves[curve];

    return Array.from({ length: divCount }, (_, index) => {
      const layer = index + 1;
      const progress = curveFunction(layer / divCount);
      const blurValue = exponential
        ? 2 ** (progress * 4) * .0625 * activeStrength
        : .0625 * (progress * divCount + 1) * activeStrength;
      const p1 = Math.round((increment * layer - increment) * 10) / 10;
      const p2 = Math.round(increment * layer * 10) / 10;
      const p3 = Math.round((increment * layer + increment) * 10) / 10;
      const p4 = Math.round((increment * layer + increment * 2) * 10) / 10;
      let gradient = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) gradient += `, black ${p3}%`;
      if (p4 <= 100) gradient += `, transparent ${p4}%`;
      const mask = `linear-gradient(${directions[position]}, ${gradient})`;

      return (
        <span
          className={styles.layer}
          key={layer}
          style={{
            maskImage: mask,
            WebkitMaskImage: mask,
            backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
            WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
            opacity,
            transition: animated && animated !== "scroll" ? `backdrop-filter ${duration} ${easing}` : undefined,
          }}
        />
      );
    });
  }, [animated, curve, divCount, duration, easing, exponential, hoverIntensity, isHovered, opacity, position, strength]);

  const isVertical = position === "top" || position === "bottom";
  const containerStyle: CSSProperties = {
    position: target === "page" ? "fixed" : "absolute",
    pointerEvents: hoverIntensity ? "auto" : "none",
    opacity: isVisible ? 1 : 0,
    transition: animated ? `opacity ${duration} ${easing}` : undefined,
    zIndex: target === "page" ? zIndex + 100 : zIndex,
    ...(isVertical
      ? { height, width: width ?? "100%", [position]: 0, left: 0, right: 0 }
      : { width: width ?? height, height: "100%", [position]: 0, top: 0, bottom: 0 }),
    ...style,
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.gradualBlur} ${target === "page" ? styles.page : styles.parent} ${className}`}
      style={containerStyle}
      onMouseEnter={hoverIntensity ? () => setIsHovered(true) : undefined}
      onMouseLeave={hoverIntensity ? () => setIsHovered(false) : undefined}
    >
      <div className={styles.inner}>{layers}</div>
    </div>
  );
});
