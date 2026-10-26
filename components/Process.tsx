"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  Lock,
} from "lucide-react";
import { useReducedMotion } from "@/lib/reduced-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

// ═══════════════════════════════════════════════
// DATA ARCHITECTURE: SINGLE SOURCE OF TRUTH
// ═══════════════════════════════════════════════

export interface StageData {
  id: string;
  step: string;
  stepNumber: number;
  name: string;
  category: string;
  browserUrl: string;
  stageBadge: string;
  heading: string;
  lead: string;
  supporting: string;
  deliverablesHeading: string;
  deliverables: string[];
  featuredProject: string;
  technologyLabel: string;
  statusLabel: string;
  progressPercent: number;
  isLive?: boolean;
}

const STAGES: StageData[] = [
  {
    id: "understand",
    step: "01",
    stepNumber: 1,
    name: "Understand",
    category: "REQUIREMENTS & SYSTEM SCOPE",
    browserUrl: "blueprint.internal/scope",
    stageBadge: "01 · Discovery & Scope",
    heading: "Understand",
    lead: "Understand the business, users, workflows, and constraints before writing a single line of code.",
    supporting: "Translating business goals into a structured technical scope.",
    deliverablesHeading: "WHAT GETS BUILT:",
    deliverables: [
      "Discovery on target audience, revenue drivers, and friction points",
      "Information architecture, database schema, and route mapping",
      "Scope freeze with transparent deliverables and zero bloat",
    ],
    featuredProject: "System Discovery",
    technologyLabel: "Architecture Blueprint",
    statusLabel: "25% COMPLETE",
    progressPercent: 25,
  },
  {
    id: "design",
    step: "02",
    stepNumber: 2,
    name: "Design",
    category: "HOSPITALITY & DIRECT BOOKING",
    browserUrl: "www.hotelgreeneryview.com",
    stageBadge: "02 · Interface Design",
    heading: "Design",
    lead: "Turn the requirements into a clean interface designed around usability, trust, and conversion.",
    supporting: "Assembling the Hotel Greenery View direct booking experience.",
    deliverablesHeading: "WHAT GETS BUILT:",
    deliverables: [
      "Bespoke high-converting room and suite exploration interface",
      "Direct inquiry flows and instant WhatsApp booking integration",
      "Structured SEO and AI-friendly schema markup for discoverability",
    ],
    featuredProject: "Hotel Greenery View",
    technologyLabel: "Next.js 14 + Sanity CMS",
    statusLabel: "50% COMPLETE",
    progressPercent: 50,
  },
  {
    id: "build",
    step: "03",
    stepNumber: 3,
    name: "Build",
    category: "CUSTOM HOSPITALITY ERP · PMS",
    browserUrl: "grovepms.vercel.app",
    stageBadge: "03 · Full-Stack Build",
    heading: "Build",
    lead: "Engineer the product with reliable architecture, real data, and production-ready functionality.",
    supporting: "Engineering the Grove PMS cloud property operating system.",
    deliverablesHeading: "WHAT GETS BUILT:",
    deliverables: [
      "Multi-tenant room matrix and guest lifecycle management",
      "Integrated restaurant and food billing (POS) with room charging",
      "Real-time inventory tracking, staff dashboards, and tax billing",
    ],
    featuredProject: "Grove PMS Cloud",
    technologyLabel: "Next.js + Supabase (Postgres & RLS)",
    statusLabel: "75% COMPLETE",
    progressPercent: 75,
  },
  {
    id: "launch",
    step: "04",
    stepNumber: 4,
    name: "Launch",
    category: "PRODUCTION & HANDOVER",
    browserUrl: "production.systems/live",
    stageBadge: "04 · Production Release",
    heading: "Launch",
    lead: "Test, optimize, deploy, and deliver a product that is ready for real users.",
    supporting: "Shipping Anugra Travels and delivering completed production systems.",
    deliverablesHeading: "WHAT GETS BUILT:",
    deliverables: [
      "Production deployment with performance optimization and CDN caching",
      "EmailOctopus and Sanity CMS workflows where configured",
      "Codebase handover, documentation, and agreed post-launch support",
    ],
    featuredProject: "Production Release",
    technologyLabel: "Vercel Deployment",
    statusLabel: "SHIPPED & LIVE",
    progressPercent: 100,
    isLive: true,
  },
];

