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
      className="section-padding bg-bg border-t border-border relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        {/* Section Header with Eyebrow Rule and Gradient Focal Accent */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
          className="max-w-3xl mb-14 sm:mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-semibold text-accent font-mono">
              CLIENT FEEDBACK
            </span>
            <span className="w-12 h-px bg-accent/40 hidden sm:block" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-semibold text-text-primary tracking-tight leading-[1.15]">
            Trusted by businesses to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-accent font-semibold">
              deliver results
            </span>
            .
          </h2>

          <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl font-normal">
            Real feedback from direct client partnerships across custom websites, booking engines, and business software.
          </p>
        </motion.div>

        {/* Full-Width Featured Client Showcase & Social Proof Card */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20, scale: shouldReduceMotion ? 1 : 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="group relative overflow-hidden rounded-3xl bg-card border border-border/80 dark:border-white/[0.08] shadow-sm hover:border-emerald-500/40 dark:hover:border-emerald-400/30 transition-all duration-300 p-7 sm:p-10 lg:p-12"
        >
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/[0.05] rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/[0.04] rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          {/* Horizontal Split Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Client Voice & Human Attribution */}
            <div className="lg:col-span-7 space-y-6 relative">
              {/* Oversized Background Watermark Quotation Mark */}
              <span
                aria-hidden="true"
                className="absolute -top-10 -left-4 sm:-top-14 sm:-left-6 text-8xl sm:text-9xl font-serif text-accent/10 dark:text-accent/[0.12] select-none pointer-events-none leading-none font-bold"
              >
                &ldquo;
              </span>

              {/* Partnership Label */}
              <div className="relative z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-[11px] font-mono text-text-secondary font-medium shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Hospitality Direct Booking Partnership</span>
              </div>

              {/* Distinctive Editorial Quote */}
              <blockquote className="relative z-10 text-xl sm:text-2xl lg:text-[26px] font-serif italic text-text-primary leading-relaxed">
                &ldquo;Vineet transformed our hotel&apos;s digital presence.{" "}
                <span className="text-accent dark:text-blue-400 font-semibold not-italic">
                  Direct inquiries through the website increased immediately
                </span>
                , and the room showcase looks stunning on mobile.&rdquo;
              </blockquote>

              {/* Human Attribution Block */}
              <div className="pt-6 border-t border-border/60 flex items-center gap-4">
                {/* Initial Avatar Badge */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-accent/20 border border-emerald-500/30 flex items-center justify-center text-sm font-bold text-emerald-700 dark:text-emerald-300 shadow-2xs shrink-0">
                  OA
                </div>

                <div className="space-y-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-base text-text-primary">
                      {item.author}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/80 dark:border-emerald-800/80">
                      <CheckCircle2 size={12} />
                      Verified Client
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-text-muted">
                    {item.role},{" "}
                    <span className="text-text-secondary font-medium">
                      {item.company}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Supporting Proof & Hard Metrics */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-surface/80 dark:bg-[#121216] border border-border/80 dark:border-white/[0.06] p-6 sm:p-7 space-y-5 shadow-2xs">
                {/* Project Header Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🌿</span>
                    <span className="text-sm font-semibold text-text-primary">
                      Hotel Greenery View
                    </span>
                  </div>
                  <a
                    href="https://www.hotelgreeneryview.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-text-muted hover:text-accent transition-colors"
                  >
                    <span>Live Site</span>
                    <ExternalLink size={11} />
                  </a>
                </div>

                {/* Hero Metric Callout */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
                    Measured Business Impact
                  </div>
                  <div className="text-4xl sm:text-5xl font-extrabold font-mono tracking-tight text-emerald-600 dark:text-emerald-400">
                    +65%
                  </div>
                  <div className="text-xs sm:text-sm text-text-secondary font-medium leading-relaxed">
                    Direct Inquiries &amp; Instant WhatsApp Bookings
                  </div>
                  <p className="text-xs text-text-muted leading-normal pt-1">
                    Eliminated 18–25% third-party OTA commissions within 60 days of production launch.
                  </p>
                </div>

                {/* Secondary Technical Vitals */}
                <div className="grid grid-cols-2 gap-2.5 pt-1 text-xs">
                  <div className="p-2.5 rounded-lg bg-bg border border-border/60 space-y-0.5">
                    <div className="text-[10px] text-text-muted font-mono">Performance</div>
                    <div className="font-bold font-mono text-text-primary">&lt; 0.8s Load</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-bg border border-border/60 space-y-0.5">
                    <div className="text-[10px] text-text-muted font-mono">SEO &amp; AI Search</div>
                    <div className="font-bold font-mono text-accent">Top LLM Rank</div>
                  </div>
                </div>

                {/* Case Study CTA Link */}
                <div className="pt-2">
                  <Link
                    href="/work/hotel-greenery-view"
                    className="inline-flex items-center justify-between w-full p-3 rounded-xl bg-accent/10 hover:bg-accent/15 border border-accent/20 text-accent font-semibold text-xs transition-colors group"
                  >
                    <span>Explore Full Case Study</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-1"
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
