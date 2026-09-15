"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, ArrowUpRight } from "lucide-react";
import { Project } from "@/content/projects";
import { useReducedMotion } from "@/lib/reduced-motion";

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

interface ProjectBrand {
  accentName: string;
  hoverBorder: string;
  hoverShadow: string;
  liveBadge: string;
  liveDot: string;
  heroStatColor: string;
  demoButton: string;
  caseStudyHover: string;
  heroStatIndex: number;
}

const brandMap: Record<string, ProjectBrand> = {
  "hotel-greenery-view": {
    accentName: "emerald",
    hoverBorder: "hover:border-emerald-500/40 dark:hover:border-emerald-500/30",
    hoverShadow:
      "hover:shadow-[0_20px_50px_-15px_rgba(16,185,129,0.18)] dark:hover:shadow-[0_20px_50px_-15px_rgba(16,185,129,0.14)]",
    liveBadge:
      "bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/25",
    liveDot: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]",
    heroStatColor: "text-emerald-600 dark:text-emerald-400",
    demoButton:
      "bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border dark:border-emerald-500/30 dark:hover:bg-emerald-500/30 shadow-sm",
    caseStudyHover: "group-hover/link:text-emerald-600 dark:group-hover/link:text-emerald-400",
    heroStatIndex: 0, // Direct Inquiries (+65%)
  },
  "grove-pms": {
    accentName: "teal",
    hoverBorder: "hover:border-teal-500/40 dark:hover:border-teal-500/30",
    hoverShadow:
      "hover:shadow-[0_20px_50px_-15px_rgba(20,184,166,0.18)] dark:hover:shadow-[0_20px_50px_-15px_rgba(20,184,166,0.14)]",
    liveBadge:
      "bg-teal-50 text-teal-700 border-teal-200/80 dark:bg-teal-500/10 dark:text-teal-300 dark:border-teal-500/25",
    liveDot: "bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.6)]",
    heroStatColor: "text-teal-600 dark:text-teal-400",
    demoButton:
      "bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-500/20 dark:text-teal-300 dark:border dark:border-teal-500/30 dark:hover:bg-teal-500/30 shadow-sm",
    caseStudyHover: "group-hover/link:text-teal-600 dark:group-hover/link:text-teal-400",
    heroStatIndex: 0, // Time Saved (4.5 hrs/day)
  },
  "anugra-travels": {
    accentName: "amber",
    hoverBorder: "hover:border-amber-500/40 dark:hover:border-amber-500/30",
    hoverShadow:
      "hover:shadow-[0_20px_50px_-15px_rgba(245,158,11,0.18)] dark:hover:shadow-[0_20px_50px_-15px_rgba(245,158,11,0.14)]",
    liveBadge:
      "bg-amber-50 text-amber-700 border-amber-200/80 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/25",
    liveDot: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]",
    heroStatColor: "text-amber-600 dark:text-amber-400",
    demoButton:
      "bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-500/20 dark:text-amber-300 dark:border dark:border-amber-500/30 dark:hover:bg-amber-500/30 shadow-sm",
    caseStudyHover: "group-hover/link:text-amber-600 dark:group-hover/link:text-amber-400",
    heroStatIndex: 0, // SEO Visibility (Top Tier)
  },
};

const defaultBrand: ProjectBrand = {
  accentName: "blue",
  hoverBorder: "hover:border-blue-500/40 dark:hover:border-blue-500/30",
  hoverShadow: "hover:shadow-[0_20px_50px_-15px_rgba(59,130,246,0.15)]",
  liveBadge:
    "bg-blue-50 text-blue-700 border-blue-200/80 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/25",
  liveDot: "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]",
  heroStatColor: "text-accent dark:text-blue-400",
  demoButton:
    "bg-accent text-white hover:bg-accent-hover dark:bg-blue-500/20 dark:text-blue-300 dark:border dark:border-blue-500/30",
  caseStudyHover: "group-hover/link:text-accent dark:group-hover/link:text-blue-400",
  heroStatIndex: 0,
};

