import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Code2,
  TrendingUp,
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
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.name} Case Study — Vineet Vardhan`,
      description: project.summary,
      url: `https://vineetvardhan.dev/work/${project.slug}`,
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
      <div className="pt-24 pb-16 sm:pt-36 sm:pb-32 bg-bg min-h-screen">
      <div className="container-custom">
        {/* Back Link */}
        <div className="mb-6 sm:mb-8">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 py-1.5 min-h-[44px] text-sm text-text-secondary hover:text-text-primary transition-colors font-medium"
          >
            <ArrowLeft size={16} />
            <span>Back to all projects</span>
          </Link>
        </div>

        {/* Case Study Header */}
        <div className="border-b border-border pb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-medium px-3 py-1 rounded-md bg-surface border border-border text-text-primary">
              {project.category}
            </span>
            {project.liveUrl && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#35B77A] bg-[#35B77A]/10 px-2.5 py-1 rounded-md border border-[#35B77A]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#35B77A]" />
                Production Live
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold text-text-primary tracking-[-0.025em] max-w-4xl leading-[1.15] sm:leading-[1.1]">
            {project.name}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-text-secondary max-w-3xl leading-relaxed font-normal">
            {project.tagline}
          </p>

          {/* Above-the-fold Live Site CTA */}
          {project.liveUrl && (
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-lg bg-accent hover:bg-accent-hover text-bg font-semibold text-sm shadow-xs transition-colors w-full sm:w-auto"
              >
                <span>Visit Live Site</span>
                <ExternalLink size={15} />
              </a>
              <Button href="/#contact" variant="secondary" size="md" className="w-full sm:w-auto justify-center">
                Discuss Similar Project
              </Button>
            </div>
          )}
        </div>

        {/* Metrics Grid */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="my-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <div className="text-xs font-medium text-text-muted uppercase tracking-[0.04em]">
                  {m.label}
                </div>
                <div className="text-2xl sm:text-3xl font-semibold text-text-primary mt-2 tracking-tight tabular-nums">
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          {/* Left / Main Column: Challenge, Solution, Result, Features */}
          <div className="lg:col-span-8 space-y-12">
            {/* The Challenge */}
            <section className="space-y-3">
              <div className="text-[12px] font-sans font-medium uppercase tracking-[0.04em] text-accent">
                Phase 01
              </div>
              <h2 className="text-2xl font-semibold text-text-primary tracking-[-0.015em]">
                The Challenge
              </h2>
              <p className="text-text-secondary leading-relaxed text-base font-normal">
                {project.challenge}
              </p>
            </section>

            {/* The Solution */}
            <section className="space-y-3">
              <div className="text-[12px] font-sans font-medium uppercase tracking-[0.04em] text-accent">
                Phase 02
              </div>
              <h2 className="text-2xl font-semibold text-text-primary tracking-[-0.015em]">
                The Solution
              </h2>
              <p className="text-text-secondary leading-relaxed text-base font-normal">
                {project.solution}
              </p>
            </section>

            {/* Key Features Implemented */}
            <section className="space-y-3">
              <div className="text-[12px] font-sans font-medium uppercase tracking-[0.04em] text-accent">
                Deliverables 03
              </div>
              <h2 className="text-2xl font-semibold text-text-primary tracking-[-0.015em]">
                Key Architectural Deliverables
              </h2>
              <div className="space-y-3 pt-2">
                {project.features.map((feat) => (
                  <div
                    key={feat}
                    className="p-4 rounded-lg bg-card border border-border flex items-start gap-3"
                  >
                    <CheckCircle2 size={17} className="text-[#35B77A] shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-text-primary font-medium">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* The Result */}
            <section className="p-6 sm:p-8 rounded-xl bg-card border border-border space-y-3">
              <div className="text-[12px] font-sans font-medium uppercase tracking-[0.04em] text-accent">
                Impact 04
              </div>
              <h2 className="text-2xl font-semibold text-text-primary flex items-center gap-2 tracking-[-0.015em]">
                <TrendingUp size={20} className="text-accent" />
                The Business Outcome
              </h2>
              <p className="text-text-secondary leading-relaxed text-base font-normal">
                {project.result}
              </p>
            </section>
          </div>

          {/* Right Column: Sticky Sidebar Specs & Tech */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-6 sticky top-28">
              {/* Project Meta Card */}
              <div className="p-6 rounded-xl bg-card border border-border space-y-6">
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.04em] text-text-muted mb-3 flex items-center gap-2">
                    <Code2 size={14} className="text-accent" />
                    <span>Technologies Used</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-sans font-medium px-2.5 py-1 rounded-md bg-surface text-text-primary border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Client · Project:</span>
                    <span className="font-semibold text-text-primary">{project.client ?? project.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Year:</span>
                    <span className="font-semibold text-text-primary">{project.year ?? "2026"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Role:</span>
                    <span className="font-semibold text-text-primary">{project.role ?? "Full-Stack Development"}</span>
                  </div>
                </div>
              </div>

              {/* Sidebar CTA Card */}
              <div className="p-6 rounded-xl bg-card border border-accent/30 space-y-3">
                <h3 className="text-base font-semibold text-text-primary">
                  Need a similar system built?
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Let's discuss how to build custom software or high-converting websites tailored to your exact business workflows.
                </p>
                <div className="pt-2">
                  <Button href="/#contact" variant="primary" size="sm" className="w-full justify-center">
                    Start a Project
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Project Footer Bar */}
        <div className="mt-20 pt-10 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.04em] font-medium text-text-muted">
              Next Case Study
            </div>
            <div className="text-xl font-semibold text-text-primary mt-1 tracking-tight">
              {nextProject.name}
            </div>
          </div>

          <Link
            href={`/work/${nextProject.slug}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-lg bg-surface hover:bg-surface-hover text-text-primary font-medium text-sm border border-border transition-colors w-full sm:w-auto"
          >
            <span>Read Next Case Study</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
