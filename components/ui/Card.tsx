"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Card({
  hoverEffect = false,
  className,
  children,
  ...props
}: CardProps) {
  const baseStyles =
    "bg-white rounded-2xl border border-border overflow-hidden transition-shadow duration-200";

  const combinedClassName = twMerge(
    clsx(
      baseStyles,
      hoverEffect ? "hover:shadow-md hover:border-zinc-300" : "shadow-sm",
      className
    )
  );

  if (hoverEffect) {
    const motionProps: HTMLMotionProps<"div"> = {
      whileHover: { y: -4 },
      transition: { duration: 0.25, ease: "easeOut" },
    };

    return (
      <motion.div className={combinedClassName} {...motionProps} {...(props as any)}>
        {children}
      </motion.div>
    );
  }

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
}
