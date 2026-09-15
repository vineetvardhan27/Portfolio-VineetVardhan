"use client";

import React from "react";
import {
  Hotel,
  CalendarCheck,
  LayoutDashboard,
  Cpu,
  Globe,
  Sparkles,
  Layers,
} from "lucide-react";
import { trustBarItems } from "@/content/copy";
import { useReducedMotion } from "@/lib/reduced-motion";
import { FlowingDataLines } from "./FlowingDataLines";

const iconMap: Record<string, React.ElementType> = {
  Hotel,
  CalendarCheck,
  LayoutDashboard,
  Cpu,
  Globe,
  Sparkles,
  Layers,
};

export function TrustBar() {
  const shouldReduceMotion = useReducedMotion();

  // Duplicate items array twice for seamless continuous infinite looping
  const marqueeItems = [...trustBarItems, ...trustBarItems];

  return (
    <section className="relative py-8 sm:py-10 bg-transparent overflow-hidden select-none">
      {/* Layer 2: Multiple Flowing Network Lines with Data Pulses */}
      <FlowingDataLines />

      <div className="container-custom relative z-10">
        {/* Layer 3: Floating Glassmorphic Container */}
        <div className="relative rounded-2xl bg-white/50 dark:bg-[#141418]/60 backdrop-blur-md border border-slate-200/80 dark:border-white/[0.08] p-2 sm:p-2.5 shadow-xs overflow-hidden">
          
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
            
            {/* Left Title Glass Pill */}
            <div className="shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/70 dark:bg-[#1A1A20]/80 border border-slate-200/70 dark:border-white/[0.08]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent dark:bg-blue-400 animate-pulse" />
              <span className="text-[11px] uppercase tracking-wider font-semibold text-text-muted dark:text-zinc-400">
                Specialized In
              </span>
            </div>

            {/* Right Marquee Track with Subtle Edge Fades */}
            <div className="relative flex-1 overflow-hidden">
              {/* Left Edge Subtle Mask */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-white/90 dark:from-[#0D0D10]/95 to-transparent z-10" />

              {/* Right Edge Subtle Mask */}
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-white/90 dark:from-[#0D0D10]/95 to-transparent z-10" />

              {/* Moving Marquee Track */}
              {shouldReduceMotion ? (
                // Accessible static list for reduced motion users
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  {trustBarItems.map((item) => {
                    const Icon = iconMap[item.icon] || Hotel;
                    return (
                      <div
                        key={item.name}
                        className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/80 dark:bg-[#141418]/90 backdrop-blur-sm border border-slate-200/80 dark:border-white/[0.08] text-text-primary text-xs font-semibold whitespace-nowrap shadow-2xs"
                      >
                        <div className="p-1.5 rounded-lg bg-blue-50/80 dark:bg-blue-500/15 border border-blue-200/60 dark:border-blue-500/30 text-accent dark:text-blue-300">
                          <Icon size={14} />
                        </div>
                        <span>{item.name}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                // GPU-Accelerated Continuous 60fps Glass Marquee Track
                <div className="animate-marquee gap-4 sm:gap-5">
                  {marqueeItems.map((item, idx) => {
                    const Icon = iconMap[item.icon] || Hotel;
                    return (
                      <div
                        key={`${item.name}-${idx}`}
                        className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/80 dark:bg-[#141418]/90 backdrop-blur-sm border border-slate-200/80 dark:border-white/[0.08] text-text-primary text-xs font-semibold whitespace-nowrap shrink-0 group transition-all duration-200 hover:border-accent/60 dark:hover:border-white/25 hover:bg-white dark:hover:bg-[#1E1E26] hover:shadow-xs cursor-default"
                      >
                        <div className="p-1.5 rounded-lg bg-blue-50/80 dark:bg-blue-500/15 border border-blue-200/60 dark:border-blue-500/30 text-accent dark:text-blue-300 group-hover:scale-105 transition-transform">
                          <Icon size={14} />
                        </div>
                        <span className="group-hover:text-accent dark:group-hover:text-blue-300 transition-colors">
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
