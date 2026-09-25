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
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-bg overflow-hidden">
      {/* Subtle, restrained top ambient highlight - no loud blue/purple glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-64 bg-radial from-white/[0.03] dark:from-white/[0.02] to-transparent pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* ═══════════════════════════════════════════════
              LEFT COLUMN: Editorial Copy, CTAs & Specs
              ═══════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* 1. Technical Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-surface/60 dark:bg-white/[0.03] border border-border dark:border-white/[0.06] mb-6 text-xs font-mono text-text-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              <span>
                Websites <span className="text-text-muted px-1">•</span> Booking Systems{" "}
                <span className="text-text-muted px-1">•</span> Business Software
              </span>
            </div>

            {/* 2. Headline — Editorial hierarchy via weight and typography, solid off-white */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] leading-[1.18] sm:leading-[1.14] font-medium text-text-primary tracking-[-0.02em] max-w-2xl">
              <span className="font-normal text-text-primary/85 block">
                Your business deserves
              </span>
              <span className="font-semibold text-text-primary tracking-tight block">
                a better digital
              </span>
              <span className="font-normal text-text-primary/95 block">
                experience.
              </span>
            </h1>

            {/* 3. Subheading */}
            <p className="mt-5 text-base sm:text-lg text-text-secondary max-w-[54ch] leading-relaxed font-normal">
              {heroCopy.subtext}
            </p>

            {/* 4. Action CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3.5 w-full sm:w-auto">
              <Button
                href="#contact"
                variant="primary"
                size="lg"
                className="group w-full sm:w-auto"
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
                className="w-full sm:w-auto"
              >
                {heroCopy.secondaryCTA}
              </Button>
            </div>

            {/* 5. Discovery Call Microcopy */}
            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
              <span>No commitment — 15 min discovery call &amp; technical feasibility</span>
            </div>

            {/* 6. Technical Credibility Strip (Refined product specification layout) */}
            <div className="mt-10 pt-7 border-t border-border/80 dark:border-white/[0.06] w-full flex flex-wrap items-center gap-y-3 gap-x-5 sm:gap-x-7 text-xs font-mono text-text-secondary">
              {trustItems.map((item, idx) => (
                <div key={item.text} className="flex items-center gap-2">
                  <item.icon size={14} className={`${item.iconColor} shrink-0`} />
                  <span>{item.text}</span>
                  {idx < trustItems.length - 1 && (
                    <span className="text-border dark:text-white/[0.1] hidden sm:inline ml-3">/</span>
                  )}
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
            className="lg:col-span-5 flex justify-center lg:justify-end w-full"
          >
            <LiveSystemHeroMockup />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
