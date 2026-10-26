"use client";

import React from "react";
import { motion } from "framer-motion";
import { projects } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";
import { useReducedMotion } from "@/lib/reduced-motion";

export function ProjectsGrid() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="work" className="section-padding bg-bg">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 text-[12px] font-sans font-medium tracking-[0.04em] uppercase text-accent mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>01 · Selected Work</span>
          </div>
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[46px] font-semibold text-text-primary tracking-[-0.04em] leading-[1.08] sm:leading-[1.05]">
            Proven software engineered for real business outcomes.
          </h2>
          <p className="mt-4 text-[16px] sm:text-[17.5px] text-text-secondary leading-[1.6] max-w-xl font-normal">
            Each project is built from scratch with custom architecture, high conversion rates, and sub-second performance.
          </p>
        </motion.div>

        {/* Asymmetrical Bento Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={idx}
              featured={idx === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
