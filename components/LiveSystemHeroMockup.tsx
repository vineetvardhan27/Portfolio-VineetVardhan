"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Lock,
  TrendingUp,
  MessageCircle,
  Check,
} from "lucide-react";
import { useReducedMotion } from "@/lib/reduced-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function LiveSystemHeroMockup() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Workflow State Simulation (0: baseline, 1: direct booking synchronized)
  const [activeCycle, setActiveCycle] = useState<0 | 1>(1);

  // Responsive desktop detection
  useEffect(() => {
    setMounted(true);
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Subtle cyclic update
  useEffect(() => {
    if (shouldReduceMotion) return;

    const interval = setInterval(() => {
      setActiveCycle((prev) => (prev === 0 ? 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  // Pointer-driven interactive 3D tilt (Desktop only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 180 };
  // Base 3D isometric angle: rotateX: 13deg, rotateY: -16deg, rotateZ: 3deg
  const rotateXSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [15.5, 10.5]), springConfig);
  const rotateYSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-19, -13]), springConfig);
  const rotateZSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [3.8, 2.2]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isDesktop || shouldReduceMotion) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const isUpdated = activeCycle === 1;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[500px] lg:max-w-[540px] select-none py-4 sm:py-6"
    >
      {/* ═══════════════════════════════════════════════
          AMBIENT ATMOSPHERE & LIGHTING GLOWS
          Separated from 3D surface to eliminate GPU raster texture downsampling
          ═══════════════════════════════════════════════ */}
      {/* 1. Upper-Left Warm-Gold Ambient Highlight */}
      <div
        className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-gradient-to-br from-[#B9823F]/20 via-[#B9823F]/5 to-transparent blur-3xl pointer-events-none opacity-80 dark:opacity-60 -z-10"
        aria-hidden="true"
      />

      {/* 2. Lower-Right Emerald Ambient Glow */}
      <div
        className="absolute -bottom-10 -right-8 w-72 h-72 rounded-full bg-gradient-to-tl from-[#289E65]/25 via-[#289E65]/8 to-transparent blur-3xl pointer-events-none opacity-85 dark:opacity-75 -z-10"
        aria-hidden="true"
      />

      {/* 3. Upper-Left Floating Plaque (hotel operation & booking software.) */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: EASE_OUT_EXPO }}
        className="hidden sm:inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/95 dark:bg-[#121318] border border-black/[0.08] dark:border-white/[0.1] shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_6px_20px_rgba(0,0,0,0.5)] text-[11px] font-sans font-medium text-text-secondary [outline:1px_solid_transparent] [backface-visibility:hidden] [-webkit-font-smoothing:antialiased]"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <span className="tracking-tight text-text-primary">hotel operation &amp; booking software</span>
        <span className="text-text-muted">· Grove PMS</span>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          3D PERSPECTIVE STAGE
          Uses transform-style: flat to preserve native subpixel font rendering and eliminate pixelation
          ═══════════════════════════════════════════════ */}
      <div
        className="relative"
        style={
          mounted && isDesktop && !shouldReduceMotion
            ? {
                perspective: "1200px",
              }
            : undefined
        }
      >
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: EASE_OUT_EXPO }}
          style={
            mounted && isDesktop && !shouldReduceMotion
              ? {
                  rotateX: rotateXSpring,
                  rotateY: rotateYSpring,
                  rotateZ: rotateZSpring,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }
              : undefined
          }
          className="relative transition-transform duration-200 [backface-visibility:hidden] [-webkit-font-smoothing:antialiased] [-moz-osx-font-smoothing:grayscale] [text-rendering:geometricPrecision]"
        >
          {/* Main Dashboard Chassis — Pure solid-tint gradients without backdrop-blur downsampling */}
          <div className="relative rounded-2xl bg-gradient-to-b from-white via-[#FAF9F6] to-[#F3F0EA] dark:from-[#13141A] dark:via-[#0F1015] dark:to-[#0A0B0E] border border-black/[0.09] dark:border-white/[0.14] shadow-[0_24px_50px_-10px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.95)] dark:shadow-[0_28px_60px_-12px_rgba(0,0,0,0.85),inset_0_1px_1.5px_rgba(255,255,255,0.16)] overflow-hidden font-sans [outline:1px_solid_transparent] [backface-visibility:hidden] [-webkit-font-smoothing:antialiased]">
            
            {/* Top Frame Glass Highlight Glint */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 dark:via-white/30 to-transparent pointer-events-none" />

            {/* 1. TOP BROWSER CHROME */}
            <div className="px-3.5 sm:px-4 py-2.5 border-b border-border/80 dark:border-white/[0.08] bg-surface/40 dark:bg-white/[0.02] flex items-center justify-between text-xs [backface-visibility:hidden]">
              {/* Left: Window Dots & Internal Route */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-black/20 dark:bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-black/20 dark:bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-black/20 dark:bg-white/20" />
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface/80 dark:bg-white/[0.04] border border-border/70 dark:border-white/[0.07] text-[11px] font-sans font-medium text-text-muted">
                  <Lock size={10} className="text-text-muted" />
                  <span className="text-text-primary font-semibold">grovepms.internal</span>
                  <span className="text-text-muted">/live-ops</span>
                </div>
              </div>

              {/* Right: Operational Status Pill */}
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-0.5 rounded-full bg-success/15 border border-success/30 text-[11px] font-sans font-semibold text-success shadow-[0_0_12px_rgba(40,158,101,0.25)]">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-success animate-pulse shrink-0" />
                <span>Operational</span>
                <span className="text-success/70 hidden sm:inline font-normal">· 20 Keys</span>
              </div>
            </div>

            {/* 2. OPERATIONAL WORKSPACE */}
            <div className="p-3.5 sm:p-5 space-y-3.5 sm:space-y-4 [backface-visibility:hidden]">
              
              {/* 3 ELEVATED KPI GLASS CARDS (Emerald, Ice-Blue, Warm-Gold) */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                
                {/* Metric 1: Direct MTD (Emerald Illuminated) */}
                <motion.div
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25, ease: EASE_OUT_EXPO }}
                  className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-b from-success/[0.14] via-success/[0.05] to-surface/30 dark:to-white/[0.01] border border-success/40 dark:border-success/50 shadow-[0_4px_16px_-2px_rgba(40,158,101,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)] dark:shadow-[0_4px_18px_-2px_rgba(40,158,101,0.25),inset_0_1px_1px_rgba(255,255,255,0.15)] relative overflow-hidden [outline:1px_solid_transparent] [backface-visibility:hidden] [-webkit-font-smoothing:antialiased]"
                >
                  <div className="text-[10px] min-[390px]:text-[11px] font-sans font-medium text-text-muted flex items-center justify-between tracking-normal truncate">
                    <span>Direct MTD</span>
                  </div>
                  <div className="mt-1 font-sans text-[13px] min-[390px]:text-[14px] sm:text-[16px] font-bold text-text-primary tracking-tight tabular-nums whitespace-nowrap">
                    {isUpdated ? "₹4,90,500" : "₹4,82,000"}
                  </div>
                  <div className="text-[10px] min-[390px]:text-[11px] font-sans text-success flex items-center gap-0.5 mt-0.5 font-semibold whitespace-nowrap">
                    <TrendingUp size={11} className="shrink-0" /> +38% OTA cut
                  </div>
                </motion.div>

                {/* Metric 2: Occupancy (Ice-Blue Glass) */}
                <motion.div
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.32, ease: EASE_OUT_EXPO }}
                  className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-b from-[#0284c7]/[0.12] via-[#0284c7]/[0.04] to-surface/30 dark:from-[#38bdf8]/[0.12] dark:via-[#38bdf8]/[0.04] dark:to-white/[0.01] border border-[#0284c7]/35 dark:border-[#38bdf8]/45 shadow-[0_4px_16px_-2px_rgba(56,189,248,0.2),inset_0_1px_1px_rgba(255,255,255,0.4)] dark:shadow-[0_4px_18px_-2px_rgba(56,189,248,0.22),inset_0_1px_1px_rgba(255,255,255,0.15)] relative overflow-hidden [outline:1px_solid_transparent] [backface-visibility:hidden] [-webkit-font-smoothing:antialiased]"
                >
                  <div className="text-[10px] min-[390px]:text-[11px] font-sans font-medium text-text-muted tracking-normal truncate">
                    Occupancy
                  </div>
                  <div className="mt-1 font-sans text-[13px] min-[390px]:text-[14px] sm:text-[16px] font-bold text-text-primary tracking-tight tabular-nums whitespace-nowrap">
                    {isUpdated ? "95.0%" : "90.0%"}
                  </div>
                  <div className="text-[10px] min-[390px]:text-[11px] font-sans text-text-muted mt-0.5 whitespace-nowrap">
                    {isUpdated ? "19/20 Rooms" : "18/20 Rooms"}
                  </div>
                </motion.div>

                {/* Metric 3: Arrivals (Warm-Gold Glass) */}
                <motion.div
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.39, ease: EASE_OUT_EXPO }}
                  className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-b from-accent/[0.16] via-accent/[0.05] to-surface/30 dark:to-white/[0.01] border border-accent/40 dark:border-accent/50 shadow-[0_4px_16px_-2px_rgba(185,130,63,0.2),inset_0_1px_1px_rgba(255,255,255,0.4)] dark:shadow-[0_4px_18px_-2px_rgba(185,130,63,0.22),inset_0_1px_1px_rgba(255,255,255,0.15)] relative overflow-hidden [outline:1px_solid_transparent] [backface-visibility:hidden] [-webkit-font-smoothing:antialiased]"
                >
                  <div className="text-[10px] min-[390px]:text-[11px] font-sans font-medium text-text-muted tracking-normal truncate">
                    Arrivals
                  </div>
                  <div className="mt-1 font-sans text-[13px] min-[390px]:text-[14px] sm:text-[16px] font-bold text-text-primary tracking-tight tabular-nums whitespace-nowrap">
                    {isUpdated ? "5 Checked-in" : "4 Checked-in"}
                  </div>
                  <div className="text-[10px] min-[390px]:text-[11px] font-sans text-text-muted mt-0.5 whitespace-nowrap">
                    0 Pending Sync
                  </div>
                </motion.div>

              </div>

              {/* ROOM AVAILABILITY MATRIX TABLE */}
              <div className="rounded-xl border border-border/80 dark:border-white/[0.08] overflow-hidden bg-surface/30 dark:bg-white/[0.015] shadow-xs [backface-visibility:hidden]">
                {/* Table Header */}
                <div className="px-3 sm:px-3.5 py-1.5 sm:py-2 border-b border-border/70 dark:border-white/[0.06] bg-surface/50 dark:bg-white/[0.03] flex items-center justify-between text-[10px] min-[390px]:text-[11px] font-sans font-medium text-text-muted tracking-[0.01em]">
                  <span>Room Availability Matrix</span>
                  <span>Status · Channel</span>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-border/60 dark:divide-white/[0.05] text-xs">
                  
                  {/* Room 204: Active Direct Confirmed */}
                  <div
                    className={`px-3 sm:px-3.5 py-2 sm:py-2.5 flex items-center justify-between transition-colors duration-300 gap-2 ${
                      isUpdated
                        ? "bg-success/[0.08] dark:bg-success/[0.1]"
                        : "bg-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                      <span className="font-sans text-xs font-bold text-text-primary tabular-nums shrink-0">
                        204
                      </span>
                      <span className="text-text-primary text-[11.5px] sm:text-xs font-semibold truncate max-w-[95px] min-[390px]:max-w-[130px] sm:max-w-none">
                        Garden Deluxe
                      </span>
                      <span className="text-[11px] font-sans text-text-muted tabular-nums hidden sm:inline shrink-0 font-medium">
                        ₹8,500
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className={`text-[10px] min-[390px]:text-[11px] font-sans px-2 sm:px-2.5 py-0.5 rounded-full flex items-center gap-1.5 transition-all whitespace-nowrap [outline:1px_solid_transparent] ${
                          isUpdated
                            ? "bg-success/20 text-success border border-success/60 font-semibold shadow-[0_0_12px_rgba(40,158,101,0.4)]"
                            : "bg-surface text-text-muted border border-border font-medium"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            isUpdated ? "bg-success animate-pulse" : "bg-text-muted"
                          }`}
                        />
                        {isUpdated ? "Direct Confirmed" : "Available"}
                      </span>
                    </div>
                  </div>

                  {/* Room 305 */}
                  <div className="px-3 sm:px-3.5 py-2 sm:py-2.5 flex items-center justify-between bg-transparent gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                      <span className="font-sans text-xs font-bold text-text-primary tabular-nums shrink-0">
                        305
                      </span>
                      <span className="text-text-secondary text-[11.5px] sm:text-xs font-medium truncate max-w-[95px] min-[390px]:max-w-[130px] sm:max-w-none">
                        Mountain Suite
                      </span>
                      <span className="text-[11px] font-sans text-text-muted tabular-nums hidden sm:inline shrink-0 font-medium">
                        ₹12,000
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] min-[390px]:text-[11px] font-sans font-medium px-2 sm:px-2.5 py-0.5 rounded-full bg-surface/80 dark:bg-white/[0.03] text-text-muted border border-border/80 dark:border-white/[0.06] flex items-center gap-1.5 whitespace-nowrap [outline:1px_solid_transparent]">
                        <span className="w-1.5 h-1.5 rounded-full bg-text-muted/60 shrink-0" />
                        Available
                      </span>
                    </div>
                  </div>

                  {/* Room 402: Check-in Today (Warm Amber) */}
                  <div className="px-3 sm:px-3.5 py-2 sm:py-2.5 flex items-center justify-between bg-transparent gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                      <span className="font-sans text-xs font-bold text-text-primary tabular-nums shrink-0">
                        402
                      </span>
                      <span className="text-text-secondary text-[11.5px] sm:text-xs font-medium truncate max-w-[95px] min-[390px]:max-w-[130px] sm:max-w-none">
                        Executive Villa
                      </span>
                      <span className="text-[11px] font-sans text-text-muted tabular-nums hidden sm:inline shrink-0 font-medium">
                        ₹18,500
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] min-[390px]:text-[11px] font-sans font-semibold px-2 sm:px-2.5 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/40 shadow-[0_0_10px_rgba(185,130,63,0.25)] flex items-center gap-1.5 whitespace-nowrap [outline:1px_solid_transparent]">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        Check-in Today
                      </span>
                    </div>
                  </div>

                  {/* Room 108: Occupied (Ruby/Red) */}
                  <div className="px-3 sm:px-3.5 py-2 sm:py-2.5 flex items-center justify-between bg-transparent gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                      <span className="font-sans text-xs font-bold text-text-primary tabular-nums shrink-0">
                        108
                      </span>
                      <span className="text-text-secondary text-[11.5px] sm:text-xs font-medium truncate max-w-[95px] min-[390px]:max-w-[130px] sm:max-w-none">
                        Courtyard Room
                      </span>
                      <span className="text-[11px] font-sans text-text-muted tabular-nums hidden sm:inline shrink-0 font-medium">
                        ₹6,200
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] min-[390px]:text-[11px] font-sans font-medium px-2 sm:px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-500 dark:text-rose-400 border border-rose-500/30 flex items-center gap-1.5 whitespace-nowrap [outline:1px_solid_transparent]">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                        Occupied
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* 3. BOTTOM AUDIT TRAIL */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[10px] min-[390px]:text-[10.5px] border-t border-border/70 dark:border-white/[0.06] [backface-visibility:hidden]">
                <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-text-muted truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
                  <span className="truncate">Razorpay Webhook 20ms</span>
                  <span>• Postgres 4ms</span>
                </div>
                <div className="text-text-secondary font-sans font-medium text-[10.5px] sm:text-[11px] flex items-center gap-1 truncate">
                  <Check size={11} className="text-success" />
                  <span>Auto-WhatsApp Sync</span>
                </div>
              </div>

            </div>
          </div>

          {/* ═══════════════════════════════════════════════
              EXTERNAL FLOATING AUTO-WHATSAPP CONFIRMATION CAPSULE
              ═══════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.92, y: shouldReduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.55, ease: EASE_OUT_EXPO }}
            className="absolute -bottom-5 right-2 sm:-bottom-6 sm:-right-4 z-20 flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white dark:bg-[#12141A] border border-success/50 dark:border-success/60 shadow-[0_12px_28px_rgba(0,0,0,0.18),0_0_18px_rgba(40,158,101,0.25)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.8),0_0_22px_rgba(40,158,101,0.3)] [outline:1px_solid_transparent] [backface-visibility:hidden] [-webkit-font-smoothing:antialiased]"
          >
            {/* WhatsApp Green Icon Circle */}
            <div className="w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(37,211,102,0.5)]">
              <MessageCircle size={14} className="fill-white" />
            </div>

            {/* Label & Status */}
            <div className="flex flex-col pr-1">
              <span className="text-[11px] sm:text-[12px] font-sans font-bold text-text-primary tracking-tight leading-tight">
                Auto-WhatsApp Confirmation
              </span>
              <span className="text-[9.5px] sm:text-[10px] text-success font-medium flex items-center gap-1 leading-tight">
                <span className="w-1 h-1 rounded-full bg-success" />
                Delivered in 1.2s · Voucher Sent
              </span>
            </div>

            {/* Subtle Pulse Pip */}
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-ping shrink-0" />
          </motion.div>

          {/* ═══════════════════════════════════════════════
              SUBTLE FIBER OPTIC CONDUIT (SVG CONNECTIONS)
              ═══════════════════════════════════════════════ */}
          <svg
            className="absolute -bottom-7 right-14 sm:-bottom-8 sm:right-20 w-32 h-14 pointer-events-none z-10 overflow-visible"
            viewBox="0 0 128 56"
            fill="none"
            aria-hidden="true"
            style={{ shapeRendering: "geometricPrecision" }}
          >
            <defs>
              <linearGradient id="fiberGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#B9823F" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#289E65" stopOpacity="1" />
                <stop offset="100%" stopColor="#25D366" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Glowing Fiber Stroke */}
            <motion.path
              d="M 12 4 C 20 28, 60 48, 115 46"
              stroke="url(#fiberGlow)"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.9 }}
              transition={{ duration: 1.1, delay: 0.45, ease: EASE_OUT_EXPO }}
            />

            {/* Secondary subtle fiber */}
            <motion.path
              d="M 28 8 C 38 24, 75 42, 110 44"
              stroke="#289E65"
              strokeWidth="1"
              strokeOpacity="0.4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 1.0, delay: 0.6, ease: EASE_OUT_EXPO }}
            />
          </svg>

        </motion.div>
      </div>
    </div>
  );
}
