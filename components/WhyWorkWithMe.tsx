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
        duration: 0.5,
        ease: EASE_OUT_EXPO,
      },
    },
  };

  const LeadIcon = leadConfig.icon;

  return (
    <section
      id="why-me"
      className="section-padding bg-bg dark:bg-[#09090B] border-t border-border dark:border-white/[0.06] relative"
    >
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          {/* Eyebrow with Subtle Marker */}
          <div className="inline-flex items-center gap-2 text-[12px] font-sans font-medium tracking-[0.04em] uppercase text-accent dark:text-[#E5A93C] mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent dark:bg-[#E5A93C]" />
            <span>05 · Why Work With Me</span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[46px] font-semibold text-text-primary dark:text-[#F4F4F6] tracking-[-0.04em] leading-[1.08] sm:leading-[1.05]">
            Senior full-stack engineering with zero agency overhead.
          </h2>

          <p className="mt-4 text-[16px] sm:text-[17.5px] text-text-secondary dark:text-[#A0A3AC] leading-[1.6] max-w-2xl font-normal">
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
            className="group relative overflow-hidden rounded-xl bg-card dark:bg-[#121318] border border-border dark:border-white/[0.07] hover:border-black/20 dark:hover:border-white/[0.12] hover:shadow-md p-5 sm:p-8 lg:p-9 transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              {/* Left Column: Numeral, Icon & Elevated Title */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="font-sans text-xs font-semibold text-accent dark:text-[#E5A93C]">
                    {leadConfig.numeral}
                  </span>
                  <span className="text-[11.5px] font-sans px-2.5 py-0.5 rounded bg-surface border border-border dark:border-transparent dark:bg-white/[0.03] text-text-muted dark:text-[#A0A3AC] font-medium">
                    {leadConfig.tag}
                  </span>
                </div>

                <div className="flex items-center gap-3.5 pt-0.5">
                  <div className="w-10 h-10 rounded-md bg-surface dark:bg-white/[0.04] border border-border dark:border-white/[0.06] text-accent dark:text-[#E5A93C] flex items-center justify-center shrink-0">
                    <LeadIcon size={20} />
                  </div>
                  <h3 className="text-xl sm:text-[22px] lg:text-[24px] font-semibold text-text-primary dark:text-[#F4F4F6] tracking-[-0.035em] leading-snug">
                    {leadItem.title}
                  </h3>
                </div>
              </div>

              {/* Right Column: Narrative & Metadata */}
              <div className="lg:col-span-6 space-y-4 lg:border-l lg:border-border dark:lg:border-white/[0.06] lg:pl-8">
                <p className="text-[15px] sm:text-[16px] text-text-secondary dark:text-[#A0A3AC] leading-[1.62] max-w-xl font-normal">
                  {leadItem.description}
                </p>

                {/* Editorial Micro-Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11.5px] font-sans font-medium text-text-muted dark:text-[#A0A3AC]">
                  <span className="px-2.5 py-0.5 rounded bg-surface border border-border dark:border-transparent dark:bg-white/[0.03]">
                    Revenue-Driven
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-surface border border-border dark:border-transparent dark:bg-white/[0.03]">
                    Direct Booking Conversion
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-surface border border-border dark:border-transparent dark:bg-white/[0.03]">
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
                  className="group relative overflow-hidden rounded-xl bg-card dark:bg-[#14151A] border border-border dark:border-white/[0.07] hover:border-black/20 dark:hover:border-white/[0.12] hover:shadow-md p-5 sm:p-6 flex flex-col justify-between transition-all duration-300"
                >
                  {/* Top Bar: Numeral & Icon */}
                  <div>
                    <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-border dark:border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-xs font-semibold text-accent dark:text-[#E5A93C]">
                          {config.numeral}
                        </span>
                        <span className="text-[11.5px] font-sans text-text-muted dark:text-[#A0A3AC] font-medium">
                          {config.tag}
                        </span>
                      </div>

                      <div className="w-8 h-8 rounded-md bg-surface dark:bg-white/[0.04] border border-border dark:border-white/[0.06] text-accent dark:text-[#E5A93C] flex items-center justify-center">
                        <Icon size={16} />
                      </div>
                    </div>

                    {/* Typography: Elevated Title */}
                    <h3 className="text-lg sm:text-[19px] lg:text-[20px] font-semibold text-text-primary dark:text-[#F4F4F6] tracking-[-0.03em] leading-snug">
                      {item.title}
                    </h3>

                    {/* Body Text */}
                    <p className="mt-2.5 text-xs sm:text-[14px] text-text-secondary dark:text-[#A0A3AC] leading-[1.6] font-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Minimal Accent Line */}
                  <div className="pt-4 mt-6 border-t border-border dark:border-white/[0.05] flex items-center justify-between text-[11.5px] font-sans font-medium text-text-muted dark:text-[#A0A3AC]">
                    <span className="group-hover:text-text-primary dark:group-hover:text-[#F4F4F6] transition-colors">
                      Engineered In-House
                    </span>
                    <ArrowUpRight
                      size={13}
                      className="text-text-muted dark:text-[#A0A3AC] opacity-50 group-hover:opacity-100 group-hover:text-accent dark:group-hover:text-[#E5A93C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 ease-out"
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
