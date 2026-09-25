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
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="max-w-2xl mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 text-[12px] font-sans font-medium tracking-[0.04em] uppercase text-accent mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>01 · Selected Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-text-primary tracking-[-0.022em] leading-[1.18] sm:leading-[1.16]">
            Proven software engineered for real business outcomes.
          </h2>
          <p className="mt-3.5 text-base sm:text-[17px] text-text-secondary leading-[1.62] font-normal">
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
