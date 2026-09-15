"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { Button } from "./ui/Button";
import { useReducedMotion } from "@/lib/reduced-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid work email address"),
  phone: z.string().optional(),
  projectType: z.enum([
    "Hotel Website & Booking",
    "Custom PMS / ERP Software",
    "Travel & Tour Platform",
    "SaaS / Web Application",
    "Website Redesign & SEO",
    "Other / General Inquiry",
  ]),
  budget: z.enum([
    "Under ₹50,000 / $1,000",
    "₹50,000 – ₹1,00,000 / $1,500",
    "₹1,00,000 – ₹2,50,000 / $3,500+",
    "₹2,50,000+ / Custom Enterprise",
    "Not sure / Let's discuss",
  ]),
  timeline: z.enum([
    "Immediately (Next 1–2 weeks)",
    "Within 1 month",
    "1–3 months",
    "Flexible / Exploring options",
  ]),
  message: z.string().min(10, "Please share a brief summary of your project"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      projectType: "Hotel Website & Booking",
      budget: "₹50,000 – ₹1,00,000 / $1,500",
      timeline: "Within 1 month",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
        reset();
      } else {
        setSubmitError(result.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setSubmitError("Network error. Please try again or reach out on WhatsApp directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: EASE_OUT_EXPO,
      },
    },
  };

  if (submitted) {
    return (
      <div className="p-8 sm:p-12 bg-card rounded-3xl border border-emerald-200 dark:border-emerald-800/80 text-center space-y-4 shadow-md relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400" />
        <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-2xs">
          <CheckCircle2 size={28} />
        </div>
        <h3 className="text-2xl font-bold text-text-primary tracking-tight">
          Inquiry Received!
        </h3>
        <p className="text-text-secondary text-sm max-w-md mx-auto leading-relaxed">
          Thank you for sharing your project details. I have received your submission and will review it thoroughly. Expect a direct, personal response within 24 hours.
        </p>
        <div className="pt-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setSubmitted(false)}
          >
            Send Another Inquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <motion.form
      variants={formVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 sm:p-9 bg-card rounded-2xl sm:rounded-3xl border border-border/80 dark:border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.35)] relative overflow-hidden space-y-5"
    >
      {/* Top Subtle Ambient Highlight Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      {/* Row 1: Name & Email */}
      <motion.div variants={fieldVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-text-muted mb-1.5 font-medium">
            Your Name *
          </label>
          <input
            type="text"
            placeholder="Ohm Adhikari"
            {...register("name")}
            className={`w-full h-11 px-4 rounded-xl border text-sm text-text-primary bg-slate-50/70 dark:bg-white/[0.03] focus:bg-white dark:focus:bg-[#121216] focus:border-accent dark:focus:border-blue-400 focus:ring-4 focus:ring-accent/15 dark:focus:ring-blue-500/15 focus:outline-hidden transition-all duration-200 ${
              errors.name ? "border-red-400 dark:border-red-500 ring-1 ring-red-400/20" : "border-slate-200/90 dark:border-white/[0.08]"
            }`}
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle size={12} />
              <span>{errors.name.message}</span>
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-text-muted mb-1.5 font-medium">
            Work Email *
          </label>
          <input
            type="email"
            placeholder="ohm@hotelgreenery.com"
            {...register("email")}
            className={`w-full h-11 px-4 rounded-xl border text-sm text-text-primary bg-slate-50/70 dark:bg-white/[0.03] focus:bg-white dark:focus:bg-[#121216] focus:border-accent dark:focus:border-blue-400 focus:ring-4 focus:ring-accent/15 dark:focus:ring-blue-500/15 focus:outline-hidden transition-all duration-200 ${
              errors.email ? "border-red-400 dark:border-red-500 ring-1 ring-red-400/20" : "border-slate-200/90 dark:border-white/[0.08]"
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle size={12} />
              <span>{errors.email.message}</span>
            </p>
          )}
        </div>
      </motion.div>

      {/* Row 2: Phone & Project Type */}
      <motion.div variants={fieldVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-text-muted mb-1.5 font-medium">
            Phone / WhatsApp (Optional)
          </label>
          <input
            type="tel"
            placeholder="+91 97985 04212"
            {...register("phone")}
            className="w-full h-11 px-4 rounded-xl border border-slate-200/90 dark:border-white/[0.08] text-sm text-text-primary bg-slate-50/70 dark:bg-white/[0.03] focus:bg-white dark:focus:bg-[#121216] focus:border-accent dark:focus:border-blue-400 focus:ring-4 focus:ring-accent/15 dark:focus:ring-blue-500/15 focus:outline-hidden transition-all duration-200"
          />
        </div>

        {/* Project Type */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-text-muted mb-1.5 font-medium">
            Project Type *
          </label>
          <div className="relative">
            <select
              {...register("projectType")}
              className="w-full h-11 px-4 pr-10 rounded-xl border border-slate-200/90 dark:border-white/[0.08] text-sm text-text-primary bg-slate-50/70 dark:bg-white/[0.03] focus:bg-white dark:focus:bg-[#121216] focus:border-accent dark:focus:border-blue-400 focus:ring-4 focus:ring-accent/15 dark:focus:ring-blue-500/15 focus:outline-hidden transition-all duration-200 appearance-none cursor-pointer"
            >
              <option value="Hotel Website & Booking">Hotel Website & Booking</option>
              <option value="Custom PMS / ERP Software">Custom PMS / ERP Software</option>
              <option value="Travel & Tour Platform">Travel & Tour Platform</option>
              <option value="SaaS / Web Application">SaaS / Web Application</option>
              <option value="Website Redesign & SEO">Website Redesign & SEO</option>
              <option value="Other / General Inquiry">Other / General Inquiry</option>
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted"
            />
          </div>
        </div>
      </motion.div>

      {/* Row 3: Budget & Timeline */}
      <motion.div variants={fieldVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Budget */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-text-muted mb-1.5 font-medium">
            Estimated Budget *
          </label>
          <div className="relative">
            <select
              {...register("budget")}
              className="w-full h-11 px-4 pr-10 rounded-xl border border-slate-200/90 dark:border-white/[0.08] text-sm text-text-primary bg-slate-50/70 dark:bg-white/[0.03] focus:bg-white dark:focus:bg-[#121216] focus:border-accent dark:focus:border-blue-400 focus:ring-4 focus:ring-accent/15 dark:focus:ring-blue-500/15 focus:outline-hidden transition-all duration-200 appearance-none cursor-pointer"
            >
              <option value="Under ₹50,000 / $1,000">Under ₹50,000 / $1,000</option>
              <option value="₹50,000 – ₹1,00,000 / $1,500">₹50,000 – ₹1,00,000 / $1,500</option>
              <option value="₹1,00,000 – ₹2,50,000 / $3,500+">₹1,00,000 – ₹2,50,000 / $3,500+</option>
              <option value="₹2,50,000+ / Custom Enterprise">₹2,50,000+ / Custom Enterprise</option>
              <option value="Not sure / Let's discuss">Not sure / Let's discuss</option>
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted"
            />
          </div>
        </div>

        {/* Timeline */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-text-muted mb-1.5 font-medium">
            Desired Timeline *
          </label>
          <div className="relative">
            <select
              {...register("timeline")}
              className="w-full h-11 px-4 pr-10 rounded-xl border border-slate-200/90 dark:border-white/[0.08] text-sm text-text-primary bg-slate-50/70 dark:bg-white/[0.03] focus:bg-white dark:focus:bg-[#121216] focus:border-accent dark:focus:border-blue-400 focus:ring-4 focus:ring-accent/15 dark:focus:ring-blue-500/15 focus:outline-hidden transition-all duration-200 appearance-none cursor-pointer"
            >
              <option value="Immediately (Next 1–2 weeks)">Immediately (Next 1–2 weeks)</option>
              <option value="Within 1 month">Within 1 month</option>
              <option value="1–3 months">1–3 months</option>
              <option value="Flexible / Exploring options">Flexible / Exploring options</option>
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted"
            />
          </div>
        </div>
      </motion.div>

      {/* Row 4: Message */}
      <motion.div variants={fieldVariants}>
        <label className="block text-[11px] font-mono uppercase tracking-wider text-text-muted mb-1.5 font-medium">
          Project Overview *
        </label>
        <textarea
          rows={4}
          placeholder="Describe your project goals, core requirements, reference sites, or existing challenges..."
          {...register("message")}
          className={`w-full px-4 py-3 rounded-xl border text-sm text-text-primary bg-slate-50/70 dark:bg-white/[0.03] focus:bg-white dark:focus:bg-[#121216] focus:border-accent dark:focus:border-blue-400 focus:ring-4 focus:ring-accent/15 dark:focus:ring-blue-500/15 focus:outline-hidden transition-all duration-200 resize-none ${
            errors.message ? "border-red-400 dark:border-red-500 ring-1 ring-red-400/20" : "border-slate-200/90 dark:border-white/[0.08]"
          }`}
        />
        {errors.message && (
          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
            <AlertCircle size={12} />
            <span>{errors.message.message}</span>
          </p>
        )}
      </motion.div>

      {submitError && (
        <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
          <AlertCircle size={16} className="shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      {/* Submit Button (Hero High-Intent CTA) */}
      <motion.div variants={fieldVariants} className="pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-accent to-blue-500 hover:from-blue-500 hover:to-accent text-white font-semibold text-sm shadow-md shadow-accent/25 hover:shadow-lg hover:shadow-accent/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2.5 group disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Sending Project Inquiry...</span>
            </>
          ) : (
            <>
              <span>Send Project Inquiry</span>
              <Send
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5"
              />
            </>
          )}
        </button>
      </motion.div>

      <motion.p variants={fieldVariants} className="text-center text-[11px] font-mono text-text-muted pt-1">
        Inquiries delivered straight to vineetvardhanwork@gmail.com • Direct reply within 24h
      </motion.p>
    </motion.form>
  );
}
