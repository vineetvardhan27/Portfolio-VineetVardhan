import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Home,
  FolderKanban,
  ArrowRight,
  Sparkles,
  Layers,
  CreditCard,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page or case study you are looking for does not exist.",
  robots: {
    index: false,
    follow: false,
  },
};

const quickLinks = [
  {
    numeral: "01",
    label: "Featured Work",
    description: "Live case studies, custom PMS & booking engines",
    href: "/#work",
    icon: FolderKanban,
  },
  {
    numeral: "02",
    label: "Services & Scope",
    description: "Full-stack Next.js, hotel software & cloud platforms",
    href: "/#services",
    icon: Layers,
  },
  {
    numeral: "03",
    label: "Transparent Pricing",
    description: "Fixed-scope deliverables and clear launch timelines",
    href: "/#pricing",
    icon: CreditCard,
  },
  {
    numeral: "04",
    label: "Start a Project",
    description: "15-min discovery call & technical feasibility check",
    href: "/#contact",
    icon: Sparkles,
  },
];

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center pt-28 sm:pt-32 pb-16 sm:pb-20 bg-bg relative overflow-hidden">
      {/* ═══════════════════════════════════════════════
          AMBIENT ATMOSPHERE & WATERMARK
          ═══════════════════════════════════════════════ */}
      {/* 1. Subtle Radial Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[540px] h-96 rounded-full bg-gradient-to-br from-[#B9823F]/12 via-[#289E65]/8 to-transparent blur-3xl pointer-events-none opacity-80 dark:opacity-40 -z-10"
        aria-hidden="true"
      />

      <div className="container-custom relative z-10 max-w-2xl text-center px-4">
        {/* Large Decorative 404 Watermark */}
        <div
          className="text-[100px] sm:text-[140px] md:text-[170px] font-black tracking-tighter text-black/[0.04] dark:text-white/[0.03] select-none pointer-events-none leading-none -mb-10 sm:-mb-14 font-mono"
          aria-hidden="true"
        >
          404
        </div>

        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface dark:bg-white/[0.04] border border-border/80 dark:border-white/[0.08] text-xs font-sans font-medium text-accent dark:text-[#E5A93C] mb-4 sm:mb-5 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-accent dark:bg-[#E5A93C]" />
          <span>Error 404 · Destination Not Located</span>
        </div>

        {/* Headline */}
        <h1 className="text-[30px] sm:text-[40px] md:text-[46px] font-semibold text-text-primary dark:text-[#F4F4F6] tracking-[-0.035em] leading-[1.12]">
          Page not found
        </h1>

        {/* Narrative */}
        <p className="mt-3.5 sm:mt-4 text-[15px] sm:text-[16.5px] text-text-secondary dark:text-[#A0A3AC] leading-[1.62] max-w-lg mx-auto font-normal">
          The case study, page, or link you followed could not be located. It may have been relocated, updated, or mistyped.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
          <Button
            href="/"
            variant="primary"
            size="md"
            className="w-full sm:w-auto min-h-[46px] px-6 rounded-full justify-center shadow-[0_2px_10px_rgba(185,130,63,0.25)] dark:shadow-[0_2px_12px_rgba(201,149,82,0.3)]"
          >
            <Home size={15} />
            <span>Return to Homepage</span>
          </Button>

          <Button
            href="/#work"
            variant="secondary"
            size="md"
            className="w-full sm:w-auto min-h-[46px] px-6 rounded-full justify-center"
          >
            <FolderKanban size={15} />
            <span>View Featured Projects</span>
          </Button>
        </div>

        {/* ═══════════════════════════════════════════════
            HELPFUL QUICK NAVIGATION DIRECTORY
            ═══════════════════════════════════════════════ */}
        <div className="mt-10 sm:mt-12 pt-8 sm:pt-9 border-t border-border/80 dark:border-white/[0.06] text-left">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11.5px] font-mono uppercase tracking-[0.06em] text-text-muted dark:text-[#737781] font-semibold">
              Popular Destinations
            </span>
            <span className="text-[11.5px] font-sans text-text-muted dark:text-[#737781]">
              Jump directly into the portfolio
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group p-3.5 rounded-xl bg-card dark:bg-[#121318] border border-border/80 dark:border-white/[0.07] hover:border-black/20 dark:hover:border-white/[0.14] hover:shadow-xs transition-all duration-200 flex items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-surface dark:bg-white/[0.04] border border-border/80 dark:border-white/[0.06] text-accent dark:text-[#E5A93C] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                      <Icon size={14} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] text-accent dark:text-[#E5A93C] font-semibold">
                          {item.numeral}
                        </span>
                        <h2 className="text-[13.5px] font-semibold text-text-primary dark:text-[#F4F4F6] tracking-tight truncate">
                          {item.label}
                        </h2>
                      </div>
                      <p className="text-[11.5px] text-text-muted dark:text-[#A0A3AC] truncate mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    size={14}
                    className="text-text-muted dark:text-[#737781] group-hover:text-text-primary dark:group-hover:text-[#F4F4F6] group-hover:translate-x-0.5 transition-all shrink-0"
                  />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Direct Email Assistance Footer */}
        <div className="mt-8 pt-5 border-t border-border/80 dark:border-white/[0.06] text-xs text-text-muted dark:text-[#737781] font-sans flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5">
          <span>Looking for a custom build or specific case study?</span>
          <a
            href="mailto:vineetvardhanwork@gmail.com"
            className="text-text-primary dark:text-[#F4F4F6] font-medium hover:text-accent dark:hover:text-[#E5A93C] underline underline-offset-2 transition-colors"
          >
            vineetvardhanwork@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
