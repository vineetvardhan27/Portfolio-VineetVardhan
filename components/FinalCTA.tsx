"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, ArrowRight } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { finalCTACopy } from "@/content/copy";
import { useReducedMotion } from "@/lib/reduced-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function FinalCTA() {
  const shouldReduceMotion = useReducedMotion();

  const encodedMessage = encodeURIComponent(finalCTACopy.whatsappMessage);
  const whatsappUrl = `https://wa.me/919798504212?text=${encodedMessage}`;

  return (
    <section
      id="contact"
      className="section-padding bg-bg-subtle/70 border-t border-border relative overflow-hidden"
    >
      {/* Subtle Dot-Matrix Texture to eliminate flat end-of-page feel */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Left Column: Direct Contact & Info */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              {/* Eyebrow with Animated Pulse & Rule */}
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-xs uppercase tracking-widest font-semibold text-accent font-mono">
                  GET IN TOUCH
                </span>
                <span className="w-12 h-px bg-accent/40 hidden sm:block" />
              </div>

              {/* Headline with Focal Accent Treatment */}
              <h2 className="text-3xl sm:text-5xl font-semibold text-text-primary tracking-[-0.015em] leading-[1.22] sm:leading-[1.18]">
                Have a project in mind? Let&apos;s build{" "}
                <span className="italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-accent pb-1 -mb-1 pr-1.5 -mr-1.5 tracking-[0.015em]">
                  something exceptional.
                </span>
              </h2>

              <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed font-normal">
                {finalCTACopy.subtext}
              </p>

              {/* Direct Action Buttons: WhatsApp & Call */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 w-full sm:w-auto cursor-pointer"
                >
                  {/* Animated "Online Now" Indicator */}
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-300" />
                  </span>
                  <MessageSquare size={17} />
                  <span>Chat on WhatsApp</span>
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </a>

                <a
                  href="tel:+919798504212"
                  className="group inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white dark:bg-white/[0.04] hover:bg-surface dark:hover:bg-white/[0.09] text-text-primary border border-border dark:border-white/[0.14] font-semibold text-sm shadow-2xs hover:shadow-xs transition-all duration-200 w-full sm:w-auto"
                >
                  <span>Call +91 97985 04212</span>
                </a>
              </div>

              {/* Quiet Editorial Trust Indicators (Vertical Accent Bars replacing uniform boxes) */}
              <div className="mt-10 space-y-5 pt-8 border-t border-border/70">
                {/* 1. Direct Email */}
                <div className="flex items-center gap-3.5 group">
                  <div className="w-1 h-8 rounded-full bg-blue-500 dark:bg-blue-400 shrink-0 transition-transform duration-200 group-hover:scale-y-110" />
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-text-muted">
                      Direct Email
                    </div>
                    <a
                      href="mailto:vineetvardhanwork@gmail.com"
                      className="text-sm sm:text-base font-semibold text-text-primary hover:text-accent transition-colors"
                    >
                      vineetvardhanwork@gmail.com
                    </a>
                  </div>
                </div>

                {/* 2. Guaranteed Response */}
                <div className="flex items-center gap-3.5 group">
                  <div className="w-1 h-8 rounded-full bg-emerald-500 dark:bg-emerald-400 shrink-0 transition-transform duration-200 group-hover:scale-y-110" />
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-text-muted">
                      Guaranteed Response
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-text-primary">
                      Within 24 hours on all inquiries
                    </span>
                  </div>
                </div>

                {/* 3. Contract & Milestones */}
                <div className="flex items-center gap-3.5 group">
                  <div className="w-1 h-8 rounded-full bg-amber-500 dark:bg-amber-400 shrink-0 transition-transform duration-200 group-hover:scale-y-110" />
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-text-muted">
                      Contract &amp; Milestones
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-text-primary">
                      Fixed scope, clear deliverables &amp; NDA protection
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT_EXPO }}
            className="lg:col-span-7"
          >
            <ContactForm />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
