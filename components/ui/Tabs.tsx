"use client";

import React from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface TabOption<T extends string> {
  id: T;
  label: string;
  badge?: string;
}

interface TabsProps<T extends string> {
  options: TabOption<T>[];
  activeId: T;
  onChange: (id: T) => void;
  layoutId?: string;
  className?: string;
}

export function Tabs<T extends string>({
  options,
  activeId,
  onChange,
  layoutId = "active-tab-indicator",
  className,
}: TabsProps<T>) {
  return (
    <div
      className={twMerge(
        clsx(
          "inline-flex p-1.5 bg-surface border border-border rounded-full relative select-none",
          className
        )
      )}
      role="tablist"
    >
      {options.map((option) => {
        const isActive = activeId === option.id;
        return (
          <button
            key={option.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.id)}
            className={clsx(
              "relative px-5 py-2 text-sm font-medium rounded-full transition-colors z-10 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              isActive
                ? "text-text-primary font-semibold"
                : "text-text-secondary hover:text-text-primary"
            )}
          >
            {isActive && (
              <motion.div
                layoutId={layoutId}
                className="absolute inset-0 bg-white rounded-full shadow-sm border border-border/60 -z-10"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
            <span>{option.label}</span>
            {option.badge && (
              <span
                className={clsx(
                  "text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-semibold",
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "bg-neutral-200 text-neutral-600"
                )}
              >
                {option.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
