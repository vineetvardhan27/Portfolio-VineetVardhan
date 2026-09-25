"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Hotel, Database, Layers, ArrowRight, Check } from "lucide-react";
import { useReducedMotion } from "@/lib/reduced-motion";

interface ServiceItem {
  icon: React.ElementType;
  title: string;
  description: string;
  capabilities: string[];
  ctaText: string;
  badge?: string;
}

const services: ServiceItem[] = [
  {
    icon: Hotel,
    badge: "Core Specialization",
    title: "Hospitality & Direct Booking Systems",
    description:
      "Eliminate expensive OTA commissions. Bespoke hotel and resort websites with live room availability, direct enquiry flows, and instant WhatsApp booking.",
    capabilities: [
      "Zero-commission direct booking flow",
      "Instant WhatsApp inquiry engine",
      "Room & suite visual showcases",
    ],
    ctaText: "Get a booking site quote",
  },
  {
    icon: Database,
    title: "Custom PMS & Business SaaS",
    description:
      "Replace chaotic spreadsheets and outdated desktop systems with modern cloud platforms engineered for daily front-desk and back-office operations.",
    capabilities: [
      "Multi-tenant data isolation",
      "Visual room matrix & reservation grid",
      "Automated POS billing & GST invoicing",
    ],
    ctaText: "Discuss a PMS build",
  },
  {
    icon: Globe,
    title: "High-Converting Websites",
    description:
      "Modern Next.js 14 websites tailored to establish brand authority, rank on Google, and convert casual visitors into qualified inbound leads.",
    capabilities: [
      "Sub-second load times & 90+ Lighthouse",
      "On-page SEO & structured schema markup",
      "Custom responsive design (No templates)",
    ],
    ctaText: "Plan your website project",
  },
  {
    icon: Layers,
    title: "Interactive Web Applications",
    description:
      "Rich web experiences, interactive calculators, 3D visualizations, and custom client portals with scalable relational databases.",
    capabilities: [
      "Interactive data visualizations & dashboards",
      "Secure user auth & role-based access",
      "Stripe · Razorpay payment integration",
    ],
    ctaText: "Explore web app architecture",
  },
];

export function Services() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="services" className="section-padding bg-bg-subtle/50 border-t border-border/80 dark:border-white/[0.06] relative">
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
            <span>02 · Services &amp; Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-text-primary tracking-[-0.022em] leading-[1.18] sm:leading-[1.16]">
            Specialized engineering for ambitious businesses.
          </h2>
          <p className="mt-3.5 text-base sm:text-[17px] text-text-secondary leading-[1.62] font-normal">
            From direct booking platforms to full custom business operating systems, every deliverable is built for scale.
          </p>
        </motion.div>

        {/* 2x2 Clean Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
          {services.map((service, idx) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.08, ease: "easeOut" }}
                className="relative group rounded-xl p-6 sm:p-8 flex flex-col justify-between bg-card border border-border/80 dark:border-white/[0.07] hover:border-border-accent/40 shadow-xs transition-colors"
              >
                <div>
                  {/* Top: Icon + Optional Badge */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-10 h-10 rounded-md bg-surface/80 dark:bg-white/[0.04] border border-border/80 dark:border-white/[0.06] text-accent flex items-center justify-center shrink-0">
                      <Icon size={20} />
                    </div>

                    {service.badge && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11.5px] font-sans font-medium bg-accent-subtle text-accent border border-border-accent/30">
                        <span>{service.badge}</span>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-[22px] font-semibold text-text-primary tracking-tight">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 text-sm sm:text-[14.5px] text-text-secondary leading-[1.6] font-normal">
                    {service.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="mt-6 space-y-2.5">
                    <div className="text-[11.5px] font-sans font-medium text-text-muted tracking-[0.01em] mb-2">
                      Key Deliverables
                    </div>
                    {service.capabilities.map((cap) => (
                      <div key={cap} className="flex items-center gap-2.5 text-[13px] text-text-secondary font-normal sm:font-medium">
                        <Check size={13} className="text-accent shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="mt-8 pt-5 border-t border-border/70 dark:border-white/[0.05]">
                  <a
                    href="#contact"
                    className="group/cta inline-flex items-center gap-1.5 text-[13px] font-medium text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowRight
                      size={13}
                      className="group-hover/cta:translate-x-1 transition-transform duration-200"
                    />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
