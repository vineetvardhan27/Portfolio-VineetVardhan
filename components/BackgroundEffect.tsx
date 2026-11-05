"use client";

import React, { useEffect, useState } from "react";

/**
 * BackgroundEffect
 *
 * Engineering Drafting Sheet Background:
 * 1. Graph paper: minor grid every 16px, major grid every 128px via linear-gradient CSS.
 * 2. Corner crop marks and static title-block frame in the bottom-right corner.
 * 3. Annotations: 6 inline SVG drafting callouts (dimension lines with arrowheads,
 *    leader lines, circles, and monospace labels such as "R=120", "Ø 48", "GRID 16").
 *    Each animates with stroke-dashoffset, one at a time, every 4.5 seconds.
 * 4. Colors: Graphite on warm off-white in light mode; pale blue-gray on deep slate in dark mode.
 * 5. Hidden below 768px (mobile) to never overlap content; prefers-reduced-motion compliant.
 */
export function BackgroundEffect() {
  const TOTAL_ANNOTATIONS = 6;
  const [drawnCount, setDrawnCount] = useState<number>(0);

  useEffect(() => {
    // Respect prefers-reduced-motion: instantly draw all annotations with no delay
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) {
      setDrawnCount(TOTAL_ANNOTATIONS);
      return;
    }

    // Step 1: Draw first annotation after brief initial pause
    const initialTimer = setTimeout(() => {
      setDrawnCount(1);
    }, 700);

    // Step 2..6: Sequentially draw one annotation every 4.5 seconds (within 4 to 6s specification)
    const interval = setInterval(() => {
      setDrawnCount((prev) => {
        if (prev >= TOTAL_ANNOTATIONS) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 4500);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Base theme background with 300ms transition */}
      <div className="absolute inset-0 bg-bg transition-colors duration-300" />

      {/* Layer 1: Graph Paper Grid (16px minor / 128px major) */}
      <div className="absolute inset-0 bg-drafting-grid transition-opacity duration-300" />

      {/* Layer 2: Corner Crop Marks (Static, Faint) */}
      <CornerCropMarks />

      {/* Layer 2: Title-Block Frame (Bottom-Right, Static, Faint) */}
      <div className="hidden sm:block absolute bottom-6 right-6 md:bottom-8 md:right-8 opacity-45">
        <TitleBlockFrame />
      </div>

      {/* Layer 3: Annotations (Hidden on mobile <768px, animated stroke-dashoffset) */}
      <div className="hidden md:block absolute inset-0">
        {/* Annotation 1: Radius Dimension Arc ("R=120") */}
        <div className="absolute top-28 left-6 lg:left-10 xl:left-14">
          <AnnotationRadius isDrawn={drawnCount >= 1} />
        </div>

        {/* Annotation 2: Diameter Dimension with Leader Line ("Ø 48") */}
        <div className="absolute top-36 right-6 lg:right-10 xl:right-14">
          <AnnotationDiameter isDrawn={drawnCount >= 2} />
        </div>

        {/* Annotation 3: Grid Dimension Witness Lines ("GRID 16") */}
        <div className="absolute top-[48%] left-6 lg:left-10 xl:left-14">
          <AnnotationGridSpacing isDrawn={drawnCount >= 3} />
        </div>

        {/* Annotation 4: Chamfer & Angle Notation ("45° × 1.5") */}
        <div className="absolute top-[54%] right-6 lg:right-10 xl:right-14">
          <AnnotationChamfer isDrawn={drawnCount >= 4} />
        </div>

        {/* Annotation 5: Datum Reference & Origin ("DATUM -A-") */}
        <div className="absolute bottom-28 left-6 lg:left-10 xl:left-14">
          <AnnotationDatum isDrawn={drawnCount >= 5} />
        </div>

        {/* Annotation 6: Tolerance & Pitch Circle Note ("TOL ±0.05") */}
        <div className="absolute bottom-32 right-6 lg:right-10 xl:right-14">
          <AnnotationTolerance isDrawn={drawnCount >= 6} />
        </div>
      </div>
    </div>
  );
}

/**
 * Layer 2: Static Corner Crop Marks
 */
function CornerCropMarks() {
  return (
    <svg className="absolute inset-0 w-full h-full drafting-static-frame opacity-40">
      {/* Top Left */}
      <line x1="12" y1="24" x2="36" y2="24" strokeWidth="1" />
      <line x1="24" y1="12" x2="24" y2="36" strokeWidth="1" />
      <circle cx="24" cy="24" r="1.5" fill="currentColor" />

      {/* Top Right */}
      <line x1="calc(100% - 36px)" y1="24" x2="calc(100% - 12px)" y2="24" strokeWidth="1" />
      <line x1="calc(100% - 24px)" y1="12" x2="calc(100% - 24px)" y2="36" strokeWidth="1" />
      <circle cx="calc(100% - 24px)" cy="24" r="1.5" fill="currentColor" />

      {/* Bottom Left */}
      <line x1="12" y1="calc(100% - 24px)" x2="36" y2="calc(100% - 24px)" strokeWidth="1" />
      <line x1="24" y1="calc(100% - 36px)" x2="24" y2="calc(100% - 12px)" strokeWidth="1" />
      <circle cx="24" cy="calc(100% - 24px)" r="1.5" fill="currentColor" />

      {/* Bottom Right */}
      <line x1="calc(100% - 36px)" y1="calc(100% - 24px)" x2="calc(100% - 12px)" y2="calc(100% - 24px)" strokeWidth="1" />
      <line x1="calc(100% - 24px)" y1="calc(100% - 36px)" x2="calc(100% - 24px)" y2="calc(100% - 12px)" strokeWidth="1" />
      <circle cx="calc(100% - 24px)" cy="calc(100% - 24px)" r="1.5" fill="currentColor" />
    </svg>
  );
}

/**
 * Layer 2: Static Title-Block Frame (Bottom-Right Corner)
 */
function TitleBlockFrame() {
  return (
    <svg
      width="230"
      height="68"
      viewBox="0 0 230 68"
      className="drafting-static-frame"
    >
      {/* Outer frame */}
      <rect
        x="0.5"
        y="0.5"
        width="229"
        height="67"
        fill="none"
        strokeWidth="1"
      />
      {/* Horizontal divider */}
      <line x1="0" y1="28" x2="230" y2="28" strokeWidth="1" />
      {/* Vertical dividers */}
      <line x1="76" y1="28" x2="76" y2="68" strokeWidth="1" />
      <line x1="152" y1="28" x2="152" y2="68" strokeWidth="1" />

      {/* Top Header */}
      <text
        x="10"
        y="14"
        fill="currentColor"
        fontSize="7.5"
        fontFamily="var(--font-mono)"
        letterSpacing="0.08em"
      >
        DWG: PORTFOLIO ARCHITECTURE
      </text>
      <text
        x="10"
        y="23"
        fill="currentColor"
        fontSize="8.5"
        fontWeight="600"
        fontFamily="var(--font-mono)"
        letterSpacing="0.06em"
      >
        VINEET VARDHAN DEV
      </text>

      {/* Cell 1: Scale */}
      <text
        x="10"
        y="39"
        fill="currentColor"
        fontSize="6.5"
        opacity="0.75"
        fontFamily="var(--font-mono)"
        letterSpacing="0.06em"
      >
        SCALE
      </text>
      <text
        x="10"
        y="54"
        fill="currentColor"
        fontSize="9"
        fontWeight="600"
        fontFamily="var(--font-mono)"
      >
        1:1
      </text>

      {/* Cell 2: Revision */}
      <text
        x="86"
        y="39"
        fill="currentColor"
        fontSize="6.5"
        opacity="0.75"
        fontFamily="var(--font-mono)"
        letterSpacing="0.06em"
      >
        REV
      </text>
      <text
        x="86"
        y="54"
        fill="currentColor"
        fontSize="9"
        fontWeight="600"
        fontFamily="var(--font-mono)"
      >
        04.2
      </text>

      {/* Cell 3: Sheet */}
      <text
        x="162"
        y="39"
        fill="currentColor"
        fontSize="6.5"
        opacity="0.75"
        fontFamily="var(--font-mono)"
        letterSpacing="0.06em"
      >
        SHEET
      </text>
      <text
        x="162"
        y="54"
        fill="currentColor"
        fontSize="9"
        fontWeight="600"
        fontFamily="var(--font-mono)"
      >
        1 / 1
      </text>
    </svg>
  );
}

/**
 * Annotation 1: Radius Dimension Arc ("R=120")
 */
function AnnotationRadius({ isDrawn }: { isDrawn: boolean }) {
  const offset = isDrawn ? 0 : 100;
  return (
    <svg width="190" height="135" viewBox="0 0 190 135" className="overflow-visible">
      {/* Quarter radius arc (R=100) */}
      <path
        d="M 15 20 A 100 100 0 0 1 115 120"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: offset }}
        className="drafting-stroke"
      />
      {/* Center crosshair */}
      <path
        d="M 8 120 L 22 120 M 15 113 L 15 127"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: offset }}
        className="drafting-stroke"
      />
      {/* Radial dimension line from center to arc */}
      <path
        d="M 15 120 L 85.7 49.3"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: offset }}
        className="drafting-stroke"
      />
      {/* Arrowhead at arc edge */}
      <path
        d="M 78 52 L 85.7 49.3 L 83 57"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: offset }}
        className="drafting-stroke"
      />
      {/* Leader shelf */}
      <path
        d="M 85.7 49.3 L 130 49.3"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: offset }}
        className="drafting-stroke"
      />
      {/* Monospace label */}
      <text
        x="135"
        y="52.5"
        style={{ opacity: isDrawn ? 1 : 0 }}
        className="drafting-label"
        dominantBaseline="middle"
      >
        R=120
      </text>
    </svg>
  );
}

