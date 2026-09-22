"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Hotel, Database, Layers, ArrowRight, Check, Sparkles } from "lucide-react";
import { useReducedMotion } from "@/lib/reduced-motion";

interface ServiceItem {
  icon: React.ElementType;
  title: string;
  description: string;
  capabilities: string[];
  ctaText: string;
  badge?: string;
  brand: {
    accentColor: string;
    iconBox: string;
    cardBg: string;
    radialGradient: string;
    hoverBorder: string;
    hoverShadow: string;
    ctaColor: string;
    dotColor: string;
    chipBg: string;
  };
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
    brand: {
      accentColor: "text-amber-500 dark:text-amber-400",
      iconBox:
        "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25 shadow-[0_0_15px_rgba(245,158,11,0.18)]",
      cardBg: "bg-card dark:bg-[#151412]/90",
      radialGradient: "from-amber-500/[0.08] via-amber-500/[0.02] to-transparent",
      hoverBorder: "hover:border-amber-500/40 dark:hover:border-amber-500/35",
      hoverShadow:
        "hover:shadow-[0_20px_50px_-15px_rgba(245,158,11,0.18)] dark:hover:shadow-[0_20px_50px_-15px_rgba(245,158,11,0.14)]",
      ctaColor: "text-amber-600 dark:text-amber-400 hover:text-amber-500",
      dotColor: "bg-amber-500",
      chipBg: "bg-amber-500/10 text-amber-900 dark:text-amber-200 border-amber-500/20",
    },
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
    brand: {
      accentColor: "text-blue-500 dark:text-blue-400",
      iconBox:
        "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/25 shadow-[0_0_15px_rgba(59,130,246,0.14)]",
      cardBg: "bg-card dark:bg-[#121418]/90",
      radialGradient: "from-blue-500/[0.07] via-blue-500/[0.015] to-transparent",
      hoverBorder: "hover:border-blue-500/40 dark:hover:border-blue-500/35",
      hoverShadow:
        "hover:shadow-[0_20px_50px_-15px_rgba(59,130,246,0.18)] dark:hover:shadow-[0_20px_50px_-15px_rgba(59,130,246,0.14)]",
      ctaColor: "text-blue-600 dark:text-blue-400 hover:text-blue-500",
      dotColor: "bg-blue-500",
      chipBg: "bg-blue-500/10 text-blue-900 dark:text-blue-200 border-blue-500/20",
    },
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
    brand: {
      accentColor: "text-emerald-500 dark:text-emerald-400",
      iconBox:
        "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 shadow-[0_0_15px_rgba(16,185,129,0.14)]",
      cardBg: "bg-card dark:bg-[#121614]/90",
      radialGradient: "from-emerald-500/[0.07] via-emerald-500/[0.015] to-transparent",
      hoverBorder: "hover:border-emerald-500/40 dark:hover:border-emerald-500/35",
      hoverShadow:
        "hover:shadow-[0_20px_50px_-15px_rgba(16,185,129,0.18)] dark:hover:shadow-[0_20px_50px_-15px_rgba(16,185,129,0.14)]",
      ctaColor: "text-emerald-600 dark:text-emerald-400 hover:text-emerald-500",
      dotColor: "bg-emerald-500",
      chipBg: "bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 border-emerald-500/20",
    },
  },
  {
    icon: Layers,
    title: "Interactive Web Applications",
    description:
      "Rich web experiences, interactive calculators, 3D visualizations, and custom client portals with scalable relational databases.",
    capabilities: [
      "Interactive data visualizations & 3D WebGL",
      "Secure user auth & role-based access",
      "Stripe / Razorpay payment integration",
    ],
    ctaText: "Explore web app architecture",
    brand: {
      accentColor: "text-purple-500 dark:text-purple-400",
      iconBox:
        "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/25 shadow-[0_0_15px_rgba(147,51,234,0.14)]",
      cardBg: "bg-card dark:bg-[#141218]/90",
      radialGradient: "from-purple-500/[0.07] via-purple-500/[0.015] to-transparent",
      hoverBorder: "hover:border-purple-500/40 dark:hover:border-purple-500/35",
      hoverShadow:
        "hover:shadow-[0_20px_50px_-15px_rgba(147,51,234,0.18)] dark:hover:shadow-[0_20px_50px_-15px_rgba(147,51,234,0.14)]",
      ctaColor: "text-purple-600 dark:text-purple-400 hover:text-purple-500",
      dotColor: "bg-purple-500",
      chipBg: "bg-purple-500/10 text-purple-900 dark:text-purple-200 border-purple-500/20",
    },
  },
];

