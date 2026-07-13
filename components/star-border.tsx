"use client";

import { CSSProperties, ElementType, ReactNode } from "react";
import styles from "./star-border.module.css";

type StarBorderProps = {
  as?: ElementType;
  className?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  children: ReactNode;
  style?: CSSProperties;
  [key: string]: unknown;
};

/** A small, accessible adaptation of the React Bits StarBorder component. */
export function StarBorder({
  as,
  className = "",
  color = "white",
  speed = "6s",
  thickness = 1,
  children,
  style,
  ...rest
}: StarBorderProps) {
  const Component: any = as ?? "button";
  const animatedStyle: CSSProperties = {
    padding: `${thickness}px 0`,
    ...style,
  };

  return (
    <Component className={`${styles.starBorderContainer} ${className}`} style={animatedStyle} {...rest}>
      <span
        aria-hidden="true"
        className={styles.borderGradientBottom}
        style={{ background: `radial-gradient(circle, ${color}, transparent 10%)`, animationDuration: speed }}
      />
      <span
        aria-hidden="true"
        className={styles.borderGradientTop}
        style={{ background: `radial-gradient(circle, ${color}, transparent 10%)`, animationDuration: speed }}
      />
      <span className={styles.innerContent}>{children}</span>
    </Component>
  );
}