/**
 * Annotation 2: Diameter Circle with Leader Line ("Ø 48")
 */
function AnnotationDiameter({ isDrawn }: { isDrawn: boolean }) {
  const offset = isDrawn ? 0 : 100;
  return (
    <svg width="165" height="75" viewBox="0 0 165 75" className="overflow-visible">
      {/* Circle of diameter 44 (R=22) */}
      <circle
        cx="36"
        cy="36"
        r="22"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: offset }}
        className="drafting-stroke"
      />
      {/* Center crosshairs */}
      <path
        d="M 8 36 L 64 36 M 36 8 L 36 64"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: offset }}
        className="drafting-stroke"
      />
      {/* 45° dimension cut line with arrowheads */}
      <path
        d="M 20.4 51.6 L 51.6 20.4"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: offset }}
        className="drafting-stroke"
      />
      {/* Arrowhead 1 */}
      <path
        d="M 25 49 L 20.4 51.6 L 23 47"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: offset }}
        className="drafting-stroke"
      />
      {/* Arrowhead 2 */}
      <path
        d="M 47 23 L 51.6 20.4 L 49 25"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: offset }}
        className="drafting-stroke"
      />
      {/* Leader line to shelf */}
      <path
        d="M 51.6 20.4 L 72 13 L 112 13"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: offset }}
        className="drafting-stroke"
      />
      {/* Monospace label */}
      <text
        x="117"
        y="16"
        style={{ opacity: isDrawn ? 1 : 0 }}
        className="drafting-label"
        dominantBaseline="middle"
      >
        Ø 48
      </text>
    </svg>
  );
}

