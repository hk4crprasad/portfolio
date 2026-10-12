"use client";

import { createContext, useContext, useState, useSyncExternalStore, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import TargetCursor from "./react-bits/TargetCursor";

const MotionContext = createContext(false);
const query = "(prefers-reduced-motion: reduce)";
const subscribe = (callback: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const getSnapshot = () => window.matchMedia(query).matches;
const getServerSnapshot = () => true;

export const useMotionEnabled = () => useContext(MotionContext);

export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [paused, setPaused] = useState(false);
  const enabled = !reduced && !paused;

  return (
    <MotionContext.Provider value={enabled}>
      {children}
      {enabled && (
        <TargetCursor
          targetSelector="a[href], button:not(:disabled), [role='button']"
          hideDefaultCursor={false}
          spinDuration={8}
          size={24}
          cornerSize={8}
          thickness={1.5}
          dotSize={0}
          showLabel={false}
          padding={5}
        />
      )}
      {!reduced && (
        <button
          className="motion-toggle"
          type="button"
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          {paused ? "Play motion" : "Pause motion"}
        </button>
      )}
    </MotionContext.Provider>
  );
}
