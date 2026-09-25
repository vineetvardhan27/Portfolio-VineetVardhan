"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useReducedMotion } from "@/lib/reduced-motion";

// Custom animation curves & spring physics for bespoke craft feel
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const EASE_OUT_PANEL = [0.22, 1, 0.32, 1] as const;

const SPRING_TACTILE = { type: "spring", stiffness: 350, damping: 22 } as const;
const SPRING_CHECK = { type: "spring", stiffness: 320, damping: 20 } as const;
const SPRING_STAGE_PILL = { type: "spring", stiffness: 380, damping: 28 } as const;

interface StageInfo {
  step: string;
  name: string;
  headline: string;
  tagline: string;
  projectFeatured: string;
  projectCategory: string;
  projectTech: string;
  techStack: string[];
  deliverables: string[];
}

const stageData: StageInfo[] = [
  {
    step: "01",
    name: "Understand",
    headline:
      "Understand the business, users, workflows, and constraints before writing a single line of code.",
    tagline: "Translating business goals into a structured technical scope.",
    projectFeatured: "System Discovery",
    projectCategory: "Requirements & System Scope",
    projectTech: "Architecture Blueprint",
    techStack: ["Business Goals", "User Flows", "Data Model", "Constraints"],
    deliverables: [
      "Discovery on target audience, revenue drivers, and friction points",
      "Information architecture, database schema, and route mapping",
      "Scope freeze with transparent deliverables and zero bloat",
    ],
  },
  {
    step: "02",
    name: "Design",
    headline:
      "Turn the requirements into a clean interface designed around usability, trust, and conversion.",
    tagline: "Assembling the Hotel Greenery View direct booking experience.",
    projectFeatured: "Hotel Greenery View",
    projectCategory: "Hospitality & Direct Booking",
    projectTech: "Next.js 14 + Sanity CMS",
    techStack: ["Next.js 14", "Sanity CMS", "Tailwind CSS", "AIO · LLM SEO"],
    deliverables: [
      "Bespoke high-converting room & suite exploration interface",
      "Zero-commission direct inquiry & instant WhatsApp engine",
      "Structured SEO & AI-friendly schema markup for LLM discovery",
    ],
  },
  {
    step: "03",
    name: "Build",
    headline:
      "Engineer the product with reliable architecture, real data, and production-ready functionality.",
    tagline: "Engineering the Grove PMS cloud property operating system.",
    projectFeatured: "Grove PMS Cloud",
    projectCategory: "Custom Hospitality ERP · PMS",
    projectTech: "Next.js + Supabase (Postgres & RLS)",
    techStack: ["Next.js 14", "Supabase", "TypeScript", "POS & Food Billing"],
    deliverables: [
      "Multi-tenant room matrix & guest lifecycle management",
      "Integrated restaurant & food billing (POS) with room charging",
      "Real-time inventory tracking, staff dashboards, and tax billing",
    ],
  },
  {
    step: "04",
    name: "Launch",
    headline:
      "Test, optimize, deploy, and deliver a product that is ready for real users.",
    tagline: "Shipping Anugra Travels and delivering completed production systems.",
    projectFeatured: "Production Release",
    projectCategory: "Production & Handover",
    projectTech: "Global Vercel CDN",
    techStack: ["Hotel Greenery", "Grove PMS", "Anugra Travels"],
    deliverables: [
      "Production deployment with 98+ Core Web Vitals & CDN caching",
      "EmailOctopus & Sanity CMS automated lead workflows",
      "Complete codebase ownership and post-launch warranty",
    ],
  },
];

// Requirement cards organized in natural reading order
const stage01Requirements = [
  {
    id: "business-goal",
    label: "Business Goal",
    title: "Direct Bookings",
    desc: "Eliminate 18-25% OTA commissions",
    badge: "High Priority",
    color: "border-border-accent/40 bg-accent-subtle text-accent",
  },
  {
    id: "user-experience",
    label: "User Experience",
    title: "Fast Mobile Exploration",
    desc: "Instant room & amenity filters",
    badge: "UX Flow",
    color: "border-border bg-surface text-text-secondary",
  },
  {
    id: "content-engine",
    label: "Content Engine",
    title: "Sanity CMS",
    desc: "Seasonal rate & room updates",
    badge: "Headless CMS",
    color: "border-border bg-surface text-text-secondary",
  },
  {
    id: "discoverability",
    label: "Discoverability",
    title: "SEO & AI-Search (AIO)",
    desc: "Top ranking in Google & LLMs",
    badge: "AIO Schema",
    color: "border-border bg-surface text-text-secondary",
  },
];

