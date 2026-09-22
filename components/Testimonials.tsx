"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ExternalLink } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { useReducedMotion } from "@/lib/reduced-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function Testimonials() {
  const shouldReduceMotion = useReducedMotion();

  // As required by brief: skip this section if no verified testimonials exist
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const item = testimonials[0];

  return (
    <section
      id="testimonials"
      className="py-20 sm:py-28 lg:py-32 bg-bg border-t border-border/50 relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          className="max-w-3xl mb-14 sm:mb-18"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-90" />
            <span className="text-xs uppercase tracking-widest font-medium text-accent font-mono">
              CLIENT FEEDBACK
            </span>
            <span className="w-10 h-px bg-accent/30 hidden sm:block" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-semibold text-text-primary tracking-[-0.015em] leading-[1.2] sm:leading-[1.18]">
            Trusted by businesses to{" "}
            <span className="italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-accent pb-1 -mb-1 pr-1.5 -mr-1.5 tracking-[0.015em]">
              deliver results.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl font-normal">
            Real feedback from direct client partnerships across custom websites, booking engines, and business software.
          </p>
        </motion.div>

        {/* Featured Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
          className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-50/70 dark:bg-[#111116]/80 border border-slate-200/70 dark:border-white/[0.05] p-7 sm:p-10 lg:p-12 shadow-xs transition-colors duration-300 hover:border-slate-300 dark:hover:border-white/[0.1]"
        >
          {/* Horizontal Split Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Client Voice & Attribution */}
            <div className="lg:col-span-7 space-y-6 relative">
              {/* Subtle Watermark Quotation Mark */}
              <span
                aria-hidden="true"
                className="absolute -top-8 -left-3 sm:-top-10 sm:-left-4 text-7xl sm:text-8xl font-serif text-slate-300/40 dark:text-white/[0.05] select-none pointer-events-none leading-none font-bold"
              >
                &ldquo;
              </span>

              {/* Partnership Label */}
              <div className="relative z-10 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/[0.04] text-[10px] font-mono text-text-muted font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                <span>Hospitality Direct Booking Partnership</span>
              </div>

              {/* Editorial Quote */}
              <blockquote className="relative z-10 text-xl sm:text-2xl lg:text-[25px] font-serif italic text-text-primary leading-[1.6] tracking-[0.01em]">
                &ldquo;Vineet transformed our hotel&apos;s digital presence.{" "}
                <span className="text-accent dark:text-blue-400 font-semibold not-italic">
                  Direct inquiries through the website increased immediately
                </span>
                , and the room showcase looks stunning on mobile.&rdquo;
              </blockquote>

              {/* Human Attribution Block */}
              <div className="pt-5 border-t border-slate-200/60 dark:border-white/[0.04] flex items-center gap-4">
                {/* Initial Avatar Badge */}
                <div className="w-11 h-11 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200/70 dark:border-white/[0.06] flex items-center justify-center text-xs font-semibold text-text-primary shrink-0">
                  OA
                </div>

                <div className="space-y-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-base text-text-primary">
                      {item.author}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      <CheckCircle2 size={11} />
                      Verified Client
                    </span>
                  </div>
                  <div className="text-xs sm:text-[13px] text-text-muted">
                    {item.role},{" "}
                    <span className="text-text-secondary font-medium">
                      {item.company}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Case Study Data Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-white/70 dark:bg-[#15151c]/70 border border-slate-200/70 dark:border-white/[0.04] p-6 sm:p-7 space-y-4 shadow-xs">
                {/* Project Header Bar */}
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-200/60 dark:border-white/[0.04]">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🌿</span>
                    <span className="text-sm font-semibold text-text-primary">
                      Hotel Greenery View
                    </span>
                  </div>
                  <a
                    href="https://www.hotelgreeneryview.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-text-muted hover:text-accent transition-colors"
                  >
                    <span>Live Site</span>
                    <ExternalLink size={10} />
                  </a>
                </div>

                {/* Hero Metric Callout */}
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted/80 font-medium">
                    Measured Business Impact
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-emerald-500 dark:text-emerald-400">
                    +65%
                  </div>
                  <div className="text-xs sm:text-[13px] text-text-secondary font-medium leading-relaxed pt-0.5">
                    Direct Inquiries &amp; Instant WhatsApp Bookings
                  </div>
                  <p className="text-xs text-text-muted/80 leading-normal pt-0.5">
                    Eliminated 18–25% third-party OTA commissions within 60 days of production launch.
                  </p>
                </div>

                {/* Secondary Technical Vitals */}
                <div className="grid grid-cols-2 gap-2.5 pt-1 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/[0.035] space-y-0.5">
                    <div className="text-[10px] text-text-muted/80 font-mono">Performance</div>
                    <div className="font-semibold font-mono text-xs text-text-primary">&lt; 0.8s Load</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/[0.035] space-y-0.5">
                    <div className="text-[10px] text-text-muted/80 font-mono">SEO &amp; AI Search</div>
                    <div className="font-semibold font-mono text-xs text-accent">Top LLM Rank</div>
                  </div>
                </div>

                {/* Case Study CTA Link */}
                <div className="pt-2">
                  <Link
                    href="/work/hotel-greenery-view"
                    className="inline-flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-slate-100/60 dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.06] border border-slate-200/60 dark:border-white/[0.04] hover:border-slate-300 dark:hover:border-white/[0.08] text-text-primary text-xs font-medium transition-colors group"
                  >
                    <span className="group-hover:text-accent transition-colors">Explore Full Case Study</span>
                    <ArrowRight
                      size={13}
                      className="text-text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all"
                    />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