export function Services() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="services" className="section-padding bg-bg-subtle border-t border-border relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="max-w-2xl mb-12 sm:mb-16"
        >
          <div className="text-xs uppercase tracking-wider font-semibold text-accent mb-2">
            Services & Expertise
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-text-primary tracking-[-0.015em] leading-[1.22] sm:leading-[1.2]">
            Specialized engineering for ambitious businesses.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-text-secondary">
            From direct booking platforms to full custom business operating systems, every deliverable is built for scale.
          </p>
        </motion.div>

        {/* 2x2 Distinct Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const isFeatured = idx === 0;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.08, ease: "easeOut" }}
                whileHover={shouldReduceMotion ? {} : { y: -4 }}
                className={`relative group rounded-3xl p-7 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 border border-slate-200/70 dark:border-white/[0.06] shadow-xs ${service.brand.cardBg} ${service.brand.hoverBorder} ${service.brand.hoverShadow}`}
              >
                {/* Subtle Radial Gradient Glow in Card's Unique Accent */}
                <div
                  className={`pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br ${service.brand.radialGradient} blur-2xl group-hover:scale-125 transition-transform duration-500`}
                />

                {/* Card Top & Body */}
                <div className="relative z-10">
                  {/* Top Bar: Icon Box + Optional Featured Badge */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${service.brand.iconBox}`}
                    >
                      <Icon size={24} />
                    </div>

                    {service.badge && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/25 shadow-2xs">
                        <Sparkles size={11} className="text-amber-500 animate-pulse" />
                        <span>{service.badge}</span>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-bold text-text-primary tracking-tight ${
                      isFeatured ? "text-2xl sm:text-[26px]" : "text-xl sm:text-2xl"
                    }`}
                  >
                    {service.title}
                  </h3>

                  {/* Description with subtle warmth */}
                  <p className="mt-3 text-sm text-text-secondary leading-relaxed max-w-xl">
                    {service.description}
                  </p>

                  {/* Deliverables Area: NO horizontal divider line! */}
                  <div className="mt-6 space-y-3">
                    <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                      Key Deliverables
                    </div>

                    {isFeatured ? (
                      /* Featured Service: Polished 3-bullet checklist with custom amber badges */
                      <div className="space-y-2.5">
                        {service.capabilities.map((cap) => (
                          <div key={cap} className="flex items-center gap-2.5 text-xs text-text-secondary font-medium">
                            <div className="w-4 h-4 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                              <Check size={11} strokeWidth={2.5} />
                            </div>
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* Companion Services: Compact modern tags/chips with colored dot indicators */
                      <div className="flex flex-wrap gap-2">
                        {service.capabilities.map((cap) => (
                          <div
                            key={cap}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100/90 dark:bg-white/[0.04] text-slate-700 dark:text-zinc-300 border border-slate-200/50 dark:border-white/[0.05]"
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${service.brand.dotColor} shrink-0`} />
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card CTA: with tailored microcopy and animated arrow */}
                <div className="mt-8 pt-4 relative z-10">
                  <a
                    href="#contact"
                    className={`group/cta inline-flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200 ${service.brand.ctaColor}`}
                  >
                    <span>{service.ctaText}</span>
                    <ArrowRight
                      size={13}
                      className="group-hover/cta:translate-x-1.5 transition-transform duration-200"
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
