"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  Database,
  Lock,
} from "lucide-react";
import { useReducedMotion } from "@/lib/reduced-motion";

export function LiveSystemHeroMockup() {
  const shouldReduceMotion = useReducedMotion();
  const cardContainerRef = useRef<HTMLDivElement>(null);

  // ── Workflow State Simulation ──
  // Step 0: Idle baseline
  // Step 1: New booking alert arrives
  // Step 2: Payment verified & Room 204 confirms
  // Step 3: Revenue increments
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev === 0) return 1;
        if (prev === 1) return 2;
        if (prev === 2) return 3;
        // Step 3 -> back to 0 after pause
        setCycle((c) => c + 1);
        return 0;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  // ── Mouse Perspective Parallax (Subtle 3-5 degrees) ──
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 24, mass: 0.6 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Desktop perspective tilt: baseline is slightly tilted (-5deg Y, 4deg X), mouse nudges it gently ±2deg
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [6, 2]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-8, -2]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardContainerRef.current) return;
    const rect = cardContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const isConfirmed = step >= 2;
  const isRevenueUpdated = step >= 3;

  return (
    <div
      ref={cardContainerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full max-w-lg lg:max-w-[530px] perspective-[1200px]"
    >
      <motion.div
        style={
          shouldReduceMotion
            ? {}
            : {
                rotateX,
                rotateY,
                rotateZ: 0.5,
                transformStyle: "preserve-3d",
              }
        }
        className="relative transition-shadow duration-300"
      >
        {/* ── Layer 0: Secondary Backdrop Panel (Creates Realistic Depth) ── */}
        <div
          className="absolute -top-3 -right-3 -left-3 -bottom-3 rounded-[28px] bg-gradient-to-br from-blue-600/10 via-slate-900/40 to-transparent border border-white/[0.04] pointer-events-none hidden sm:block -z-10 blur-[1px]"
          style={{ transform: "translateZ(-30px)" }}
        />

        {/* ── Main Production Dashboard Surface ── */}
        <div className="rounded-2xl sm:rounded-3xl bg-[#0e1017]/95 border border-white/[0.1] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur-md overflow-hidden text-white font-sans">

          {/* 1. Realistic Application Browser Chrome */}
          <div className="px-4 sm:px-5 py-3 border-b border-white/[0.08] bg-[#141620]/90 flex items-center justify-between">
            {/* macOS Window Controls */}
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] border border-[#e0443e]/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] border border-[#dea123]/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] border border-[#1aab29]/40" />
            </div>

            {/* Address / System Pill */}
            <div className="px-3 py-1 rounded-md bg-[#0a0b10] border border-white/[0.08] flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
              <Lock size={10} className="text-emerald-400" />
              <span className="text-zinc-500">grovepms.internal/</span>
              <span className="text-zinc-200 font-medium">live-booking</span>
            </div>

            {/* System Pulse Indicator */}
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold hidden sm:inline">
                Live
              </span>
            </div>
          </div>

          {/* 2. Dashboard Internal Workspace */}
          <div className="p-4 sm:p-5 space-y-4">

            {/* ── Top Metrics Bar ── */}
            <div className="grid grid-cols-2 gap-3">
              {/* Metric 1: Direct Revenue Counter */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#141622] border border-white/[0.07] relative overflow-hidden">
                <div className="flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="font-mono uppercase tracking-wider text-[10px] text-zinc-500">
                    Direct Revenue
                  </span>
                  <span className="text-emerald-400 font-mono text-[10px] flex items-center gap-0.5 font-semibold">
                    <TrendingUp size={11} /> +38%
                  </span>
                </div>

                <div className="mt-1 flex items-baseline gap-2">
                  <motion.div
                    key={isRevenueUpdated ? "updated-revenue" : "base-revenue"}
                    initial={{ y: isRevenueUpdated ? -10 : 0, opacity: isRevenueUpdated ? 0 : 1 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white"
                  >
                    {isRevenueUpdated ? "₹4,90,500" : "₹4,82,000"}
                  </motion.div>

                  <AnimatePresence>
                    {isRevenueUpdated && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.7, x: -6 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 rounded"
                      >
                        +₹8,500
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                <div className="text-[10px] font-mono text-zinc-500 mt-1">
                  Zero OTA Commissions Deducted
                </div>
              </div>

              {/* Metric 2: Occupancy & Instant Sync */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#141622] border border-white/[0.07]">
                <div className="flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="font-mono uppercase tracking-wider text-[10px] text-zinc-500">
                    Occupancy Sync
                  </span>
                  <span className="text-blue-400 font-mono text-[10px] flex items-center gap-0.5 font-semibold">
                    <Zap size={11} /> Real-time
                  </span>
                </div>

                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white">
                    {isConfirmed ? "94.2%" : "91.8%"}
                  </span>
                  <span className="text-[10px] font-mono text-blue-300 bg-blue-500/15 border border-blue-500/30 px-1.5 py-0.5 rounded">
                    {isConfirmed ? "18/20 Rooms" : "17/20 Rooms"}
                  </span>
                </div>

                <div className="text-[10px] font-mono text-zinc-500 mt-1">
                  Postgres Room State Locked
                </div>
              </div>
            </div>

            {/* ── Real-Time Dynamic Event Notification Layer ── */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {step >= 1 ? (
                  <motion.div
                    key="live-incoming-event"
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className={`p-3 rounded-xl border transition-colors duration-300 ${
                      isConfirmed
                        ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                        : "bg-blue-950/40 border-blue-500/40 text-blue-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {isConfirmed ? (
                          <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shrink-0">
                            <CheckCircle2 size={12} />
                          </div>
                        ) : (
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                          </span>
                        )}

                        <div className="text-xs font-semibold tracking-tight text-white flex items-center gap-1.5">
                          <span>
                            {isConfirmed ? "Booking Confirmed & Sync Complete" : "Incoming Direct Reservation"}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400">
                            • Room 204
                          </span>
                        </div>
                      </div>

                      <span className="text-[11px] font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded">
                        ₹8,500
                      </span>
                    </div>

                    <div className="mt-1.5 flex items-center justify-between text-[11px] text-zinc-300 pl-7 font-mono">
                      <span>Guest: Aryan M. (Direct Website)</span>
                      <span className={isConfirmed ? "text-emerald-400 font-semibold" : "text-blue-300"}>
                        {isConfirmed ? "Payment Verified ✓" : "Processing Gateway..."}
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="system-idle-telemetry"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-2.5 rounded-xl bg-[#141622]/60 border border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-zinc-400"
                  >
                    <div className="flex items-center gap-2">
                      <Database size={13} className="text-blue-400" />
                      <span>Live Booking Engine Listening</span>
                    </div>
                    <span className="text-zinc-500">Auto-Sync Enabled</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Production Room Matrix Table ── */}
            <div className="rounded-xl bg-[#12141e] border border-white/[0.07] overflow-hidden">
              <div className="px-3.5 py-2 border-b border-white/[0.06] bg-[#171926]/70 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                <span>Room Matrix (Live PMS)</span>
                <span>Status / Channel</span>
              </div>

              <div className="divide-y divide-white/[0.04] text-xs">
                {/* Room 204 (Dynamic Focus Row) */}
                <motion.div
                  animate={{
                    backgroundColor: isConfirmed
                      ? "rgba(16, 185, 129, 0.08)"
                      : step === 1
                      ? "rgba(59, 130, 246, 0.08)"
                      : "transparent",
                  }}
                  transition={{ duration: 0.3 }}
                  className="px-3.5 py-2.5 flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-white">204</span>
                    <span className="text-zinc-400 text-[11px]">Garden Deluxe</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.div
                      key={isConfirmed ? "confirmed-badge" : "available-badge"}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        isConfirmed
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : step === 1
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/40 animate-pulse"
                          : "bg-white/[0.06] text-zinc-300 border border-white/[0.1]"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isConfirmed ? "bg-emerald-400" : step === 1 ? "bg-blue-400" : "bg-zinc-400"
                        }`}
                      />
                      {isConfirmed ? "CONFIRMED • Direct" : step === 1 ? "LOCKING ROOM..." : "AVAILABLE"}
                    </motion.div>
                  </div>
                </motion.div>

                {/* Room 305 */}
                <div className="px-3.5 py-2.5 flex items-center justify-between bg-transparent">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-white">305</span>
                    <span className="text-zinc-400 text-[11px]">Mountain Suite</span>
                  </div>
                  <div className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-white/[0.06] text-zinc-300 border border-white/[0.1] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                    AVAILABLE
                  </div>
                </div>

                {/* Room 402 */}
                <div className="px-3.5 py-2.5 flex items-center justify-between bg-transparent">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-white">402</span>
                    <span className="text-zinc-400 text-[11px]">Executive Villa</span>
                  </div>
                  <div className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    CHECK-IN TODAY
                  </div>
                </div>
              </div>
            </div>

            {/* ── Bottom Telemetry & Trust Bar ── */}
            <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Postgres DB • 4ms</span>
              </div>
              <span>Razorpay Webhook 200 OK</span>
              <span className="text-zinc-400 font-medium">Auto-WhatsApp Sent</span>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