// Requirement card nodes for Stage 01
const STAGE01_CARDS = [
  {
    label: "Business Goal",
    badge: "High Priority",
    title: "Direct Bookings",
    desc: "Eliminate 18–25% OTA commissions",
    badgeClass: "bg-accent/15 dark:bg-[#E5A93C]/15 text-accent dark:text-[#E5A93C] border border-accent/30 dark:border-[#E5A93C]/30",
  },
  {
    label: "User Experience",
    badge: "UX Flow",
    title: "Fast Mobile Exploration",
    desc: "Instant room & amenity filters",
    badgeClass: "bg-black/[0.04] dark:bg-white/[0.06] text-text-secondary dark:text-[#A0A3AC] border border-border/80 dark:border-white/[0.08]",
  },
  {
    label: "Content Engine",
    badge: "Headless CMS",
    title: "Sanity CMS",
    desc: "Seasonal rate & room updates",
    badgeClass: "bg-black/[0.04] dark:bg-white/[0.06] text-text-secondary dark:text-[#A0A3AC] border border-border/80 dark:border-white/[0.08]",
  },
  {
    label: "Discoverability",
    badge: "AIO Schema",
    title: "SEO & AI-Search (AIO)",
    desc: "Structured discovery across search engines and AI tools",
    badgeClass: "bg-success/15 dark:bg-[#10B981]/15 text-success dark:text-[#10B981] border border-success/30 dark:border-[#10B981]/30",
  },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const prevProgressRef = useRef(0);
  const prevStageRef = useRef(0);
  const shouldReduceMotion = useReducedMotion();

  // Multi-viewport desktop scroll tracking (~400vh container)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 1. Direction detection
    const diff = latest - prevProgressRef.current;
    if (Math.abs(diff) > 0.003) {
      setDirection(diff > 0 ? 1 : -1);
      prevProgressRef.current = latest;
    }

    // 2. Deterministic stage threshold mapping
    let nextStage = 0;
    if (latest < 0.25) {
      nextStage = 0;
    } else if (latest < 0.5) {
      nextStage = 1;
    } else if (latest < 0.75) {
      nextStage = 2;
    } else {
      nextStage = 3;
    }

    if (nextStage !== prevStageRef.current) {
      setActiveStage(nextStage);
      prevStageRef.current = nextStage;
    }
  });

  // Smooth scroll navigation to stage center
  const handleStageClick = (stageIndex: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const containerHeight = rect.height;
    const viewportHeight = window.innerHeight;
    const scrollSpan = containerHeight - viewportHeight;

    const stageCenters = [0.125, 0.375, 0.625, 0.875];
    const targetScroll = containerTop + stageCenters[stageIndex] * scrollSpan;

    setDirection(stageIndex >= activeStage ? 1 : -1);
    setActiveStage(stageIndex);
    prevStageRef.current = stageIndex;

    window.scrollTo({
      top: targetScroll,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  const currentStage = STAGES[activeStage];

  // Bidirectional directional variants
  const stageTransitionVariants = {
    enter: (dir: number) => ({
      y: shouldReduceMotion ? 0 : dir > 0 ? 28 : -28,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
      transition: {
        y: { type: "spring", stiffness: 260, damping: 28 },
        opacity: { duration: 0.32, ease: EASE_OUT_EXPO },
      },
    },
    exit: (dir: number) => ({
      y: shouldReduceMotion ? 0 : dir > 0 ? -28 : 28,
      opacity: 0,
      transition: {
        y: { type: "spring", stiffness: 260, damping: 28 },
        opacity: { duration: 0.22, ease: EASE_OUT_EXPO },
      },
    }),
  };

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative bg-bg dark:bg-[#070709] border-t border-border/80 dark:border-white/[0.08] text-text-primary dark:text-[#F4F4F6] transition-colors duration-200"
    >
      {/* ═══════════════════════════════════════════════
          SECTION HEADER (Shared Anchor)
          ═══════════════════════════════════════════════ */}
      <div className="pt-20 pb-10 sm:pt-28 sm:pb-14 border-b border-border/80 dark:border-white/[0.06] bg-bg dark:bg-[#070709] transition-colors duration-200">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            className="max-w-3xl"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-[12px] font-mono font-medium tracking-[0.04em] uppercase text-accent dark:text-[#E5A93C] mb-3.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent dark:bg-[#E5A93C]" />
              <span>04 · Development Process</span>
            </div>

            {/* Editorial Heading */}
            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[46px] font-semibold text-text-primary dark:text-[#F4F4F6] tracking-[-0.04em] leading-[1.08] sm:leading-[1.05]">
              From idea to a production-ready product.
            </h2>

            {/* Description */}
            <p className="mt-4 text-[16px] sm:text-[17.5px] text-text-secondary dark:text-[#A0A3AC] font-normal leading-[1.6] max-w-2xl">
              Watch real applications evolve through every phase of the engineering lifecycle—from initial discovery to live production deployment.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          DESKTOP PINNED 4-STAGE EXPERIENCE (~400vh)
          ═══════════════════════════════════════════════ */}
      <div className="hidden lg:block relative min-h-[400vh]">
        <div className="sticky top-0 h-screen flex flex-col justify-center items-center py-6">
          <div className="w-full max-w-7xl mx-auto px-6 xl:px-8 space-y-6">
            
            {/* Desktop Stage Selector Navigation */}
            <div className="flex items-center justify-between pb-2 border-b border-border/80 dark:border-white/[0.06]">
              <div className="flex items-center gap-2">
                {STAGES.map((st, idx) => {
                  const isActive = activeStage === idx;
                  return (
                    <button
                      key={st.id}
                      onClick={() => handleStageClick(idx)}
                      className={`group relative px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 flex items-center gap-2 ${
                        isActive
                          ? "bg-card dark:bg-white/[0.1] text-text-primary dark:text-[#F4F4F6] border border-border/80 dark:border-white/[0.15] shadow-xs"
                          : "text-text-muted dark:text-[#737781] hover:text-text-primary dark:hover:text-[#A0A3AC] hover:bg-surface dark:hover:bg-white/[0.04]"
                      }`}
                      aria-label={`Jump to stage ${st.step}: ${st.name}`}
                    >
                      <span className={isActive ? "text-accent dark:text-[#E5A93C]" : "text-text-muted dark:text-[#737781]"}>
                        {st.step}
                      </span>
                      <span className="font-sans font-semibold tracking-tight">{st.name}</span>
                      {isActive && (
                        <motion.span
                          layoutId="desktop-active-dot"
                          className="w-1.5 h-1.5 rounded-full bg-accent dark:bg-[#E5A93C]"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2 text-xs font-mono text-text-muted dark:text-[#737781]">
                <span>STAGE:</span>
                <span className="text-accent dark:text-[#E5A93C] font-semibold">{currentStage.step} / 04</span>
              </div>
            </div>

            {/* 12-Column Synchronized Process Grid */}
            <div className="grid grid-cols-12 gap-10 xl:gap-12 items-center">
              
              {/* ══════════════════════════════════════════
                  LEFT COLUMN: Persistent Browser Frame (7 Cols)
                  ══════════════════════════════════════════ */}
              <div className="col-span-7 min-w-0">
                <div className="w-full bg-[#F4F4F1] dark:bg-[#0E0F13] rounded-2xl border border-border/80 dark:border-white/[0.08] shadow-[0_20px_45px_-10px_rgba(0,0,0,0.06)] dark:shadow-[0_24px_50px_-10px_rgba(0,0,0,0.65)] overflow-hidden flex flex-col justify-between min-h-[530px] transition-colors duration-200">
                  
                  {/* Browser Chrome Bar */}
                  <div className="bg-[#ECECE8] dark:bg-[#0A0B0E] px-4 py-3 border-b border-border/80 dark:border-white/[0.08] flex items-center justify-between z-20 transition-colors duration-200">
                    <div className="flex items-center gap-3">
                      {/* Window Dots */}
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-black/20 dark:bg-white/20" />
                        <span className="w-2.5 h-2.5 rounded-full bg-black/20 dark:bg-white/20" />
                        <span className="w-2.5 h-2.5 rounded-full bg-black/20 dark:bg-white/20" />
                      </div>

                      {/* URL Pill */}
                      <div className="px-3 py-1 rounded-full bg-white/80 dark:bg-white/[0.04] border border-border/80 dark:border-white/[0.07] text-[11px] font-mono text-text-secondary dark:text-[#A0A3AC] flex items-center gap-1.5 max-w-[260px] truncate shadow-2xs">
                        <Lock size={10} className="text-text-muted dark:text-[#737781] shrink-0" />
                        <span className="text-text-muted dark:text-[#737781]">https://</span>
                        <span className="text-text-primary dark:text-[#F4F4F6] font-medium truncate">{currentStage.browserUrl}</span>
                      </div>
                    </div>

                    {/* Stage Badge */}
                    <div className="px-2.5 py-0.5 rounded-full bg-accent/10 dark:bg-[#E5A93C]/10 border border-accent/30 dark:border-[#E5A93C]/30 text-[11px] font-sans font-medium text-accent dark:text-[#E5A93C] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent dark:bg-[#E5A93C]" />
                      <span>{currentStage.stageBadge}</span>
                    </div>
                  </div>

                  {/* Browser Body Area with Bidirectional Direction-Aware Crossfade */}
                  <div className="relative flex-1 p-6 flex flex-col justify-center items-center overflow-hidden min-h-[410px] bg-[#FAFAF8] dark:bg-[#070709] transition-colors duration-200">
                    <AnimatePresence mode="wait" custom={direction} initial={false}>
                      
                      {/* ──────── STAGE 01: UNDERSTAND ──────── */}
                      {activeStage === 0 && (
                        <motion.div
                          key="stage-01-understand"
                          custom={direction}
                          variants={stageTransitionVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="w-full max-w-lg space-y-4"
                        >
                          <div className="text-center">
                            <span className="text-[11.5px] font-mono font-medium text-text-muted dark:text-[#737781] tracking-[0.04em] uppercase">
                              BUSINESS &amp; TECHNICAL REQUIREMENTS
                            </span>
                          </div>

                          {/* 2x2 Requirements Grid */}
                          <div className="grid grid-cols-2 gap-3">
                            {STAGE01_CARDS.map((card) => (
                              <div
                                key={card.title}
                                className="p-3.5 bg-card dark:bg-[#14161D] rounded-xl border border-border/80 dark:border-white/[0.07] space-y-1.5 hover:border-black/20 dark:hover:border-white/[0.14] transition-colors shadow-2xs"
                              >
                                <div className="flex items-center justify-between text-[11px] font-sans text-text-muted dark:text-[#737781]">
                                  <span>{card.label}</span>
                                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${card.badgeClass}`}>
                                    {card.badge}
                                  </span>
                                </div>
                                <div className="text-xs font-semibold text-text-primary dark:text-[#F4F4F6]">
                                  {card.title}
                                </div>
                                <div className="text-[11px] text-text-secondary dark:text-[#A0A3AC] leading-tight font-normal">
                                  {card.desc}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Bottom Scope Bar */}
                          <div className="p-3 bg-surface dark:bg-[#191B22] rounded-xl border border-border/80 dark:border-white/[0.08] flex items-center justify-between text-xs text-text-secondary dark:text-[#A0A3AC]">
                            <span className="font-mono text-[11px] text-text-muted dark:text-[#737781]">Technical Scope:</span>
                            <span className="font-semibold text-text-primary dark:text-[#F4F4F6] flex items-center gap-1.5">
                              Next.js 14 + Sanity + Tailwind
                              <CheckCircle2 size={13} className="text-success dark:text-[#10B981]" />
                            </span>
                          </div>
                        </motion.div>
                      )}

                      {/* ──────── STAGE 02: DESIGN ──────── */}
                      {activeStage === 1 && (
                        <motion.div
                          key="stage-02-design"
                          custom={direction}
                          variants={stageTransitionVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="w-full max-w-lg space-y-3"
                        >
                          <div className="bg-card dark:bg-[#14161D] rounded-xl border border-border/80 dark:border-white/[0.08] p-4 sm:p-5 space-y-3.5 shadow-2xs">
                            {/* Inner Header */}
                            <div className="flex items-center justify-between pb-3 border-b border-border/80 dark:border-white/[0.06]">
                              <div className="flex items-center gap-2">
                                <span className="text-sm">🌿</span>
                                <span className="font-semibold text-xs sm:text-sm text-text-primary dark:text-[#F4F4F6]">
                                  Hotel Greenery View
                                </span>
                              </div>
                              <span className="text-[10.5px] font-mono font-medium px-2 py-0.5 rounded-full bg-success/15 dark:bg-[#10B981]/15 text-success dark:text-[#10B981] border border-success/30 dark:border-[#10B981]/30">
                                Next.js UI + Sanity
                              </span>
                            </div>

                            {/* Hero Card */}
                            <div className="p-3.5 rounded-xl bg-surface dark:bg-[#191B22] border border-border/80 dark:border-white/[0.07] space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-text-primary dark:text-[#F4F4F6]">
                                  Luxury Stay in Nature's Lap
                                </span>
                                <span className="text-[10.5px] text-success dark:text-[#10B981] font-sans font-semibold">
                                  +65% Direct Inquiries
                                </span>
                              </div>
                              <p className="text-[11.5px] text-text-secondary dark:text-[#A0A3AC] leading-relaxed font-normal">
                                Experience tranquil mountain vistas with direct room reservations, live amenity filters, and instant WhatsApp booking.
                              </p>
                              <div className="flex gap-2 pt-1">
                                <span className="px-2.5 py-1 bg-accent dark:bg-[#E5A93C] text-white dark:text-[#070709] rounded text-[11px] font-semibold cursor-default">
                                  Direct Booking CTA
                                </span>
                                <span className="px-2.5 py-1 bg-card dark:bg-white/[0.06] text-text-primary dark:text-[#F4F4F6] border border-border/80 dark:border-white/[0.08] rounded text-[11px] font-medium cursor-default">
                                  WhatsApp Direct
                                </span>
                              </div>
                            </div>

                            {/* Sub-Cards */}
                            <div className="grid grid-cols-2 gap-2.5">
                              <div className="p-3 bg-surface dark:bg-[#191B22] rounded-lg border border-border/80 dark:border-white/[0.06] space-y-1">
                                <div className="text-[10px] text-text-muted dark:text-[#737781] font-mono">Deluxe Suite</div>
                                <div className="text-xs font-bold text-text-primary dark:text-[#F4F4F6]">Mountain View</div>
                                <div className="text-[10px] text-success dark:text-[#10B981] font-medium">Live Availability Sync</div>
                              </div>
                              <div className="p-3 bg-surface dark:bg-[#191B22] rounded-lg border border-border/80 dark:border-white/[0.06] space-y-1">
                                <div className="text-[10px] text-text-muted dark:text-[#737781] font-mono">Executive Room</div>
                                <div className="text-xs font-bold text-text-primary dark:text-[#F4F4F6]">Garden Terrace</div>
                                <div className="text-[10px] text-accent dark:text-[#E5A93C] font-medium">Instant Confirmation</div>
                              </div>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between text-[11px] font-mono text-text-muted dark:text-[#737781] px-1">
                            <span>SEO &amp; AI-Friendly Schema: Active</span>
                            <span className="text-success dark:text-[#10B981] font-semibold">100% Mobile Ready</span>
                          </div>
                        </motion.div>
                      )}

                      {/* ──────── STAGE 03: BUILD ──────── */}
                      {activeStage === 2 && (
                        <motion.div
                          key="stage-03-build"
                          custom={direction}
                          variants={stageTransitionVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="w-full max-w-lg space-y-3"
                        >
                          <div className="bg-card dark:bg-[#14161D] rounded-xl border border-border/80 dark:border-white/[0.08] p-4 sm:p-5 space-y-3.5 shadow-2xs">
                            {/* Inner Header */}
                            <div className="flex items-center justify-between pb-3 border-b border-border/80 dark:border-white/[0.06]">
                              <div className="flex items-center gap-2">
                                <span className="text-sm">🏨</span>
                                <span className="font-semibold text-xs sm:text-sm text-text-primary dark:text-[#F4F4F6]">
                                  Grove PMS Cloud
                                </span>
                              </div>
                              <span className="text-[10.5px] font-mono font-medium px-2 py-0.5 rounded-full bg-accent/15 dark:bg-[#E5A93C]/15 text-accent dark:text-[#E5A93C] border border-accent/30 dark:border-[#E5A93C]/30">
                                Next.js + Supabase
                              </span>
                            </div>

                            {/* Metric Row */}
                            <div className="grid grid-cols-3 gap-2 text-center text-xs">
                              <div className="p-2 rounded-lg bg-surface dark:bg-[#191B22] border border-border/80 dark:border-white/[0.06]">
                                <div className="text-[10px] text-text-muted dark:text-[#737781] font-mono">Room Matrix</div>
                                <div className="font-semibold text-text-primary dark:text-[#F4F4F6] mt-0.5">Live Sync</div>
                              </div>
                              <div className="p-2 rounded-lg bg-surface dark:bg-[#191B22] border border-success/30 dark:border-[#10B981]/30">
                                <div className="text-[10px] text-text-muted dark:text-[#737781] font-mono">Food Billing</div>
                                <div className="font-semibold text-success dark:text-[#10B981] mt-0.5">POS Engine</div>
                              </div>
                              <div className="p-2 rounded-lg bg-surface dark:bg-[#191B22] border border-border/80 dark:border-white/[0.06]">
                                <div className="text-[10px] text-text-muted dark:text-[#737781] font-mono">Inventory</div>
                                <div className="font-semibold text-text-primary dark:text-[#F4F4F6] mt-0.5">Automated</div>
                              </div>
                            </div>

                            {/* Lifecycle Card */}
                            <div className="p-3 rounded-lg bg-surface dark:bg-[#191B22] border border-border/80 dark:border-white/[0.06] space-y-1.5">
                              <div className="flex items-center justify-between text-[11px] font-semibold text-text-primary dark:text-[#F4F4F6]">
                                <span>Room &amp; Guest Lifecycle</span>
                                <span className="text-[10.5px] text-success dark:text-[#10B981] font-mono font-medium">Postgres RLS Secure</span>
                              </div>
                              <div className="space-y-1 text-xs">
                                <div className="flex items-center justify-between p-1.5 rounded bg-card dark:bg-[#14161D] border border-border/80 dark:border-white/[0.05]">
                                  <span className="text-text-secondary dark:text-[#A0A3AC] text-[11px] font-mono">Room 102 (Deluxe)</span>
                                  <span className="text-success dark:text-[#10B981] text-[10.5px] font-mono font-semibold">Checked-In · POS Active</span>
                                </div>
                                <div className="flex items-center justify-between p-1.5 rounded bg-card dark:bg-[#14161D] border border-border/80 dark:border-white/[0.05]">
                                  <span className="text-text-secondary dark:text-[#A0A3AC] text-[11px] font-mono">Room 204 (Suite)</span>
                                  <span className="text-accent dark:text-[#E5A93C] text-[10.5px] font-mono font-semibold">Food Bill Added (₹1,450)</span>
                                </div>
                              </div>
                            </div>

                            {/* Pipeline Bar */}
                            <div className="p-2 rounded-lg bg-surface-hover dark:bg-[#0A0B0E] border border-border/80 dark:border-white/[0.07] flex items-center justify-between text-[11px] font-mono text-text-secondary dark:text-[#A0A3AC]">
                              <span>UI (Next.js)</span>
                              <span className="text-text-muted dark:text-[#737781]">→</span>
                              <span>API Route Handler</span>
                              <span className="text-text-muted dark:text-[#737781]">→</span>
                              <span className="text-accent dark:text-[#E5A93C] font-semibold">Supabase DB</span>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* ──────── STAGE 04: LAUNCH ──────── */}
                      {activeStage === 3 && (
                        <motion.div
                          key="stage-04-launch"
                          custom={direction}
                          variants={stageTransitionVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="w-full max-w-lg space-y-3"
                        >
                          <div className="text-center mb-1">
                            <span className="text-[11.5px] font-mono font-semibold tracking-[0.04em] text-success dark:text-[#10B981] uppercase">
                              3 PRODUCTION PRODUCTS DEPLOYED
                            </span>
                          </div>

                          {/* 3 Deployment Cards */}
                          <div className="grid grid-cols-3 gap-2.5">
                            {/* Card 1 */}
                            <div className="p-3 bg-card dark:bg-[#14161D] rounded-xl border border-border/80 dark:border-white/[0.07] flex flex-col justify-between space-y-2 shadow-2xs">
                              <div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs">🌿</span>
                                  <span className="w-1.5 h-1.5 rounded-full bg-success dark:bg-[#10B981] animate-pulse" />
                                </div>
                                <div className="text-xs font-semibold text-text-primary dark:text-[#F4F4F6] mt-1 leading-tight">
                                  Hotel Greenery
                                </div>
                                <div className="text-[10px] text-text-muted dark:text-[#737781] font-mono">Direct Booking</div>
                              </div>
                              <div className="pt-1.5 border-t border-border/80 dark:border-white/[0.06]">
                                <div className="text-[10px] font-semibold text-success dark:text-[#10B981] font-mono">+65% Inquiries</div>
                                <div className="text-[9.5px] text-text-muted dark:text-[#737781] font-mono">Production Website</div>
                              </div>
                            </div>

                            {/* Card 2 (Highlighted) */}
                            <div className="p-3 bg-surface dark:bg-[#191B22] rounded-xl border border-accent/40 dark:border-[#E5A93C]/40 flex flex-col justify-between space-y-2 ring-1 ring-accent/20 dark:ring-[#E5A93C]/20 shadow-[0_0_20px_rgba(185,130,63,0.12)] dark:shadow-[0_0_20px_rgba(229,169,60,0.1)]">
                              <div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs">🏨</span>
                                  <span className="w-1.5 h-1.5 rounded-full bg-success dark:bg-[#10B981] animate-pulse" />
                                </div>
                                <div className="text-xs font-semibold text-text-primary dark:text-[#F4F4F6] mt-1 leading-tight">
                                  Grove PMS
                                </div>
                                <div className="text-[10px] text-accent dark:text-[#E5A93C] font-mono">Hospitality ERP</div>
                              </div>
                              <div className="pt-1.5 border-t border-border/80 dark:border-white/[0.06]">
                                <div className="text-[10px] font-semibold text-accent dark:text-[#E5A93C] font-mono">Custom PMS</div>
                                <div className="text-[9.5px] text-text-muted dark:text-[#737781] font-mono">App Deployment</div>
                              </div>
                            </div>

                            {/* Card 3 */}
                            <div className="p-3 bg-card dark:bg-[#14161D] rounded-xl border border-border/80 dark:border-white/[0.07] flex flex-col justify-between space-y-2 shadow-2xs">
                              <div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs">✈️</span>
                                  <span className="w-1.5 h-1.5 rounded-full bg-success dark:bg-[#10B981] animate-pulse" />
                                </div>
                                <div className="text-xs font-semibold text-text-primary dark:text-[#F4F4F6] mt-1 leading-tight">
                                  Anugra Travels
                                </div>
                                <div className="text-[10px] text-text-muted dark:text-[#737781] font-mono">Travel Platform</div>
                              </div>
                              <div className="pt-1.5 border-t border-border/80 dark:border-white/[0.06]">
                                <div className="text-[10px] font-semibold text-accent dark:text-[#E5A93C] font-mono">Sanity + Email</div>
                                <div className="text-[9.5px] text-text-muted dark:text-[#737781] font-mono">Content Management</div>
                              </div>
                            </div>
                          </div>

                          {/* Bottom Deployment Bar */}
                          <div className="p-3 bg-card dark:bg-[#14161D] rounded-xl border border-border/80 dark:border-white/[0.08] flex items-center justify-between text-xs text-text-primary dark:text-[#F4F4F6] shadow-2xs">
                            <span className="flex items-center gap-1.5 font-medium font-sans">
                              <CheckCircle2 size={14} className="text-success dark:text-[#10B981]" />
                              Production Verified &amp; Deployed
                            </span>
                            <a
                              href="#work"
                              className="font-medium text-accent hover:text-accent-hover dark:text-[#E5A93C] dark:hover:text-[#E5A93C]/80 flex items-center gap-1 text-[11.5px] group transition-colors"
                            >
                              <span>Explore Selected Work</span>
                              <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                            </a>
                          </div>
                        </motion.div>
                      )}

                    </AnimatePresence>
                  </div>

                  {/* Persistent Progress Footer */}
                  <div className="relative border-t border-border/80 dark:border-white/[0.08]">
                    {/* Synchronized Gradient Progress Line */}
                    <div className="h-[2px] bg-black/[0.06] dark:bg-white/[0.06] w-full overflow-hidden relative">
                      <motion.div
                        className="h-full bg-gradient-to-r from-accent dark:from-[#E5A93C] to-success dark:to-[#10B981]"
                        initial={false}
                        animate={{ width: `${currentStage.progressPercent}%` }}
                        transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                      />
                    </div>

                    <div className="bg-[#ECECE8] dark:bg-[#0A0B0E] px-5 py-2.5 flex items-center justify-between text-xs text-text-secondary dark:text-[#A0A3AC] font-mono transition-colors duration-200">
                      <div className="flex items-center gap-2">
                        <span className="text-text-muted dark:text-[#737781]">STAGE:</span>
                        <span className="text-text-primary dark:text-[#F4F4F6] font-semibold">
                          {currentStage.step} / 04 — {currentStage.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-text-muted dark:text-[#737781]">STATUS:</span>
                        {currentStage.isLive ? (
                          <span className="text-success dark:text-[#10B981] font-semibold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-success dark:bg-[#10B981] animate-pulse" />
                            SHIPPED &amp; LIVE
                          </span>
                        ) : (
                          <span className="text-accent dark:text-[#E5A93C] font-semibold tabular-nums">
                            {currentStage.statusLabel}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* ══════════════════════════════════════════
                  RIGHT COLUMN: Synchronized Narrative Panel (5 Cols)
                  ══════════════════════════════════════════ */}
              <div className="col-span-5 min-w-0 pl-2">
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  <motion.div
                    key={currentStage.id}
                    custom={direction}
                    variants={stageTransitionVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-6"
                  >
                    {/* Stage Number & Category */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono font-semibold text-accent dark:text-[#E5A93C] tabular-nums">
                        {currentStage.step} / 04
                      </span>
                      <span className="h-px w-10 bg-accent/40 dark:bg-[#E5A93C]/40" />
                      <span className="text-[11px] uppercase tracking-[0.05em] font-mono font-medium text-text-muted dark:text-[#737781]">
                        {currentStage.category}
                      </span>
                    </div>

                    {/* Main Heading & Lead */}
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-semibold text-text-primary dark:text-[#F4F4F6] tracking-[-0.03em] leading-[1.12]">
                        {currentStage.heading}
                      </h3>
                      <p className="mt-3.5 text-base sm:text-[17px] font-normal text-text-primary dark:text-[#F4F4F6] leading-relaxed">
                        {currentStage.lead}
                      </p>
                    </div>

                    {/* Supporting Description */}
                    <p className="text-sm text-text-secondary dark:text-[#A0A3AC] leading-relaxed font-normal">
                      {currentStage.supporting}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="space-y-2.5 pt-4 border-t border-border/80 dark:border-white/[0.08]">
                      <div className="text-[11px] font-mono font-semibold uppercase tracking-[0.05em] text-text-primary dark:text-[#F4F4F6] mb-1">
                        {currentStage.deliverablesHeading}
                      </div>
                      {currentStage.deliverables.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary dark:text-[#A0A3AC]"
                        >
                          <CheckCircle2 size={15} className="text-accent dark:text-[#E5A93C] shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Featured Project Callout */}
                    <div className="p-3.5 rounded-xl bg-card dark:bg-[#14161D] border border-border/80 dark:border-white/[0.08] flex items-center justify-between shadow-xs">
                      <div>
                        <div className="text-[10px] text-text-muted dark:text-[#737781] uppercase tracking-[0.04em] font-mono font-medium">
                          FEATURED PROJECT
                        </div>
                        <div className="text-xs font-semibold text-text-primary dark:text-[#F4F4F6] mt-0.5">
                          {currentStage.featuredProject}
                        </div>
                      </div>
                      <div className="text-xs font-mono text-accent dark:text-[#E5A93C] font-medium">
                        {currentStage.technologyLabel}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          TABLET & MOBILE STEPPER (Normal Document Flow)
          ═══════════════════════════════════════════════ */}
      <div className="block lg:hidden py-8 sm:py-12">
        <div className="container-custom space-y-6">
          
          {/* Sticky Stage Navigation Selector Pill */}
          <div className="sticky top-20 z-20 bg-card/90 dark:bg-[#0E0F13]/90 backdrop-blur-lg border border-border/80 dark:border-white/10 rounded-full p-1.5 flex items-center justify-between gap-1 shadow-lg">
            {STAGES.map((st, i) => {
              const isActive = activeStage === i;
              return (
                <button
                  key={st.id}
                  onClick={() => {
                    setDirection(i >= activeStage ? 1 : -1);
                    setActiveStage(i);
                  }}
                  className={`flex-1 py-2 px-1 text-center rounded-full text-xs font-mono font-medium transition-all relative flex items-center justify-center gap-1 ${
                    isActive
                      ? "text-text-primary dark:text-[#F4F4F6] font-semibold"
                      : "text-text-muted dark:text-[#737781] hover:text-text-secondary dark:hover:text-[#A0A3AC]"
                  }`}
                  aria-label={`Stage ${st.step}: ${st.name}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="mobile-process-pill"
                      className="absolute inset-0 bg-surface dark:bg-white/[0.12] border border-border dark:border-white/[0.15] rounded-full shadow-2xs"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? "text-accent dark:text-[#E5A93C]" : "text-text-muted dark:text-[#737781]"}`}>
                    {st.step}
                  </span>
                  <span className="relative z-10 font-sans truncate hidden sm:inline">{st.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Mobile Stage Presentation */}
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={currentStage.id}
              custom={direction}
              variants={stageTransitionVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="space-y-6"
            >
              {/* 1. Mobile Browser Preview */}
              <div className="w-full bg-card dark:bg-[#0E0F13] rounded-xl border border-border/80 dark:border-white/[0.08] overflow-hidden shadow-2xs transition-colors duration-200">
                {/* Header */}
                <div className="bg-surface dark:bg-[#0A0B0E] px-3.5 py-2.5 border-b border-border/80 dark:border-white/[0.08] flex items-center justify-between text-xs transition-colors duration-200">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-black/20 dark:bg-white/20" />
                      <span className="w-2 h-2 rounded-full bg-black/20 dark:bg-white/20" />
                      <span className="w-2 h-2 rounded-full bg-black/20 dark:bg-white/20" />
                    </div>
                    <span className="text-[11px] font-mono text-text-secondary dark:text-[#A0A3AC] truncate max-w-[150px]">
                      {currentStage.browserUrl}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-accent dark:text-[#E5A93C] px-2 py-0.5 rounded-full bg-accent/10 dark:bg-[#E5A93C]/10 border border-accent/30 dark:border-[#E5A93C]/30">
                    {currentStage.step} of 04
                  </span>
                </div>

                {/* Mobile Preview Content */}
                <div className="p-4 sm:p-5 bg-bg/50 dark:bg-transparent">
                  {activeStage === 0 && (
                    <div className="space-y-2.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {STAGE01_CARDS.map((card) => (
                          <div key={card.title} className="p-3 bg-card dark:bg-[#14161D] rounded-lg border border-border/80 dark:border-white/[0.06] space-y-1 shadow-2xs">
                            <div className="flex items-center justify-between text-[10px] text-text-muted dark:text-[#737781]">
                              <span>{card.label}</span>
                              <span className={`px-1.5 py-0.5 rounded text-[9.5px] ${card.badgeClass}`}>{card.badge}</span>
                            </div>
                            <div className="text-xs font-semibold text-text-primary dark:text-[#F4F4F6]">{card.title}</div>
                            <div className="text-[11px] text-text-secondary dark:text-[#A0A3AC]">{card.desc}</div>
                          </div>
                        ))}
                      </div>
                      <div className="p-2.5 bg-surface dark:bg-[#191B22] rounded-lg border border-border/80 dark:border-white/[0.06] flex items-center justify-between text-xs text-text-secondary dark:text-[#A0A3AC]">
                        <span className="text-[11px] font-mono text-text-muted dark:text-[#737781]">Scope:</span>
                        <span className="text-xs text-text-primary dark:text-[#F4F4F6] font-semibold flex items-center gap-1">
                          Next.js 14 + Sanity + Tailwind <CheckCircle2 size={12} className="text-success dark:text-[#10B981]" />
                        </span>
                      </div>
                    </div>
                  )}

                  {activeStage === 1 && (
                    <div className="space-y-2.5">
                      <div className="p-3.5 bg-surface dark:bg-[#191B22] rounded-lg border border-border/80 dark:border-white/[0.06] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-text-primary dark:text-[#F4F4F6]">Luxury Stay in Nature's Lap</span>
                          <span className="text-[10.5px] text-success dark:text-[#10B981] font-semibold">+65% Inquiries</span>
                        </div>
                        <p className="text-[11px] text-text-secondary dark:text-[#A0A3AC] leading-relaxed">
                          Mountain vistas with direct reservations, live filters, and WhatsApp booking.
                        </p>
                        <div className="flex gap-2 pt-1">
                          <span className="px-2 py-0.5 bg-accent dark:bg-[#E5A93C] text-white dark:text-[#070709] rounded text-[10.5px] font-semibold">Direct Booking</span>
                          <span className="px-2 py-0.5 bg-card dark:bg-white/[0.06] text-text-primary dark:text-[#F4F4F6] border border-border/80 dark:border-white/[0.08] rounded text-[10.5px]">WhatsApp</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeStage === 2 && (
                    <div className="space-y-2.5">
                      <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                        <div className="p-2 bg-surface dark:bg-[#191B22] rounded-lg border border-border/80 dark:border-white/[0.06]">
                          <div className="text-[9.5px] text-text-muted dark:text-[#737781]">Rooms</div>
                          <div className="font-semibold text-text-primary dark:text-[#F4F4F6] text-[11px]">Live Sync</div>
                        </div>
                        <div className="p-2 bg-surface dark:bg-[#191B22] border border-success/30 dark:border-[#10B981]/30 rounded-lg">
                          <div className="text-[9.5px] text-text-muted dark:text-[#737781]">POS</div>
                          <div className="font-semibold text-success dark:text-[#10B981] text-[11px]">POS Engine</div>
                        </div>
                        <div className="p-2 bg-surface dark:bg-[#191B22] rounded-lg border border-border/80 dark:border-white/[0.06]">
                          <div className="text-[9.5px] text-text-muted dark:text-[#737781]">Stock</div>
                          <div className="font-semibold text-text-primary dark:text-[#F4F4F6] text-[11px]">Automated</div>
                        </div>
                      </div>
                      <div className="p-2.5 bg-surface-hover dark:bg-[#0A0B0E] rounded-lg border border-border/80 dark:border-white/[0.06] text-[10.5px] font-mono text-text-secondary dark:text-[#A0A3AC] flex justify-between">
                        <span>UI (Next.js)</span>
                        <span>→</span>
                        <span>Route Handler</span>
                        <span>→</span>
                        <span className="text-accent dark:text-[#E5A93C] font-semibold">Supabase DB</span>
                      </div>
                    </div>
                  )}

                  {activeStage === 3 && (
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 gap-1.5">
                        <div className="p-2.5 bg-card dark:bg-[#14161D] rounded-lg border border-border/80 dark:border-white/[0.06] space-y-1 shadow-2xs">
                          <div className="text-[10px] text-text-muted dark:text-[#737781] font-mono">Hotel Greenery</div>
                          <div className="text-[10px] font-semibold text-success dark:text-[#10B981]">+65% Inquiries</div>
                        </div>
                        <div className="p-2.5 bg-surface dark:bg-[#191B22] rounded-lg border border-accent/40 dark:border-[#E5A93C]/40 space-y-1">
                          <div className="text-[10px] text-accent dark:text-[#E5A93C] font-mono">Grove PMS</div>
                          <div className="text-[10px] font-semibold text-accent dark:text-[#E5A93C]">Custom ERP</div>
                        </div>
                        <div className="p-2.5 bg-card dark:bg-[#14161D] rounded-lg border border-border/80 dark:border-white/[0.06] space-y-1 shadow-2xs">
                          <div className="text-[10px] text-text-muted dark:text-[#737781] font-mono">Anugra Travels</div>
                          <div className="text-[10px] font-semibold text-accent dark:text-[#E5A93C]">Platform</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 2. Mobile Narrative Details */}
              <div className="p-5 sm:p-6 bg-card dark:bg-[#0E0F13] rounded-xl border border-border/80 dark:border-white/[0.08] space-y-4 shadow-2xs transition-colors duration-200">
                <div className="flex items-center justify-between border-b border-border/80 dark:border-white/[0.06] pb-3">
                  <div>
                    <span className="text-xs font-mono font-semibold text-accent dark:text-[#E5A93C]">
                      {currentStage.step} of 04
                    </span>
                    <h3 className="text-xl font-semibold text-text-primary dark:text-[#F4F4F6] mt-0.5 tracking-tight">
                      {currentStage.name}
                    </h3>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-surface dark:bg-white/[0.06] text-text-secondary dark:text-[#A0A3AC] border border-border/80 dark:border-white/[0.08]">
                    {currentStage.featuredProject}
                  </span>
                </div>

                <p className="text-sm font-normal text-text-primary dark:text-[#F4F4F6] leading-relaxed">
                  {currentStage.lead}
                </p>

                <div className="space-y-2 pt-2 border-t border-border/80 dark:border-white/[0.06]">
                  <div className="text-[10.5px] font-mono font-semibold uppercase tracking-[0.05em] text-text-primary dark:text-[#F4F4F6] mb-1">
                    Deliverables
                  </div>
                  {currentStage.deliverables.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-xs text-text-secondary dark:text-[#A0A3AC]">
                      <CheckCircle2 size={14} className="text-accent dark:text-[#E5A93C] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-text-muted dark:text-[#737781] font-mono border-t border-border/80 dark:border-white/[0.06]">
                  <span>Tech: <span className="text-text-secondary dark:text-[#A0A3AC]">{currentStage.technologyLabel}</span></span>
                  <span className="text-accent dark:text-[#E5A93C] font-semibold">{currentStage.step} of 04</span>
                </div>

                {/* Prev / Next Mobile Controls */}
                <div className="pt-3 flex items-center justify-between gap-3 border-t border-border/80 dark:border-white/[0.06]">
                  <button
                    type="button"
                    disabled={activeStage === 0}
                    onClick={() => {
                      setDirection(-1);
                      setActiveStage(Math.max(0, activeStage - 1));
                    }}
                    className="px-4 py-2 min-h-[42px] rounded-lg text-xs font-mono font-medium text-text-secondary dark:text-[#A0A3AC] bg-surface dark:bg-white/[0.04] hover:bg-surface-hover dark:hover:bg-white/[0.08] border border-border/80 dark:border-white/[0.08] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  >
                    ← Prev Stage
                  </button>
                  <button
                    type="button"
                    disabled={activeStage === STAGES.length - 1}
                    onClick={() => {
                      setDirection(1);
                      setActiveStage(Math.min(STAGES.length - 1, activeStage + 1));
                    }}
                    className="px-4 py-2 min-h-[42px] rounded-lg text-xs font-mono font-semibold text-white dark:text-[#070709] bg-accent dark:bg-[#E5A93C] hover:bg-accent-hover dark:hover:bg-[#E5A93C]/90 disabled:opacity-30 disabled:pointer-events-none transition-colors shadow-xs"
                  >
                    Next Stage →
                  </button>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
