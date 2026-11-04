"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useReducedMotion } from "@/lib/reduced-motion";

export const PROCESS_VARIANT: "scene" | "route" = "scene";

export interface Stage {
  id: string;
  word: string;
  line: string;
  detail: string;
  time: string;
  youGive: string;
  youGet: string;
}

export const STAGES: readonly Stage[] = [
  {
    id: "understand",
    word: "Understand",
    line: "I learn how your property actually runs.",
    detail:
      "Bookings on WhatsApp, a register at the desk, OTA payouts in a spreadsheet. I map all of it before designing anything.",
    time: "2 to 3 days",
    youGive:
      "A 30 minute call, links to your current site and OTA listings, your best photos",
    youGet: "A one page scope: pages, features, fixed price",
  },
  {
    id: "design",
    word: "Design",
    line: "I sketch the guest's path to booking.",
    detail: "Mobile first, because most of your guests book from a phone.",
    time: "3 to 5 days",
    youGive: "Logo, brand colors, feedback on one round of layouts",
    youGet: "Designs for every page, approved before any code",
  },
  {
    id: "build",
    word: "Build",
    line: "I build it and show you as it grows.",
    detail:
      "You get a staging link that updates every few days, so nothing is a surprise.",
    time: "1 to 3 weeks",
    youGive: "Room details, rates, final photos",
    youGet: "A fast site with a CMS your staff can edit",
  },
  {
    id: "launch",
    word: "Launch",
    line: "Going live, then I stay on call.",
    detail:
      "Domain, search setup and a short handover video, then fixes during the support period.",
    time: "2 days, then support as per your package",
    youGive: "Domain access",
    youGet: "Live site, Search Console set up, handover video",
  },
] as const;

const CUBIC_EASE = [0.22, 1, 0.36, 1] as const;

export function Process() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="process"
      className="relative bg-bg text-text-primary transition-colors duration-200"
    >
      {/* ═══════════════════════════════════════════════
          SECTION HEADER (Preserved position and H2)
          ═══════════════════════════════════════════════ */}
      <div className="pt-20 pb-10 sm:pt-28 sm:pb-14 border-t border-border/80 dark:border-white/[0.08]">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[13px] font-sans font-medium tracking-[0.02em] text-accent mb-3.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Process</span>
            </div>
            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[46px] font-semibold text-text-primary tracking-[-0.03em] leading-[1.08] sm:leading-[1.05]">
              From chaos to a live hotel booking engine.
            </h2>
            <p className="mt-4 text-[16px] sm:text-[18px] text-text-secondary leading-[1.6] max-w-2xl font-normal">
              How an unstructured mix of WhatsApp chats, desk registers and OTA
              commissions turns into your most profitable direct booking channel.
            </p>
          </div>
        </div>
      </div>

      {/* Variant rendering */}
      {PROCESS_VARIANT === "route" ? (
        <ProcessRouteVariant shouldReduceMotion={shouldReduceMotion} />
      ) : shouldReduceMotion ? (
        <ProcessReducedMotionFallback />
      ) : (
        <>
          {/* Desktop Pinned Scene (>= 1024px) */}
          <div className="hidden lg:block">
            <ProcessDesktopScene />
          </div>

          {/* Mobile Stacked Blocks (< 1024px) */}
          <div className="block lg:hidden">
            <ProcessMobileScene />
          </div>
        </>
      )}
    </section>
  );
}

// ═════════════════════════════════════════════════════════════
// DESKTOP PINNED SCENE (Variant "scene")
// ═════════════════════════════════════════════════════════════

function ProcessDesktopScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Update active stage index only when crossed threshold
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let nextIndex = 0;
    if (latest < 0.25) {
      nextIndex = 0;
    } else if (latest < 0.5) {
      nextIndex = 1;
    } else if (latest < 0.75) {
      nextIndex = 2;
    } else {
      nextIndex = 3;
    }

    if (nextIndex !== activeStageIndex) {
      setActiveStageIndex(nextIndex);
    }
  });

  const scrollToStage = useCallback((stageIndex: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const totalScrollSpan = rect.height - window.innerHeight;
    const stageCenters = [0.125, 0.375, 0.625, 0.875];
    const targetY = containerTop + stageCenters[stageIndex] * totalScrollSpan;

    const lenis = (window as unknown as { lenis?: { scrollTo: (y: number) => void } }).lenis;
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(targetY);
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  }, []);

  const currentStage = STAGES[activeStageIndex];

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="container-custom h-full flex items-center">
          <div className="w-full grid grid-cols-12 gap-8 xl:gap-12 items-center">
            {/* ══════════════════════════════════════════
                LEFT COLUMN (About 42%)
                ══════════════════════════════════════════ */}
            <div className="col-span-5 flex items-start">
              {/* Vertical Navigation Rail with 4 dots */}
              <div
                className="relative flex flex-col items-center justify-between py-2 mr-6 xl:mr-8 h-52 select-none shrink-0"
                role="navigation"
                aria-label="Process stages"
              >
                {/* 1px Vertical Rail */}
                <div className="absolute top-0 bottom-0 w-px bg-border dark:bg-white/10" />

                {STAGES.map((st, i) => {
                  const isActive = activeStageIndex === i;
                  return (
                    <div key={st.id} className="relative group z-10">
                      <button
                        type="button"
                        onClick={() => scrollToStage(i)}
                        aria-label={`Go to stage ${i + 1}, ${st.word}`}
                        className="relative flex items-center justify-center w-7 h-7 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <span
                          className={`block rounded-full transition-all duration-300 ${
                            isActive
                              ? "w-3.5 h-3.5 bg-accent ring-4 ring-accent/20"
                              : "w-2 h-2 bg-text-muted/40 hover:bg-text-secondary"
                          }`}
                        />
                      </button>

                      {/* Tooltip on hover */}
                      <span className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded bg-card dark:bg-[#141519] border border-border dark:border-white/10 text-[12px] font-medium text-text-primary opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 shadow-sm whitespace-nowrap z-20">
                        {st.word}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Active Stage Copy Block */}
              <div className="flex-1 min-w-0">
                {/* Giant Stage Word with Masked Line Reveal */}
                <div className="relative overflow-hidden h-[clamp(3.25rem,5.5vw,5rem)] w-full">
                  <AnimatePresence initial={false}>
                    <motion.h3
                      key={currentStage.word}
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "-100%" }}
                      transition={{ duration: 0.6, ease: CUBIC_EASE }}
                      className="absolute inset-x-0 top-0 h-full flex items-center text-[clamp(2.5rem,4.5vw,4.5rem)] font-semibold tracking-[-0.03em] leading-none text-text-primary select-none whitespace-nowrap"
                    >
                      {currentStage.word}
                    </motion.h3>
                  </AnimatePresence>
                </div>

                {/* Line and Detail */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentStage.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: CUBIC_EASE }}
                  >
                    <p className="text-[22px] xl:text-[24px] font-medium text-text-primary leading-tight mt-5">
                      {currentStage.line}
                    </p>
                    <p className="text-[16px] xl:text-[17px] text-text-secondary leading-relaxed mt-3 max-w-[44ch] font-normal">
                      {currentStage.detail}
                    </p>

                    {/* Three Compact Metadata Rows */}
                    <div className="mt-8 pt-6 border-t border-border/80 dark:border-white/[0.08] space-y-3.5">
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">
                        <span className="text-[13px] font-medium text-text-secondary dark:text-text-muted w-24 shrink-0">
                          Time
                        </span>
                        <span className="text-[15px] xl:text-[16px] text-text-primary font-normal">
                          {currentStage.time}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">
                        <span className="text-[13px] font-medium text-text-secondary dark:text-text-muted w-24 shrink-0">
                          You give me
                        </span>
                        <span className="text-[15px] xl:text-[16px] text-text-primary font-normal">
                          {currentStage.youGive}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">
                        <span className="text-[13px] font-medium text-text-secondary dark:text-text-muted w-24 shrink-0">
                          You get
                        </span>
                        <span className="text-[15px] xl:text-[16px] text-text-primary font-normal">
                          {currentStage.youGet}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Hidden DOM content of all stages for accessibility */}
                <div className="sr-only">
                  {STAGES.map((st) => (
                    <div key={`sr-${st.id}`}>
                      <h4>{st.word}</h4>
                      <p>{st.line}</p>
                      <p>{st.detail}</p>
                      <p>Time: {st.time}</p>
                      <p>You give me: {st.youGive}</p>
                      <p>You get: {st.youGet}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ══════════════════════════════════════════
                RIGHT COLUMN: The Scene (About 58%)
                ══════════════════════════════════════════ */}
            <div className="col-span-7 flex items-center justify-center">
              <ProcessDesktopSceneVisual scrollYProgress={scrollYProgress} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// DESKTOP SCENE VISUAL (Persistent Phone & Scrubbed Stages)
// ═════════════════════════════════════════════════════════════

interface SceneVisualProps {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}

function ProcessDesktopSceneVisual({ scrollYProgress }: SceneVisualProps) {
  // Phone outline opacity: 0.12 during Stage 1, becoming solid in Stage 2
  const phoneOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.2, 0.28, 1.0],
    [0.12, 0.12, 1.0, 1.0]
  );

  // Phone scale bounce in Stage 4
  const phoneScale = useTransform(
    scrollYProgress,
    [0.74, 0.82, 0.87, 1.0],
    [1.0, 1.025, 1.0, 1.0]
  );

  // Stage 1 cards: collapse toward phone between 0.22 and 0.28
  const stage1Opacity = useTransform(
    scrollYProgress,
    [0.0, 0.2, 0.26],
    [1.0, 1.0, 0.0]
  );
  const stage1Scale = useTransform(
    scrollYProgress,
    [0.0, 0.2, 0.26],
    [1.0, 1.0, 0.9]
  );

  // Highlighter stroke under Stage 1 caption
  const highlighterLength = useTransform(
    scrollYProgress,
    [0.04, 0.18],
    [0, 1]
  );

  // Stage 2 wireframe stroke drawing
  const wireframeProgress = useTransform(
    scrollYProgress,
    [0.26, 0.44],
    [0, 1]
  );
  // Stage 2 leader lines drawing
  const leaderLinesLength = useTransform(
    scrollYProgress,
    [0.26, 0.38],
    [0, 1]
  );
  const stage2Opacity = useTransform(
    scrollYProgress,
    [0.24, 0.28, 0.48, 0.52],
    [0.0, 1.0, 1.0, 0.0]
  );

  // Stage 3 screenshot clip-path wipe from top to bottom
  const screenshotClipProgress = useTransform(
    scrollYProgress,
    [0.5, 0.68],
    [100, 0]
  );
  const screenshotOpacity = useTransform(
    scrollYProgress,
    [0.48, 0.52, 1.0],
    [0.0, 1.0, 1.0]
  );

  // Stage 3 chips opacity
  const chipsOpacity = useTransform(
    scrollYProgress,
    [0.52, 0.56, 0.72, 0.76],
    [0.0, 1.0, 1.0, 0.0]
  );

  // Stage 4 notification toast entrance (slides from top of phone)
  const toastY = useTransform(
    scrollYProgress,
    [0.76, 0.84],
    [-32, 0]
  );
  const toastOpacity = useTransform(
    scrollYProgress,
    [0.75, 0.8],
    [0.0, 1.0]
  );

  return (
    <div className="relative w-[520px] h-[640px] flex items-center justify-center select-none">
      {/* ─────────────────────────────────────────────
          1. PERSISTENT PHONE & ITS ANCHORED CALLOUTS
          ───────────────────────────────────────────── */}
      <div className="relative w-[300px] h-[600px] shrink-0">
        {/* The Phone */}
        <motion.div
          style={{
            opacity: phoneOpacity,
            scale: phoneScale,
          }}
          className="relative w-full h-full rounded-[38px] border border-border dark:border-white/15 bg-card dark:bg-[#121316] shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-none overflow-hidden will-change-transform z-10"
        >
          {/* Top speaker line (minimal geometric line) */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-border/60 dark:bg-white/10 z-30" />

          {/* Inside Phone Screen Area */}
          <div className="relative w-full h-full pt-8 pb-4 px-4 flex flex-col justify-between overflow-hidden">
            {/* ───────────────────────────────────────────
                Stage 2: Wireframe Drawing (0.25 to 0.50)
                ─────────────────────────────────────────── */}
            <motion.div
              style={{ opacity: stage2Opacity }}
              className="absolute inset-x-0 top-0 bottom-0 pt-10 pb-4 px-4 flex flex-col justify-between z-10 pointer-events-none"
            >
              <div className="space-y-4">
                {/* Header Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-border/80 dark:border-white/10">
                  <motion.div
                    style={{ pathLength: wireframeProgress }}
                    className="w-16 h-3 rounded bg-border/60 dark:bg-white/10"
                  />
                  <div className="w-5 h-3 rounded bg-border/60 dark:bg-white/10" />
                </div>

                {/* Hero Wireframe Block */}
                <div className="p-3.5 rounded-xl border border-dashed border-border dark:border-white/15 space-y-2.5">
                  <div className="w-24 h-2.5 rounded bg-border/80 dark:bg-white/15" />
                  <div className="w-44 h-4 rounded bg-border dark:bg-white/20" />
                  <div className="w-36 h-2 rounded bg-border/60 dark:bg-white/10" />
                </div>

                {/* Row of 3 Room Cards */}
                <div className="space-y-2">
                  <div className="w-16 h-2.5 rounded bg-border/60 dark:bg-white/10" />
                  <div className="grid grid-cols-3 gap-2">
                    {[0, 1, 2].map((cardIdx) => (
                      <div
                        key={`wire-room-${cardIdx}`}
                        className="p-1.5 rounded-lg border border-border/70 dark:border-white/10 space-y-1.5"
                      >
                        <div className="aspect-[4/3] rounded bg-border/40 dark:bg-white/5" />
                        <div className="w-full h-1.5 rounded bg-border/60 dark:bg-white/10" />
                        <div className="w-2/3 h-1.5 rounded bg-border/40 dark:bg-white/5" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sticky Bottom Bar with 2 Skeleton Buttons */}
              <div className="pt-3 border-t border-border/80 dark:border-white/10 grid grid-cols-2 gap-2">
                <div className="h-9 rounded-md border border-border dark:border-white/15 flex items-center justify-center">
                  <div className="w-12 h-2 rounded bg-border/60 dark:bg-white/10" />
                </div>
                <div className="h-9 rounded-md bg-accent flex items-center justify-center shadow-xs">
                  <div className="w-14 h-2 rounded bg-[#0B0C0E]/40" />
                </div>
              </div>
            </motion.div>

            {/* ───────────────────────────────────────────
                Stage 3 & 4: Live Hotel Greenery View Mobile Site
                ─────────────────────────────────────────── */}
            <motion.div
              style={{
                opacity: screenshotOpacity,
                clipPath: useTransform(
                  screenshotClipProgress,
                  (val) => `inset(0% 0% ${val}% 0%)`
                ),
              }}
              className="absolute inset-0 z-20 overflow-hidden"
            >
              <Image
                src="/hero/greenery-view-mobile.webp"
                alt="Hotel Greenery View mobile site"
                width={390}
                height={780}
                unoptimized
                priority
                className="w-full h-full object-cover object-top"
              />
            </motion.div>

            {/* ───────────────────────────────────────────
                Stage 4: WhatsApp Notification Toast
                ─────────────────────────────────────────── */}
            <motion.div
              style={{
                y: toastY,
                opacity: toastOpacity,
              }}
              className="absolute top-6 inset-x-3 z-30 pointer-events-none"
            >
              <div className="bg-white dark:bg-[#18191E] border border-black/10 dark:border-white/15 rounded-xl p-3 shadow-xl flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#25D366]/20 border border-[#25D366]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-[#25D366]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-[#121316] dark:text-white">
                      WhatsApp
                    </span>
                    <span className="text-[10px] text-[#71726E] dark:text-white/60">Just now</span>
                  </div>
                  <p className="text-[13px] text-[#40413D] dark:text-white/80 mt-0.5 font-normal leading-tight">
                    New enquiry: 2 nights, 14 Dec
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ─────────────────────────────────────────────
            STAGE 2: 3 LEADER LINES (0.25 to 0.50)
            Directly anchored to the phone perimeter
            ───────────────────────────────────────────── */}
        <motion.div
          style={{ opacity: stage2Opacity }}
          className="absolute inset-0 pointer-events-none z-20"
        >
          {/* Label: WhatsApp (top-left) */}
          <div className="absolute right-[calc(100%+8px)] top-[52px] flex items-center gap-2">
            <span className="text-[12px] font-medium text-text-secondary dark:text-text-muted whitespace-nowrap">
              WhatsApp
            </span>
            <svg className="w-8 h-2 overflow-visible" viewBox="0 0 32 2">
              <motion.line
                x1="0"
                y1="1"
                x2="32"
                y2="1"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-border dark:text-white/30"
                style={{ pathLength: leaderLinesLength }}
              />
              <circle cx="32" cy="1" r="2" fill="currentColor" className="text-text-muted" />
            </svg>
          </div>

          {/* Label: Rooms (center-right) */}
          <div className="absolute left-[calc(100%+8px)] top-[285px] flex items-center gap-2">
            <svg className="w-8 h-2 overflow-visible" viewBox="0 0 32 2">
              <circle cx="0" cy="1" r="2" fill="currentColor" className="text-text-muted" />
              <motion.line
                x1="0"
                y1="1"
                x2="32"
                y2="1"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-border dark:text-white/30"
                style={{ pathLength: leaderLinesLength }}
              />
            </svg>
            <span className="text-[12px] font-medium text-text-secondary dark:text-text-muted whitespace-nowrap">
              Rooms
            </span>
          </div>

          {/* Label: Book direct (bottom-right) */}
          <div className="absolute left-[calc(100%+8px)] bottom-[30px] flex items-center gap-2">
            <svg className="w-8 h-2 overflow-visible" viewBox="0 0 32 2">
              <circle cx="0" cy="1" r="2" fill="#E5A93C" />
              <motion.line
                x1="0"
                y1="1"
                x2="32"
                y2="1"
                stroke="#E5A93C"
                strokeWidth="1.5"
                style={{ pathLength: leaderLinesLength }}
              />
            </svg>
            <span className="text-[12px] font-medium text-accent whitespace-nowrap">
              Book direct
            </span>
          </div>
        </motion.div>

        {/* ─────────────────────────────────────────────
            STAGE 3: 4 CHIPS WITH LEADER LINES (0.50 to 0.75)
            ───────────────────────────────────────────── */}
        <motion.div
          style={{ opacity: chipsOpacity }}
          className="absolute inset-0 pointer-events-none z-30"
        >
          {/* Chip 1: CMS (left upper) */}
          <div className="absolute right-[calc(100%+8px)] top-24 flex items-center gap-2">
            <span className="text-[12px] font-medium text-text-primary px-2.5 py-1 rounded border border-border dark:border-white/10 bg-white dark:bg-[#18191E] shadow-sm whitespace-nowrap">
              CMS
            </span>
            <div className="w-6 h-px bg-border dark:bg-white/30" />
          </div>

          {/* Chip 2: SEO (right upper) */}
          <div className="absolute left-[calc(100%+8px)] top-36 flex items-center gap-2">
            <div className="w-6 h-px bg-border dark:bg-white/30" />
            <span className="text-[12px] font-medium text-text-primary px-2.5 py-1 rounded border border-border dark:border-white/10 bg-white dark:bg-[#18191E] shadow-sm whitespace-nowrap">
              SEO
            </span>
          </div>

          {/* Chip 3: WhatsApp CTA (left lower) */}
          <div className="absolute right-[calc(100%+8px)] bottom-36 flex items-center gap-2">
            <span className="text-[12px] font-medium text-text-primary px-2.5 py-1 rounded border border-border dark:border-white/10 bg-white dark:bg-[#18191E] shadow-sm whitespace-nowrap">
              WhatsApp CTA
            </span>
            <div className="w-6 h-px bg-border dark:bg-white/30" />
          </div>

          {/* Chip 4: Payments (right lower) */}
          <div className="absolute left-[calc(100%+8px)] bottom-20 flex items-center gap-2">
            <div className="w-6 h-px bg-border dark:bg-white/30" />
            <span className="text-[12px] font-medium text-text-primary px-2.5 py-1 rounded border border-border dark:border-white/10 bg-white dark:bg-[#18191E] shadow-sm whitespace-nowrap">
              Payments
            </span>
          </div>
        </motion.div>
      </div>

      {/* ─────────────────────────────────────────────
          STAGE 1: 5 DRIFTING PAPER CARDS (0 to 0.25)
          ───────────────────────────────────────────── */}
      <motion.div
        style={{
          opacity: stage1Opacity,
          scale: stage1Scale,
        }}
        className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-20"
      >
        <div className="relative w-full h-[520px]">
          {/* Card a: WhatsApp bubbles (top-left) */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 left-2 w-52 p-3 rounded-2xl rounded-bl-xs bg-[#25D366]/15 dark:bg-[#25D366]/20 border border-[#25D366]/30 shadow-md rotate-[-4deg] space-y-2 backdrop-blur-xs"
          >
            <p className="text-[12px] font-medium text-text-primary">
              Room available 12 Dec?
            </p>
            <p className="text-[12px] font-medium text-text-primary/90 text-right">
              Price for 2 nights?
            </p>
          </motion.div>

          {/* Card b: Register page with handwritten squiggle paths (center-left) */}
          <motion.div
            animate={{ y: [4, -4, 4] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
            className="absolute top-36 left-0 w-60 p-3.5 rounded-lg bg-[#FAF8F5] dark:bg-[#1A1B20] border border-border dark:border-white/10 shadow-md rotate-[6deg]"
          >
            <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-2 border-b border-border/80 dark:border-white/10 pb-1">
              Guest Register
            </div>
            <svg className="w-full h-16 text-text-secondary" viewBox="0 0 200 60">
              {/* Ruled lines */}
              <line
                x1="0"
                y1="18"
                x2="200"
                y2="18"
                stroke="currentColor"
                strokeOpacity="0.15"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="36"
                x2="200"
                y2="36"
                stroke="currentColor"
                strokeOpacity="0.15"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="54"
                x2="200"
                y2="54"
                stroke="currentColor"
                strokeOpacity="0.15"
                strokeWidth="1"
              />
              {/* Handwritten squiggles */}
              <path
                d="M5 14 Q20 8 35 15 T65 13 T95 16 T130 12 T170 15"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.65"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M5 32 Q25 28 45 34 T85 30 T120 33 T160 29 T190 32"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.65"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M5 50 Q18 46 38 52 T75 48 T110 51 T145 47"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.65"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          {/* Card c: Spreadsheet fragment (center-right) */}
          <motion.div
            animate={{ y: [-3, 3, -3] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2.4,
            }}
            className="absolute top-28 right-0 w-64 p-3 rounded-lg bg-surface dark:bg-[#16171C] border border-border dark:border-white/10 shadow-md rotate-[-7deg]"
          >
            <div className="grid grid-cols-4 gap-1 text-[10px] font-medium text-text-muted border-b border-border dark:border-white/10 pb-1.5 mb-1.5">
              <span>Date</span>
              <span>Room</span>
              <span>Guest</span>
              <span>Status</span>
            </div>
            <div className="space-y-1.5 text-[11px] text-text-secondary">
              <div className="grid grid-cols-4 gap-1">
                <span>12 Dec</span>
                <span>Rm 102</span>
                <span className="truncate">Sharma</span>
                <span className="text-accent">Confirmed</span>
              </div>
              <div className="grid grid-cols-4 gap-1">
                <span>14 Dec</span>
                <span>Rm 204</span>
                <span className="truncate">Patel</span>
                <span>Direct</span>
              </div>
              <div className="grid grid-cols-4 gap-1">
                <span>15 Dec</span>
                <span>Rm 101</span>
                <span></span>
                <span></span>
              </div>
            </div>
          </motion.div>

          {/* Card d: OTA payout slip (bottom-left) */}
          <motion.div
            animate={{ y: [3, -3, 3] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3.6,
            }}
            className="absolute bottom-12 left-4 w-52 p-3 rounded-md bg-[#F4F4F0] dark:bg-[#1C1D23] border border-border dark:border-white/10 shadow-md rotate-[8deg]"
          >
            <p className="text-[12px] font-semibold text-text-primary">
              OTA payout slip
            </p>
            <div className="mt-2 pt-2 border-t border-border/80 dark:border-white/10 flex items-center justify-between">
              <span className="text-[12px] text-text-muted">OTA commission</span>
              <span className="relative text-[12px] font-medium text-text-muted">
                <span className="line-through decoration-text-primary decoration-2">
                  Deduction
                </span>
              </span>
            </div>
          </motion.div>

          {/* Card e: Sticky note (top-right) */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4.8,
            }}
            className="absolute top-2 right-4 w-44 p-3 rounded-md bg-[#FEF3C7] dark:bg-[#342A12] text-[#78350F] dark:text-[#FDE68A] border border-[#FDE68A]/60 dark:border-[#FDE68A]/20 shadow-sm rotate-[-3deg]"
          >
            <p className="text-[13px] font-medium leading-snug">
              Call guest back
            </p>
            <span className="text-[10px] opacity-75 mt-2 block">Follow-up</span>
          </motion.div>
        </div>

        {/* Small Caption with Highlighter Stroke under "WhatsApp + register + OTA" */}
        <div className="relative mt-2 text-center">
          <p className="text-[13px] font-medium text-text-secondary">
            WhatsApp + register + OTA
          </p>
          <svg
            className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-48 h-3 pointer-events-none"
            viewBox="0 0 192 12"
            fill="none"
          >
            <motion.path
              d="M2 7 C 50 11, 140 2, 190 6"
              stroke="#E5A93C"
              strokeWidth={3}
              strokeLinecap="round"
              style={{ pathLength: highlighterLength }}
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// MOBILE STACKED SCENE (< 1024px)
// ═════════════════════════════════════════════════════════════

function ProcessMobileScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="container-custom py-12 sm:py-16">
      <div className="relative pl-6 sm:pl-8 border-l border-border dark:border-white/10 space-y-16">
        {/* Dynamic scroll progress fill along left rail */}
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-0 top-0 bottom-0 w-px bg-accent origin-top"
        />

        {STAGES.map((st, i) => (
          <motion.div
            key={st.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: CUBIC_EASE }}
            className="relative"
          >
            {/* Rail dot */}
            <div className="absolute -left-[30px] sm:-left-[38px] top-2 w-3 h-3 rounded-full bg-card dark:bg-[#0B0C0E] border-2 border-accent" />

            {/* Scene Visual for each stage */}
            <div className="w-full max-w-[320px] mx-auto mb-8 flex justify-center">
              <MobileStageVisual stageIndex={i} />
            </div>

            {/* Stage Text */}
            <div className="space-y-3">
              <h3 className="text-[44px] sm:text-[48px] font-semibold tracking-[-0.03em] leading-none text-text-primary">
                {st.word}
              </h3>
              <p className="text-[19px] sm:text-[21px] font-medium text-text-primary leading-snug">
                {st.line}
              </p>
              <p className="text-[15px] sm:text-[16px] text-text-secondary leading-relaxed">
                {st.detail}
              </p>

              {/* Stacked rows */}
              <div className="pt-4 border-t border-border/80 dark:border-white/10 space-y-2.5">
                <div>
                  <span className="text-[12px] font-medium text-text-secondary dark:text-text-muted block">
                    Time
                  </span>
                  <span className="text-[14px] text-text-primary">
                    {st.time}
                  </span>
                </div>
                <div>
                  <span className="text-[12px] font-medium text-text-secondary dark:text-text-muted block">
                    You give me
                  </span>
                  <span className="text-[14px] text-text-primary">
                    {st.youGive}
                  </span>
                </div>
                <div>
                  <span className="text-[12px] font-medium text-text-secondary dark:text-text-muted block">
                    You get
                  </span>
                  <span className="text-[14px] text-text-primary">
                    {st.youGet}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// MOBILE STAGE VISUAL CARDS
// ═════════════════════════════════════════════════════════════

function MobileStageVisual({ stageIndex }: { stageIndex: number }) {
  if (stageIndex === 0) {
    // Stage 1: Card pile
    return (
      <div className="relative w-[280px] h-[260px] flex items-center justify-center select-none">
        <div className="relative w-full h-full">
          <div className="absolute top-2 left-2 w-44 p-2.5 rounded-xl rounded-bl-xs bg-[#25D366]/20 border border-[#25D366]/30 rotate-[-4deg] shadow-xs">
            <p className="text-[11px] font-medium text-text-primary">
              Room available 12 Dec?
            </p>
          </div>
          <div className="absolute top-20 left-1 w-48 p-2.5 rounded-md bg-[#FAF8F5] dark:bg-[#1A1B20] border border-border dark:border-white/10 rotate-[5deg] shadow-xs">
            <span className="text-[10px] font-semibold text-text-muted uppercase">
              Guest Register
            </span>
            <div className="h-6 mt-1 border-b border-border dark:border-white/10 flex items-center">
              <span className="text-[11px] text-text-secondary">
                Rm 102, 2 guests
              </span>
            </div>
          </div>
          <div className="absolute bottom-6 right-2 w-44 p-2.5 rounded-md bg-[#FEF3C7] dark:bg-[#342A12] text-[#78350F] dark:text-[#FDE68A] border border-[#FDE68A]/40 rotate-[-5deg] shadow-xs">
            <p className="text-[12px] font-medium">Call guest back</p>
          </div>
        </div>
      </div>
    );
  }

  if (stageIndex === 1) {
    // Stage 2: Wireframe phone
    return (
      <div className="w-[220px] h-[340px] rounded-[28px] border border-border dark:border-white/15 bg-card dark:bg-[#121316] p-3 shadow-sm flex flex-col justify-between">
        <div className="w-10 h-1 mx-auto rounded-full bg-border/60 dark:bg-white/10 mb-2" />
        <div className="space-y-3">
          <div className="h-3 rounded bg-border/60 dark:bg-white/10 w-16" />
          <div className="p-2.5 rounded-lg border border-dashed border-border dark:border-white/15 space-y-1.5">
            <div className="w-16 h-2 rounded bg-border/80 dark:bg-white/15" />
            <div className="w-28 h-3 rounded bg-border dark:bg-white/20" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="aspect-[4/3] rounded bg-border/40 dark:bg-white/5" />
            <div className="aspect-[4/3] rounded bg-border/40 dark:bg-white/5" />
          </div>
        </div>
        <div className="pt-2 border-t border-border/80 dark:border-white/10 grid grid-cols-2 gap-1.5">
          <div className="h-7 rounded border border-border dark:border-white/15 flex items-center justify-center">
            <div className="w-8 h-1.5 rounded bg-border/60 dark:bg-white/10" />
          </div>
          <div className="h-7 rounded bg-accent flex items-center justify-center">
            <div className="w-10 h-1.5 rounded bg-[#0B0C0E]/40" />
          </div>
        </div>
      </div>
    );
  }

  if (stageIndex === 2) {
    // Stage 3: Build phone with chips
    return (
      <div className="relative w-[240px] h-[340px] flex items-center justify-center">
        <div className="w-[200px] h-[340px] rounded-[28px] border border-border dark:border-white/15 bg-card dark:bg-[#121316] overflow-hidden shadow-sm relative">
          <Image
            src="/hero/greenery-view-mobile.webp"
            alt="Hotel Greenery View mobile site"
            width={390}
            height={780}
            unoptimized
            className="w-full h-full object-cover object-top"
          />
        </div>
        <span className="absolute -left-2 top-10 text-[11px] font-medium text-text-primary px-2 py-0.5 rounded border border-border dark:border-white/10 bg-card shadow-xs">
          CMS
        </span>
        <span className="absolute -right-2 top-24 text-[11px] font-medium text-text-primary px-2 py-0.5 rounded border border-border dark:border-white/10 bg-card shadow-xs">
          SEO
        </span>
      </div>
    );
  }

  // Stage 4: Live phone with toast
  return (
    <div className="relative w-[220px] h-[340px] rounded-[28px] border border-border dark:border-white/15 bg-card dark:bg-[#121316] overflow-hidden shadow-sm">
      <Image
        src="/hero/greenery-view-mobile.webp"
        alt="Live Hotel Greenery View site"
        width={390}
        height={780}
        unoptimized
        className="w-full h-full object-cover object-top"
      />
      <div className="absolute top-4 inset-x-2 bg-white dark:bg-[#18191E] border border-black/10 dark:border-white/15 rounded-lg p-2 shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-[#121316] dark:text-white">
            WhatsApp
          </span>
          <span className="text-[9px] text-[#71726E] dark:text-white/60">Just now</span>
        </div>
        <p className="text-[11px] text-[#40413D] dark:text-white/80 mt-0.5">
          New enquiry: 2 nights, 14 Dec
        </p>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// REDUCED MOTION FALLBACK (Non-pinned, clean stacked layout)
// ═════════════════════════════════════════════════════════════

function ProcessReducedMotionFallback() {
  return (
    <div className="container-custom py-12 sm:py-20 space-y-16">
      {STAGES.map((st, idx) => (
        <div
          key={st.id}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-border/80 dark:border-white/10 pb-12 last:border-b-0"
        >
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[13px] font-medium text-accent">
              Stage 0{idx + 1}
            </span>
            <h3 className="text-[36px] sm:text-[44px] font-semibold text-text-primary tracking-tight leading-none">
              {st.word}
            </h3>
            <p className="text-[20px] font-medium text-text-primary leading-snug">
              {st.line}
            </p>
            <p className="text-[16px] text-text-secondary leading-relaxed">
              {st.detail}
            </p>
            <div className="pt-4 border-t border-border/80 dark:border-white/10 space-y-2">
              <p className="text-[14px]">
                <strong className="text-text-secondary dark:text-text-muted font-medium">Time:</strong> {st.time}
              </p>
              <p className="text-[14px]">
                <strong className="text-text-secondary dark:text-text-muted font-medium">You give me:</strong>{" "}
                {st.youGive}
              </p>
              <p className="text-[14px]">
                <strong className="text-text-secondary dark:text-text-muted font-medium">You get:</strong>{" "}
                {st.youGet}
              </p>
            </div>
          </div>
          <div className="lg:col-span-6 flex justify-center">
            <MobileStageVisual stageIndex={idx} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// VARIANT "route" (Single SVG ridge-line mountain-trail path)
// ═════════════════════════════════════════════════════════════

function ProcessRouteVariant({
  shouldReduceMotion,
}: {
  shouldReduceMotion: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <div ref={containerRef} className="container-custom py-16 sm:py-24">
      {/* Desktop Horizontal Route View (>= 1024px) */}
      <div className="hidden lg:block relative">
        <svg
          className="w-full h-32 overflow-visible mb-12"
          viewBox="0 0 1000 120"
          fill="none"
        >
          {/* Base neutral ridge line */}
          <path
            d="M 50 90 Q 250 20 450 80 T 800 50 T 950 80"
            stroke="currentColor"
            strokeOpacity="0.15"
            strokeWidth="1.5"
          />
          {/* Animated drawing ridge line */}
          <motion.path
            d="M 50 90 Q 250 20 450 80 T 800 50 T 950 80"
            stroke="#E5A93C"
            strokeWidth="2"
            style={{ pathLength: shouldReduceMotion ? 1 : scrollYProgress }}
          />
        </svg>

        {/* 4 Stage Cards Grid */}
        <div className="grid grid-cols-4 gap-6">
          {STAGES.map((st, i) => (
            <motion.div
              key={st.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: CUBIC_EASE }}
              className="p-6 rounded-xl border border-border/80 dark:border-white/10 bg-card shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-[12px] font-medium text-accent">
                  Stage 0{i + 1}
                </span>
                <h3 className="text-[28px] font-semibold text-text-primary tracking-tight mt-1">
                  {st.word}
                </h3>
                <p className="text-[15px] font-medium text-text-primary mt-2">
                  {st.line}
                </p>
                <p className="text-[13px] text-text-secondary mt-1.5 leading-relaxed">
                  {st.detail}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/80 dark:border-white/10 space-y-2 text-[12px]">
                <div>
                  <span className="text-text-muted block">Time</span>
                  <span className="text-text-primary">{st.time}</span>
                </div>
                <div>
                  <span className="text-text-muted block">You give me</span>
                  <span className="text-text-primary">{st.youGive}</span>
                </div>
                <div>
                  <span className="text-text-muted block">You get</span>
                  <span className="text-text-primary">{st.youGet}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile Vertical Route View (< 1024px) */}
      <div className="block lg:hidden relative pl-6 border-l border-border dark:border-white/10 space-y-12">
        <motion.div
          style={{ scaleY: shouldReduceMotion ? 1 : scrollYProgress }}
          className="absolute left-0 top-0 bottom-0 w-px bg-accent origin-top"
        />

        {STAGES.map((st, i) => (
          <motion.div
            key={st.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: CUBIC_EASE }}
            className="p-5 rounded-xl border border-border dark:border-white/10 bg-card"
          >
            <span className="text-[12px] font-medium text-accent">
              Stage 0{i + 1}
            </span>
            <h3 className="text-[26px] font-semibold text-text-primary tracking-tight mt-1">
              {st.word}
            </h3>
            <p className="text-[16px] font-medium text-text-primary mt-2">
              {st.line}
            </p>
            <p className="text-[14px] text-text-secondary mt-1 leading-relaxed">
              {st.detail}
            </p>

            <div className="mt-4 pt-3 border-t border-border/80 dark:border-white/10 space-y-2 text-[13px]">
              <p>
                <strong className="text-text-muted">Time:</strong> {st.time}
              </p>
              <p>
                <strong className="text-text-muted">You give me:</strong>{" "}
                {st.youGive}
              </p>
              <p>
                <strong className="text-text-muted">You get:</strong>{" "}
                {st.youGet}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
