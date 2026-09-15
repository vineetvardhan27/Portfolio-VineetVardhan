"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Clock, Sparkles, ArrowRight, ShieldCheck, Zap, Crown } from "lucide-react";
import { pricingTiers } from "@/content/pricing";
import { useReducedMotion } from "@/lib/reduced-motion";

export function Pricing() {
  const [region, setRegion] = useState<"IN" | "INTL">("IN");
  const shouldReduceMotion = useReducedMotion();

  // Helper to render price with superscript-style currency symbol and tabular figures
  const renderPrice = (priceStr: string) => {
    const currency = priceStr.startsWith("₹") ? "₹" : priceStr.startsWith("$") ? "$" : "";
    const cleanNumbers = priceStr.replaceAll("₹", "").replaceAll("$", "").trim();

    return (
      <div className="flex items-baseline tracking-tight">
        <span className="text-lg sm:text-xl font-medium text-text-muted mr-1 select-none">
          {currency}
        </span>
        <span className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-text-primary">
          {cleanNumbers}
        </span>
      </div>
    );
  };

  return (
    <section id="pricing" className="section-padding bg-bg border-t border-border relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Section Header & Currency Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="max-w-xl"
          >
            <div className="text-xs uppercase tracking-wider font-semibold text-accent mb-2">
              Transparent Pricing
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold text-text-primary tracking-tight leading-tight">
              Clear{" "}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-sky-300">
                investment
                <span className="absolute left-0 -bottom-0.5 w-full h-[3px] rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-80" />
              </span>{" "}
              expectations. No hidden fees.
            </h2>
            <p className="mt-3.5 text-base sm:text-lg text-text-secondary leading-relaxed">
              Fixed-scope project pricing with direct communication, clear milestones, and complete codebase handover.
            </p>
          </motion.div>

          {/* Region / Currency Switcher with smooth morph pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="self-start md:self-auto p-1 bg-surface dark:bg-[#121216] border border-border dark:border-white/10 rounded-full flex items-center relative shadow-2xs"
          >
            <button
              onClick={() => setRegion("IN")}
              className={`relative px-5 py-2 text-xs font-semibold rounded-full transition-colors z-10 select-none flex items-center gap-1.5 focus:outline-none ${
                region === "IN"
                  ? "text-text-primary dark:text-white font-bold"
                  : "text-text-muted hover:text-text-secondary dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              {region === "IN" && (
                <motion.div
                  layoutId="pricing-region-pill"
                  className="absolute inset-0 bg-white dark:bg-[#24242C] rounded-full shadow-xs border border-border/80 dark:border-white/20 -z-10"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <span>🇮🇳</span>
              <span>India (INR)</span>
            </button>

            <button
              onClick={() => setRegion("INTL")}
              className={`relative px-5 py-2 text-xs font-semibold rounded-full transition-colors z-10 select-none flex items-center gap-1.5 focus:outline-none ${
                region === "INTL"
                  ? "text-text-primary dark:text-white font-bold"
                  : "text-text-muted hover:text-text-secondary dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              {region === "INTL" && (
                <motion.div
                  layoutId="pricing-region-pill"
                  className="absolute inset-0 bg-white dark:bg-[#24242C] rounded-full shadow-xs border border-border/80 dark:border-white/20 -z-10"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <span>🌐</span>
              <span>International (USD)</span>
            </button>
          </motion.div>
        </div>

        {/* 3 Distinct Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8 items-stretch pt-4">
          {pricingTiers.map((tier, idx) => {
            const isEntry = tier.id === "website";
            const isFeatured = tier.id === "webapp";
            const isPremium = tier.id === "enterprise-pms";
            const priceDisplay = region === "IN" ? tier.price.IN : tier.price.INTL;

            // Tier-specific styling configuration
            let cardClasses = "";
            let checkColor = "";
            let ctaButtonVariant = "";
            let ribbonBadge: React.ReactNode = null;
            let liftAmount = isFeatured ? -8 : -4;

            if (isEntry) {
              // Understated Entry Tier
              cardClasses =
                "bg-card dark:bg-[#131316] border border-slate-200/70 dark:border-white/[0.06] shadow-xs hover:border-slate-300 dark:hover:border-white/20 hover:shadow-md";
              checkColor = "text-emerald-500/80 dark:text-emerald-400/90";
              ctaButtonVariant =
                "bg-white dark:bg-white/[0.05] border border-border dark:border-white/[0.15] text-text-primary hover:bg-surface dark:hover:bg-white/[0.1] hover:border-slate-300 dark:hover:border-white/25";
            } else if (isFeatured) {
              // "Most Popular" Middle-Value Tier with Electric Blue Glow & Depth
              cardClasses =
                "bg-gradient-to-b from-blue-500/[0.05] via-card to-card dark:from-blue-500/[0.1] dark:via-[#141418] dark:to-[#141418] border-2 border-blue-500/60 dark:border-blue-500/50 shadow-lg shadow-blue-500/10 dark:shadow-[0_20px_50px_-15px_rgba(59,130,246,0.22)] hover:border-blue-500 dark:hover:border-blue-400";
              checkColor = "text-blue-500 dark:text-blue-400";
              ctaButtonVariant =
                "bg-blue-600 text-white hover:bg-blue-500 dark:bg-[#2F6EEB] dark:hover:bg-[#3B82F6] dark:hover:shadow-[0_0_24px_rgba(59,130,246,0.4)] shadow-sm";
              ribbonBadge = (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-blue-600 dark:bg-blue-500 text-white shadow-md flex items-center gap-1.5 ring-4 ring-bg z-20">
                  <Zap size={11} className="fill-white" />
                  <span>Most Popular</span>
                </div>
              );
            } else if (isPremium) {
              // Full Custom Enterprise Tier with Luxury Gold / Amber Palette
              cardClasses =
                "bg-gradient-to-b from-amber-500/[0.04] via-card to-card dark:from-amber-950/20 dark:via-[#131215] dark:to-[#111114] border border-amber-500/30 dark:border-amber-500/25 shadow-sm hover:border-amber-500/60 dark:hover:border-amber-500/40 hover:shadow-[0_20px_50px_-15px_rgba(245,158,11,0.15)]";
              checkColor = "text-amber-500 dark:text-amber-400";
              ctaButtonVariant =
                "bg-amber-500/15 text-amber-900 dark:text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 dark:hover:bg-amber-500/25";
              ribbonBadge = (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 shadow-md flex items-center gap-1.5 ring-4 ring-bg z-20">
                  <Crown size={11} className="text-amber-500" />
                  <span>Enterprise Grade</span>
                </div>
              );
            }

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.35, delay: idx * 0.08, ease: "easeOut" }}
                whileHover={shouldReduceMotion ? {} : { y: liftAmount }}
                className={`relative flex flex-col justify-between p-7 sm:p-8 rounded-3xl transition-all duration-300 ${cardClasses}`}
              >
                {/* Floating Ribbon Tag Breaking Card Boundary */}
                {ribbonBadge}

                <div>
                  {/* Title & Description */}
                  <div className="min-h-[28px] mt-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                      {tier.name}
                    </h3>
                  </div>

                  <p className="mt-2.5 text-xs sm:text-sm text-text-secondary leading-relaxed min-h-[40px]">
                    {tier.description}
                  </p>

                  {/* Price Display: The Confident Hero */}
                  <div className="mt-6 pt-6 border-t border-slate-200/60 dark:border-white/[0.08]">
                    <div className="text-[11px] uppercase tracking-wider font-semibold text-text-muted mb-1.5">
                      Estimated Investment
                    </div>
                    {renderPrice(priceDisplay)}

                    {/* Timeline: Clearly Secondary */}
                    <div className="mt-3.5 flex items-center gap-1.5 text-xs text-text-muted font-medium">
                      <Clock size={12} className="shrink-0 text-text-muted/80" />
                      <span>Timeline: {tier.timeline}</span>
                    </div>
                  </div>

                  {/* Deliverables Checklist: Grouped Rhythms */}
                  <div className="mt-7">
                    <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-3.5">
                      What's Included
                    </div>

                    <div className="space-y-3">
                      {tier.deliverables.map((item, dIdx) => {
                        // For premium tier, visually highlight 2-3 standout enterprise items
                        const isStandout =
                          isPremium &&
                          (dIdx === 1 || dIdx === 2 || dIdx === 5);

                        return (
                          <div
                            key={item}
                            className={`flex items-start gap-2.5 text-xs leading-relaxed ${
                              isStandout
                                ? "font-semibold text-text-primary dark:text-zinc-100"
                                : "text-text-secondary"
                            }`}
                          >
                            <Check size={14} className={`shrink-0 mt-0.5 ${checkColor}`} />
                            <span>{item}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Card CTA & Best For Footer */}
                <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-white/[0.08]">
                  <a
                    href="#contact"
                    className={`w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 select-none ${ctaButtonVariant}`}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowRight size={14} />
                  </a>
                  <p className="text-[11px] text-text-muted text-center mt-3 leading-tight">
                    Best for: {tier.bestFor}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