// Animated percentage counter with smooth ease-out-expo number interpolation
function AnimatedProgressCounter({
  targetPercentage,
  isLive,
  reducedMotion,
}: {
  targetPercentage: number;
  isLive: boolean;
  reducedMotion: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(targetPercentage);
  const currentValRef = useRef(targetPercentage);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayValue(targetPercentage);
      currentValRef.current = targetPercentage;
      return;
    }

    const startVal = currentValRef.current;
    const endVal = targetPercentage;
    const startTime = performance.now();
    const duration = 480; // 480ms within the 150ms-700ms calibrated range

    let animId: number;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // easeOutExpo deceleration formula
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(startVal + (endVal - startVal) * ease);
      setDisplayValue(current);
      currentValRef.current = current;

      if (progress < 1) {
        animId = requestAnimationFrame(tick);
      }
    }

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [targetPercentage, reducedMotion]);

  if (isLive) {
    return (
      <span className="text-accent font-semibold inline-flex items-center gap-1.5 font-sans text-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        SHIPPED &amp; LIVE
      </span>
    );
  }

  return (
    <span className="text-accent font-semibold tabular-nums font-sans text-xs">
      {displayValue}% COMPLETE
    </span>
  );
}

// Rolling digit component for smooth stage counter transitions
function AnimatedStageDigit({
  digit,
  reducedMotion,
}: {
  digit: string;
  reducedMotion: boolean;
}) {
  if (reducedMotion) {
    return <span>{digit}</span>;
  }

  return (
    <span className="inline-block relative overflow-hidden h-[1.15em] align-top">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={digit}
          initial={{ y: "80%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-80%", opacity: 0 }}
          transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
          className="inline-block"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Multi-viewport scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll spring for continuous scrubbing of visual indicators
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.0005,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.25) {
      setActiveStage(0);
    } else if (latest < 0.50) {
      setActiveStage(1);
    } else if (latest < 0.75) {
      setActiveStage(2);
    } else {
      setActiveStage(3);
    }
  });

  // Narrative variants (Right Column)
  const narrativeContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.07,
        delayChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -8,
      transition: {
        duration: 0.22,
        ease: EASE_OUT_EXPO,
      },
    },
  };

  const narrativeItemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.42,
        ease: EASE_OUT_EXPO,
      },
    },
  };

  // Canvas Stage Card Variants (Left Column) — slightly weightier deceleration
  const canvasStageVariants = {
    hidden: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.97,
      y: shouldReduceMotion ? 0 : 12,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.55,
        ease: EASE_OUT_PANEL,
      },
    },
    exit: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 1.02,
      y: shouldReduceMotion ? 0 : -10,
      transition: {
        duration: shouldReduceMotion ? 0.15 : 0.3,
        ease: EASE_OUT_EXPO,
      },
    },
  };

  const currentStage = stageData[activeStage];
  const targetPercent = (activeStage + 1) * 25;

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative bg-bg border-t border-border/80 dark:border-white/[0.06]"
    >
      {/* Top Section Header */}
      <div className="pt-20 pb-12 sm:pt-28 sm:pb-16 border-b border-border/80 dark:border-white/[0.06] bg-bg-subtle/40">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[12px] font-sans font-medium tracking-[0.04em] uppercase text-accent mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>04 · Development Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-text-primary tracking-[-0.022em] leading-[1.18] sm:leading-[1.16]">
              From idea to a production-ready product.
            </h2>
            <p className="mt-3.5 text-base sm:text-[17px] text-text-secondary font-normal leading-[1.62]">
              Watch real applications evolve through every phase of the engineering lifecycle—from initial discovery to live production deployment.
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Sticky Scroll Showcase (Persistent Browser Frame) */}
      <div className="hidden lg:block relative min-h-[380vh]">
        <div className="sticky top-20 h-[calc(100vh-5rem)] flex items-center">
          <div className="container-custom w-full grid grid-cols-12 gap-12 items-center">
            
            {/* LEFT COLUMN: Persistent Browser / Product Frame */}
            <div className="col-span-7 h-[560px]">
              <div className="w-full h-full bg-card rounded-xl border border-border/80 dark:border-white/[0.07] shadow-xs flex flex-col justify-between overflow-hidden relative transition-all">
                
                {/* Persistent Browser Window Header */}
                <div className="bg-bg-subtle/80 px-4 py-2.5 border-b border-border/70 dark:border-white/[0.06] flex items-center justify-between z-30">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-border-hover dark:bg-white/[0.15]" />
                      <span className="w-2 h-2 rounded-full bg-border-hover dark:bg-white/[0.15]" />
                      <span className="w-2 h-2 rounded-full bg-border-hover dark:bg-white/[0.15]" />
                    </div>

                    {/* Dynamic Browser Address Bar */}
                    <div className="px-3 py-0.5 rounded bg-surface/70 dark:bg-white/[0.04] border border-border/60 dark:border-white/[0.06] text-[11px] font-mono text-text-secondary flex items-center gap-1.5 shadow-2xs overflow-hidden">
                      <span className="text-text-muted">https://</span>
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={activeStage}
                          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                          transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                          className="font-medium text-text-primary inline-block"
                        >
                          {activeStage === 0 && "blueprint.internal/scope"}
                          {activeStage === 1 && "hotelgreeneryview.com"}
                          {activeStage === 2 && "grovepms.vercel.app"}
                          {activeStage === 3 && "production.systems/live"}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Stage Dynamic Pill Badge */}
                  <div className="flex items-center">
                    <motion.div
                      layout
                      layoutId="process-stage-pill"
                      transition={shouldReduceMotion ? { duration: 0.15 } : SPRING_STAGE_PILL}
                      className="text-[11.5px] font-sans font-medium px-2.5 py-0.5 rounded border border-border-accent/40 bg-accent-subtle text-accent flex items-center gap-1.5 transition-colors"
                    >
                      {activeStage === 0 && <span>01 · Discovery &amp; Scope</span>}
                      {activeStage === 1 && (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          <span>02 · Interface Design</span>
                        </>
                      )}
                      {activeStage === 2 && (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          <span>03 · Full-Stack Build</span>
                        </>
                      )}
                      {activeStage === 3 && (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-success" />
                          <span>04 · Production Release</span>
                        </>
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* Persistent Browser Canvas Stage Area with Overlapping Crossfade */}
                <div className="relative flex-1 p-6 flex flex-col justify-center items-center overflow-hidden bg-bg-subtle/40 dark:bg-navy-950/40 min-h-[440px]">
                  <AnimatePresence mode="popLayout" initial={false}>
                    
                    {/* STAGE 01: UNDERSTAND */}
                    {activeStage === 0 && (
                      <motion.div
                        key="stage-understand"
                        variants={canvasStageVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="w-full max-w-lg space-y-4"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                          className="text-center"
                        >
                          <span className="text-[11.5px] font-sans font-medium text-text-muted tracking-[0.02em]">
                            BUSINESS &amp; TECHNICAL REQUIREMENTS
                          </span>
                        </motion.div>

                        {/* Assembling Requirement Nodes in Natural Reading Order */}
                        <div className="grid grid-cols-2 gap-3">
                          {stage01Requirements.map((req, i) => (
                            <motion.div
                              key={req.id}
                              initial={
                                shouldReduceMotion
                                  ? { opacity: 0 }
                                  : { opacity: 0, y: 14, scale: 0.96 }
                              }
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{
                                delay: shouldReduceMotion ? 0 : i * 0.085, // staggered reading order: 0ms, 85ms, 170ms, 255ms
                                duration: 0.38,
                                ease: EASE_OUT_EXPO,
                              }}
                              className="p-3.5 bg-white dark:bg-card rounded-xl border border-border shadow-2xs space-y-1.5"
                            >
                              <div className="flex items-center justify-between text-[11px] font-sans font-medium text-text-muted">
                                <span>{req.label}</span>
                                <motion.span
                                  initial={
                                    shouldReduceMotion
                                      ? {}
                                      : { scale: 0.7, opacity: 0 }
                                  }
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{
                                    delay: shouldReduceMotion
                                      ? 0
                                      : i * 0.085 + 0.12,
                                    ...SPRING_TACTILE,
                                  }}
                                  className={`px-1.5 py-0.5 rounded font-semibold ${req.color}`}
                                >
                                  {req.badge}
                                </motion.span>
                              </div>
                              <div className="text-xs font-semibold text-text-primary">
                                {req.title}
                              </div>
                              <div className="text-[11px] text-text-secondary leading-tight">
                                {req.desc}
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Bottom Status Bar */}
                        <motion.div
                          initial={
                            shouldReduceMotion
                              ? { opacity: 0 }
                              : { opacity: 0, y: 10 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: shouldReduceMotion ? 0 : 0.36,
                            duration: 0.35,
                            ease: EASE_OUT_EXPO,
                          }}
                          className="p-3 bg-white dark:bg-card rounded-xl border border-border flex items-center justify-between text-xs text-text-secondary shadow-2xs"
                        >
                          <span className="font-sans font-medium text-[11.5px]">Technical Scope:</span>
                          <span className="font-semibold text-text-primary flex items-center gap-1.5">
                            Next.js 14 + Sanity + Tailwind{" "}
                            <motion.span
                              initial={
                                shouldReduceMotion
                                  ? {}
                                  : { scale: 0, rotate: -35 }
                              }
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{
                                delay: shouldReduceMotion ? 0 : 0.44,
                                ...SPRING_CHECK,
                              }}
                              className="inline-flex"
                            >
                              <CheckCircle2
                                size={13}
                                className="text-emerald-600 dark:text-emerald-400"
                              />
                            </motion.span>
                          </span>
                        </motion.div>
                      </motion.div>
                    )}

                    {/* STAGE 02: DESIGN */}
                    {activeStage === 1 && (
                      <motion.div
                        key="stage-design"
                        variants={canvasStageVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="w-full max-w-lg space-y-3"
                      >
                        {/* Real Project Card Mockup: Hotel Greenery View */}
                        <div className="bg-white dark:bg-card rounded-xl border border-border shadow-sm p-4 sm:p-5 space-y-4">
                          {/* Hotel Brand Header */}
                          <motion.div
                            initial={
                              shouldReduceMotion
                                ? { opacity: 0 }
                                : { opacity: 0, y: -8 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                            className="flex items-center justify-between pb-3 border-b border-border"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-base">🌿</span>
                              <span className="font-semibold text-sm text-text-primary">
                                Hotel Greenery View
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <motion.span
                                initial={
                                  shouldReduceMotion
                                    ? {}
                                    : { scale: 0.7, opacity: 0 }
                                }
                                animate={{ scale: 1, opacity: 1 }}
                                transition={SPRING_TACTILE}
                                className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                              >
                                Next.js UI + Sanity
                              </motion.span>
                            </div>
                          </motion.div>

                          {/* Hotel Hero + Direct Booking CTA */}
                          <motion.div
                            initial={
                              shouldReduceMotion
                                ? { opacity: 0 }
                                : { opacity: 0, y: 10 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: shouldReduceMotion ? 0 : 0.08,
                              duration: 0.38,
                              ease: EASE_OUT_EXPO,
                            }}
                            className="p-4 rounded-xl bg-bg-subtle border border-border/80 space-y-2.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-text-primary">
                                Luxury Stay in Nature's Lap
                              </span>
                              <motion.span
                                initial={
                                  shouldReduceMotion
                                    ? {}
                                    : { scale: 0.7, opacity: 0 }
                                }
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.15, ...SPRING_TACTILE }}
                                className="text-[10.5px] text-emerald-600 dark:text-emerald-400 font-sans font-semibold"
                              >
                                +65% Direct Inquiries
                              </motion.span>
                            </div>
                            <div className="text-xs text-text-secondary leading-relaxed font-normal">
                              Experience tranquil mountain vistas with direct room reservations, live amenity filters, and instant WhatsApp booking.
                            </div>
                            <div className="flex gap-2 pt-1">
                              <span className="px-2.5 py-1 bg-accent text-[#0B0C0E] rounded text-xs font-semibold shadow-2xs cursor-default">
                                Direct Booking CTA
                              </span>
                              <span className="px-2.5 py-1 bg-surface text-text-primary border border-border rounded text-xs font-medium cursor-default">
                                WhatsApp Direct
                              </span>
                            </div>
                          </motion.div>

                          {/* Room Cards Showcase */}
                          <div className="grid grid-cols-2 gap-2.5">
                            <motion.div
                              initial={
                                shouldReduceMotion
                                  ? { opacity: 0 }
                                  : { opacity: 0, y: 10 }
                              }
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: shouldReduceMotion ? 0 : 0.16,
                                duration: 0.35,
                                ease: EASE_OUT_EXPO,
                              }}
                              className="p-3 bg-surface rounded-lg border border-border space-y-1"
                            >
                              <div className="text-[10.5px] text-text-muted font-sans font-medium">Deluxe Suite</div>
                              <div className="text-xs font-bold text-text-primary">Mountain View</div>
                              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Live Availability Sync</div>
                            </motion.div>
                            <motion.div
                              initial={
                                shouldReduceMotion
                                  ? { opacity: 0 }
                                  : { opacity: 0, y: 10 }
                              }
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: shouldReduceMotion ? 0 : 0.24,
                                duration: 0.35,
                                ease: EASE_OUT_EXPO,
                              }}
                              className="p-3 bg-surface rounded-lg border border-border space-y-1"
                            >
                              <div className="text-[10.5px] text-text-muted font-sans font-medium">Executive Room</div>
                              <div className="text-xs font-bold text-text-primary">Garden Terrace</div>
                              <div className="text-[10px] text-accent font-medium">Instant Confirmation</div>
                            </motion.div>
                          </div>
                        </div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3, duration: 0.3 }}
                          className="flex items-center justify-between text-xs text-text-muted font-sans px-1"
                        >
                          <span>SEO &amp; AI-Friendly Schema: Active</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100% Mobile Ready</span>
                        </motion.div>
                      </motion.div>
                    )}

                    {/* STAGE 03: BUILD */}
                    {activeStage === 2 && (
                      <motion.div
                        key="stage-build"
                        variants={canvasStageVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="w-full max-w-lg space-y-3"
                      >
                        {/* Real Project Card Mockup: Grove PMS */}
                        <div className="bg-white dark:bg-card rounded-xl border border-border shadow-sm p-4 sm:p-5 space-y-3.5">
                          {/* PMS Header Bar */}
                          <motion.div
                            initial={
                              shouldReduceMotion
                                ? { opacity: 0 }
                                : { opacity: 0, y: -8 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                            className="flex items-center justify-between pb-3 border-b border-border"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-base">🏨</span>
                              <span className="font-semibold text-sm text-text-primary">
                                Grove PMS Cloud
                              </span>
                            </div>
                            <motion.span
                              initial={
                                shouldReduceMotion
                                  ? {}
                                  : { scale: 0.7, opacity: 0 }
                              }
                              animate={{ scale: 1, opacity: 1 }}
                              transition={SPRING_TACTILE}
                              className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20"
                            >
                              Next.js + Supabase
                            </motion.span>
                          </motion.div>

                          {/* PMS Metrics Row */}
                          <div className="grid grid-cols-3 gap-2 text-center text-xs">
                            {[
                              { label: "Room Matrix", val: "Live Sync", color: "text-text-primary" },
                              { label: "Food Billing", val: "POS Engine", color: "text-emerald-600 dark:text-emerald-400" },
                              { label: "Inventory", val: "Automated", color: "text-text-primary" },
                            ].map((metric, idx) => (
                              <motion.div
                                key={metric.label}
                                initial={
                                  shouldReduceMotion
                                    ? { opacity: 0 }
                                    : { opacity: 0, y: 10 }
                                }
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  delay: shouldReduceMotion ? 0 : idx * 0.08,
                                  duration: 0.35,
                                  ease: EASE_OUT_EXPO,
                                }}
                                className="p-2 rounded-lg bg-bg-subtle border border-border"
                              >
                                <div className="text-[10px] text-text-muted font-sans font-medium">{metric.label}</div>
                                <div className={`font-semibold mt-0.5 ${metric.color}`}>{metric.val}</div>
                              </motion.div>
                            ))}
                          </div>

                          {/* Live Operational Matrix Rows */}
                          <motion.div
                            initial={
                              shouldReduceMotion
                                ? { opacity: 0 }
                                : { opacity: 0, y: 10 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: shouldReduceMotion ? 0 : 0.2,
                              duration: 0.38,
                              ease: EASE_OUT_EXPO,
                            }}
                            className="p-3 rounded-lg bg-surface border border-border space-y-1.5"
                          >
                            <div className="flex items-center justify-between text-[11px] font-semibold text-text-primary">
                              <span>Room &amp; Guest Lifecycle</span>
                              <span className="text-[10.5px] text-emerald-600 dark:text-emerald-400 font-sans font-medium">Postgres RLS Secure</span>
                            </div>
                            <div className="space-y-1 text-xs">
                              <div className="flex items-center justify-between p-1.5 rounded bg-white dark:bg-navy-950 border border-border/60">
                                <span className="text-text-secondary text-[11px] font-sans">Room 102 (Deluxe)</span>
                                <span className="text-emerald-700 dark:text-emerald-300 text-[10.5px] font-sans font-semibold">Checked-In • POS Active</span>
                              </div>
                              <div className="flex items-center justify-between p-1.5 rounded bg-white dark:bg-navy-950 border border-border/60">
                                <span className="text-text-secondary text-[11px] font-sans">Room 204 (Suite)</span>
                                <span className="text-accent text-[10.5px] font-sans font-semibold">Food Bill Added (₹1,450)</span>
                              </div>
                            </div>
                          </motion.div>

                          {/* Architecture Connector */}
                          <motion.div
                            initial={
                              shouldReduceMotion
                                ? { opacity: 0 }
                                : { opacity: 0, y: 8 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: shouldReduceMotion ? 0 : 0.3,
                              duration: 0.35,
                              ease: EASE_OUT_EXPO,
                            }}
                            className="p-2 rounded-lg bg-bg-subtle border border-border flex items-center justify-between text-[11px] font-sans font-medium text-text-secondary"
                          >
                            <span>UI (Next.js)</span>
                            <span className="text-text-muted">→</span>
                            <span>API Route Handler</span>
                            <span className="text-text-muted">→</span>
                            <span className="text-accent font-semibold">Supabase DB</span>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}

                    {/* STAGE 04: LAUNCH */}
                    {activeStage === 3 && (
                      <motion.div
                        key="stage-launch"
                        variants={canvasStageVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="w-full max-w-lg space-y-3"
                      >
                        <motion.div
                          initial={
                            shouldReduceMotion
                              ? { opacity: 0 }
                              : { opacity: 0, y: -6 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                          className="text-center mb-1"
                        >
                          <span className="text-[11.5px] font-sans font-medium tracking-[0.02em] text-[#35B77A]">
                            3 PRODUCTION PRODUCTS DEPLOYED
                          </span>
                        </motion.div>

                        {/* Trio of Live Completed Products with Staggered Reading Flow */}
                        <div className="grid grid-cols-3 gap-2.5">
                          {/* 1. Hotel Greenery View */}
                          <motion.div
                            initial={
                              shouldReduceMotion
                                ? { opacity: 0 }
                                : { opacity: 0, y: 12, scale: 0.96 }
                            }
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                              delay: shouldReduceMotion ? 0 : 0.06,
                              duration: 0.38,
                              ease: EASE_OUT_EXPO,
                            }}
                            className="p-3 bg-white dark:bg-card rounded-xl border border-border shadow-xs flex flex-col justify-between space-y-2"
                          >
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs">🌿</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              </div>
                              <div className="text-xs font-semibold text-text-primary mt-1 leading-tight font-sans">
                                Hotel Greenery
                              </div>
                              <div className="text-[10px] text-text-muted font-sans">Direct Booking</div>
                            </div>
                            <div className="pt-1.5 border-t border-border/80">
                              <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 font-sans">+65% Inquiries</div>
                              <div className="text-[9.5px] text-text-muted font-sans font-medium">&lt; 0.8s Load</div>
                            </div>
                          </motion.div>

                          {/* 2. Grove PMS */}
                          <motion.div
                            initial={
                              shouldReduceMotion
                                ? { opacity: 0 }
                                : { opacity: 0, y: 12, scale: 0.96 }
                            }
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                              delay: shouldReduceMotion ? 0 : 0.14,
                              duration: 0.38,
                              ease: EASE_OUT_EXPO,
                            }}
                            className="p-3 bg-white dark:bg-card rounded-xl border border-accent/40 shadow-xs flex flex-col justify-between space-y-2 ring-1 ring-accent/20"
                          >
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs">🏨</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              </div>
                              <div className="text-xs font-semibold text-text-primary mt-1 leading-tight font-sans">
                                Grove PMS
                              </div>
                              <div className="text-[10px] text-text-muted font-sans">Hospitality ERP</div>
                            </div>
                            <div className="pt-1.5 border-t border-border/80">
                              <div className="text-[10px] font-semibold text-accent font-sans">4.5 hrs/day</div>
                              <div className="text-[9.5px] text-text-muted font-sans font-medium">100% In-House</div>
                            </div>
                          </motion.div>

                          {/* 3. Anugra Travels */}
                          <motion.div
                            initial={
                              shouldReduceMotion
                                ? { opacity: 0 }
                                : { opacity: 0, y: 12, scale: 0.96 }
                            }
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                              delay: shouldReduceMotion ? 0 : 0.22,
                              duration: 0.38,
                              ease: EASE_OUT_EXPO,
                            }}
                            className="p-3 bg-white dark:bg-card rounded-xl border border-border shadow-xs flex flex-col justify-between space-y-2"
                          >
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs">✈️</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              </div>
                              <div className="text-xs font-semibold text-text-primary mt-1 leading-tight font-sans">
                                Anugra Travels
                              </div>
                              <div className="text-[10px] text-text-muted font-sans">Travel Platform</div>
                            </div>
                            <div className="pt-1.5 border-t border-border/80">
                              <div className="text-[10px] font-semibold text-accent font-sans">Sanity + Email</div>
                              <div className="text-[9.5px] text-text-muted font-sans font-medium">SEO Ready</div>
                            </div>
                          </motion.div>
                        </div>

                        {/* Production Polish Footer Bar */}
                        <motion.div
                          initial={
                            shouldReduceMotion
                              ? { opacity: 0 }
                              : { opacity: 0, y: 10 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: shouldReduceMotion ? 0 : 0.32,
                            duration: 0.35,
                            ease: EASE_OUT_EXPO,
                          }}
                          className="p-3 bg-surface rounded-xl border border-border flex items-center justify-between text-xs text-text-primary"
                        >
                          <span className="flex items-center gap-1.5 font-medium font-sans">
                            <motion.span
                              initial={
                                shouldReduceMotion
                                  ? {}
                                  : { scale: 0, rotate: -35 }
                              }
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{
                                delay: shouldReduceMotion ? 0 : 0.4,
                                ...SPRING_CHECK,
                              }}
                              className="inline-flex"
                            >
                              <CheckCircle2
                                size={15}
                                className="text-emerald-600 dark:text-emerald-400"
                              />
                            </motion.span>
                            Production Verified &amp; Deployed
                          </span>
                          <a
                            href="#work"
                            className="font-medium text-accent hover:text-accent-hover flex items-center gap-1 text-[11.5px] group font-sans"
                          >
                            <span>Explore Selected Work</span>
                            <ArrowRight
                              size={12}
                              className="transition-transform duration-200 group-hover:translate-x-0.5"
                            />
                          </a>
                        </motion.div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

                {/* Persistent Browser Window Footer with Scrubbed Scroll Progress Line */}
                <div className="relative">
                  {/* Subtle continuous scrubbed scroll progress line */}
                  <motion.div
                    style={{
                      scaleX: smoothScrollProgress,
                      transformOrigin: "left",
                    }}
                    className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-accent to-emerald-500 z-40"
                  />

                  <div className="bg-white dark:bg-card px-5 py-2.5 border-t border-border flex items-center justify-between text-xs text-text-secondary z-30">
                    <div className="flex items-center gap-2">
                      <span className="font-sans font-medium text-[11px] text-text-muted">STAGE:</span>
                      <span className="font-semibold text-text-primary flex items-center gap-1 font-sans">
                        <AnimatedStageDigit
                          digit={currentStage.step}
                          reducedMotion={shouldReduceMotion}
                        />
                        <span>/ 04 — {currentStage.name}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-sans font-medium text-[11px]">
                      <span className="text-text-muted">STATUS:</span>
                      <AnimatedProgressCounter
                        targetPercentage={targetPercent}
                        isLive={activeStage === 3}
                        reducedMotion={shouldReduceMotion}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT COLUMN: Interactive Story Narrative with Staggered Cascades */}
            <div className="col-span-5 pl-2 relative">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={activeStage}
                  variants={narrativeContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-7"
                >
                  {/* Step indicator */}
                  <motion.div
                    variants={narrativeItemVariants}
                    className="flex items-center gap-3"
                  >
                    <span className="text-sm font-sans font-semibold text-accent flex items-center gap-1 tabular-nums">
                      <AnimatedStageDigit
                        digit={currentStage.step}
                        reducedMotion={shouldReduceMotion}
                      />
                      <span>/ 04</span>
                    </span>
                    <span className="h-px w-10 bg-accent/40" />
                    <span className="text-[11px] uppercase tracking-[0.04em] font-medium text-text-muted">
                      {currentStage.projectCategory}
                    </span>
                  </motion.div>

                  {/* Active Title & Headline */}
                  <motion.div variants={narrativeItemVariants}>
                    <h3 className="text-3xl sm:text-4xl font-semibold text-text-primary tracking-[-0.02em] leading-[1.18]">
                      {currentStage.name}
                    </h3>
                    <p className="mt-3 text-base sm:text-lg font-normal text-text-primary leading-relaxed">
                      {currentStage.headline}
                    </p>
                  </motion.div>

                  {/* Tagline / Context */}
                  <motion.p
                    variants={narrativeItemVariants}
                    className="text-sm text-text-secondary leading-relaxed"
                  >
                    {currentStage.tagline}
                  </motion.p>

                  {/* Deliverables Checklist with Spring Stagger */}
                  <motion.div
                    variants={narrativeItemVariants}
                    className="space-y-2.5 pt-4 border-t border-border"
                  >
                    <div className="text-[11px] font-semibold uppercase tracking-[0.04em] text-text-primary mb-1">
                      What Gets Built:
                    </div>
                    {currentStage.deliverables.map((item, idx) => (
                      <motion.div
                        key={item}
                        initial={
                          shouldReduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, x: -8 }
                        }
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: shouldReduceMotion ? 0 : 0.16 + idx * 0.07,
                          duration: 0.35,
                          ease: EASE_OUT_EXPO,
                        }}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary"
                      >
                        <motion.span
                          initial={
                            shouldReduceMotion
                              ? {}
                              : { scale: 0, rotate: -35 }
                          }
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            delay: shouldReduceMotion ? 0 : 0.2 + idx * 0.07,
                            ...SPRING_CHECK,
                          }}
                          className="shrink-0 mt-0.5 inline-flex"
                        >
                          <CheckCircle2 size={15} className="text-accent" />
                        </motion.span>
                        <span className="leading-snug">{item}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Project Chip / Tech Stack */}
                  <motion.div
                    variants={narrativeItemVariants}
                    className="p-3.5 rounded-xl bg-surface border border-border flex items-center justify-between shadow-2xs"
                  >
                    <div>
                      <div className="text-[10px] text-text-muted uppercase tracking-[0.04em] font-medium">
                        Featured Project
                      </div>
                      <div className="text-xs font-semibold text-text-primary mt-0.5">
                        {currentStage.projectFeatured}
                      </div>
                    </div>
                    <div className="text-xs font-sans text-accent font-medium">
                      {currentStage.projectTech}
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile & Tablet Stepper Experience */}
      <div className="block lg:hidden py-12">
        <div className="container-custom space-y-6">
          {/* Mobile stage selector tabs */}
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-surface rounded-xl border border-border">
            {stageData.map((st, i) => (
              <button
                key={st.step}
                onClick={() => setActiveStage(i)}
                className={`py-2 px-1 text-center rounded-lg text-xs font-semibold transition-all relative ${
                  activeStage === i
                    ? "text-text-primary"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                {activeStage === i && (
                  <motion.div
                    layoutId="mobile-process-tab"
                    transition={SPRING_STAGE_PILL}
                    className="absolute inset-0 bg-white dark:bg-card rounded-lg shadow-xs border border-border/80"
                  />
                )}
                <span className="relative z-10">{st.step}</span>
              </button>
            ))}
          </div>

          {/* Active mobile card */}
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={activeStage}
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 12 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -8 }
              }
              transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
              className="p-6 bg-white dark:bg-card rounded-2xl border border-border shadow-sm space-y-5"
            >
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <span className="text-xs font-sans font-semibold text-accent tabular-nums">
                    {stageData[activeStage].step} of 04
                  </span>
                  <h3 className="text-xl font-semibold text-text-primary mt-0.5 tracking-[-0.015em]">
                    {stageData[activeStage].name}
                  </h3>
                </div>
                <span className="text-[10px] uppercase tracking-[0.04em] font-medium px-2 py-0.5 rounded-md bg-surface text-text-secondary border border-border">
                  {stageData[activeStage].projectFeatured}
                </span>
              </div>

              <p className="text-sm font-normal text-text-primary leading-relaxed">
                {stageData[activeStage].headline}
              </p>

              <div className="space-y-2 pt-2 border-t border-border">
                <div className="text-[11px] font-semibold uppercase tracking-[0.04em] text-text-primary mb-1">
                  Deliverables
                </div>
                {stageData[activeStage].deliverables.map((item, idx) => (
                  <motion.div
                    key={item}
                    initial={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, x: -6 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : idx * 0.06,
                      duration: 0.3,
                      ease: EASE_OUT_EXPO,
                    }}
                    className="flex items-start gap-2 text-xs text-text-secondary"
                  >
                    <CheckCircle2
                      size={14}
                      className="text-accent shrink-0 mt-0.5"
                    />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-text-muted font-sans border-t border-border">
                <span>Stack: <span className="font-medium text-text-secondary">{stageData[activeStage].projectTech}</span></span>
                <span className="text-accent font-semibold tabular-nums">
                  {stageData[activeStage].step} of 04
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
