"use client";

import { CSSProperties, FormEvent, ReactNode, useEffect, useId, useMemo, useRef, useState } from "react";
import styles from "./curved-input.module.css";

type CurvedInputProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  buttonText?: string;
  type?: string;
  name?: string;
  ariaLabel?: string;
  theme?: "light" | "dark";
  width?: number | string;
  bend?: number;
  height?: number;
  cornerRadius?: number;
  borderWidth?: number;
  fontSize?: number;
  backgroundColor?: string;
  textColor?: string;
  placeholderColor?: string;
  borderColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
  iconColor?: string;
  shadowSize?: "none" | "sm" | "md" | "lg";
  shadowColor?: string;
  showButton?: boolean;
  showIcon?: boolean;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

const palette = {
  dark: {
    background: "#10172d", text: "#f5f5ef", placeholder: "#aeb6ca", border: "#344263", button: "#c7f46d", buttonText: "#10172d", shadow: "#10172d",
  },
  light: {
    background: "#ffffff", text: "#10172d", placeholder: "#727d99", border: "#293454", button: "#4b5f9d", buttonText: "#ffffff", shadow: "#10172d",
  },
};

const shadowMap = {
  none: "none",
  sm: "drop-shadow(0 8px 18px rgba(16, 23, 45, .12))",
  md: "drop-shadow(0 15px 30px rgba(16, 23, 45, .16))",
  lg: "drop-shadow(0 22px 45px rgba(16, 23, 45, .2))",
};

/**
 * A compact SVG implementation of React Bits' CurvedInput. It keeps a
 * semantic native input for typing while using an arc-shaped SVG surface for
 * the visible control.
 */