/**
 * Annotation 3: Grid Witness Lines & Spacing ("GRID 16")
 */
function AnnotationGridSpacing({ isDrawn }: { isDrawn: boolean }) {
  const offset = isDrawn ? 0 : 100;
  return (
    <svg width="170" height="70" viewBox="0 0 170 70" className="overflow-visible">
      {/* Witness lines spaced 64px apart (4 x 16px) */}
      <path
        d="M 15 10 L 15 55 M 79 10 L 79 55"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: offset }}
        className="drafting-stroke"
      />
      {/* Intermediate 16px sub-ticks */}
      <path
        d="M 31 30 L 31 38 M 47 30 L 47 38 M 63 30 L 63 38"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: offset }}
        className="drafting-stroke"
      />
      {/* Dimension line with inward arrowheads */}
      <path
        d="M 15 34 L 79 34"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: offset }}
        className="drafting-stroke"
      />
      <path
        d="M 21 31 L 15 34 L 21 37"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: offset }}
        className="drafting-stroke"
      />
      <path
        d="M 73 31 L 79 34 L 73 37"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: offset }}
        className="drafting-stroke"
      />
      {/* Leader line */}
      <path
        d="M 79 34 L 95 20 L 115 20"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: offset }}
        className="drafting-stroke"
      />
      {/* Monospace label */}
      <text
        x="120"
        y="23"
        style={{ opacity: isDrawn ? 1 : 0 }}
        className="drafting-label"
        dominantBaseline="middle"
      >
        GRID 16
      </text>
    </svg>
  );
}

