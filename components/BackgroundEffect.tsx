"use client";

import React from "react";

/**
 * BackgroundEffect
 *
 * Engineering Graph Paper Grid Pattern:
 * - Dual-level graph paper grid: minor grid every 16px, major grid every 128px.
 * - Works in both light mode (graphite lines on warm off-white) and dark mode (pale blue-gray lines on deep slate).
 * - Zero small drawings or annotations.
 * - Zero cursor spotlight / glow effect.
 * - Fixed full viewport, z-index -1, pointer-events: none, aria-hidden.
 */
export function BackgroundEffect() {
  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Base background layer with 300ms theme transition */}
      <div className="absolute inset-0 bg-bg transition-colors duration-300" />

      {/* Engineering graph paper grid: 16px minor / 128px major */}
      <div className="absolute inset-0 bg-drafting-grid transition-opacity duration-300" />
    </div>
  );
}
