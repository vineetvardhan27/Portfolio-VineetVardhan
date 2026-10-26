import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Code2,
  TrendingUp,
  Sparkles,
  Layers,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { projects } from "@/content/projects";
import { Button } from "@/components/ui/Button";
import { ProjectJsonLd } from "@/components/JsonLd";

interface CaseStudyProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: CaseStudyProps): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.name} — Case Study`,
    description: project.summary,
    alternates: {
      canonical: `https://www.vineetvardhan.dev/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.name} Case Study — Vineet Vardhan`,
      description: project.summary,
      url: `https://www.vineetvardhan.dev/work/${project.slug}`,
      type: "article",
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: `${project.name} Case Study Interface Preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} Case Study — Vineet Vardhan`,
      description: project.summary,
      images: [project.image],
    },
  };
}

export default function CaseStudyPage({ params }: CaseStudyProps) {
  const projectIndex = projects.findIndex((p) => p.slug === params.slug);
  const project = projects[projectIndex];

  if (!project) {
    notFound();
  }

  const nextProjectIndex = (projectIndex + 1) % projects.length;
  const nextProject = projects[nextProjectIndex];

  return (
    <>
      <ProjectJsonLd
        name={project.name}
        tagline={project.tagline}
        summary={project.summary}
        slug={project.slug}
        image={project.image}
        technologies={project.technologies}
        year={project.year}
      />
      <div className="pt-28 pb-20 sm:pt-36 sm:pb-32 bg-bg min-h-screen relative overflow-hidden">
        {/* Subtle Ambient Top Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-72 bg-gradient-to-b from-[#B9823F]/10 via-[#289E65]/5 to-transparent blur-3xl pointer-events-none opacity-80 dark:opacity-30 -z-10"
          aria-hidden="true"
        />

        <div className="container-custom">
          {/* Breadcrumb Navigation */}
          <div className="mb-6 sm:mb-8 flex items-center justify-between">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface dark:bg-white/[0.04] border border-border/80 dark:border-white/[0.08] text-xs font-sans font-medium text-text-secondary dark:text-[#A0A3AC] hover:text-text-primary dark:hover:text-[#F4F4F6] hover:border-black/20 dark:hover:border-white/20 transition-all shadow-2xs"
            >
              <ArrowLeft size={13} />
              <span>Back to all projects</span>
            </Link>

            <span className="text-xs font-mono text-text-muted dark:text-[#737781] hidden sm:inline">
              Case Study 0{projectIndex + 1} of 0{projects.length}
            </span>
          </div>

          {/* ═══════════════════════════════════════════════
              CASE STUDY HEADER
              ═══════════════════════════════════════════════ */}
          <div className="border-b border-border/80 dark:border-white/[0.07] pb-10 sm:pb-12">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
              <span className="text-xs font-sans font-medium px-3 py-1 rounded-full bg-surface dark:bg-white/[0.04] border border-border/80 dark:border-white/[0.08] text-text-primary dark:text-[#F4F4F6]">
                {project.category}
              </span>
              <span className="text-xs font-mono text-accent dark:text-[#E5A93C] font-semibold px-2.5 py-1 rounded-full bg-accent/10 dark:bg-[#E5A93C]/10 border border-accent/20 dark:border-[#E5A93C]/25">
                {project.year ?? "2026"}
              </span>
              {project.liveUrl && (
                <span className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Production Live
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-semibold text-text-primary dark:text-[#F4F4F6] tracking-[-0.04em] max-w-4xl leading-[1.08] sm:leading-[1.04]">
              {project.name}
            </h1>

            <p className="mt-4 text-[17px] sm:text-[19px] text-text-secondary dark:text-[#A0A3AC] max-w-3xl leading-[1.6] font-normal">
              {project.tagline}
            </p>

            {/* Above-the-fold Action CTAs */}
            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[46px] rounded-full bg-accent hover:bg-accent-hover text-[#0B0C0E] font-semibold text-sm shadow-[0_2px_12px_rgba(185,130,63,0.25)] dark:shadow-[0_2px_14px_rgba(201,149,82,0.3)] transition-colors w-full sm:w-auto"
                >
                  <span>Visit Live Application</span>
                  <ExternalLink size={14} />
                </a>
              )}
              <Button
                href="/#contact"
                variant="secondary"
                size="md"
                className="w-full sm:w-auto min-h-[46px] px-6 rounded-full justify-center"
              >
                Discuss Similar Project
              </Button>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════
              HIGH-RESOLUTION BROWSER SHOWCASE MOCKUP
              Visual evidence of the actual delivered interface
              ═══════════════════════════════════════════════ */}
          <div className="my-10 sm:my-14">
            <div className="rounded-2xl bg-neutral-900 border border-border/80 dark:border-white/[0.1] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)] overflow-hidden">
              {/* Browser Header Bar */}
              <div className="bg-bg-subtle/95 dark:bg-[#16171E] px-4 py-3 border-b border-border/70 dark:border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/70 dark:bg-red-500/50" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/70 dark:bg-amber-500/50" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/70 dark:bg-emerald-500/50" />
                </div>

                <div className="text-xs font-mono text-text-muted dark:text-[#A0A3AC] truncate max-w-[280px] sm:max-w-md px-3 py-1 rounded-full bg-surface dark:bg-white/[0.04] border border-border/60 dark:border-white/[0.06] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="truncate">
                    {project.liveUrl
                      ? project.liveUrl.replace("https://", "").replace("www.", "")
                      : `${project.slug}.internal/preview`}
                  </span>
                </div>

                <div className="w-8 flex justify-end">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted dark:text-[#A0A3AC] hover:text-accent dark:hover:text-[#E5A93C] transition-colors"
                      title="Open in new tab"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Main Screenshot Container */}
              <div className="relative w-full aspect-[16/10] max-h-[640px] bg-neutral-100 dark:bg-neutral-950 overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.name} Interface Showcase`}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════
              ELEVATED METRICS STRIP
              ═══════════════════════════════════════════════ */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="mb-12 sm:mb-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.metrics.map((m, mIdx) => (
                <div
                  key={m.label}
                  className="p-6 rounded-2xl bg-card dark:bg-[#121318] border border-border/80 dark:border-white/[0.08] shadow-xs flex flex-col justify-between"
                >
                  <div className="text-[11.5px] font-mono uppercase tracking-[0.05em] text-text-muted dark:text-[#A0A3AC] font-medium">
                    {m.label}
                  </div>
                  <div
                    className={`text-3xl sm:text-4xl font-bold font-sans tracking-tight tabular-nums mt-3 ${
                      mIdx === 0
                        ? "text-accent dark:text-[#E5A93C]"
                        : "text-text-primary dark:text-[#F4F4F6]"
                    }`}
                  >
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ═══════════════════════════════════════════════
              MAIN CONTENT & SIDEBAR GRID
              ═══════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left / Main Column: Challenge, Solution, Deliverables, Outcome */}
            <div className="lg:col-span-8 space-y-10 sm:space-y-12">
              
              {/* Phase 01: The Challenge */}
              <section className="p-6 sm:p-8 rounded-2xl bg-card dark:bg-[#121318] border border-border/80 dark:border-white/[0.08] space-y-3.5 shadow-xs">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.05em] text-accent dark:text-[#E5A93C]">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent dark:bg-[#E5A93C]" />
                  <span>Phase 01 · The Problem Context</span>
                </div>
                <h2 className="text-2xl sm:text-[26px] font-semibold text-text-primary dark:text-[#F4F4F6] tracking-[-0.03em] leading-snug">
                  The Operational Challenge
                </h2>
                <p className="text-text-secondary dark:text-[#A0A3AC] leading-[1.65] text-[15px] sm:text-base font-normal">
                  {project.challenge}
                </p>
              </section>

              {/* Phase 02: The Solution */}
              <section className="p-6 sm:p-8 rounded-2xl bg-card dark:bg-[#121318] border border-border/80 dark:border-white/[0.08] space-y-3.5 shadow-xs">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.05em] text-accent dark:text-[#E5A93C]">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent dark:bg-[#E5A93C]" />
                  <span>Phase 02 · Engineered Architecture</span>
                </div>
                <h2 className="text-2xl sm:text-[26px] font-semibold text-text-primary dark:text-[#F4F4F6] tracking-[-0.03em] leading-snug">
                  The Custom Solution
                </h2>
                <p className="text-text-secondary dark:text-[#A0A3AC] leading-[1.65] text-[15px] sm:text-base font-normal">
                  {project.solution}
                </p>
              </section>

              {/* Phase 03: Key Architectural Deliverables */}
              <section className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.05em] text-accent dark:text-[#E5A93C]">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent dark:bg-[#E5A93C]" />
                  <span>Phase 03 · Core Deliverables</span>
                </div>
                <h2 className="text-2xl sm:text-[26px] font-semibold text-text-primary dark:text-[#F4F4F6] tracking-[-0.03em] leading-snug">
                  Key Deliverables &amp; Features
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {project.features.map((feat) => (
                    <div
                      key={feat}
                      className="p-4 rounded-xl bg-card dark:bg-[#121318] border border-border/80 dark:border-white/[0.07] flex items-start gap-3 hover:border-black/20 dark:hover:border-white/[0.14] transition-colors"
                    >
                      <CheckCircle2
                        size={17}
                        className="text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-text-primary dark:text-[#F4F4F6] font-medium leading-snug">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Phase 04: The Business Outcome */}
              <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-card via-card to-accent/[0.04] dark:from-[#121318] dark:via-[#121318] dark:to-[#E5A93C]/[0.06] border border-accent/30 dark:border-[#E5A93C]/35 space-y-3.5 shadow-xs">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.05em] text-accent dark:text-[#E5A93C]">
                  <TrendingUp size={14} className="text-accent dark:text-[#E5A93C]" />
                  <span>Phase 04 · Business Outcome &amp; ROI</span>
                </div>
                <h2 className="text-2xl sm:text-[26px] font-semibold text-text-primary dark:text-[#F4F4F6] tracking-[-0.03em] leading-snug">
                  Measurable Impact
                </h2>
                <p className="text-text-secondary dark:text-[#A0A3AC] leading-[1.65] text-[15px] sm:text-base font-normal">
                  {project.result}
                </p>
              </section>
            </div>

            {/* Right Column: Sticky Sidebar Specs & Tech */}
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-6 sticky top-28">
                {/* Tech Stack Card */}
                <div className="p-6 rounded-2xl bg-card dark:bg-[#121318] border border-border/80 dark:border-white/[0.08] shadow-xs space-y-5">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-[0.05em] text-text-muted dark:text-[#A0A3AC] mb-3 flex items-center gap-2 font-semibold">
                      <Code2 size={14} className="text-accent dark:text-[#E5A93C]" />
                      <span>Technologies Applied</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-sans font-medium px-2.5 py-1 rounded-md bg-surface dark:bg-white/[0.04] text-text-primary dark:text-[#F4F4F6] border border-border/70 dark:border-white/[0.06]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Meta Key-Value Rows */}
                  <div className="pt-4 border-t border-border/70 dark:border-white/[0.06] space-y-2.5 text-xs font-sans">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-text-muted dark:text-[#A0A3AC]">Client:</span>
                      <span className="font-semibold text-text-primary dark:text-[#F4F4F6]">
                        {project.client ?? project.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-text-muted dark:text-[#A0A3AC]">Year:</span>
                      <span className="font-semibold text-text-primary dark:text-[#F4F4F6]">
                        {project.year ?? "2026"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-text-muted dark:text-[#A0A3AC]">Role:</span>
                      <span className="font-semibold text-text-primary dark:text-[#F4F4F6]">
                        {project.role ?? "Full-Stack Architecture & Build"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-text-muted dark:text-[#A0A3AC]">Codebase:</span>
                      <span className="font-semibold text-text-primary dark:text-[#F4F4F6]">
                        Bespoke Next.js 14
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sidebar Call to Action Card */}
                <div className="p-6 rounded-2xl bg-card dark:bg-[#121318] border border-accent/30 dark:border-[#E5A93C]/35 space-y-3.5 shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 dark:bg-[#E5A93C]/10 text-accent dark:text-[#E5A93C] flex items-center justify-center">
                    <Sparkles size={16} />
                  </div>
                  <h3 className="text-base font-semibold text-text-primary dark:text-[#F4F4F6] tracking-tight">
                    Need a similar system built?
                  </h3>
                  <p className="text-xs text-text-secondary dark:text-[#A0A3AC] leading-relaxed">
                    Let's discuss how custom software or high-converting web architecture can automate operations and drive direct revenue for your business.
                  </p>
                  <div className="pt-2">
                    <Button
                      href="/#contact"
                      variant="primary"
                      size="sm"
                      className="w-full justify-center rounded-full min-h-[42px]"
                    >
                      Start a Project
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════
              NEXT PROJECT TRANSITION CARD
              Seamless navigation into subsequent case studies
              ═══════════════════════════════════════════════ */}
          <div className="mt-16 sm:mt-24 pt-10 border-t border-border/80 dark:border-white/[0.07]">
            <Link
              href={`/work/${nextProject.slug}`}
              className="group p-6 sm:p-8 rounded-2xl bg-card dark:bg-[#121318] border border-border/80 dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/[0.16] hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6 block"
            >
              <div className="space-y-1.5">
                <div className="text-xs font-mono uppercase tracking-[0.06em] text-accent dark:text-[#E5A93C] font-semibold flex items-center gap-1.5">
                  <span>Up Next · Case Study 0{nextProjectIndex + 1}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-text-primary dark:text-[#F4F4F6] tracking-tight group-hover:text-accent dark:group-hover:text-[#E5A93C] transition-colors">
                  {nextProject.name}
                </h3>
                <p className="text-sm text-text-secondary dark:text-[#A0A3AC] max-w-xl line-clamp-1">
                  {nextProject.tagline}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface dark:bg-white/[0.04] text-text-primary dark:text-[#F4F4F6] font-semibold text-sm border border-border/80 dark:border-white/[0.08] group-hover:border-accent dark:group-hover:border-[#E5A93C]/40 transition-colors shrink-0">
                <span>Read Case Study</span>
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
