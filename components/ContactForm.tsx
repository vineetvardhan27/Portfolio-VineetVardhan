"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  ShieldCheck,
  RefreshCw,
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
    "Custom PMS · ERP Software",
    "Travel & Tour Platform",
    "SaaS · Web Application",
    "Website Redesign & SEO",
    "Other · General Inquiry",
  ]),
  budget: z.enum([
    "Under ₹50,000 · $1,000",
    "₹50,000 – ₹1,00,000 · $1,500",
    "₹1,00,000 – ₹2,50,000 · $3,500+",
    "₹2,50,000+ · Custom Enterprise",
    "Not sure · Let's discuss",
  ]),
  timeline: z.enum([
    "Immediately (Next 1–2 weeks)",
    "Within 1 month",
    "1–3 months",
    "Flexible · Exploring options",
  ]),
  message: z.string().min(10, "Please share a brief summary of your project"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // CAPTCHA State
  const [captchaQuestion, setCaptchaQuestion] = useState<string>("");
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const [captchaAnswer, setCaptchaAnswer] = useState<string>("");
  const [captchaLoading, setCaptchaLoading] = useState<boolean>(false);
  const [captchaFieldError, setCaptchaFieldError] = useState<string | null>(null);

  // Honeypot field (hidden from humans to catch spam bots)
  const [honeypot, setHoneypot] = useState<string>("");

  const fetchCaptcha = useCallback(async () => {
    try {
      setCaptchaLoading(true);
      const res = await fetch("/api/contact/captcha", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setCaptchaQuestion(data.question);
        setCaptchaToken(data.token);
        setCaptchaAnswer("");
        setCaptchaFieldError(null);
      }
    } catch (err) {
      console.error("Failed to load captcha challenge:", err);
    } finally {
      setCaptchaLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCaptcha();
  }, [fetchCaptcha]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      projectType: "Hotel Website & Booking",
      budget: "₹50,000 – ₹1,00,000 · $1,500",
      timeline: "Within 1 month",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Validate CAPTCHA before submitting
    if (!captchaAnswer.trim()) {
      setCaptchaFieldError("Please solve the security challenge to verify you're human");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setCaptchaFieldError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          captchaToken,
          captchaAnswer: captchaAnswer.trim(),
          hp_website_company: honeypot,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
        reset();
        setCaptchaAnswer("");
        fetchCaptcha();
      } else {
        setSubmitError(result.message || "Failed to send message. Please try again.");
        // Refresh CAPTCHA if challenge failed or expired
        fetchCaptcha();
      }
    } catch (err) {
      setSubmitError("Network error. Please try again or reach out on WhatsApp directly.");
      fetchCaptcha();
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
      <div className="p-8 sm:p-12 bg-card rounded-xl border border-border text-center space-y-4 shadow-sm relative overflow-hidden">
        <div className="w-12 h-12 rounded-lg bg-[#35B77A]/10 text-[#35B77A] flex items-center justify-center mx-auto border border-[#35B77A]/20">
          <CheckCircle2 size={24} />
        </div>
        <h3 className="text-2xl font-bold text-text-primary tracking-tight">
          Inquiry Received
        </h3>
        <p className="text-text-secondary text-sm max-w-md mx-auto leading-relaxed">
          Thank you for sharing your project details. I have received your submission and will review it thoroughly. Expect a direct, personal response within 24 hours.
        </p>
        <div className="pt-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setSubmitted(false);
              fetchCaptcha();
            }}
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
      className="p-6 sm:p-8 bg-card rounded-xl border border-border relative overflow-hidden space-y-5"
    >
      {/* Invisible Honeypot Field to trap spam bots */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
          zIndex: -1,
          width: 0,
          height: 0,
          margin: 0,
          padding: 0,
        }}
      >
        <label htmlFor="hp_website_company">Leave this field blank</label>
        <input
          id="hp_website_company"
          type="text"
          name="hp_website_company"
          tabIndex={-1}
          autoComplete="new-password"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

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
            className={`w-full h-11 px-4 rounded-lg border text-sm text-text-primary placeholder:text-text-muted dark:placeholder:text-[#7A7A75] bg-[#F4F4F1] dark:bg-[#121318] focus:bg-white dark:focus:bg-[#16171E] focus:border-accent focus:ring-2 focus:ring-accent/15 focus:outline-hidden transition-all duration-200 caret-accent ${
              errors.name ? "border-red-400 dark:border-red-500 ring-1 ring-red-400/20" : "border-border dark:border-white/[0.08]"
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
            className={`w-full h-11 px-4 rounded-lg border text-sm text-text-primary placeholder:text-text-muted dark:placeholder:text-[#7A7A75] bg-[#F4F4F1] dark:bg-[#121318] focus:bg-white dark:focus:bg-[#16171E] focus:border-accent focus:ring-2 focus:ring-accent/15 focus:outline-hidden transition-all duration-200 caret-accent ${
              errors.email ? "border-red-400 dark:border-red-500 ring-1 ring-red-400/20" : "border-border dark:border-white/[0.08]"
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
            Phone · WhatsApp (Optional)
          </label>
          <input
            type="tel"
            placeholder="+91 97985 04212"
            {...register("phone")}
            className="w-full h-11 px-4 rounded-lg border border-border dark:border-white/[0.08] text-sm text-text-primary placeholder:text-text-muted dark:placeholder:text-[#7A7A75] bg-[#F4F4F1] dark:bg-[#121318] focus:bg-white dark:focus:bg-[#16171E] focus:border-accent focus:ring-2 focus:ring-accent/15 focus:outline-hidden transition-all duration-200 caret-accent"
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
              className="w-full h-11 px-4 pr-10 rounded-lg border border-border dark:border-white/[0.08] text-sm text-text-primary bg-[#F4F4F1] dark:bg-[#121318] focus:bg-white dark:focus:bg-[#16171E] focus:border-accent focus:ring-2 focus:ring-accent/15 focus:outline-hidden transition-all duration-200 appearance-none cursor-pointer"
            >
              <option value="Hotel Website & Booking">Hotel Website & Booking</option>
              <option value="Custom PMS · ERP Software">Custom PMS · ERP Software</option>
              <option value="Travel & Tour Platform">Travel & Tour Platform</option>
              <option value="SaaS · Web Application">SaaS · Web Application</option>
              <option value="Website Redesign & SEO">Website Redesign & SEO</option>
              <option value="Other · General Inquiry">Other · General Inquiry</option>
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
              className="w-full h-11 px-4 pr-10 rounded-lg border border-border dark:border-white/[0.08] text-sm text-text-primary bg-[#F4F4F1] dark:bg-[#121318] focus:bg-white dark:focus:bg-[#16171E] focus:border-accent focus:ring-2 focus:ring-accent/15 focus:outline-hidden transition-all duration-200 appearance-none cursor-pointer"
            >
              <option value="Under ₹50,000 · $1,000">Under ₹50,000 · $1,000</option>
              <option value="₹50,000 – ₹1,00,000 · $1,500">₹50,000 – ₹1,00,000 · $1,500</option>
              <option value="₹1,00,000 – ₹2,50,000 · $3,500+">₹1,00,000 – ₹2,50,000 · $3,500+</option>
              <option value="₹2,50,000+ · Custom Enterprise">₹2,50,000+ · Custom Enterprise</option>
              <option value="Not sure · Let's discuss">Not sure · Let's discuss</option>
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
              className="w-full h-11 px-4 pr-10 rounded-lg border border-border dark:border-white/[0.08] text-sm text-text-primary bg-[#F4F4F1] dark:bg-[#121318] focus:bg-white dark:focus:bg-[#16171E] focus:border-accent focus:ring-2 focus:ring-accent/15 focus:outline-hidden transition-all duration-200 appearance-none cursor-pointer"
            >
              <option value="Immediately (Next 1–2 weeks)">Immediately (Next 1–2 weeks)</option>
              <option value="Within 1 month">Within 1 month</option>
              <option value="1–3 months">1–3 months</option>
              <option value="Flexible · Exploring options">Flexible · Exploring options</option>
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
          className={`w-full px-4 py-3 rounded-lg border text-sm text-text-primary placeholder:text-text-muted dark:placeholder:text-[#7A7A75] bg-[#F4F4F1] dark:bg-[#121318] focus:bg-white dark:focus:bg-[#16171E] focus:border-accent focus:ring-2 focus:ring-accent/15 focus:outline-hidden transition-all duration-200 resize-none caret-accent ${
            errors.message ? "border-red-400 dark:border-red-500 ring-1 ring-red-400/20" : "border-border dark:border-white/[0.08]"
          }`}
        />
        {errors.message && (
          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
            <AlertCircle size={12} />
            <span>{errors.message.message}</span>
          </p>
        )}
      </motion.div>

      {/* Interactive Anti-Bot CAPTCHA Challenge */}
      <motion.div
        variants={fieldVariants}
        className="p-4 rounded-lg bg-surface/30 border border-border dark:border-white/[0.08] space-y-2.5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-text-secondary text-xs font-medium">
            <ShieldCheck size={15} className="text-accent shrink-0" />
            <span>Human Verification</span>
          </div>
          <span className="text-[10px] font-mono text-text-muted">Anti-Spam Security</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-0.5">
          <div className="flex items-center gap-2">
            <div className="h-10 px-3.5 rounded-md bg-[#F4F4F1] dark:bg-[#121318] border border-accent/30 text-accent font-mono font-bold text-sm tracking-widest flex items-center shadow-xs select-none">
              {captchaLoading ? (
                <span className="flex items-center gap-1 text-xs text-text-muted font-normal">
                  <Loader2 size={12} className="animate-spin" /> Generating...
                </span>
              ) : captchaQuestion ? (
                `${captchaQuestion} = ?`
              ) : (
                "Loading..."
              )}
            </div>

            <button
              type="button"
              onClick={fetchCaptcha}
              disabled={captchaLoading}
              title="Click to generate a new security challenge"
              className="h-10 w-10 flex items-center justify-center rounded-md border border-border dark:border-white/[0.08] bg-[#F4F4F1] dark:bg-[#121318] text-text-muted hover:text-text-primary hover:border-accent/40 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw size={14} className={captchaLoading ? "animate-spin" : ""} />
            </button>
          </div>

          <div className="flex-1 min-w-[120px]">
            <input
              type="text"
              inputMode="numeric"
              placeholder="Your answer"
              value={captchaAnswer}
              onChange={(e) => {
                setCaptchaAnswer(e.target.value);
                if (captchaFieldError) setCaptchaFieldError(null);
              }}
              className={`w-full h-10 px-3 rounded-md border text-sm text-text-primary placeholder:text-text-muted dark:placeholder:text-[#7A7A75] bg-[#F4F4F1] dark:bg-[#121318] focus:bg-white dark:focus:bg-[#16171E] focus:border-accent focus:ring-2 focus:ring-accent/15 focus:outline-hidden transition-all duration-200 caret-accent ${
                captchaFieldError
                  ? "border-red-400 dark:border-red-500 ring-1 ring-red-400/20"
                  : "border-border dark:border-white/[0.08]"
              }`}
            />
          </div>
        </div>

        {captchaFieldError && (
          <p className="text-xs text-red-500 flex items-center gap-1 pt-0.5">
            <AlertCircle size={12} />
            <span>{captchaFieldError}</span>
          </p>
        )}
      </motion.div>

      {submitError && (
        <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
          <AlertCircle size={16} className="shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      {/* Submit Button */}
      <motion.div variants={fieldVariants} className="pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 rounded-lg bg-accent hover:bg-accent-hover text-bg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2.5 group disabled:opacity-60 disabled:pointer-events-none cursor-pointer shadow-xs"
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
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
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
