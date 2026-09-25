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
          <div className="inline-flex items-center gap-2 text-[12px] font-sans font-medium tracking-[0.04em] uppercase text-accent mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>06 · Client Feedback</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-text-primary tracking-[-0.022em] leading-[1.18] sm:leading-[1.16]">
            Trusted by businesses to deliver results.
          </h2>

          <p className="mt-3.5 text-base sm:text-[17px] text-text-secondary leading-[1.62] max-w-2xl font-normal">
            Real feedback from direct client partnerships across custom websites, booking engines, and business software.
          </p>
        </motion.div>

        {/* Featured Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          className="group relative overflow-hidden rounded-xl bg-card border border-border/80 dark:border-white/[0.07] hover:border-border-accent/40 p-6 sm:p-9 lg:p-10 shadow-xs transition-colors"
        >
          {/* Horizontal Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Client Voice & Attribution */}
            <div className="lg:col-span-7 space-y-6 relative">
              {/* Partnership Label */}
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-surface/70 dark:bg-white/[0.03] border border-border/70 dark:border-white/[0.05] text-[11.5px] font-sans text-text-muted font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                <span>Hospitality Direct Booking Partnership</span>
              </div>

              {/* Editorial Quote */}
              <blockquote className="text-xl sm:text-2xl lg:text-[23px] font-serif italic text-text-primary leading-[1.6] tracking-[0.01em]">
                &ldquo;Vineet transformed our hotel&apos;s digital presence.{" "}
                <span className="text-accent font-semibold not-italic font-sans">
                  Direct inquiries through the website increased immediately
                </span>
                , and the room showcase looks stunning on mobile.&rdquo;
              </blockquote>

              {/* Attribution Block */}
              <div className="pt-5 border-t border-border/70 dark:border-white/[0.05] flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface dark:bg-white/[0.04] border border-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0">
                  OA
                </div>

                <div className="space-y-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-sm sm:text-base text-text-primary">
                      {item.author}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-sans font-medium text-success bg-success/15 border border-success/30 px-2 py-0.5 rounded">
                      <CheckCircle2 size={11} />
                      Verified Client
                    </span>
                  </div>
                  <div className="text-xs text-text-muted">
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
              <div className="rounded-lg bg-surface/40 dark:bg-white/[0.02] border border-border/70 dark:border-white/[0.05] p-5 sm:p-6 space-y-4 shadow-2xs">
                {/* Project Header Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-border/70 dark:border-white/[0.05]">
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
                    className="inline-flex items-center gap-1 text-[12px] font-sans text-text-muted hover:text-accent transition-colors font-medium"
                  >
                    <span>Live Site</span>
                    <ExternalLink size={11} />
                  </a>
                </div>

                {/* Hero Metric Callout */}
                <div className="space-y-1">
                  <div className="text-[11.5px] font-sans font-medium text-text-muted tracking-[0.01em]">
                    Measured Business Impact
                  </div>
                  <div className="text-3xl sm:text-4xl font-semibold font-sans tracking-tight text-success tabular-nums">
                    +65%
                  </div>
                  <div className="text-xs sm:text-[13px] text-text-secondary font-medium leading-relaxed pt-0.5">
                    Direct Inquiries &amp; Instant WhatsApp Bookings
                  </div>
                  <p className="text-xs text-text-muted leading-normal pt-0.5 font-normal">
                    Eliminated 18–25% third-party OTA commissions within 60 days of production launch.
                  </p>
                </div>

                {/* Secondary Technical Vitals */}
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                  <div className="p-2.5 rounded bg-card border border-border/60 space-y-0.5">
                    <div className="text-[11px] text-text-muted font-sans font-medium">Performance</div>
                    <div className="font-semibold font-sans text-xs text-text-primary tabular-nums">&lt; 0.8s Load</div>
                  </div>
                  <div className="p-2.5 rounded bg-card border border-border/60 space-y-0.5">
                    <div className="text-[11px] text-text-muted font-sans font-medium">SEO &amp; AI Search</div>
                    <div className="font-semibold font-sans text-xs text-accent">Top LLM Rank</div>
                  </div>
                </div>

                {/* Case Study CTA Link */}
                <div className="pt-2">
                  <Link
                    href="/work/hotel-greenery-view"
                    className="inline-flex items-center justify-between w-full px-3.5 py-2 rounded-md bg-card hover:bg-surface border border-border/80 text-text-primary text-xs font-medium transition-colors group"
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
