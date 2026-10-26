"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, TrendingUp, ShieldCheck } from "lucide-react";
import { Button } from "./ui/Button";
import { heroCopy } from "@/content/copy";
import { useReducedMotion } from "@/lib/reduced-motion";
import { LiveSystemHeroMockup } from "./LiveSystemHeroMockup";

const EASE_EDITORIAL = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const trustItems = [
    {
      icon: Zap,
      text: "Sub-Second Next.js Speed",
      iconColor: "text-amber-500 dark:text-[#E5A93C]",
    },
    {
      icon: ShieldCheck,
      text: "Zero Agency Markup",
      iconColor: "text-accent dark:text-[#E5A93C]",
    },
    {
      icon: TrendingUp,
      text: "Conversion-Engineered",
      iconColor: "text-success dark:text-[#10B981]",
    },
  ];

  return (
    <section className="relative pt-24 pb-10 sm:pt-28 sm:pb-12 md:pt-32 md:pb-16 bg-bg overflow-hidden">
      {/* Subtle, restrained top ambient highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-64 bg-radial from-white/[0.03] dark:from-white/[0.02] to-transparent pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* ═══════════════════════════════════════════════
              LEFT COLUMN: Editorial Copy, CTAs & Specs
              ═══════════════════════════════════════════════ */}
          <div className="lg:col-span-7 flex flex-col items-start w-full">
            {/* 1. Technical Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_EDITORIAL }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/70 dark:bg-white/[0.03] border border-border/80 dark:border-white/[0.06] mb-5 sm:mb-6 text-[12px] sm:text-[13px] font-sans font-medium text-text-secondary tracking-[0.01em] max-w-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-success shrink-0 shadow-[0_0_4px_rgba(40,158,101,0.5)]" />
              <span className="truncate">
                Websites <span className="text-text-muted/60 px-1">·</span> Booking Systems{" "}
                <span className="text-text-muted/60 px-1">·</span> Business Software
              </span>
            </motion.div>

            {/* 2. Headline — Confident two-line editorial headline */}
            <h1 className="text-[36px] sm:text-[48px] md:text-[56px] lg:text-[62px] xl:text-[68px] leading-[1.0] sm:leading-[0.98] font-semibold text-text-primary tracking-[-0.045em] sm:tracking-[-0.05em] max-w-3xl">
              <motion.span
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.05, ease: EASE_EDITORIAL }}
                className="font-medium text-text-primary/90 block"
              >
                Your business deserves
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.14, ease: EASE_EDITORIAL }}
                className="font-semibold text-text-primary block mt-1 sm:mt-1.5"
              >
                a better digital experience.
              </motion.span>
            </h1>

            {/* 3. Subheading — Muted, comfortable reading width and generous whitespace */}
            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: EASE_EDITORIAL }}
              className="mt-5 sm:mt-6 text-[16.5px] sm:text-[18px] md:text-[19px] text-text-secondary max-w-[620px] leading-[1.58] sm:leading-[1.62] font-normal tracking-[-0.01em]"
            >
              {heroCopy.subtext}
            </motion.p>

            {/* 4. Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.34, ease: EASE_EDITORIAL }}
              className="mt-8 sm:mt-9 flex flex-col sm:flex-row sm:items-center gap-3.5 w-full sm:w-auto"
            >
              <Button
                href="#contact"
                variant="primary"
                size="lg"
                className="group w-full sm:w-auto min-h-[48px] px-6 rounded-full justify-center shadow-[0_2px_12px_rgba(185,130,63,0.28),inset_0_1px_0_rgba(255,255,255,0.3)] dark:shadow-[0_2px_14px_rgba(201,149,82,0.32),inset_0_1px_0_rgba(255,255,255,0.22)]"
              >
                <span>{heroCopy.primaryCTA}</span>
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-transform duration-200 ease-out"
                />
              </Button>

              <Button
                href="#work"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto min-h-[48px] px-6 rounded-full justify-center"
              >
                {heroCopy.secondaryCTA}
              </Button>
            </motion.div>

            {/* 5. Discovery Call Microcopy */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42, ease: EASE_EDITORIAL }}
              className="mt-4 flex items-center gap-2 text-xs sm:text-[13px] font-sans font-normal text-text-muted"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
              <span>No commitment — 15 min discovery call &amp; technical feasibility</span>
            </motion.div>

            {/* 6. Technical Credibility Strip */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.48, ease: EASE_EDITORIAL }}
              className="mt-8 sm:mt-9 pt-5 border-t border-border/80 dark:border-white/[0.06] w-full flex flex-wrap items-center gap-x-5 sm:gap-x-7 gap-y-2.5 text-xs sm:text-[13px] font-sans font-medium text-text-secondary"
            >
              {trustItems.map((item) => (
                <div key={item.text} className="flex items-center gap-2 py-0.5 whitespace-nowrap">
                  <item.icon size={14} className={`${item.iconColor} shrink-0`} />
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ═══════════════════════════════════════════════
              RIGHT COLUMN: Operational Hotel PMS Preview
              ═══════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE_EDITORIAL }}
            className="lg:col-span-5 flex justify-center lg:justify-end w-full mt-4 lg:mt-0 relative overflow-visible"
          >
            <LiveSystemHeroMockup />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
