"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme-provider";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`inline-flex p-1 bg-surface dark:bg-[#141418] border border-border dark:border-white/10 rounded-full h-8 w-16 ${className || ""}`} />
    );
  }

  return (
    <div
      className={`inline-flex items-center p-0.5 bg-surface dark:bg-[#121216] border border-border dark:border-white/10 rounded-full relative select-none shadow-2xs ${
        className || ""
      }`}
      role="radiogroup"
      aria-label="Theme switcher"
    >
      {/* Light option */}
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={`relative px-2.5 py-1 text-xs font-medium rounded-full transition-colors z-10 flex items-center gap-1 focus:outline-none ${
          theme === "light"
            ? "text-text-primary font-semibold"
            : "text-text-muted hover:text-text-secondary dark:text-zinc-400 dark:hover:text-zinc-200"
        }`}
        aria-checked={theme === "light"}
        role="radio"
        title="Switch to Light Theme"
      >
        {theme === "light" && (
          <motion.div
            layoutId="theme-toggle-pill"
            className="absolute inset-0 bg-white dark:bg-[#24242C] rounded-full shadow-2xs border border-border/80 dark:border-white/20 -z-10"
            transition={{ type: "spring", stiffness: 450, damping: 32 }}
          />
        )}
        <Sun size={13} className={theme === "light" ? "text-amber-500" : "text-text-muted dark:text-zinc-500"} />
        <span className="text-[11px] hidden sm:inline">Light</span>
      </button>

      {/* Dark option */}
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={`relative px-2.5 py-1 text-xs font-medium rounded-full transition-colors z-10 flex items-center gap-1 focus:outline-none ${
          theme === "dark"
            ? "text-text-primary dark:text-white font-semibold"
            : "text-text-muted hover:text-text-secondary dark:text-zinc-400 dark:hover:text-zinc-200"
        }`}
        aria-checked={theme === "dark"}
        role="radio"
        title="Switch to Dark Theme"
      >
        {theme === "dark" && (
          <motion.div
            layoutId="theme-toggle-pill"
            className="absolute inset-0 bg-white dark:bg-[#24242C] rounded-full shadow-2xs border border-border/80 dark:border-white/20 -z-10"
            transition={{ type: "spring", stiffness: 450, damping: 32 }}
          />
        )}
        <Moon size={13} className={theme === "dark" ? "text-accent" : "text-text-muted dark:text-zinc-500"} />
        <span className="text-[11px] hidden sm:inline">Dark</span>
      </button>
    </div>
  );
}
