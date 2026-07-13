"use client";

import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import styles from "./magnet.module.css";

type MagnetProps = {
  children: ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  wrapperClassName?: string;
  innerClassName?: string;
};

/** A reduced-motion and touch-safe version of the React Bits Magnet component. */
export function Magnet({
  children,
  padding = 80,
  disabled = false,
  magnetStrength = 20,
  activeTransition = "transform .22s ease-out",
  inactiveTransition = "transform .45s ease-in-out",
  wrapperClassName = "",
  innerClassName = "",
}: MagnetProps) {
  const magnetRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDisabled, setIsDisabled] = useState(disabled);

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)");
    const update = () => setIsDisabled(disabled || media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [disabled]);

  useEffect(() => {
    if (isDisabled) {
      setPosition({ x: 0, y: 0 });
      return;
    }

    function handleMouseMove(event: MouseEvent) {
      const element = magnetRef.current;
      if (!element) return;
      const { left, top, width, height } = element.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const withinRange = Math.abs(centerX - event.clientX) < width / 2 + padding && Math.abs(centerY - event.clientY) < height / 2 + padding;

      setIsActive(withinRange);
      setPosition(withinRange
        ? { x: (event.clientX - centerX) / magnetStrength, y: (event.clientY - centerY) / magnetStrength }
        : { x: 0, y: 0 });
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDisabled, magnetStrength, padding]);

  const style = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    transition: isActive ? activeTransition : inactiveTransition,
    willChange: "transform",
  } as CSSProperties;

  return (
    <span ref={magnetRef} className={`${styles.wrapper} ${wrapperClassName}`}>
      <span className={`${styles.inner} ${innerClassName}`} style={style}>{children}</span>
    </span>
  );
}
