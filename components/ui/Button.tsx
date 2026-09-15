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
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-50 disabled:pointer-events-none rounded-full select-none";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs font-semibold gap-1.5",
    md: "px-5 py-2.5 text-sm font-semibold gap-2",
    lg: "px-7 py-3.5 text-base font-semibold gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-accent text-white hover:bg-accent-hover dark:bg-[#2B66DF] dark:hover:bg-[#3B82F6] dark:border dark:border-blue-400/25 dark:hover:shadow-[0_0_24px_rgba(59,130,246,0.4)] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:bg-accent-hover",
    secondary:
      "bg-white dark:bg-white/[0.06] border border-slate-300 dark:border-white/25 text-text-primary dark:text-zinc-100 hover:bg-surface hover:border-slate-400 dark:hover:border-white/50 dark:hover:bg-white/[0.12] shadow-2xs hover:-translate-y-0.5 active:translate-y-0",
    ghost:
      "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface dark:hover:bg-white/[0.06]",
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
