"use client";

import React from "react";
import Link from "next/link";
import { motion, HTMLMotionProps } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  isExternal = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/25 disabled:opacity-50 disabled:pointer-events-none rounded-lg select-none";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs font-semibold gap-1.5",
    md: "px-4.5 py-2.5 text-sm font-semibold gap-2",
    lg: "px-6 py-3 text-sm sm:text-base font-semibold gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-accent hover:bg-accent-hover text-[#0B0C0E] font-semibold border border-accent/40 shadow-xs hover:shadow-sm active:translate-y-0.5",
    secondary:
      "bg-surface/70 dark:bg-white/[0.04] hover:bg-surface dark:hover:bg-white/[0.08] text-text-primary border border-border dark:border-white/[0.1] hover:border-border-accent/40 shadow-2xs active:translate-y-0.5",
    ghost:
      "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface/60 dark:hover:bg-white/[0.04]",
  };

  const combinedClassName = twMerge(
    clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)
  );

  const motionProps: HTMLMotionProps<"button"> = {
    whileTap: { scale: 0.98 },
    transition: { duration: 0.15, ease: "easeOut" },
  };

  if (href) {
    if (isExternal) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClassName}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          {children}
        </motion.a>
      );
    }
    return (
      <Link href={href} passHref legacyBehavior>
        <motion.a
          className={combinedClassName}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          {children}
        </motion.a>
      </Link>
    );
  }

  return (
    <motion.button
      className={combinedClassName}
      {...motionProps}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
