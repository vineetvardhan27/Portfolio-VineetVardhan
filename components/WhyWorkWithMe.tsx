"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Wrench, Zap, MessageCircle, ArrowUpRight } from "lucide-react";
import { whyWorkWithMeItems } from "@/content/copy";
import { useReducedMotion } from "@/lib/reduced-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

interface PrincipleConfig {
  numeral: string;
  tag: string;
  icon: React.ElementType;
}

const itemConfigs: Record<string, PrincipleConfig> = {
  "Business-First Mindset": {
    numeral: "01",
    tag: "Core Operating Philosophy",
    icon: Target,
  },
  "End-to-End Ownership": {
    numeral: "02",
    tag: "Architecture to Deploy",
    icon: Wrench,
  },
  "Blazing Fast & Modern": {
    numeral: "03",
    tag: "High-Performance Core",
    icon: Zap,
  },
  "Direct & Clear Communication": {
    numeral: "04",
    tag: "Direct Accountability",
    icon: MessageCircle,
  },
};

export function WhyWorkWithMe() {
  const shouldReduceMotion = useReducedMotion();

  const leadItem = whyWorkWithMeItems[0];
  const companionItems = whyWorkWithMeItems.slice(1);
  const leadConfig = itemConfigs[leadItem.title];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: EASE_OUT_EXPO,
      },
    },
  };

  const LeadIcon = leadConfig.icon;

  return (
    <section
      id="why-me"
      className="section-padding bg-bg border-t border-border/80 dark:border-white/[0.06] relative"
    >
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          {/* Eyebrow with Subtle Marker */}
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent mb-3 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>05 · Why Work With Me</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-medium text-text-primary tracking-[-0.02em] leading-[1.2] sm:leading-[1.18]">
            Senior full-stack engineering with zero agency overhead.
          </h2>

          <p className="mt-3.5 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl font-normal">
            You partner directly with the engineer designing and coding your
            product, resulting in faster turnarounds, cleaner code, and direct
            accountability.
          </p>
        </motion.div>

        {/* Asymmetric Studio Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="space-y-6 sm:space-y-7"
        >
          {/* 1. LEAD SPOTLIGHT CARD */}
          <motion.div
            variants={itemVariants}
            className="group relative overflow-hidden rounded-xl bg-card border border-border/80 dark:border-white/[0.07] hover:border-border-accent/40 p-6 sm:p-9 shadow-xs transition-colors"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              {/* Left Column: Numeral, Icon & Elevated Title */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-semibold tracking-wider text-accent">
                    {leadConfig.numeral}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-surface/70 dark:bg-white/[0.03] border border-border/70 dark:border-white/[0.05] text-text-muted font-medium">
                    {leadConfig.tag}
                  </span>
                </div>

                <div className="flex items-center gap-3.5 pt-0.5">
                  <div className="w-10 h-10 rounded-md bg-surface/80 dark:bg-white/[0.04] border border-border/80 text-accent flex items-center justify-center shrink-0">
                    <LeadIcon size={20} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-medium text-text-primary tracking-tight leading-snug">
                    {leadItem.title}
                  </h3>
                </div>
              </div>

              {/* Right Column: Narrative & Metadata */}
              <div className="lg:col-span-6 space-y-4 lg:border-l lg:border-border/70 dark:lg:border-white/[0.06] lg:pl-8">
                <p className="text-sm sm:text-[15px] text-text-secondary leading-relaxed max-w-xl">
                  {leadItem.description}
                </p>

                {/* Editorial Micro-Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-text-muted">
                  <span className="px-2 py-0.5 rounded bg-surface/70 dark:bg-white/[0.03] border border-border/60 dark:border-white/[0.05]">
                    Revenue-Driven
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface/70 dark:bg-white/[0.03] border border-border/60 dark:border-white/[0.05]">
                    Direct Booking Conversion
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface/70 dark:bg-white/[0.03] border border-border/60 dark:border-white/[0.05]">
                    Zero Bloat
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. COMPANION 3-COLUMN EDITORIAL ROW */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
            {companionItems.map((item) => {
              const config = itemConfigs[item.title];
              const Icon = config.icon;

              return (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className="group relative overflow-hidden rounded-xl bg-card border border-border/80 dark:border-white/[0.07] hover:border-border-accent/40 p-6 flex flex-col justify-between shadow-xs transition-colors"
                >
                  {/* Top Bar: Numeral & Icon */}
                  <div>
                    <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-border/70 dark:border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold tracking-wider text-accent">
                          {config.numeral}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted font-medium">
                          {config.tag}
                        </span>
                      </div>

                      <div className="w-8 h-8 rounded-md bg-surface/80 dark:bg-white/[0.04] border border-border/80 text-accent flex items-center justify-center">
                        <Icon size={16} />
                      </div>
                    </div>

                    {/* Typography: Elevated Title */}
                    <h3 className="text-lg sm:text-xl font-medium text-text-primary tracking-tight">
                      {item.title}
                    </h3>

                    {/* Body Text */}
                    <p className="mt-2.5 text-xs sm:text-[13px] text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Minimal Accent Line */}
                  <div className="pt-4 mt-6 border-t border-border/70 dark:border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-text-muted">
                    <span className="group-hover:text-text-primary transition-colors">
                      Engineered In-House
                    </span>
                    <ArrowUpRight
                      size={13}
                      className="text-text-muted opacity-50 group-hover:opacity-100 group-hover:text-accent transition-all"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
