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

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-bg/92 backdrop-blur-md border-b border-border shadow-2xs py-3"
    >
      <div className="container-custom flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
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
            <span className="text-[14px] font-semibold tracking-[-0.01em] text-text-primary group-hover:text-accent transition-colors">
              Vineet Vardhan
            </span>
            <span className="text-[12px] text-text-muted flex items-center gap-1.5 font-sans font-normal">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-success" />
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
              className="text-[14.5px] text-text-secondary hover:text-text-primary transition-colors font-medium tracking-normal"
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

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden bg-bg/98 backdrop-blur-xl border-b border-border shadow-md px-6 py-5"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[15px] font-medium text-text-secondary hover:text-text-primary block py-2 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-border flex flex-col gap-3">
                <Button
                  href="/#contact"
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Start a Project</span>
                  <ArrowUpRight size={14} className="opacity-80" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
