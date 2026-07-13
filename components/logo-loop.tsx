"use client";

import { CSSProperties, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./logo-loop.module.css";

type LogoNode = { node: ReactNode; title: string; href?: string; ariaLabel?: string };
type LogoImage = { src: string; alt: string; href?: string; title?: string; width?: number; height?: number };
type LogoItem = LogoNode | LogoImage;

type LogoLoopProps = {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right" | "up" | "down";
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
};

const MIN_COPIES = 2;
const COPY_HEADROOM = 2;
const SMOOTH_TAU = .25;

const toCssLength = (value: number | string | undefined) => typeof value === "number" ? `${value}px` : value;

/** React Bits LogoLoop, typed for this Next.js portfolio. */
export function LogoLoop({
  logos,
  speed = 120,
  direction = "left",
  width = "100%",
  logoHeight = 28,
  gap = 32,
  pauseOnHover,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  ariaLabel = "Technology stack",
  className = "",
  style,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLUListElement>(null);
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const [sequenceWidth, setSequenceWidth] = useState(0);
  const [sequenceHeight, setSequenceHeight] = useState(0);
  const [copyCount, setCopyCount] = useState(MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const isVertical = direction === "up" || direction === "down";
  const effectiveHoverSpeed = hoverSpeed ?? (pauseOnHover === false ? undefined : 0);
  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed);
    const directionMultiplier = isVertical ? (direction === "up" ? 1 : -1) : (direction === "left" ? 1 : -1);
    return magnitude * directionMultiplier * (speed < 0 ? -1 : 1);
  }, [direction, isVertical, speed]);

  const updateDimensions = useCallback(() => {
    const container = containerRef.current;
    const sequence = sequenceRef.current;
    if (!container || !sequence) return;
    const rect = sequence.getBoundingClientRect();
    if (isVertical) {
      const parentHeight = container.parentElement?.clientHeight ?? 0;
      if (parentHeight > 0) container.style.height = `${Math.ceil(parentHeight)}px`;
      if (rect.height > 0) {
        setSequenceHeight(Math.ceil(rect.height));
        const viewport = container.clientHeight || parentHeight || rect.height;
        setCopyCount(Math.max(MIN_COPIES, Math.ceil(viewport / rect.height) + COPY_HEADROOM));
      }
    } else if (rect.width > 0) {
      setSequenceWidth(Math.ceil(rect.width));
      setCopyCount(Math.max(MIN_COPIES, Math.ceil(container.clientWidth / rect.width) + COPY_HEADROOM));
    }
  }, [isVertical]);

  useEffect(() => {
    updateDimensions();
    const container = containerRef.current;
    const sequence = sequenceRef.current;
    if (!container || !sequence) return;
    if (!window.ResizeObserver) {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }
    const observer = new ResizeObserver(updateDimensions);
    observer.observe(container);
    observer.observe(sequence);
    return () => observer.disconnect();
  }, [updateDimensions, logos, gap, logoHeight]);

  useEffect(() => {
    const track = trackRef.current;
    const sequenceSize = isVertical ? sequenceHeight : sequenceWidth;
    if (!track) return;
    if (sequenceSize > 0) {
      offsetRef.current = ((offsetRef.current % sequenceSize) + sequenceSize) % sequenceSize;
    }

    function animate(timestamp: number) {
      if (lastTimeRef.current === null) lastTimeRef.current = timestamp;
      const deltaTime = Math.max(0, timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;
      const target = isHovered && effectiveHoverSpeed !== undefined ? effectiveHoverSpeed : targetVelocity;
      velocityRef.current += (target - velocityRef.current) * (1 - Math.exp(-deltaTime / SMOOTH_TAU));
      if (sequenceSize > 0) {
        offsetRef.current = (offsetRef.current + velocityRef.current * deltaTime + sequenceSize) % sequenceSize;
        if (track) {
          track.style.transform = isVertical
            ? `translate3d(0, ${-offsetRef.current}px, 0)`
            : `translate3d(${-offsetRef.current}px, 0, 0)`;
        }
      }
      requestRef.current = requestAnimationFrame(animate);
    }
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current !== null) cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
      lastTimeRef.current = null;
    };
  }, [effectiveHoverSpeed, isHovered, isVertical, sequenceHeight, sequenceWidth, targetVelocity]);

  const cssVariables = {
    "--logoloop-gap": `${gap}px`,
    "--logoloop-logoHeight": `${logoHeight}px`,
    ...(fadeOutColor ? { "--logoloop-fadeColor": fadeOutColor } : {}),
    ...style,
  } as CSSProperties;

  const rootClassName = [styles.logoloop, isVertical ? styles.vertical : styles.horizontal, fadeOut ? styles.fade : "", scaleOnHover ? styles.scaleHover : "", className].filter(Boolean).join(" ");
  const containerStyle = { width: isVertical && width === "100%" ? undefined : toCssLength(width), ...cssVariables };

  function renderItem(item: LogoItem, key: string) {
    const isNode = "node" in item;
    const itemLabel = isNode ? item.ariaLabel ?? item.title : item.alt ?? item.title;
    const content = isNode ? <span className={styles.node}>{item.node}</span> : <img src={item.src} alt={item.alt} title={item.title} width={item.width} height={item.height} loading="lazy" decoding="async" draggable={false} />;
    return (
      <li className={styles.item} key={key} role="listitem">
        {item.href ? <a className={styles.link} href={item.href} aria-label={itemLabel} target="_blank" rel="noreferrer noopener">{content}</a> : content}
      </li>
    );
  }

  return (
    <div ref={containerRef} className={rootClassName} style={containerStyle} role="region" aria-label={ariaLabel}>
      <div className={styles.track} ref={trackRef} onMouseEnter={() => effectiveHoverSpeed !== undefined && setIsHovered(true)} onMouseLeave={() => effectiveHoverSpeed !== undefined && setIsHovered(false)}>
        {Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul className={styles.list} key={`copy-${copyIndex}`} role="list" aria-hidden={copyIndex > 0} ref={copyIndex === 0 ? sequenceRef : undefined}>
            {logos.map((item, index) => renderItem(item, `${copyIndex}-${index}`))}
          </ul>
        ))}
      </div>
    </div>
  );
}
