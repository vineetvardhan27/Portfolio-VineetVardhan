"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";
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
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 dark:bg-[#0D0D10]/85 backdrop-blur-md border-b border-border/80 dark:border-white/[0.08] shadow-xs py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-border/80 shadow-xs group-hover:scale-105 transition-transform shrink-0">
            <img
              src="/avatar.png"
              alt="Vineet Vardhan"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-text-primary group-hover:text-accent transition-colors">
              Vineet Vardhan
            </span>
            <span className="text-[11px] text-text-muted flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
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
              className="text-xs lg:text-sm text-text-secondary hover:text-text-primary transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Controls (Theme Toggle + CTA) */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button href="/#contact" variant="primary" size="sm">
            Start a Project
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-white/98 dark:bg-[#0D0D10]/98 backdrop-blur-xl border-b border-border dark:border-white/[0.08] shadow-lg px-6 py-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-medium text-text-secondary hover:text-text-primary block py-1.5 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-3 border-t border-border flex flex-col gap-3">
                <Button
                  href="/#contact"
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start a Project
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
