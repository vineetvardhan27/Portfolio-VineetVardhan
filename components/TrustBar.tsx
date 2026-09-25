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

  // Duplicate items array for continuous ticker
  const marqueeItems = [...trustBarItems, ...trustBarItems];

  return (
    <section className="py-6 sm:py-8 bg-bg-subtle/50 border-y border-border/80 dark:border-white/[0.06] select-none overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          
          {/* Left Title Label */}
          <div className="shrink-0 flex items-center gap-2 text-[12.5px] font-sans text-text-muted font-medium tracking-[0.01em]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Specialized In</span>
          </div>

          {/* Right Marquee / Item Row with subtle edge fade */}
          <div className="relative flex-1 overflow-hidden">
            {/* Edge fades */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-r from-bg-subtle dark:from-[#101114] to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-l from-bg-subtle dark:from-[#101114] to-transparent z-10" />

            {shouldReduceMotion ? (
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                {trustBarItems.map((item) => {
                  const Icon = iconMap[item.icon] || Hotel;
                  return (
                    <div
                      key={item.name}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-card border border-border/80 dark:border-white/[0.06] text-text-secondary text-xs font-medium whitespace-nowrap shadow-2xs"
                    >
                      <Icon size={13} className="text-text-muted shrink-0" />
                      <span>{item.name}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="animate-marquee gap-3 sm:gap-4">
                {marqueeItems.map((item, idx) => {
                  const Icon = iconMap[item.icon] || Hotel;
                  return (
                    <div
                      key={`${item.name}-${idx}`}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-card border border-border/80 dark:border-white/[0.06] text-text-secondary text-xs font-medium whitespace-nowrap shrink-0 transition-colors hover:text-text-primary hover:border-border-accent/40"
                    >
                      <Icon size={13} className="text-text-muted shrink-0" />
                      <span>{item.name}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
