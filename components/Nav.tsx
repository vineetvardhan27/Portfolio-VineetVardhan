"use client";

import React, { useState } from "react";
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

  // Close mobile menu on Escape key press
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open to prevent background scrolling
  React.useEffect(() => {
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
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-bg/92 backdrop-blur-md border-b border-border shadow-2xs py-2.5 sm:py-3"
    >
      <div className="container-custom flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5 group py-1">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-border shadow-2xs group-hover:scale-102 transition-transform shrink-0">
            <img
              src="/avatar.png"
              alt="Vineet Vardhan — Full-Stack Developer & Software Engineer"
              width={32}
              height={32}
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-semibold tracking-[-0.01em] text-text-primary group-hover:text-accent transition-colors leading-tight">
              Vineet Vardhan
            </span>
            <span className="text-[11.5px] text-text-muted flex items-center gap-1.5 font-sans font-normal mt-0.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-success shrink-0" />
              Available for projects
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[14.5px] text-text-secondary hover:text-text-primary transition-colors font-medium tracking-normal py-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Controls (Theme Toggle + CTA) */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button href="/#contact" variant="primary" size="sm">
            <span>Start a Project</span>
            <ArrowUpRight size={13} className="opacity-80" />
          </Button>
        </div>

        {/* Mobile Menu Button & Theme Toggle */}
        <div className="flex md:hidden items-center gap-1.5">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-colors focus:outline-none focus:ring-2 focus:ring-accent/25"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay & Backdrop */}
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
              className="fixed inset-0 top-[57px] sm:top-[61px] bg-black/40 backdrop-blur-xs z-40 md:hidden"
              aria-hidden="true"
            />

            {/* Slide Down Navigation Drawer */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="md:hidden bg-bg/98 backdrop-blur-xl border-b border-border shadow-xl px-4 py-4 relative z-50 max-h-[calc(100vh-4rem)] overflow-y-auto"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[15px] font-medium text-text-secondary hover:text-text-primary hover:bg-surface/70 px-3.5 py-2.5 rounded-lg transition-colors flex items-center min-h-[44px]"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-3 mt-2 border-t border-border flex flex-col gap-2.5">
                  <Button
                    href="/#contact"
                    variant="primary"
                    size="md"
                    className="w-full justify-center min-h-[46px]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Start a Project</span>
                    <ArrowUpRight size={14} className="opacity-80" />
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
