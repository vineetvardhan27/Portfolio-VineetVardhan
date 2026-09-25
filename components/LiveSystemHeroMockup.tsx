"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  TrendingUp,
  Lock,
  ArrowUpRight,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { useReducedMotion } from "@/lib/reduced-motion";

export function LiveSystemHeroMockup() {
  const shouldReduceMotion = useReducedMotion();

  // Workflow State Simulation (0: standard operational baseline, 1: direct booking synchronized)
  const [activeCycle, setActiveCycle] = useState<0 | 1>(0);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const interval = setInterval(() => {
      setActiveCycle((prev) => (prev === 0 ? 1 : 0));
    }, 4500);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const isUpdated = activeCycle === 1;

  return (
    <div className="w-full max-w-lg lg:max-w-[540px]">
      {/* Product Frame: Restrained 8px radius, 1px crisp border, subtle realistic shadow */}
      <div className="rounded-lg sm:rounded-xl bg-card border border-border/90 dark:border-white/[0.08] shadow-[0_12px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.55)] overflow-hidden font-sans">
        
        {/* 1. Restrained Top Application Chrome */}
        <div className="px-4 py-2.5 border-b border-border/80 dark:border-white/[0.06] bg-bg-subtle/80 flex items-center justify-between text-xs">
          {/* Left: Window Dots & Internal Route */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-border-hover dark:bg-white/[0.15]" />
              <span className="w-2.5 h-2.5 rounded-full bg-border-hover dark:bg-white/[0.15]" />
              <span className="w-2.5 h-2.5 rounded-full bg-border-hover dark:bg-white/[0.15]" />
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface/70 dark:bg-white/[0.04] border border-border/60 dark:border-white/[0.06] text-[11px] font-sans font-medium text-text-muted">
              <Lock size={10} className="text-text-muted" />
              <span className="text-text-secondary">grovepms.internal</span>
              <span className="text-text-muted">/live-ops</span>
            </div>
          </div>

          {/* Right: Operational Status */}
          <div className="flex items-center gap-2 text-xs font-sans">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-success" />
            <span className="text-text-secondary font-medium">Operational</span>
            <span className="text-text-muted hidden sm:inline font-normal">· 20 Keys</span>
          </div>
        </div>

        {/* 2. Operational Workspace */}
        <div className="p-4 sm:p-5 space-y-4">
          
          {/* Top Operational Metrics (3 columns) */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            
            {/* Metric 1: Direct Revenue */}
            <div className="p-3 rounded-md bg-surface/40 dark:bg-white/[0.02] border border-border/70 dark:border-white/[0.05]">
              <div className="text-[11px] font-sans font-medium text-text-muted flex items-center justify-between tracking-normal">
                <span>Direct MTD</span>
              </div>
              <div className="mt-1 font-sans text-[14px] sm:text-[15px] font-semibold text-text-primary tracking-tight tabular-nums whitespace-nowrap">
                {isUpdated ? "₹4,90,500" : "₹4,82,000"}
              </div>
              <div className="text-[11px] font-sans text-success flex items-center gap-0.5 mt-0.5 font-medium whitespace-nowrap">
                <TrendingUp size={11} className="shrink-0" /> +38% OTA cut
              </div>
            </div>

            {/* Metric 2: Occupancy */}
            <div className="p-3 rounded-md bg-surface/40 dark:bg-white/[0.02] border border-border/70 dark:border-white/[0.05]">
              <div className="text-[11px] font-sans font-medium text-text-muted tracking-normal">
                Occupancy
              </div>
              <div className="mt-1 font-sans text-[14px] sm:text-[15px] font-semibold text-text-primary tracking-tight tabular-nums whitespace-nowrap">
                {isUpdated ? "95.0%" : "90.0%"}
              </div>
              <div className="text-[11px] font-sans text-text-muted mt-0.5 whitespace-nowrap">
                {isUpdated ? "19/20 Rooms" : "18/20 Rooms"}
              </div>
            </div>

            {/* Metric 3: Today's Arrivals */}
            <div className="p-3 rounded-md bg-surface/40 dark:bg-white/[0.02] border border-border/70 dark:border-white/[0.05]">
              <div className="text-[11px] font-sans font-medium text-text-muted tracking-normal">
                Arrivals
              </div>
              <div className="mt-1 font-sans text-[13.5px] sm:text-[14.5px] font-semibold text-text-primary tracking-tight tabular-nums whitespace-nowrap">
                {isUpdated ? "5 Checked-in" : "4 Checked-in"}
              </div>
              <div className="text-[11px] font-sans text-text-muted mt-0.5 whitespace-nowrap">
                0 Pending Sync
              </div>
            </div>

          </div>

          {/* Middle: Production Room Matrix Table */}
          <div className="rounded-md border border-border/80 dark:border-white/[0.06] overflow-hidden bg-bg/40">
            <div className="px-3.5 py-2 border-b border-border/70 dark:border-white/[0.06] bg-surface/30 dark:bg-white/[0.02] flex items-center justify-between text-[11px] font-sans font-medium text-text-muted tracking-[0.01em]">
              <span>Room Availability Matrix</span>
              <span>Status · Channel</span>
            </div>

            <div className="divide-y divide-border/60 dark:divide-white/[0.04] text-xs">
              
              {/* Room 204: Active Row with subtle state change */}
              <div
                className={`px-3.5 py-2.5 flex items-center justify-between transition-colors duration-300 ${
                  isUpdated
                    ? "bg-success/[0.04] dark:bg-success/[0.06]"
                    : "bg-transparent"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-sans text-xs font-semibold text-text-primary tabular-nums">204</span>
                  <span className="text-text-secondary text-xs font-medium">Garden Deluxe</span>
                  <span className="text-[11px] font-sans text-text-muted tabular-nums hidden sm:inline">₹8,500</span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-sans font-medium px-2 py-0.5 rounded flex items-center gap-1.5 transition-colors ${
                      isUpdated
                        ? "bg-success/15 text-success border border-success/30 font-semibold"
                        : "bg-surface text-text-muted border border-border"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isUpdated ? "bg-success" : "bg-text-muted"
                      }`}
                    />
                    {isUpdated ? "Direct Confirmed" : "Available"}
                  </span>
                </div>
              </div>

              {/* Room 305 */}
              <div className="px-3.5 py-2.5 flex items-center justify-between bg-transparent">
                <div className="flex items-center gap-2.5">
                  <span className="font-sans text-xs font-semibold text-text-primary tabular-nums">305</span>
                  <span className="text-text-secondary text-xs font-medium">Mountain Suite</span>
                  <span className="text-[11px] font-sans text-text-muted tabular-nums hidden sm:inline">₹12,000</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-sans font-medium px-2 py-0.5 rounded bg-surface text-text-muted border border-border flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-text-muted" />
                    Available
                  </span>
                </div>
              </div>

              {/* Room 402 */}
              <div className="px-3.5 py-2.5 flex items-center justify-between bg-transparent">
                <div className="flex items-center gap-2.5">
                  <span className="font-sans text-xs font-semibold text-text-primary tabular-nums">402</span>
                  <span className="text-text-secondary text-xs font-medium">Executive Villa</span>
                  <span className="text-[11px] font-sans text-text-muted tabular-nums hidden sm:inline">₹18,500</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-sans font-medium px-2 py-0.5 rounded bg-accent-subtle text-accent border border-border-accent/40 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    Check-in Today
                  </span>
                </div>
              </div>

              {/* Room 108 */}
              <div className="px-3.5 py-2.5 flex items-center justify-between bg-transparent">
                <div className="flex items-center gap-2.5">
                  <span className="font-sans text-xs font-semibold text-text-primary tabular-nums">108</span>
                  <span className="text-text-secondary text-xs font-medium">Courtyard Room</span>
                  <span className="text-[11px] font-sans text-text-muted tabular-nums hidden sm:inline">₹6,200</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-sans font-medium px-2 py-0.5 rounded bg-surface/70 text-text-secondary border border-border flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-text-secondary" />
                    Occupied
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom: Operational Activity & Audit Trail */}
          <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-[10.5px] border-t border-border/70 dark:border-white/[0.05]">
            <div className="flex items-center gap-2 font-mono text-text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
              <span>Razorpay Webhook 200 OK</span>
              <span>• Postgres RLS 4ms</span>
            </div>
            <div className="text-text-secondary font-sans font-medium text-[11px]">
              Auto-WhatsApp Confirmation Sent
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
