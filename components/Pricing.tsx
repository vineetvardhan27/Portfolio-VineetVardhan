"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Clock, ArrowRight } from "lucide-react";
import { pricingTiers } from "@/content/pricing";
import { useReducedMotion } from "@/lib/reduced-motion";
import { Button } from "./ui/Button";

export function Pricing() {
  const [region, setRegion] = useState<"IN" | "INTL">("IN");
  const shouldReduceMotion = useReducedMotion();

  // Helper to render price with tabular figures
  const renderPrice = (priceStr: string) => {
    const currency = priceStr.startsWith("₹") ? "₹" : priceStr.startsWith("$") ? "$" : "";
    const cleanNumbers = priceStr.replaceAll("₹", "").replaceAll("$", "").trim();

    return (
      <div className="flex items-baseline tracking-tight">
        <span className="text-lg sm:text-xl font-medium text-text-muted mr-1 select-none">
          {currency}
        </span>
        <span className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-text-primary">
          {cleanNumbers}
        </span>
      </div>
    );
  };

  return (
    <section id="pricing" className="section-padding bg-bg border-t border-border/80 dark:border-white/[0.06] relative">
      <div className="container-custom">
        {/* Section Header & Currency Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent mb-3 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>03 · Transparent Pricing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-medium text-text-primary tracking-[-0.02em] leading-[1.2] sm:leading-[1.18]">
              Clear investment expectations. No hidden fees.
            </h2>
            <p className="mt-3.5 text-base sm:text-lg text-text-secondary leading-relaxed">
              Fixed-scope project pricing with direct communication, clear milestones, and complete codebase handover.
            </p>
          </motion.div>

          {/* Region / Currency Switcher */}
          <div className="self-start md:self-auto p-1 bg-surface/70 dark:bg-white/[0.03] border border-border/80 dark:border-white/[0.08] rounded-md flex items-center shadow-2xs">
            <button
              onClick={() => setRegion("IN")}
              className={`px-3.5 py-1.5 text-xs font-mono rounded transition-colors select-none flex items-center gap-1.5 focus:outline-none ${
                region === "IN"
                  ? "bg-card text-text-primary font-semibold border border-border shadow-2xs"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              <span>India (INR)</span>
            </button>

            <button
              onClick={() => setRegion("INTL")}
              className={`px-3.5 py-1.5 text-xs font-mono rounded transition-colors select-none flex items-center gap-1.5 focus:outline-none ${
                region === "INTL"
                  ? "bg-card text-text-primary font-semibold border border-border shadow-2xs"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              <span>International (USD)</span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {pricingTiers.map((tier, idx) => {
            const isFeatured = tier.id === "webapp";
            const priceDisplay = region === "IN" ? tier.price.IN : tier.price.INTL;

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.35, delay: idx * 0.08, ease: "easeOut" }}
                className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-xl bg-card border transition-all duration-200 shadow-xs ${
                  isFeatured
                    ? "border-accent/60 dark:border-accent/50 ring-1 ring-accent/30"
                    : "border-border/80 dark:border-white/[0.07] hover:border-border-accent/40"
                }`}
              >
                <div>
                  {/* Top Badge for Featured */}
                  {isFeatured && (
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold bg-accent-subtle text-accent border border-border-accent/30 mb-3">
                      <span>Most Popular</span>
                    </div>
                  )}

                  {/* Title & Description */}
                  <div className="min-h-[28px]">
                    <h3 className="text-xl sm:text-2xl font-medium text-text-primary tracking-tight">
                      {tier.name}
                    </h3>
                  </div>

                  <p className="mt-2 text-xs sm:text-sm text-text-secondary leading-relaxed min-h-[40px]">
                    {tier.description}
                  </p>

                  {/* Price Display */}
                  <div className="mt-6 pt-6 border-t border-border/70 dark:border-white/[0.06]">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-text-muted mb-1 font-medium">
                      Estimated Investment
                    </div>
                    {renderPrice(priceDisplay)}

                    {/* Timeline */}
                    <div className="mt-3 flex items-center gap-1.5 text-xs font-mono text-text-muted">
                      <Clock size={12} className="shrink-0 text-text-muted" />
                      <span>Timeline: {tier.timeline}</span>
                    </div>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="mt-7">
                    <div className="text-[11px] font-mono font-medium text-text-muted uppercase tracking-wider mb-3.5">
                      What&apos;s Included
                    </div>

                    <div className="space-y-2.5">
                      {tier.deliverables.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-2.5 text-xs text-text-secondary leading-relaxed"
                        >
                          <Check size={13} className="shrink-0 mt-0.5 text-accent" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card CTA & Best For */}
                <div className="mt-8 pt-6 border-t border-border/70 dark:border-white/[0.06]">
                  <Button
                    href="#contact"
                    variant={isFeatured ? "primary" : "secondary"}
                    size="md"
                    className="w-full justify-center"
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowRight size={13} />
                  </Button>
                  <p className="text-[11px] font-mono text-text-muted text-center mt-3 leading-tight">
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