export default function CurvedInput({
  value,
  defaultValue = "",
  onChange,
  onSubmit,
  placeholder = "Enter your email",
  buttonText = "Get started",
  type = "email",
  name,
  ariaLabel,
  theme = "dark",
  width = 450,
  bend = 28,
  height = 64,
  cornerRadius = 18,
  borderWidth = 1.5,
  fontSize = 16,
  backgroundColor,
  textColor,
  placeholderColor,
  borderColor,
  buttonColor,
  buttonTextColor,
  iconColor,
  shadowSize = "md",
  shadowColor,
  showButton = true,
  showIcon = true,
  icon,
  className = "",
  style,
}: CurvedInputProps) {
  const uid = useId().replace(/:/g, "");
  const pathId = `curved-input-text-${uid}`;
  const rootRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [measuredWidth, setMeasuredWidth] = useState(0);
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;
  const colors = palette[theme];
  const background = backgroundColor ?? colors.background;
  const text = textColor ?? colors.text;
  const placeholderText = placeholderColor ?? colors.placeholder;
  const border = borderColor ?? colors.border;
  const button = buttonColor ?? colors.button;
  const buttonLabelColor = buttonTextColor ?? colors.buttonText;
  const isPassword = type === "password";
  const displayValue = isPassword ? "•".repeat(currentValue.length) : currentValue;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new ResizeObserver(([entry]) => setMeasuredWidth(Math.round(entry.contentRect.width)));
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const geometry = useMemo(() => {
    const svgWidth = measuredWidth || (typeof width === "number" ? width : 450);
    const padding = Math.ceil(borderWidth) + 7;
    const arch = Math.max(-svgWidth * .2, Math.min(bend, svgWidth * .2));
    const archHeight = Math.abs(arch);
    const svgHeight = height + archHeight + padding * 2;
    const centerY = padding + archHeight + height / 2;
    const startY = centerY;
    const controlY = centerY - arch;
    const endY = centerY;
    const topStart = startY - height / 2;
    const topControl = controlY - height / 2;
    const topEnd = endY - height / 2;
    const bottomStart = startY + height / 2;
    const bottomControl = controlY + height / 2;
    const bottomEnd = endY + height / 2;
    const inset = Math.max(5, borderWidth + 4);
    const textStart = showIcon ? 66 : 25;
    const preferredButtonWidth = Math.max(height * 1.35, buttonText.length * fontSize * .66 + fontSize * 2);
    // Keep a usable text area when the component is placed in a narrow column.
    const buttonWidth = showButton ? Math.min(preferredButtonWidth, Math.max(height, svgWidth - textStart - 42)) : 0;
    const buttonLeft = svgWidth - inset - buttonWidth;
    const textEnd = showButton ? buttonLeft - 16 : svgWidth - 24;
    const buttonT = Math.max(0, Math.min(1, buttonLeft / svgWidth));
    const pointOnCurve = (start: number, control: number, end: number) =>
      (1 - buttonT) ** 2 * start + 2 * (1 - buttonT) * buttonT * control + buttonT ** 2 * end;
    const controlOnRemainingCurve = (control: number, end: number) =>
      (1 - buttonT) * control + buttonT * end;
    const buttonControlX = svgWidth / 2 + (svgWidth / 2) * buttonT;
    const buttonTopStart = pointOnCurve(topStart, topControl, topEnd) + inset;
    const buttonTopControl = controlOnRemainingCurve(topControl, topEnd) + inset;
    const buttonTopEnd = topEnd + inset;
    const buttonBottomStart = pointOnCurve(bottomStart, bottomControl, bottomEnd) - inset;
    const buttonBottomControl = controlOnRemainingCurve(bottomControl, bottomEnd) - inset;
    const buttonBottomEnd = bottomEnd - inset;
    return {
      svgWidth, svgHeight, centerY, startY, controlY, endY, topStart, topControl, topEnd, bottomStart, bottomControl,
      bottomEnd, inset, buttonWidth, buttonLeft, textStart, textEnd, buttonControlX, buttonTopStart,
      buttonTopControl, buttonTopEnd, buttonBottomStart, buttonBottomControl, buttonBottomEnd,
    };
  }, [bend, borderWidth, buttonText.length, fontSize, height, measuredWidth, showButton, showIcon, width]);

  const outlinePath = `M ${cornerRadius} ${geometry.topStart} Q 0 ${geometry.topStart} 0 ${geometry.topStart + cornerRadius} Q ${geometry.svgWidth / 2} ${geometry.topControl} ${geometry.svgWidth - cornerRadius} ${geometry.topEnd} Q ${geometry.svgWidth} ${geometry.topEnd} ${geometry.svgWidth} ${geometry.topEnd + cornerRadius} L ${geometry.svgWidth} ${geometry.bottomEnd - cornerRadius} Q ${geometry.svgWidth} ${geometry.bottomEnd} ${geometry.svgWidth - cornerRadius} ${geometry.bottomEnd} Q ${geometry.svgWidth / 2} ${geometry.bottomControl} ${cornerRadius} ${geometry.bottomStart} Q 0 ${geometry.bottomStart} 0 ${geometry.bottomStart - cornerRadius} L 0 ${geometry.topStart + cornerRadius} Q 0 ${geometry.topStart} ${cornerRadius} ${geometry.topStart} Z`;
  const textPath = `M ${geometry.textStart} ${geometry.centerY - fontSize * .31} Q ${(geometry.textStart + geometry.textEnd) / 2} ${geometry.controlY - fontSize * .31} ${geometry.textEnd} ${geometry.centerY - fontSize * .31}`;
  // This follows the same arc as the input band. The previous straight-line
  // construction formed a large diagonal wedge at compact widths.
  const buttonPath = `M ${geometry.buttonLeft} ${geometry.buttonTopStart} Q ${geometry.buttonControlX} ${geometry.buttonTopControl} ${geometry.svgWidth - geometry.inset} ${geometry.buttonTopEnd} L ${geometry.svgWidth - geometry.inset} ${geometry.buttonBottomEnd} Q ${geometry.buttonControlX} ${geometry.buttonBottomControl} ${geometry.buttonLeft} ${geometry.buttonBottomStart} Z`;

  function submit() {
    onSubmit?.(currentValue.trim());
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submit();
  }

  function commit(nextValue: string) {
    if (value === undefined) setInternalValue(nextValue);
    onChange?.(nextValue);
  }

  function focusInput() {
    inputRef.current?.focus();
  }

  const rootStyle = {
    width: typeof width === "number" ? `${width}px` : width,
    "--curved-shadow": shadowColor ? `drop-shadow(0 15px 30px ${shadowColor})` : shadowMap[shadowSize],
    ...style,
  } as CSSProperties;

  return (
    <form ref={rootRef} className={`${styles.curvedInput} ${focused ? styles.focused : ""} ${className}`} style={rootStyle} onSubmit={handleSubmit} noValidate>
      <svg className={styles.svg} viewBox={`0 0 ${geometry.svgWidth} ${geometry.svgHeight}`} onClick={focusInput} aria-hidden="true">
        <defs><path id={pathId} d={textPath} /></defs>
        <path className={styles.focusRing} d={outlinePath} fill="none" stroke={button} strokeWidth={borderWidth + 6} />
        <path d={outlinePath} fill={background} stroke={border} strokeWidth={borderWidth} />
        {showIcon && (
          <g transform={`translate(39 ${geometry.centerY - (geometry.controlY - geometry.centerY) * .02})`}>
            {icon ?? <>
              <rect x="-17" y="-13" width="34" height="26" rx="8" fill={iconColor ?? button} />
              <path d="M -10 -6 L 0 2 L 10 -6 M -10 -6 L -10 7 L 10 7 L 10 -6" fill="none" stroke="#fff" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
            </>}
          </g>
        )}
        <text className={styles.text} fill={displayValue ? text : placeholderText} style={{ fontSize }}><textPath href={`#${pathId}`}>{displayValue || placeholder}</textPath></text>
        {showButton && (
          <g className={styles.button} role="button" tabIndex={0} aria-label={buttonText} onClick={(event) => { event.stopPropagation(); submit(); }} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); submit(); } }}>
            <path d={buttonPath} fill={button} stroke={button} strokeWidth="8" strokeLinejoin="round" />
            <text x={geometry.buttonLeft + geometry.buttonWidth / 2} y={geometry.centerY + fontSize * .32} textAnchor="middle" fill={buttonLabelColor} style={{ fontSize: Math.min(fontSize, 14), fontWeight: 700 }}>{buttonText}</text>
          </g>
        )}
      </svg>
      <input
        ref={inputRef}
        className={styles.field}
        type={type}
        name={name}
        value={currentValue}
        onChange={(event) => commit(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label={ariaLabel ?? placeholder}
        autoComplete="email"
      />
    </form>
  );
}