export function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const brand = brandMap[project.slug] || defaultBrand;

  // ---------------------------------------------------------------------------
  // FEATURED FLAGSHIP LAYOUT (Project 1, Hotel Greenery View)
  // ---------------------------------------------------------------------------
  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
        whileHover={shouldReduceMotion ? {} : { y: -4 }}
        className={`lg:col-span-12 group relative flex flex-col lg:flex-row bg-card dark:bg-[#131316] rounded-3xl overflow-hidden transition-all duration-300 border border-slate-200/70 dark:border-white/[0.05] shadow-xs ${brand.hoverBorder} ${brand.hoverShadow}`}
      >
        {/* Left Column: Narrative, Hero Stats, CTAs */}
        <div className="lg:w-[50%] p-6 sm:p-8 lg:p-10 flex flex-col justify-between order-2 lg:order-1">
          <div>
            {/* Header: Demoted category text (no pill) + Primary Live Badge */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                {project.category}
              </span>
              {project.liveUrl && (
                <span
                  className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${brand.liveBadge}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${brand.liveDot} animate-pulse`} />
                  Live Product
                </span>
              )}
            </div>

            {/* Project Title with increased presence */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary tracking-tight mt-4">
              {project.name}
            </h3>

            {/* Subtext / Summary */}
            <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed max-w-xl">
              {project.summary}
            </p>

            {/* Inline Stat Chips (Hero numbers, no boxed table, no divider lines) */}
            {project.metrics && (
              <div className="mt-6 sm:mt-8 flex flex-wrap items-baseline gap-6 sm:gap-8">
                {project.metrics.map((m, mIdx) => {
                  const isHero = mIdx === brand.heroStatIndex;
                  return (
                    <div key={m.label} className="flex flex-col">
                      <span
                        className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                          isHero ? brand.heroStatColor : "text-text-primary"
                        }`}
                      >
                        {m.value}
                      </span>
                      <span className="text-[11px] font-medium text-text-muted mt-0.5 tracking-wide">
                        {m.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Tech Tags: quiet, low-opacity fill, no border */}
            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] sm:text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-100/90 dark:bg-white/[0.05] text-slate-600 dark:text-zinc-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Footer CTAs: with generous breathing room and elevated Live Demo */}
          <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-white/[0.08] flex items-center justify-between gap-4">
            <Link
              href={`/work/${project.slug}`}
              className={`group/link inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors`}
            >
              <span>View Case Study</span>
              <ArrowRight
                size={15}
                className="group-hover/link:translate-x-1 transition-transform duration-200"
              />
            </Link>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 shadow-2xs active:scale-95 ${brand.demoButton}`}
              >
                <span>Live Demo</span>
                <ArrowUpRight size={13} />
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Embedded Browser Screenshot Preview with edge bleed */}
        <div className="lg:w-[50%] p-4 sm:p-6 lg:p-8 flex items-center justify-center order-1 lg:order-2">
          <div
            className="relative w-full aspect-[16/10] bg-neutral-900 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/[0.08] shadow-md group/preview cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Refined Minimal Browser Top Bar */}
            <div className="bg-white/95 dark:bg-[#121216]/95 backdrop-blur-sm px-3 py-1.5 border-b border-slate-200/80 dark:border-white/[0.08] flex items-center justify-between z-20 relative">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
              </div>
              <div className="text-[9px] font-mono text-text-muted truncate max-w-[170px] px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.04]">
                {project.liveUrl
                  ? project.liveUrl.replace("https://", "").replace("www.", "")
                  : "preview"}
              </div>
              <div className="w-4 flex justify-end">
                <ExternalLink
                  size={10}
                  className="text-text-muted group-hover/preview:text-text-primary transition-colors"
                />
              </div>
            </div>

            {/* Screenshot with embedded inner shadow / vignette */}
            <div className="relative w-full h-[calc(100%-25px)] overflow-hidden bg-neutral-100 dark:bg-neutral-950">
              <img
                src={project.image}
                alt={`${project.name} Homepage`}
                className={`w-full object-cover object-top transition-transform ease-out will-change-transform ${
                  isHovered && !shouldReduceMotion
                    ? "duration-[4500ms] -translate-y-[48%]"
                    : "duration-[700ms] translate-y-0"
                }`}
              />
              {/* Subtle inner shadow / vignette */}
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.15)] dark:shadow-[inset_0_0_25px_rgba(0,0,0,0.5)]" />

              {/* View Live Site floating pill on hover */}
              <div
                className={`absolute bottom-3 right-3 z-20 transition-all duration-200 pointer-events-none ${
                  isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
              >
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold shadow-md ${brand.demoButton}`}
                >
                  <span>View Live Site</span>
                  <ArrowUpRight size={12} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // ---------------------------------------------------------------------------
  // COMPANION SIDE-BY-SIDE CARDS (Projects 2 & 3: Grove PMS, Anugra Travels)
  // ---------------------------------------------------------------------------
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
      whileHover={shouldReduceMotion ? {} : { y: -4 }}
      className={`lg:col-span-6 group relative flex flex-col justify-between bg-card dark:bg-[#131316] rounded-3xl p-6 sm:p-7 transition-all duration-300 border border-slate-200/70 dark:border-white/[0.05] shadow-xs ${brand.hoverBorder} ${brand.hoverShadow}`}
    >
      <div>
        {/* Top Header: Demoted category label (no pill) + Primary Live Badge */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            {project.category}
          </span>
          {project.liveUrl && (
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${brand.liveBadge}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${brand.liveDot} animate-pulse`} />
              Live Product
            </span>
          )}
        </div>

        {/* Embedded Browser Screenshot with edge bleed and subtle vignette */}
        <div
          className="relative aspect-[16/10] bg-neutral-900 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/[0.08] shadow-sm group/preview cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Refined Minimal Browser Top Bar */}
          <div className="bg-white/95 dark:bg-[#121216]/95 backdrop-blur-sm px-3 py-1.5 border-b border-slate-200/80 dark:border-white/[0.08] flex items-center justify-between z-20 relative">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
            </div>
            <div className="text-[9px] font-mono text-text-muted truncate max-w-[150px] px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.04]">
              {project.liveUrl
                ? project.liveUrl.replace("https://", "").replace("www.", "")
                : "preview"}
            </div>
            <div className="w-4 flex justify-end">
              <ExternalLink
                size={10}
                className="text-text-muted group-hover/preview:text-text-primary transition-colors"
              />
            </div>
          </div>

          {/* Screenshot with embedded inner vignette shadow */}
          <div className="relative w-full h-[calc(100%-25px)] overflow-hidden bg-neutral-100 dark:bg-neutral-950">
            <img
              src={project.image}
              alt={`${project.name} Homepage`}
              className={`w-full object-cover object-top transition-transform ease-out will-change-transform ${
                isHovered && !shouldReduceMotion
                  ? "duration-[4500ms] -translate-y-[48%]"
                  : "duration-[700ms] translate-y-0"
              }`}
            />
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.15)] dark:shadow-[inset_0_0_25px_rgba(0,0,0,0.5)]" />

            {/* Hover floating pill */}
            <div
              className={`absolute bottom-3 right-3 z-20 transition-all duration-200 pointer-events-none ${
                isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold shadow-md ${brand.demoButton}`}
              >
                <span>View Live Site</span>
                <ArrowUpRight size={12} />
              </span>
            </div>
          </div>
        </div>

        {/* Project Title with increased presence */}
        <h3 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight mt-5">
          {project.name}
        </h3>

        {/* Summary */}
        <p className="mt-2 text-sm text-text-secondary line-clamp-2 leading-relaxed">
          {project.summary}
        </p>

        {/* Inline Stat Chips (Number is hero, no boxed borders) */}
        {project.metrics && (
          <div className="mt-5 flex flex-wrap items-baseline gap-5 sm:gap-6">
            {project.metrics.map((m, mIdx) => {
              const isHero = mIdx === brand.heroStatIndex;
              return (
                <div key={m.label} className="flex flex-col">
                  <span
                    className={`text-xl sm:text-2xl font-extrabold tracking-tight ${
                      isHero ? brand.heroStatColor : "text-text-primary"
                    }`}
                  >
                    {m.value}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-medium text-text-muted mt-0.5">
                    {m.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Tech Tags: quiet, low-opacity fill, no border */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100/90 dark:bg-white/[0.05] text-slate-600 dark:text-zinc-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Footer CTAs with breathing room & elevated Live Demo */}
      <div className="mt-6 pt-5 border-t border-slate-200/60 dark:border-white/[0.08] flex items-center justify-between gap-4">
        <Link
          href={`/work/${project.slug}`}
          className={`group/link inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors`}
        >
          <span>View Case Study</span>
          <ArrowRight
            size={14}
            className="group-hover/link:translate-x-1 transition-transform duration-200"
          />
        </Link>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all duration-200 shadow-2xs active:scale-95 ${brand.demoButton}`}
          >
            <span>Live Demo</span>
            <ArrowUpRight size={12} />
          </a>
        )}
      </div>
    </motion.div>
  );
}
