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
  accentText: string;
  accentBg: string;
  accentBorder: string;
  hoverBorder: string;
  glowBg: string;
  icon: React.ElementType;
}

const itemConfigs: Record<string, PrincipleConfig> = {
  "Business-First Mindset": {
    numeral: "01",
    tag: "Core Operating Philosophy",
    accentText: "text-blue-500 dark:text-blue-400",
    accentBg: "bg-blue-500/10 dark:bg-blue-500/15",
    accentBorder: "border-blue-500/25 dark:border-blue-500/35",
    hoverBorder: "hover:border-blue-500/50 dark:hover:border-blue-400/50",
    glowBg: "bg-blue-500/[0.07]",
    icon: Target,
  },
  "End-to-End Ownership": {
    numeral: "02",
    tag: "Architecture to Deploy",
    accentText: "text-violet-600 dark:text-violet-400",
    accentBg: "bg-violet-500/10 dark:bg-violet-500/15",
    accentBorder: "border-violet-500/25 dark:border-violet-500/35",
    hoverBorder: "hover:border-violet-500/50 dark:hover:border-violet-400/50",
    glowBg: "bg-violet-500/[0.06]",
    icon: Wrench,
  },
  "Blazing Fast & Modern": {
    numeral: "03",
    tag: "High-Performance Core",
    accentText: "text-emerald-600 dark:text-emerald-400",
    accentBg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    accentBorder: "border-emerald-500/25 dark:border-emerald-500/35",
    hoverBorder: "hover:border-emerald-500/50 dark:hover:border-emerald-400/50",
    glowBg: "bg-emerald-500/[0.06]",
    icon: Zap,
  },
  "Direct & Clear Communication": {
    numeral: "04",
    tag: "Direct Accountability",
    accentText: "text-amber-600 dark:text-amber-400",
    accentBg: "bg-amber-500/10 dark:bg-amber-500/15",
    accentBorder: "border-amber-500/25 dark:border-amber-500/35",
    hoverBorder: "hover:border-amber-500/50 dark:hover:border-amber-400/50",
    glowBg: "bg-amber-500/[0.06]",
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
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: EASE_OUT_EXPO,
      },
    },
  };

  const LeadIcon = leadConfig.icon;

  return (
    <section
      id="why-me"
      className="section-padding bg-bg border-t border-border relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        {/* Section Header with Eyebrow Rule and Focal Highlight */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
          className="max-w-3xl mb-14 sm:mb-20"
        >
          {/* Eyebrow with Animated Marker & Rule */}
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-semibold text-accent font-mono">
              WHY WORK WITH ME
            </span>
            <span className="w-12 h-px bg-accent/40 hidden sm:block" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-semibold text-text-primary tracking-tight leading-[1.15]">
            Senior full-stack engineering with{" "}
            <span className="italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-accent">
              zero agency overhead
            </span>
            .
          </h2>

          <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl font-normal">
            You partner directly with the engineer designing and coding your
            product, resulting in faster turnarounds, cleaner code, and direct
            accountability.
          </p>
        </motion.div>

        {/* Asymmetric Editorial Bento Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="space-y-6"
        >
          {/* 1. LEAD SPOTLIGHT CARD (01 // Business-First Mindset) */}
          <motion.div
            variants={itemVariants}
            whileHover={shouldReduceMotion ? {} : { y: -4 }}
            className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-card border border-border/80 dark:border-white/[0.08] p-7 sm:p-10 shadow-sm transition-all duration-300 ${leadConfig.hoverBorder}`}
          >
            {/* Ambient Radial Accent Glow */}
            <div
              className={`absolute top-0 right-0 w-96 h-96 ${leadConfig.glowBg} rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 transition-opacity duration-300 group-hover:opacity-100`}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Numeral, Icon & Elevated Title */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-xs sm:text-sm font-bold tracking-widest ${leadConfig.accentText}`}
                  >
                    {leadConfig.numeral} //
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-surface border border-border text-text-muted">
                    {leadConfig.tag}
                  </span>
                </div>

                <div className="flex items-center gap-4 pt-1">
                  <div
                    className={`w-12 h-12 rounded-2xl ${leadConfig.accentBg} border ${leadConfig.accentBorder} flex items-center justify-center ${leadConfig.accentText} shrink-0 transition-transform duration-300 group-hover:scale-105`}
                  >
                    <LeadIcon size={24} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight leading-snug">
                    {leadItem.title}
                  </h3>
                </div>
              </div>

              {/* Right Column: Narrow-Measure Narrative & High-Value Takeaway */}
              <div className="lg:col-span-6 space-y-4 lg:border-l lg:border-border/60 lg:pl-8">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-xl">
                  {leadItem.description}
                </p>

                {/* Editorial Micro-Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono text-text-muted">
                  <span className="px-2.5 py-1 rounded-md bg-surface border border-border/80">
                    Revenue-Driven
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-surface border border-border/80">
                    Direct Booking Conversion
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-surface border border-border/80">
                    Zero Bloat
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. COMPANION 3-COLUMN EDITORIAL ROW (02, 03, 04) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {companionItems.map((item) => {
              const config = itemConfigs[item.title];
              const Icon = config.icon;

              return (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  whileHover={shouldReduceMotion ? {} : { y: -4 }}
                  className={`group relative overflow-hidden rounded-2xl bg-card border border-border/80 dark:border-white/[0.08] p-6 sm:p-7 flex flex-col justify-between shadow-xs transition-all duration-300 ${config.hoverBorder}`}
                >
                  {/* Subtle Localized Ambient Glow */}
                  <div
                    className={`absolute -top-12 -right-12 w-48 h-48 ${config.glowBg} rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  {/* Top Bar: Numeral & Icon */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/60">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono text-xs font-bold tracking-widest ${config.accentText}`}
                        >
                          {config.numeral} //
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted font-medium">
                          {config.tag}
                        </span>
                      </div>

                      <div
                        className={`w-9 h-9 rounded-xl ${config.accentBg} border ${config.accentBorder} flex items-center justify-center ${config.accentText} transition-transform duration-300 group-hover:scale-105`}
                      >
                        <Icon size={18} />
                      </div>
                    </div>

                    {/* Typography: Elevated Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
                      {item.title}
                    </h3>

                    {/* Narrow-Measure Body Text (~45-55 characters per line) */}
                    <p className="mt-2.5 text-xs sm:text-sm text-text-secondary leading-relaxed max-w-[48ch]">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Minimal Accent Line */}
                  <div className="relative z-10 pt-5 mt-5 border-t border-border/40 flex items-center justify-between text-[11px] font-mono text-text-muted">
                    <span className="group-hover:text-text-primary transition-colors">
                      Engineered In-House
                    </span>
                    <ArrowUpRight
                      size={14}
                      className={`transition-all duration-300 ${config.accentText} opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
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
