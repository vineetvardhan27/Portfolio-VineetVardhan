"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * BackgroundEffect
 * 
 * Full-page background layer:
 * 1. Fixed full-viewport 24px dot grid with soft radial edge fade.
 * 2. Cursor-following spotlight glow using --mx and --my CSS variables with RAF throttling.
 * 3. Disabled on touch devices and when prefers-reduced-motion is set; static grid stays.
 * 4. Layer is pointer-events: none, z-index: -1, aria-hidden.
 * 5. All colors defined via CSS variables with 300ms transition on theme change.
 */
export function BackgroundEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Disable mouse listener on touch devices or if prefers-reduced-motion is set
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || isReducedMotion) return;

    let rafId: number | null = null;
    let targetX = -1000;
    let targetY = -1000;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          if (containerRef.current) {
            containerRef.current.style.setProperty("--mx", `${targetX}px`);
            containerRef.current.style.setProperty("--my", `${targetY}px`);
          }
          rafId = null;
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Base background layer with 300ms transition */}
      <div className="absolute inset-0 bg-bg transition-colors duration-300" />

      {/* Clean 32px line grid pattern with soft radial edge fade (no drawings) */}
      <div className="absolute inset-0 bg-line-grid transition-opacity duration-300" />

      {/* Cursor-following spotlight glow */}
      <div
        className={`bg-spotlight absolute inset-0 ${
          mounted ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500`}
      />
    </div>
  );
}

