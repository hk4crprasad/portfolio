"use client";

import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./pixel-transition.module.css";

type PixelTransitionProps = {
  firstContent: ReactNode;
  secondContent: ReactNode;
  gridSize?: number;
  pixelColor?: string;
  animationStepDuration?: number;
  aspectRatio?: string;
  once?: boolean;
  className?: string;
  style?: CSSProperties;
};

/**
 * A React Bits PixelTransition adapted for Next.js. The device check happens
 * after hydration so the component remains safe to render on the server.
 */
export function PixelTransition({
  firstContent,
  secondContent,
  gridSize = 7,
  pixelColor = "currentColor",
  animationStepDuration = 0.3,
  once = false,
  aspectRatio = "100%",
  className = "",
  style = {},
}: PixelTransitionProps) {
  const pixelGridRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);
  const delayedCallRef = useRef<gsap.core.Tween | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches,
    );
  }, []);

  useEffect(() => {
    const pixelGrid = pixelGridRef.current;
    if (!pixelGrid) return;

    pixelGrid.replaceChildren();
    const fragment = document.createDocumentFragment();
    const size = 100 / gridSize;

    for (let row = 0; row < gridSize; row += 1) {
      for (let column = 0; column < gridSize; column += 1) {
        const pixel = document.createElement("div");
        pixel.className = styles.pixel;
        pixel.style.backgroundColor = pixelColor;
        pixel.style.width = `${size}%`;
        pixel.style.height = `${size}%`;
        pixel.style.left = `${column * size}%`;
        pixel.style.top = `${row * size}%`;
        fragment.appendChild(pixel);
      }
    }
    pixelGrid.appendChild(fragment);
  }, [gridSize, pixelColor]);

  useEffect(() => {
    return () => {
      delayedCallRef.current?.kill();
    };
  }, []);

  function animatePixels(activate: boolean) {
    setIsActive(activate);
    const pixelGrid = pixelGridRef.current;
    const activeElement = activeRef.current;
    if (!pixelGrid || !activeElement) return;

    const pixels = pixelGrid.querySelectorAll<HTMLElement>(`.${styles.pixel}`);
    if (!pixels.length) return;

    gsap.killTweensOf(pixels);
    delayedCallRef.current?.kill();
    gsap.set(pixels, { display: "none" });

    const staggerDuration = animationStepDuration / pixels.length;
    gsap.to(pixels, {
      display: "block",
      duration: 0,
      stagger: { each: staggerDuration, from: "random" },
    });

    delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {
      activeElement.style.display = activate ? "block" : "none";
      activeElement.style.pointerEvents = activate ? "none" : "";
    });

    gsap.to(pixels, {
      display: "none",
      duration: 0,
      delay: animationStepDuration,
      stagger: { each: staggerDuration, from: "random" },
    });
  }

  function handleEnter() {
    if (!isActive) animatePixels(true);
  }

  function handleLeave() {
    if (isActive && !once) animatePixels(false);
  }

  function handleClick() {
    if (!isActive) animatePixels(true);
    else if (!once) animatePixels(false);
  }

  return (
    <div
      className={`${styles.pixelatedCard} ${className}`}
      style={style}
      onMouseEnter={!isTouchDevice ? handleEnter : undefined}
      onMouseLeave={!isTouchDevice ? handleLeave : undefined}
      onClick={isTouchDevice ? handleClick : undefined}
      onFocus={!isTouchDevice ? handleEnter : undefined}
      onBlur={!isTouchDevice ? handleLeave : undefined}
      tabIndex={0}
    >
      <div style={{ paddingTop: aspectRatio }} />
      <div className={styles.defaultContent} aria-hidden={isActive}>{firstContent}</div>
      <div className={styles.activeContent} ref={activeRef} aria-hidden={!isActive}>{secondContent}</div>
      <div className={styles.pixelGrid} ref={pixelGridRef} />
    </div>
  );
}
