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
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0B0C0E] disabled:opacity-50 disabled:pointer-events-none rounded-lg select-none leading-normal tracking-normal";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 min-h-[38px] text-[13.5px] font-medium gap-1.5",
    md: "px-4.5 py-2.5 min-h-[44px] text-[14.5px] font-medium gap-2",
    lg: "px-6 py-3 min-h-[46px] text-[15px] sm:text-[15.5px] font-semibold gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-accent hover:bg-accent-hover text-[#0B0C0E] font-semibold border border-accent/40 shadow-[0_2px_8px_rgba(185,130,63,0.22),0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.24)] dark:shadow-[0_2px_12px_rgba(201,149,82,0.26),0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.18)] hover:shadow-[0_4px_14px_rgba(185,130,63,0.32),0_2px_4px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.28)] dark:hover:shadow-[0_4px_18px_rgba(201,149,82,0.38),0_2px_6px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.22)] motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 hover:brightness-[1.03] active:brightness-95",
    secondary:
      "bg-surface/70 dark:bg-white/[0.04] hover:bg-surface dark:hover:bg-white/[0.08] text-text-primary font-medium border border-border dark:border-white/[0.1] hover:border-border-accent/40 shadow-2xs motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0",
    ghost:
      "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface/60 dark:hover:bg-white/[0.04] font-medium",
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
