"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "./ui/Button";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Process", href: "/#process" },
  { label: "Why Me", href: "/#why-me" },
  { label: "Contact", href: "/#contact" },
];

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // Consolidated passive scroll listener for floating pill elevation and active section tracking
  useEffect(() => {
    const sectionIds = ["work", "services", "pricing", "process", "why-me", "contact"];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrolled = scrollY > 20;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));

      // Active section detection with scroll offset
      const scrollPos = scrollY + 140;
      let current = "";
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          current = sectionIds[i];
          break;
        }
      }
      setActiveSection((prev) => (prev !== current ? current : prev));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-2.5 sm:top-4 lg:top-5 left-0 right-0 z-50 flex flex-col items-center px-3 sm:px-5 lg:px-6 pointer-events-none transition-all duration-300">
      {/* Floating Pill Capsule */}
      <div
        className={`pointer-events-auto w-full max-w-[1220px] rounded-full transition-all duration-300 ease-out flex items-center justify-between px-3 sm:px-4.5 lg:px-5 py-2 sm:py-2.5 border ${
          isScrolled
            ? "bg-gradient-to-b from-white/96 via-[#FAF9F6]/92 to-[#F2EFE9]/88 dark:from-[#17181F]/95 dark:via-[#111217]/90 dark:to-[#0B0C0E]/86 border-black/[0.1] dark:border-white/[0.12] shadow-[0_14px_40px_-4px_rgba(0,0,0,0.1),0_4px_12px_-2px_rgba(0,0,0,0.06),inset_0_1px_1.5px_0_rgba(255,255,255,0.98)] dark:shadow-[0_18px_48px_-4px_rgba(0,0,0,0.8),0_4px_14px_-2px_rgba(0,0,0,0.5),inset_0_1px_1.5px_0_rgba(255,255,255,0.16),inset_0_1px_0_0_rgba(201,149,82,0.22)]"
            : "bg-gradient-to-b from-white/88 via-[#FAF9F6]/82 to-[#F3F0EA]/76 dark:from-[#15161C]/88 dark:via-[#101115]/82 dark:to-[#0B0C0E]/78 border-black/[0.07] dark:border-white/[0.09] shadow-[0_10px_30px_-5px_rgba(0,0,0,0.06),0_2px_8px_-2px_rgba(0,0,0,0.04),inset_0_1px_1.5px_0_rgba(255,255,255,0.92)] dark:shadow-[0_12px_36px_-4px_rgba(0,0,0,0.65),0_3px_10px_-2px_rgba(0,0,0,0.4),inset_0_1px_1.5px_0_rgba(255,255,255,0.12),inset_0_1px_0_0_rgba(201,149,82,0.16)]"
        } backdrop-blur-xl sm:backdrop-blur-2xl supports-[not(backdrop-filter:blur(0))]:bg-[#FBFBFA] supports-[not(backdrop-filter:blur(0))]:dark:bg-[#0B0C0E]`}
      >
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3 group py-0.5 select-none shrink-0"
          aria-label="Vineet Vardhan - Home"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border border-black/10 dark:border-white/10 shadow-2xs group-hover:scale-105 transition-transform duration-200 shrink-0 ring-1 ring-black/[0.04] dark:ring-white/[0.08]">
            <img
              src="/avatar.png"
              alt="Vineet Vardhan | Freelance Developer & AI Solutions"
              width={32}
              height={32}
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[13.5px] sm:text-[14px] font-semibold tracking-[-0.01em] text-text-primary group-hover:text-accent transition-colors leading-tight">
              Vineet Vardhan
            </span>
            <span className="text-[11px] text-text-muted flex items-center gap-1.5 font-sans font-normal mt-0.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-success shrink-0 shadow-[0_0_4px_rgba(40,158,101,0.5)] dark:shadow-[0_0_5px_rgba(53,183,122,0.6)]" />
              Available for projects
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-0.5 lg:gap-1.5" aria-label="Main navigation">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("/#", "");
            const isActive = activeSection === sectionId;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-2.5 lg:px-3.5 py-1.5 text-[13.5px] lg:text-[14px] rounded-full transition-all duration-200 font-medium tracking-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
                  isActive
                    ? "text-text-primary font-semibold bg-black/[0.05] dark:bg-white/[0.07] shadow-2xs"
                    : "text-text-secondary hover:text-text-primary hover:bg-black/[0.035] dark:hover:bg-white/[0.045] active:bg-black/[0.06] dark:active:bg-white/[0.07]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Controls (Theme Toggle + CTA) */}
        <div className="hidden md:flex items-center gap-2.5 lg:gap-3 shrink-0">
          <ThemeToggle />
          <Button
            href="/#contact"
            variant="primary"
            size="sm"
            className="rounded-full px-4 sm:px-4.5 py-1.5 min-h-[36px] text-[13.5px] font-semibold shadow-[0_2px_10px_rgba(185,130,63,0.28),0_1px_2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.3)] dark:shadow-[0_2px_14px_rgba(201,149,82,0.34),0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.22)] hover:shadow-[0_4px_18px_rgba(185,130,63,0.4),0_2px_4px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.35)] dark:hover:shadow-[0_4px_22px_rgba(201,149,82,0.46),0_2px_6px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.26)] group relative"
          >
            <span>Start a Project</span>
            <ArrowUpRight
              size={13}
              className="opacity-85 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
            />
          </Button>
        </div>

        {/* Mobile Menu Button & Theme Toggle */}
        <div className="flex md:hidden items-center gap-1.5 shrink-0">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 inline-flex items-center justify-center rounded-full text-text-secondary hover:text-text-primary hover:bg-black/[0.04] dark:hover:bg-white/[0.06] active:bg-black/[0.08] dark:active:bg-white/[0.1] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay & Floating Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop click to dismiss */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/25 dark:bg-black/60 backdrop-blur-xs z-40 md:hidden pointer-events-auto"
              aria-hidden="true"
            />

            {/* Floating Glassmorphic Drawer below the pill */}
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="pointer-events-auto w-full max-w-[1220px] mt-2 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#101116]/95 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.1] shadow-[0_16px_40px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.12)] p-4 relative z-50 max-h-[calc(100vh-6rem)] overflow-y-auto md:hidden"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const sectionId = link.href.replace("/#", "");
                  const isActive = activeSection === sectionId;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-[15px] font-medium px-4 py-2.5 rounded-xl transition-colors flex items-center min-h-[44px] ${
                        isActive
                          ? "text-text-primary font-semibold bg-black/[0.04] dark:bg-white/[0.06]"
                          : "text-text-secondary hover:text-text-primary hover:bg-black/[0.035] dark:hover:bg-white/[0.05]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="pt-3 mt-2 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col gap-2.5">
                  <Button
                    href="/#contact"
                    variant="primary"
                    size="md"
                    className="w-full justify-center min-h-[46px] rounded-full group relative"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Start a Project</span>
                    <ArrowUpRight
                      size={14}
                      className="opacity-80 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                    />
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
