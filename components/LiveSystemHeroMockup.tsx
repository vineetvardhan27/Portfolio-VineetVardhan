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

  // Cyclic update between baseline and updated states
  useEffect(() => {
    if (shouldReduceMotion) return;

    const interval = setInterval(() => {
      setActiveCycle((prev) => (prev === 0 ? 1 : 0));
    }, 6000);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  // Pointer-driven interactive 3D tilt (Desktop only)
  // Subtle angles (X: ~5deg, Y: ~ -7deg, Z: ~1.2deg) with 2000px perspective
  // preserve 1:1 pixel grid alignment so typography remains razor-sharp
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 140 };
  const rotateXSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [6.5, 3.5]), springConfig);
  const rotateYSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8.5, -5.5]), springConfig);
  const rotateZSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [1.6, 0.8]), springConfig);

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
          Subtle, restrained back-layer gradients
          ═══════════════════════════════════════════════ */}
      {/* 1. Upper-Left Warm-Gold Ambient Highlight */}
      <div
        className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-gradient-to-br from-[#B9823F]/15 via-[#B9823F]/5 to-transparent blur-3xl pointer-events-none opacity-70 dark:opacity-40 -z-10"
        aria-hidden="true"
      />

      {/* 2. Lower-Right Emerald Ambient Glow */}
      <div
        className="absolute -bottom-10 -right-8 w-72 h-72 rounded-full bg-gradient-to-tl from-[#289E65]/20 via-[#289E65]/5 to-transparent blur-3xl pointer-events-none opacity-75 dark:opacity-50 -z-10"
        aria-hidden="true"
      />

      {/* 3. Upper-Left Floating Plaque (hotel operation & booking software) */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: EASE_OUT_EXPO }}
        className="hidden sm:inline-flex items-center gap-2 mb-3.5 px-3 py-1 rounded-full bg-white/95 dark:bg-[#121318] border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_10px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)] text-[11.5px] font-sans font-medium text-text-secondary"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent dark:bg-[#E5A93C]" />
        <span className="tracking-tight text-text-primary dark:text-[#F4F4F6]">hotel operation &amp; booking software</span>
        <span className="text-text-muted dark:text-[#A0A3AC]">· Grove PMS</span>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          3D PERSPECTIVE STAGE
          Higher perspective focal length (2000px) and restrained rotation angles
          eliminate trapezoidal texture downsampling, ensuring subpixel font crispness
          ═══════════════════════════════════════════════ */}
      <div
        className="relative"
        style={
          mounted && isDesktop && !shouldReduceMotion
            ? {
                perspective: "2000px",
                perspectiveOrigin: "center center",
              }
            : undefined
        }
      >
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT_EXPO }}
          style={
            mounted && isDesktop && !shouldReduceMotion
              ? {
                  rotateX: rotateXSpring,
                  rotateY: rotateYSpring,
                  rotateZ: rotateZSpring,
                  transformStyle: "preserve-3d",
                }
              : undefined
          }
          className="relative [backface-visibility:hidden] [-webkit-font-smoothing:antialiased] [-moz-osx-font-smoothing:grayscale] [text-rendering:optimizeLegibility]"
        >
          {/* Main Dashboard Chassis — Clean border and solid-tint gradients */}
          <div className="relative rounded-2xl bg-gradient-to-b from-white via-[#FAF9F6] to-[#F3F0EA] dark:from-[#13141A] dark:via-[#0F1015] dark:to-[#0A0B0E] border border-black/[0.09] dark:border-white/[0.12] shadow-[0_20px_45px_-12px_rgba(0,0,0,0.14),0_1px_2px_rgba(0,0,0,0.04)] dark:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.05)] overflow-hidden font-sans">
            
            {/* Top Frame Glass Highlight Glint */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 dark:via-white/20 to-transparent pointer-events-none" />

            {/* 1. TOP BROWSER CHROME */}
            <div className="px-3.5 sm:px-4 py-2.5 border-b border-border/80 dark:border-white/[0.07] bg-surface/40 dark:bg-white/[0.02] flex items-center justify-between text-xs">
              {/* Left: Window Dots & Internal Route */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-black/20 dark:bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-black/20 dark:bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-black/20 dark:bg-white/20" />
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface/90 dark:bg-white/[0.04] border border-border/80 dark:border-white/[0.08] text-[11px] font-sans font-medium text-text-muted dark:text-[#A0A3AC]">
                  <Lock size={10} className="text-text-muted dark:text-[#A0A3AC]" />
                  <span className="text-text-primary dark:text-[#F4F4F6] font-semibold">grovepms.internal</span>
                  <span className="text-text-muted dark:text-[#737781]">/live-ops</span>
                </div>
              </div>

              {/* Right: Operational Status Pill */}
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-sans font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>Operational</span>
                <span className="text-emerald-600/70 dark:text-emerald-400/70 hidden sm:inline font-normal">· 20 Keys</span>
              </div>
            </div>

            {/* 2. OPERATIONAL WORKSPACE */}
            <div className="p-3.5 sm:p-5 space-y-3.5 sm:space-y-4">
              
              {/* 3 ELEVATED KPI GLASS CARDS (Emerald, Ice-Blue, Warm-Gold) */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                
                {/* Metric 1: Direct MTD (Emerald Illuminated) */}
                <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-b from-emerald-500/[0.08] via-emerald-500/[0.02] to-transparent dark:from-emerald-500/[0.10] dark:via-emerald-500/[0.02] dark:to-white/[0.01] border border-emerald-500/30 dark:border-emerald-500/35 shadow-xs dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] relative overflow-hidden">
                  <div className="text-[10.5px] min-[390px]:text-[11px] font-sans font-medium text-text-muted dark:text-[#A0A3AC] flex items-center justify-between tracking-normal truncate">
                    <span>Direct MTD</span>
                  </div>
                  <div className="mt-1 font-sans text-[13.5px] min-[390px]:text-[14.5px] sm:text-[16px] font-bold text-text-primary dark:text-[#F4F4F6] tracking-tight tabular-nums whitespace-nowrap">
                    {isUpdated ? "₹4,90,500" : "₹4,82,000"}
                  </div>
                  <div className="text-[10px] min-[390px]:text-[11px] font-sans text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 mt-0.5 font-semibold whitespace-nowrap">
                    <TrendingUp size={11} className="shrink-0" /> +38% OTA cut
                  </div>
                </div>

                {/* Metric 2: Occupancy (Ice-Blue Glass) */}
                <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-b from-sky-500/[0.08] via-sky-500/[0.02] to-transparent dark:from-sky-500/[0.10] dark:via-sky-500/[0.02] dark:to-white/[0.01] border border-sky-500/30 dark:border-sky-500/35 shadow-xs dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] relative overflow-hidden">
                  <div className="text-[10.5px] min-[390px]:text-[11px] font-sans font-medium text-text-muted dark:text-[#A0A3AC] tracking-normal truncate">
                    Occupancy
                  </div>
                  <div className="mt-1 font-sans text-[13.5px] min-[390px]:text-[14.5px] sm:text-[16px] font-bold text-text-primary dark:text-[#F4F4F6] tracking-tight tabular-nums whitespace-nowrap">
                    {isUpdated ? "95.0%" : "90.0%"}
                  </div>
                  <div className="text-[10px] min-[390px]:text-[11px] font-sans text-text-muted dark:text-[#A0A3AC] mt-0.5 whitespace-nowrap font-medium">
                    {isUpdated ? "19/20 Rooms" : "18/20 Rooms"}
                  </div>
                </div>

                {/* Metric 3: Arrivals (Warm-Gold Glass) */}
                <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-b from-amber-500/[0.08] via-amber-500/[0.02] to-transparent dark:from-[#E5A93C]/[0.10] dark:via-[#E5A93C]/[0.02] dark:to-white/[0.01] border border-amber-500/30 dark:border-[#E5A93C]/35 shadow-xs dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] relative overflow-hidden">
                  <div className="text-[10.5px] min-[390px]:text-[11px] font-sans font-medium text-text-muted dark:text-[#A0A3AC] tracking-normal truncate">
                    Arrivals
                  </div>
                  <div className="mt-1 font-sans text-[13.5px] min-[390px]:text-[14.5px] sm:text-[16px] font-bold text-text-primary dark:text-[#F4F4F6] tracking-tight tabular-nums whitespace-nowrap">
                    {isUpdated ? "5 Checked-in" : "4 Checked-in"}
                  </div>
                  <div className="text-[10px] min-[390px]:text-[11px] font-sans text-text-muted dark:text-[#A0A3AC] mt-0.5 whitespace-nowrap font-medium">
                    0 Pending Sync
                  </div>
                </div>

              </div>

              {/* ROOM AVAILABILITY MATRIX TABLE */}
              <div className="rounded-xl border border-border/80 dark:border-white/[0.07] overflow-hidden bg-surface/30 dark:bg-white/[0.015] shadow-xs">
                {/* Table Header */}
                <div className="px-3 sm:px-3.5 py-1.5 sm:py-2 border-b border-border/70 dark:border-white/[0.06] bg-surface/50 dark:bg-white/[0.025] flex items-center justify-between text-[10.5px] min-[390px]:text-[11px] font-sans font-medium text-text-muted dark:text-[#A0A3AC] tracking-[0.01em]">
                  <span>Room Availability Matrix</span>
                  <span>Status · Channel</span>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-border/60 dark:divide-white/[0.05] text-xs">
                  
                  {/* Room 204: Active Direct Confirmed */}
                  <div
                    className={`px-3 sm:px-3.5 py-2 sm:py-2.5 flex items-center justify-between transition-colors duration-300 gap-2 ${
                      isUpdated
                        ? "bg-emerald-500/[0.06] dark:bg-emerald-500/[0.08]"
                        : "bg-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                      <span className="font-sans text-xs font-bold text-text-primary dark:text-[#F4F4F6] tabular-nums shrink-0">
                        204
                      </span>
                      <span className="text-text-primary dark:text-[#F4F4F6] text-[11.5px] sm:text-xs font-semibold truncate max-w-[95px] min-[390px]:max-w-[130px] sm:max-w-none">
                        Garden Deluxe
                      </span>
                      <span className="text-[11px] font-sans text-text-muted dark:text-[#A0A3AC] tabular-nums hidden sm:inline shrink-0 font-medium">
                        ₹8,500
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className={`text-[10px] min-[390px]:text-[11px] font-sans px-2 sm:px-2.5 py-0.5 rounded-full flex items-center gap-1.5 transition-all whitespace-nowrap ${
                          isUpdated
                            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/35 font-semibold"
                            : "bg-surface/80 dark:bg-white/[0.04] text-text-muted dark:text-[#A0A3AC] border border-border/80 dark:border-white/[0.06] font-medium"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            isUpdated ? "bg-emerald-500" : "bg-text-muted/60 dark:bg-[#737781]"
                          }`}
                        />
                        {isUpdated ? "Direct Confirmed" : "Available"}
                      </span>
                    </div>
                  </div>

                  {/* Room 305 */}
                  <div className="px-3 sm:px-3.5 py-2 sm:py-2.5 flex items-center justify-between bg-transparent gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                      <span className="font-sans text-xs font-bold text-text-primary dark:text-[#F4F4F6] tabular-nums shrink-0">
                        305
                      </span>
                      <span className="text-text-secondary dark:text-[#A0A3AC] text-[11.5px] sm:text-xs font-medium truncate max-w-[95px] min-[390px]:max-w-[130px] sm:max-w-none">
                        Mountain Suite
                      </span>
                      <span className="text-[11px] font-sans text-text-muted dark:text-[#A0A3AC] tabular-nums hidden sm:inline shrink-0 font-medium">
                        ₹12,000
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] min-[390px]:text-[11px] font-sans font-medium px-2 sm:px-2.5 py-0.5 rounded-full bg-surface/80 dark:bg-white/[0.04] text-text-muted dark:text-[#A0A3AC] border border-border/80 dark:border-white/[0.06] flex items-center gap-1.5 whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-text-muted/60 dark:bg-[#737781] shrink-0" />
                        Available
                      </span>
                    </div>
                  </div>

                  {/* Room 402: Check-in Today (Warm Amber) */}
                  <div className="px-3 sm:px-3.5 py-2 sm:py-2.5 flex items-center justify-between bg-transparent gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                      <span className="font-sans text-xs font-bold text-text-primary dark:text-[#F4F4F6] tabular-nums shrink-0">
                        402
                      </span>
                      <span className="text-text-secondary dark:text-[#A0A3AC] text-[11.5px] sm:text-xs font-medium truncate max-w-[95px] min-[390px]:max-w-[130px] sm:max-w-none">
                        Executive Villa
                      </span>
                      <span className="text-[11px] font-sans text-text-muted dark:text-[#A0A3AC] tabular-nums hidden sm:inline shrink-0 font-medium">
                        ₹18,500
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] min-[390px]:text-[11px] font-sans font-semibold px-2 sm:px-2.5 py-0.5 rounded-full bg-amber-500/10 dark:bg-[#E5A93C]/15 text-amber-700 dark:text-[#E5A93C] border border-amber-500/30 dark:border-[#E5A93C]/35 flex items-center gap-1.5 whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-[#E5A93C] shrink-0" />
                        Check-in Today
                      </span>
                    </div>
                  </div>

                  {/* Room 108: Occupied (Ruby/Red) */}
                  <div className="px-3 sm:px-3.5 py-2 sm:py-2.5 flex items-center justify-between bg-transparent gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                      <span className="font-sans text-xs font-bold text-text-primary dark:text-[#F4F4F6] tabular-nums shrink-0">
                        108
                      </span>
                      <span className="text-text-secondary dark:text-[#A0A3AC] text-[11.5px] sm:text-xs font-medium truncate max-w-[95px] min-[390px]:max-w-[130px] sm:max-w-none">
                        Courtyard Room
                      </span>
                      <span className="text-[11px] font-sans text-text-muted dark:text-[#A0A3AC] tabular-nums hidden sm:inline shrink-0 font-medium">
                        ₹6,200
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] min-[390px]:text-[11px] font-sans font-medium px-2 sm:px-2.5 py-0.5 rounded-full bg-rose-500/10 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/25 dark:border-rose-500/30 flex items-center gap-1.5 whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                        Occupied
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* 3. BOTTOM AUDIT TRAIL */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[10.5px] min-[390px]:text-[11px] border-t border-border/70 dark:border-white/[0.06]">
                <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-text-muted dark:text-[#A0A3AC] truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="truncate">Razorpay Webhook 20ms</span>
                  <span>• Postgres 4ms</span>
                </div>
                <div className="text-text-secondary dark:text-[#A0A3AC] font-sans font-medium text-[10.5px] sm:text-[11px] flex items-center gap-1 truncate">
                  <Check size={12} className="text-emerald-500 shrink-0" />
                  <span>Auto-WhatsApp Sync</span>
                </div>
              </div>

            </div>
          </div>

          {/* ═══════════════════════════════════════════════
              EXTERNAL FLOATING AUTO-WHATSAPP CONFIRMATION CAPSULE
              Crisp drop shadow, clean border, no continuous ping repaint
              ═══════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95, y: shouldReduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: EASE_OUT_EXPO }}
            className="absolute -bottom-5 right-2 sm:-bottom-6 sm:-right-4 z-20 flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white dark:bg-[#13151C] border border-black/[0.08] dark:border-emerald-500/35 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.14)] dark:shadow-[0_14px_30px_-5px_rgba(0,0,0,0.7),0_0_12px_rgba(40,158,101,0.18)]"
          >
            {/* WhatsApp Green Icon Circle */}
            <div className="w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-[0_2px_6px_rgba(37,211,102,0.35)]">
              <MessageCircle size={13} className="fill-white" />
            </div>

            {/* Label & Status */}
            <div className="flex flex-col pr-1">
              <span className="text-[11.5px] sm:text-[12px] font-sans font-semibold text-text-primary dark:text-[#F4F4F6] tracking-tight leading-tight">
                Auto-WhatsApp Confirmation
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 leading-tight mt-0.5">
                <span className="w-1 h-1 rounded-full bg-emerald-500" />
                Delivered in 1.2s · Voucher Sent
              </span>
            </div>

            {/* Subtle Status Pip */}
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}

