"use client";

import React from "react";
import { useReducedMotion } from "@/lib/reduced-motion";

export function FlowingDataLines() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return null;
  }

  // Pre-configured organic bezier curves with varying vertical heights, curves, and opacities
  const paths = [
    {
      id: "p1",
      d: "M -200,20 C 250,5 600,45 1050,15 C 1450,-10 1750,35 2200,20",
      stroke: "rgba(59, 130, 246, 0.28)", // Blue
      glow: true,
      pulseDur: "9s",
      pulseDelay: "0s",
    },
    {
      id: "p2",
      d: "M -200,45 C 300,70 700,25 1100,55 C 1500,80 1850,30 2200,45",
      stroke: "rgba(99, 102, 241, 0.22)", // Indigo
      glow: false,
      pulseDur: "12s",
      pulseDelay: "3s",
    },
    {
      id: "p3",
      d: "M -200,10 C 200,35 550,5 950,28 C 1350,50 1700,15 2200,10",
      stroke: "rgba(148, 163, 184, 0.18)", // Slate
      glow: false,
      pulseDur: "14s",
      pulseDelay: "5s",
    },
    {
      id: "p4",
      d: "M -200,65 C 350,30 750,75 1200,40 C 1600,10 1900,60 2200,65",
      stroke: "rgba(16, 185, 129, 0.20)", // Emerald
      glow: true,
      pulseDur: "10s",
      pulseDelay: "1.5s",
    },
    {
      id: "p5",
      d: "M -200,30 C 150,55 650,15 1050,48 C 1450,75 1800,25 2200,30",
      stroke: "rgba(59, 130, 246, 0.18)", // Blue
      glow: true,
      pulseDur: "11s",
      pulseDelay: "4s",
    },
    {
      id: "p6",
      d: "M -200,55 C 400,15 800,65 1250,30 C 1650,60 1950,20 2200,55",
      stroke: "rgba(99, 102, 241, 0.16)", // Indigo
      glow: false,
      pulseDur: "13s",
      pulseDelay: "6s",
    },
    {
      id: "p7",
      d: "M -200,75 C 280,45 680,85 1150,50 C 1550,20 1850,70 2200,75",
      stroke: "rgba(148, 163, 184, 0.14)", // Slate
      glow: false,
      pulseDur: "15s",
      pulseDelay: "2s",
    },
    {
      id: "p8",
      d: "M -200,38 C 220,10 620,55 1020,25 C 1420,60 1780,18 2200,38",
      stroke: "rgba(59, 130, 246, 0.22)", // Blue
      glow: true,
      pulseDur: "8.5s",
      pulseDelay: "7s",
    },
    {
      id: "p9",
      d: "M -200,60 C 320,80 720,35 1180,68 C 1580,95 1900,45 2200,60",
      stroke: "rgba(16, 185, 129, 0.15)", // Emerald
      glow: false,
      pulseDur: "11.5s",
      pulseDelay: "4.5s",
    },
    {
      id: "p10",
      d: "M -200,22 C 180,45 580,12 980,38 C 1380,65 1740,28 2200,22",
      stroke: "rgba(99, 102, 241, 0.18)", // Indigo
      glow: true,
      pulseDur: "10.5s",
      pulseDelay: "8s",
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10">
      <svg
        className="w-full h-full min-w-[1200px] opacity-70 dark:opacity-85"
        viewBox="0 0 2000 85"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Subtle glow filter for data packets */}
          <filter id="data-pulse-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Fade mask for left and right edges */}
          <linearGradient id="lines-fade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="12%" stopColor="#fff" stopOpacity="1" />
            <stop offset="88%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>

          <mask id="flowing-mask">
            <rect width="2000" height="85" fill="url(#lines-fade)" />
          </mask>
        </defs>

        <g mask="url(#flowing-mask)">
          {paths.map((p) => (
            <g key={p.id}>
              {/* The Static/Flowing Base Curve */}
              <path
                id={p.id}
                d={p.d}
                stroke={p.stroke}
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
              />

              {/* Data Flow Pulse Traveling on Selected Paths */}
              {p.glow && (
                <circle r="2.2" className="fill-blue-400 dark:fill-blue-300" filter="url(#data-pulse-glow)">
                  <animateMotion
                    dur={p.pulseDur}
                    begin={p.pulseDelay}
                    repeatCount="indefinite"
                    rotate="auto"
                  >
                    <mpath href={`#${p.id}`} />
                  </animateMotion>
                </circle>
              )}
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
