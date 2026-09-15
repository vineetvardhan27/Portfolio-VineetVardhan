"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  useAnimationControls,
} from "framer-motion";
import { ArrowRight, CheckCircle2, TrendingUp, ShieldCheck } from "lucide-react";
import { Button } from "./ui/Button";
import { heroCopy, positioning } from "@/content/copy";
import { useReducedMotion } from "@/lib/reduced-motion";

// ── Easing Constants ──
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_OUT_QUINT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_OUT_CUBIC: [number, number, number, number] = [0.33, 1, 0.68, 1];

// ── Animated Count-Up Component ──
function AnimatedCountUp({
  target,
  prefix = "",
  suffix = "",
  duration = 1.8,
  delay = 0,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
}) {
  const [displayVal, setDisplayVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    const startTime = performance.now() + delay * 1000;
    let animFrame: number;

    function tick(now: number) {
      const elapsed = Math.max(0, now - startTime);
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // Ease-out-expo curve
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayVal(Math.round(eased * target));
      if (progress < 1) {
        animFrame = requestAnimationFrame(tick);
      }
    }

    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, [isInView, target, duration, delay]);

  return (
    <span ref={ref}>
      {prefix}
      {displayVal.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

// ── Stagger delay calculator for choreographed sequence ──
const STAGGER = {
  badge: 0.1,
  headlineLine1: 0.2,
  headlineLine2: 0.35,
  headlineLine3: 0.5,
  subheading: 0.65,
  ctaButtons: 0.75,
  ctaButtonGap: 0.08,
  microcopy: 0.85,
  trustRow: 0.95,
  trustItemGap: 0.06,
  // Demo card (right column) — enters independently, later
  demoCard: 0.55,
  demoChrome: 0.75,
  demoStats: 0.95,
  demoStatsGap: 0.12,
  demoMatrix: 1.15,
  demoFooter: 1.35,
} as const;

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // ── Parallax scroll-out ──
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const leftColumnY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const rightColumnY = useTransform(scrollYProgress, [0, 1], [0, -35]);
  const leftColumnOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7], [1, 1, 0]);
  const rightColumnOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 1, 0]);

  const smoothLeftY = useSpring(leftColumnY, { stiffness: 100, damping: 30, mass: 0.5 });
  const smoothRightY = useSpring(rightColumnY, { stiffness: 80, damping: 30, mass: 0.8 });

  // ── Shared entrance motion factory ──
  function makeEntrance(delay: number, distance = 18, dur = 0.5) {
    if (shouldReduceMotion) {
      return { initial: { opacity: 1 }, animate: { opacity: 1 } };
    }
    return {
      initial: { opacity: 0, y: distance },
      animate: {
        opacity: 1,
        y: 0,
        transition: { duration: dur, delay, ease: EASE_OUT_EXPO },
      },
    };
  }

  // Spring entrance for tactile elements (buttons, badges, icons)
  function makeSpringEntrance(delay: number, distance = 14) {
    if (shouldReduceMotion) {
      return { initial: { opacity: 1, scale: 1 }, animate: { opacity: 1, scale: 1 } };
    }
    return {
      initial: { opacity: 0, y: distance, scale: 0.92 },
      animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          delay,
          type: "spring" as const,
          stiffness: 400,
          damping: 28,
          mass: 0.8,
        },
      },
    };
  }

  // ── Trust row items ──
  const trustItems = [
    { icon: CheckCircle2, text: "Next.js 14 & Sub-second Speed", color: "text-emerald-600 dark:text-emerald-400" },
    { icon: ShieldCheck, text: "Zero Agency Markup", color: "text-accent dark:text-blue-400" },
    { icon: TrendingUp, text: "Conversion-Engineered", color: "text-emerald-600 dark:text-emerald-400" },
  ];

  return (
    <section ref={sectionRef} className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-bg">
      {/* Large-scale Atmospheric Radial Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(59,130,246,0.09),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(59,130,246,0.12),rgba(13,13,16,0))] pointer-events-none" />

      {/* Edge-Fading Subtle Dot-Matrix Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none opacity-60" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ═══════════════════════════════════════════════
              LEFT COLUMN: Copy, CTAs & Microcopy
              Parallax scroll-out with spring-smoothed Y
              ═══════════════════════════════════════════════ */}
          <motion.div
            style={shouldReduceMotion ? {} : { y: smoothLeftY, opacity: leftColumnOpacity }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* ── 1. Top Badge (100ms) — spring scale-in ── */}
            <motion.div
              {...makeSpringEntrance(STAGGER.badge, 10)}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-white/[0.06] backdrop-blur-xs border border-slate-200 dark:border-white/[0.14] shadow-2xs mb-6 text-xs font-mono font-medium text-slate-700 dark:text-zinc-200"
            >
              <span className="relative flex h-2 w-2">
                <motion.span
                  initial={shouldReduceMotion ? {} : { scale: 0 }}
                  animate={shouldReduceMotion ? {} : { scale: [0, 1.6, 0] }}
                  transition={{
                    delay: STAGGER.badge + 0.4,
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                />
                <motion.span
                  initial={shouldReduceMotion ? {} : { scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: STAGGER.badge + 0.15,
                    type: "spring",
                    stiffness: 500,
                    damping: 20,
                  }}
                  className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]"
                />
              </span>
              <span className="tracking-wide">
                Websites <span className="text-text-muted px-0.5">•</span> Booking Systems{" "}
                <span className="text-text-muted px-0.5">•</span> Business Software
              </span>
            </motion.div>

            {/* ── 2. Headline — 3 reveal lines (200ms, 350ms, 500ms) ── */}
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] leading-[1.08] font-bold text-text-primary tracking-tight max-w-2xl">
              <motion.span
                {...makeEntrance(STAGGER.headlineLine1, 22, 0.55)}
                className="inline-block"
              >
                Your business deserves
              </motion.span>
              <br className="hidden sm:inline" />{" "}
              <motion.span
                {...makeEntrance(STAGGER.headlineLine2, 22, 0.55)}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-accent to-blue-500 dark:from-blue-300 dark:via-sky-200 dark:to-blue-400"
              >
                a better digital
              </motion.span>{" "}
              <motion.span
                {...makeEntrance(STAGGER.headlineLine3, 22, 0.55)}
                className="inline-block"
              >
                experience.
              </motion.span>
            </h1>

            {/* ── 3. Subheading (650ms) ── */}
            <motion.p
              {...makeEntrance(STAGGER.subheading, 16, 0.45)}
              className="mt-5 text-lg sm:text-xl text-text-secondary max-w-[54ch] leading-relaxed font-normal"
            >
              {heroCopy.subtext}
            </motion.p>

            {/* ── 4. CTA Buttons (750ms, staggered 80ms apart) — spring bounce ── */}
            <motion.div
              {...makeEntrance(STAGGER.ctaButtons, 12, 0.4)}
              className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto"
            >
              <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
                <motion.div {...makeSpringEntrance(STAGGER.ctaButtons, 10)}>
                  <Button
                    href="#contact"
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto group shadow-md shadow-accent/25 hover:shadow-lg hover:shadow-accent/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    <span>{heroCopy.primaryCTA}</span>
                    <ArrowRight
                      size={17}
                      className="group-hover:translate-x-1 transition-transform duration-200"
                    />
                  </Button>
                </motion.div>
                <motion.div {...makeSpringEntrance(STAGGER.ctaButtons + STAGGER.ctaButtonGap, 10)}>
                  <Button
                    href="#work"
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    {heroCopy.secondaryCTA}
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* ── 5. Microcopy (850ms) ── */}
            <motion.div
              {...makeEntrance(STAGGER.microcopy, 10, 0.35)}
              className="mt-5 flex items-center gap-2.5 text-xs font-mono text-text-secondary dark:text-zinc-400"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
              <span>No commitment — 15 min discovery call &amp; technical feasibility</span>
            </motion.div>

            {/* ── 6. Trust Row (950ms+, items stagger left-to-right 60ms apart) ── */}
            <motion.div
              {...makeEntrance(STAGGER.trustRow, 10, 0.35)}
              className="mt-12 pt-8 border-t border-slate-200/80 dark:border-white/[0.08] w-full flex flex-wrap items-center gap-y-3 gap-x-4 sm:gap-x-6 text-xs text-text-secondary font-medium"
            >
              {trustItems.map((item, i) => (
                <motion.div
                  key={item.text}
                  {...makeEntrance(STAGGER.trustRow + i * STAGGER.trustItemGap, 8, 0.3)}
                  className="flex items-center gap-2"
                >
                  <item.icon
                    size={15}
                    className={`${item.color} shrink-0`}
                  />
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ═══════════════════════════════════════════════
              RIGHT COLUMN: Floating Angled Demo Card
              Independent choreography, heavier/slower easing
              ═══════════════════════════════════════════════ */}
          <motion.div
            style={shouldReduceMotion ? {} : { y: smoothRightY, opacity: rightColumnOpacity }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            {/* Outer wrapper: slide in from right + slight rotation settle */}
            <motion.div
              initial={shouldReduceMotion ? {} : {
                opacity: 0,
                x: 40,
                rotateY: -6,
                rotateZ: 3,
                scale: 0.92,
              }}
              animate={{
                opacity: 1,
                x: 0,
                rotateY: 0,
                rotateZ: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.7,
                delay: shouldReduceMotion ? 0 : STAGGER.demoCard,
                ease: EASE_OUT_QUINT,
              }}
              className="w-full max-w-lg"
              style={{ perspective: 800 }}
            >
              {/* Floating oscillation — slow, subtle, organic */}
              <motion.div
                animate={shouldReduceMotion ? {} : {
                  y: [0, -7, 0, -4, 0],
                  rotateZ: [1, 0.5, 1, 1.5, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.3, 0.5, 0.75, 1],
                }}
                className="w-full lg:rotate-1 hover:rotate-0 transition-transform duration-500 ease-out"
              >
                {/* Product Dashboard Card Frame */}
                <div className="bg-white dark:bg-[rgba(20,20,24,0.7)] dark:backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-white/[0.12] shadow-[0_24px_50px_-12px_rgba(59,130,246,0.12),0_12px_24px_-8px_rgba(0,0,0,0.06)] dark:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7)] p-5 sm:p-6 transition-all duration-300">

                  {/* ── Browser Chrome Bar (delays from demoChrome) ── */}
                  <motion.div
                    {...makeEntrance(STAGGER.demoChrome, 10, 0.4)}
                    className="-mx-5 -mt-5 sm:-mx-6 sm:-mt-6 px-5 sm:px-6 pt-4 pb-3.5 mb-4 rounded-t-2xl sm:rounded-t-3xl flex items-center justify-between border-b border-slate-200/80 dark:border-white/[0.08] bg-slate-50/70 dark:bg-black/40"
                  >
                    <div className="flex items-center gap-1.5">
                      {[
                        { bg: "#FF5F56", glow: "rgba(255,95,86,0.4)" },
                        { bg: "#FFBD2E", glow: "rgba(255,189,46,0.4)" },
                        { bg: "#27C93F", glow: "rgba(39,201,63,0.4)" },
                      ].map((dot, i) => (
                        <motion.div
                          key={dot.bg}
                          initial={shouldReduceMotion ? {} : { scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            delay: STAGGER.demoChrome + 0.1 + i * 0.06,
                            type: "spring",
                            stiffness: 500,
                            damping: 22,
                          }}
                          className="w-2.5 h-2.5 rounded-full"
                          style={{
                            backgroundColor: dot.bg,
                            boxShadow: `0 0 6px ${dot.glow}`,
                          }}
                        />
                      ))}
                    </div>
                    <motion.div
                      initial={shouldReduceMotion ? {} : { opacity: 0, scaleX: 0.7 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{
                        delay: STAGGER.demoChrome + 0.2,
                        duration: 0.4,
                        ease: EASE_OUT_EXPO,
                      }}
                      className="px-3.5 py-1 rounded-md bg-white dark:bg-[#121216]/90 border border-slate-200/80 dark:border-white/[0.08] text-[11px] font-mono flex items-center gap-1.5 shadow-2xs origin-center"
                    >
                      <span className="text-text-muted dark:text-zinc-500">https://</span>
                      <span className="font-semibold text-text-primary dark:text-zinc-200">
                        grovepms.vercel.app
                      </span>
                    </motion.div>
                    <div className="w-4" />
                  </motion.div>

                  {/* ── Card Content: Mini UI Dashboard ── */}
                  <div className="space-y-4">
                    {/* Top Stats Row — staggered left-right with count-up */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Bookings — neutral card + accent dot label */}
                      <motion.div
                        {...makeEntrance(STAGGER.demoStats, 14, 0.45)}
                        className="p-3.5 rounded-xl bg-slate-50/60 dark:bg-[#16161C]/80 border border-slate-200/80 dark:border-white/[0.08]"
                      >
                        <div className="text-[11px] font-medium text-text-muted dark:text-zinc-400 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                          Monthly Direct Bookings
                        </div>
                        <div className="text-xl font-bold text-text-primary dark:text-white mt-1 tracking-tight font-mono">
                          <AnimatedCountUp
                            target={482000}
                            prefix="₹"
                            delay={STAGGER.demoStats + 0.3}
                            duration={2.0}
                          />
                        </div>
                        <div className="text-[11px] text-emerald-600 dark:text-emerald-300 font-semibold mt-1 flex items-center gap-0.5">
                          <motion.span
                            initial={shouldReduceMotion ? {} : { opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: STAGGER.demoStats + 0.6, duration: 0.35, ease: EASE_OUT_EXPO }}
                          >
                            <TrendingUp size={12} />
                          </motion.span>
                          <motion.span
                            initial={shouldReduceMotion ? {} : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: STAGGER.demoStats + 0.7, duration: 0.3 }}
                          >
                            +38% vs OTA average
                          </motion.span>
                        </div>
                      </motion.div>

                      {/* Occupancy — neutral card + accent dot label */}
                      <motion.div
                        {...makeEntrance(STAGGER.demoStats + STAGGER.demoStatsGap, 14, 0.45)}
                        className="p-3.5 rounded-xl bg-slate-50/60 dark:bg-[#16161C]/80 border border-slate-200/80 dark:border-white/[0.08]"
                      >
                        <div className="text-[11px] font-medium text-text-muted dark:text-zinc-400 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 shrink-0" />
                          Occupancy Rate
                        </div>
                        <div className="text-xl font-bold text-text-primary dark:text-white mt-1 tracking-tight font-mono">
                          <AnimatedCountUp
                            target={92}
                            suffix=".4%"
                            delay={STAGGER.demoStats + STAGGER.demoStatsGap + 0.3}
                            duration={1.6}
                          />
                        </div>
                        <motion.div
                          initial={shouldReduceMotion ? {} : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: STAGGER.demoStats + STAGGER.demoStatsGap + 0.7, duration: 0.3 }}
                          className="text-[11px] text-accent dark:text-sky-300 font-semibold mt-1"
                        >
                          Live Room Sync
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Room Availability Matrix — row-by-row stagger */}
                    <motion.div
                      {...makeEntrance(STAGGER.demoMatrix, 12, 0.45)}
                      className="p-3.5 rounded-xl bg-slate-50/60 dark:bg-[#16161C]/80 border border-slate-200/80 dark:border-white/[0.08] space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="font-bold text-text-primary dark:text-zinc-100 tracking-wide">
                          Room Availability Matrix
                        </span>
                        <span className="text-[10px] text-text-muted dark:text-zinc-500 font-mono font-normal">
                          Real-time Postgres
                        </span>
                      </div>

                      {/* Timeline Rows with staggered reveal */}
                      <div className="space-y-1.5 pt-1">
                        {[
                          {
                            room: "Deluxe 101",
                            status: "Booked • Direct Inquiry",
                            style: "bg-emerald-500/[0.12] dark:bg-emerald-500/20 border border-emerald-500/30 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-200 font-semibold",
                          },
                          {
                            room: "Garden 204",
                            status: "Check-in Today (WhatsApp)",
                            style: "bg-blue-500/[0.12] dark:bg-blue-500/20 border border-blue-500/30 dark:border-blue-500/40 text-blue-800 dark:text-blue-200 font-semibold",
                          },
                          {
                            room: "Suite 302",
                            status: "Available • Instant Booking",
                            style: "bg-slate-500/[0.06] dark:bg-white/[0.06] border border-slate-200 dark:border-white/[0.14] text-text-primary dark:text-zinc-100 font-medium",
                          },
                        ].map((row, i) => (
                          <motion.div
                            key={row.room}
                            initial={shouldReduceMotion ? {} : { opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: STAGGER.demoMatrix + 0.15 + i * 0.1,
                              duration: 0.35,
                              ease: EASE_OUT_EXPO,
                            }}
                            className="flex items-center gap-2 text-xs"
                          >
                            <span className="w-16 font-mono text-[11px] text-text-secondary dark:text-zinc-400">
                              {row.room}
                            </span>
                            <div
                              className={`flex-1 h-6 rounded ${row.style} text-[10px] flex items-center px-2.5`}
                            >
                              {row.status}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Bottom Action Footer */}
                    <motion.div
                      {...makeEntrance(STAGGER.demoFooter, 8, 0.35)}
                      className="flex items-center justify-between pt-1 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <motion.span
                          initial={shouldReduceMotion ? {} : { scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: STAGGER.demoFooter + 0.15,
                            type: "spring",
                            stiffness: 500,
                            damping: 20,
                          }}
                          className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]"
                        />
                        <span className="text-text-secondary dark:text-zinc-300 font-medium">
                          Direct Booking Engine Active
                        </span>
                      </div>
                      <motion.span
                        initial={shouldReduceMotion ? {} : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: STAGGER.demoFooter + 0.25, duration: 0.35 }}
                        className="text-accent dark:text-sky-300 font-semibold font-mono text-[11px]"
                      >
                        Production Live
                      </motion.span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