/**
 * Annotation 4: Chamfer & Angle Notation ("45° × 1.5")
 */
function AnnotationChamfer({ isDrawn }: { isDrawn: boolean }) {
  const offset = isDrawn ? 0 : 100;
  return (
    <svg width="165" height="70" viewBox="0 0 165 70" className="overflow-visible">
      {/* Corner lines with 45° chamfer */}
      <path
        d="M 12 15 L 35 15 M 35 15 L 55 35 M 55 35 L 55 58"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: offset }}
        className="drafting-stroke"
      />
      {/* Leader pointing to chamfer face */}
      <path
        d="M 45 25 L 75 14 L 110 14"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: offset }}
        className="drafting-stroke"
      />
      {/* Arrowhead */}
      <path
        d="M 51 21 L 45 25 L 49 27"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: offset }}
        className="drafting-stroke"
      />
      {/* Monospace label */}
      <text
        x="115"
        y="17"
        style={{ opacity: isDrawn ? 1 : 0 }}
        className="drafting-label"
        dominantBaseline="middle"
      >
        45° × 1.5
      </text>
    </svg>
  );
}

/**
 * Annotation 5: Datum Reference & Origin ("DATUM -A-")
 */
function AnnotationDatum({ isDrawn }: { isDrawn: boolean }) {
  const offset = isDrawn ? 0 : 100;
  return (
    <svg width="170" height="75" viewBox="0 0 170 75" className="overflow-visible">
      {/* Reference baseline */}
      <path
        d="M 10 52 L 105 52"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: offset }}
        className="drafting-stroke"
      />
      {/* Datum triangle resting on baseline */}
      <path
        d="M 35 52 L 45 36 L 55 52 Z"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: offset }}
        className="drafting-stroke"
      />
      {/* Stem rising to box */}
      <path
        d="M 45 36 L 45 24"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: offset }}
        className="drafting-stroke"
      />
      {/* Datum box */}
      <path
        d="M 45 12 L 85 12 L 85 28 L 45 28 Z"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: offset }}
        className="drafting-stroke"
      />
      {/* Datum letter */}
      <text
        x="65"
        y="21.5"
        style={{ opacity: isDrawn ? 1 : 0 }}
        className="drafting-label font-bold tracking-widest"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        -A-
      </text>
      {/* Reference coordinate note */}
      <text
        x="12"
        y="65"
        style={{ opacity: isDrawn ? 1 : 0 }}
        className="drafting-label text-[8.5px] tracking-wider"
        dominantBaseline="middle"
      >
        REF X:0.0 Y:0.0
      </text>
    </svg>
  );
}

/**
 * Annotation 6: Tolerance & Pitch Circle Note ("TOL ±0.05")
 */
function AnnotationTolerance({ isDrawn }: { isDrawn: boolean }) {
  const offset = isDrawn ? 0 : 100;
  return (
    <svg width="165" height="75" viewBox="0 0 165 75" className="overflow-visible">
      {/* Concentric dashed reference arc */}
      <path
        d="M 15 15 A 55 55 0 0 1 70 70"
        pathLength={100}
        strokeDasharray="4 3"
        style={{ strokeDashoffset: offset }}
        className="drafting-stroke"
      />
      {/* Radial leader line to arc */}
      <path
        d="M 54 54 L 78 38 L 115 38"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: offset }}
        className="drafting-stroke"
      />
      {/* Arrowhead */}
      <path
        d="M 49 56 L 54 54 L 52 49"
        pathLength={100}
        style={{ strokeDasharray: 100, strokeDashoffset: offset }}
        className="drafting-stroke"
      />
      {/* Monospace label */}
      <text
        x="120"
        y="41"
        style={{ opacity: isDrawn ? 1 : 0 }}
        className="drafting-label"
        dominantBaseline="middle"
      >
        TOL ±0.05
      </text>
    </svg>
  );
}
