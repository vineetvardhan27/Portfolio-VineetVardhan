"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, TrendingUp, ShieldCheck } from "lucide-react";
import { Button } from "./ui/Button";
import { heroCopy } from "@/content/copy";
import { useReducedMotion } from "@/lib/reduced-motion";
import { LiveSystemHeroMockup } from "./LiveSystemHeroMockup";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const trustItems = [
    {
      icon: CheckCircle2,
      text: "Next.js 14 & Sub-second Speed",
      iconColor: "text-success",
    },
    {
      icon: ShieldCheck,
      text: "Zero Agency Markup",
      iconColor: "text-accent",
    },
    {
      icon: TrendingUp,
      text: "Conversion-Engineered",
      iconColor: "text-success",
    },
  ];

  return (
    <section className="relative pt-20 pb-8 sm:pt-24 sm:pb-10 md:pt-28 md:pb-12 bg-bg overflow-hidden">
      {/* Subtle, restrained top ambient highlight - no loud blue/purple glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-64 bg-radial from-white/[0.03] dark:from-white/[0.02] to-transparent pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          
          {/* ═══════════════════════════════════════════════
              LEFT COLUMN: Editorial Copy, CTAs & Specs
              ═══════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start w-full"
          >
            {/* 1. Technical Availability Badge */}
            <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-md bg-surface/60 dark:bg-white/[0.03] border border-border dark:border-white/[0.06] mb-4 sm:mb-5 text-[11.5px] sm:text-[12.5px] font-sans font-medium text-text-secondary tracking-[0.01em] max-w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
              <span className="truncate">
                Websites <span className="text-text-muted/60 px-1">·</span> Booking Systems{" "}
                <span className="text-text-muted/60 px-1">·</span> Business Software
              </span>
            </div>

            {/* 2. Headline — Groww-inspired editorial hierarchy with nuanced weight and tight restraint */}
            <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[52px] xl:text-[56px] leading-[1.09] lg:leading-[1.08] font-semibold text-text-primary tracking-[-0.025em] max-w-3xl">
              <span className="font-medium text-text-primary/90 block">
                Your business deserves
              </span>
              <span className="font-semibold text-text-primary block">
                a better digital
              </span>
              <span className="font-semibold text-text-primary block">
                experience.
              </span>
            </h1>

            {/* 3. Subheading — Refined product supporting copy */}
            <p className="mt-4 sm:mt-5 text-[16px] sm:text-[18px] text-text-secondary max-w-[640px] leading-[1.62] font-normal tracking-normal">
              {heroCopy.subtext}
            </p>

            {/* 4. Action CTAs */}
            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
              <Button
                href="#contact"
                variant="primary"
                size="lg"
                className="group w-full sm:w-auto min-h-[46px] justify-center"
              >
                <span>{heroCopy.primaryCTA}</span>
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </Button>

              <Button
                href="#work"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto min-h-[46px] justify-center"
              >
                {heroCopy.secondaryCTA}
              </Button>
            </div>

            {/* 5. Discovery Call Microcopy */}
            <div className="mt-3.5 sm:mt-4 flex items-start gap-2 text-xs sm:text-[13px] font-sans font-normal text-text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-success shrink-0 mt-1" />
              <span>No commitment — 15 min discovery call &amp; technical feasibility</span>
            </div>

            {/* 6. Technical Credibility Strip (Responsive Grid layout on mobile) */}
            <div className="mt-7 sm:mt-8 pt-5 border-t border-border/80 dark:border-white/[0.06] w-full grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 text-xs sm:text-[13px] font-sans font-medium text-text-secondary">
              {trustItems.map((item) => (
                <div key={item.text} className="flex items-center gap-2 py-0.5">
                  <item.icon size={14} className={`${item.iconColor} shrink-0`} />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ═══════════════════════════════════════════════
              RIGHT COLUMN: Operational Hotel PMS Preview
              ═══════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center lg:justify-end w-full mt-2 lg:mt-0"
          >
            <LiveSystemHeroMockup />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
