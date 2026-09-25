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

export function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // ---------------------------------------------------------------------------
  // FEATURED FLAGSHIP LAYOUT (Project 1, Hotel Greenery View)
  // ---------------------------------------------------------------------------
  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
        className="lg:col-span-12 group relative flex flex-col lg:flex-row bg-card rounded-xl overflow-hidden transition-all duration-300 border border-border/80 dark:border-white/[0.07] hover:border-border-accent/40 shadow-xs"
      >
        {/* Left Column: Narrative, Metrics, CTAs */}
        <div className="lg:w-[50%] p-6 sm:p-8 lg:p-10 flex flex-col justify-between order-2 lg:order-1">
          <div>
            {/* Header: Year, Category & Live Indicator */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-sans text-accent font-semibold">2026</span>
                <span className="text-text-muted/40">·</span>
                <span className="text-[12px] font-sans text-text-muted font-medium">
                  {project.category}
                </span>
              </div>
              {project.liveUrl && (
                <span className="inline-flex items-center gap-1.5 text-[11.5px] font-sans font-medium px-2.5 py-0.5 rounded bg-surface/70 dark:bg-white/[0.03] text-text-secondary border border-border/70 dark:border-white/[0.06]">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  Live Product
                </span>
              )}
            </div>

            {/* Project Title */}
            <h3 className="text-2xl sm:text-[28px] font-semibold text-text-primary tracking-tight mt-4">
              {project.name}
            </h3>

            {/* Subtext / Summary */}
            <p className="mt-3 text-sm sm:text-[15px] text-text-secondary leading-[1.62] max-w-xl font-normal">
              {project.summary}
            </p>

            {/* Inline Stat Chips */}
            {project.metrics && (
              <div className="mt-6 sm:mt-8 flex flex-wrap items-baseline gap-6 sm:gap-8">
                {project.metrics.map((m, mIdx) => (
                  <div key={m.label} className="flex flex-col">
                    <span
                      className={`text-2xl sm:text-3xl font-semibold font-sans tracking-tight tabular-nums ${
                        mIdx === 0 ? "text-accent" : "text-text-primary"
                      }`}
                    >
                      {m.value}
                    </span>
                    <span className="text-[12px] font-sans text-text-muted mt-0.5 tracking-normal">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Tags */}
            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-[11.5px] font-sans font-medium px-2.5 py-0.5 rounded bg-surface/80 dark:bg-white/[0.04] text-text-secondary border border-border/60 dark:border-white/[0.06]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="mt-8 pt-6 border-t border-border/70 dark:border-white/[0.06] flex items-center justify-between gap-4">
            <Link
              href={`/work/${project.slug}`}
              className="group/link inline-flex items-center gap-1.5 text-[13.5px] font-medium text-text-secondary hover:text-text-primary transition-colors"
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
                className="inline-flex items-center gap-1.5 text-[13px] font-medium px-3.5 py-1.5 rounded-md bg-surface hover:bg-surface-hover dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-text-primary border border-border/80 dark:border-white/[0.08] transition-colors shadow-2xs"
              >
                <span>Live Demo</span>
                <ArrowUpRight size={13} className="text-text-muted" />
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Embedded Screenshot Preview */}
        <div className="lg:w-[50%] p-4 sm:p-6 lg:p-8 flex items-center justify-center order-1 lg:order-2">
          <div
            className="relative w-full aspect-[16/10] bg-neutral-900 rounded-lg overflow-hidden border border-border/80 dark:border-white/[0.07] shadow-xs group/preview cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Minimal Browser Top Bar */}
            <div className="bg-bg-subtle/95 px-3 py-1.5 border-b border-border/70 dark:border-white/[0.06] flex items-center justify-between z-20 relative">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-border-hover dark:bg-white/[0.15]" />
                <span className="w-2 h-2 rounded-full bg-border-hover dark:bg-white/[0.15]" />
                <span className="w-2 h-2 rounded-full bg-border-hover dark:bg-white/[0.15]" />
              </div>
              <div className="text-[10.5px] font-sans font-medium text-text-muted truncate max-w-[170px] px-2 py-0.5 rounded bg-surface/70 dark:bg-white/[0.04]">
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

            {/* Screenshot */}
            <div className="relative w-full h-[calc(100%-25px)] overflow-hidden bg-neutral-100 dark:bg-neutral-950">
              <img
                src={project.image}
                alt={`${project.name} — custom software interface preview`}
                width={1200}
                height={750}
                loading="lazy"
                decoding="async"
                className={`w-full object-cover object-top transition-transform ease-out will-change-transform ${
                  isHovered && !shouldReduceMotion
                    ? "duration-[4500ms] -translate-y-[45%]"
                    : "duration-[600ms] translate-y-0"
                }`}
              />
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
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
      className="lg:col-span-6 group relative flex flex-col justify-between bg-card rounded-xl p-6 sm:p-7 transition-all duration-300 border border-border/80 dark:border-white/[0.07] hover:border-border-accent/40 shadow-xs"
    >
      <div>
        {/* Top Header: Year, Category & Live Indicator */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-sans text-accent font-semibold">2026</span>
            <span className="text-text-muted/40">·</span>
            <span className="text-[12px] font-sans text-text-muted font-medium">
              {project.category}
            </span>
          </div>
          {project.liveUrl && (
            <span className="inline-flex items-center gap-1.5 text-[11.5px] font-sans font-medium px-2.5 py-0.5 rounded bg-surface/70 dark:bg-white/[0.03] text-text-secondary border border-border/70 dark:border-white/[0.06]">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              Live Product
            </span>
          )}
        </div>

        {/* Embedded Browser Screenshot */}
        <div
          className="relative aspect-[16/10] bg-neutral-900 rounded-lg overflow-hidden border border-border/80 dark:border-white/[0.07] shadow-xs group/preview cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Minimal Browser Top Bar */}
          <div className="bg-bg-subtle/95 px-3 py-1.5 border-b border-border/70 dark:border-white/[0.06] flex items-center justify-between z-20 relative">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-border-hover dark:bg-white/[0.15]" />
              <span className="w-2 h-2 rounded-full bg-border-hover dark:bg-white/[0.15]" />
              <span className="w-2 h-2 rounded-full bg-border-hover dark:bg-white/[0.15]" />
            </div>
            <div className="text-[10.5px] font-sans font-medium text-text-muted truncate max-w-[150px] px-2 py-0.5 rounded bg-surface/70 dark:bg-white/[0.04]">
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

          {/* Screenshot */}
          <div className="relative w-full h-[calc(100%-25px)] overflow-hidden bg-neutral-100 dark:bg-neutral-950">
            <img
              src={project.image}
              alt={`${project.name} — custom software interface preview`}
              width={1200}
              height={750}
              loading="lazy"
              decoding="async"
              className={`w-full object-cover object-top transition-transform ease-out will-change-transform ${
                isHovered && !shouldReduceMotion
                  ? "duration-[4500ms] -translate-y-[45%]"
                  : "duration-[600ms] translate-y-0"
              }`}
            />
          </div>
        </div>

        {/* Project Title */}
        <h3 className="text-xl sm:text-[22px] font-semibold text-text-primary tracking-tight mt-5">
          {project.name}
        </h3>

        {/* Summary */}
        <p className="mt-2 text-sm sm:text-[14.5px] text-text-secondary line-clamp-2 leading-[1.6] font-normal">
          {project.summary}
        </p>

        {/* Metrics */}
        {project.metrics && (
          <div className="mt-5 flex flex-wrap items-baseline gap-5 sm:gap-6">
            {project.metrics.map((m, mIdx) => (
              <div key={m.label} className="flex flex-col">
                <span
                  className={`text-xl sm:text-2xl font-semibold font-sans tracking-tight tabular-nums ${
                    mIdx === 0 ? "text-accent" : "text-text-primary"
                  }`}
                >
                  {m.value}
                </span>
                <span className="text-[12px] font-sans text-text-muted mt-0.5">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[11.5px] font-sans font-medium px-2.5 py-0.5 rounded bg-surface/80 dark:bg-white/[0.04] text-text-secondary border border-border/60 dark:border-white/[0.06]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Footer CTAs */}
      <div className="mt-6 pt-5 border-t border-border/70 dark:border-white/[0.06] flex items-center justify-between gap-4">
        <Link
          href={`/work/${project.slug}`}
          className="group/link inline-flex items-center gap-1.5 text-[13.5px] font-medium text-text-secondary hover:text-text-primary transition-colors"
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
            className="inline-flex items-center gap-1.5 text-[13px] font-medium px-3.5 py-1.5 rounded-md bg-surface hover:bg-surface-hover dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-text-primary border border-border/80 dark:border-white/[0.08] transition-colors shadow-2xs"
          >
            <span>Live Demo</span>
            <ArrowUpRight size={12} className="text-text-muted" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
