"use client";

import React from "react";

interface HeroAnimatedHeadlineProps {
  line1: string;
  accentWord: string;
  line2AfterAccent: string;
}

export function HeroAnimatedHeadline({
  line1,
  accentWord,
  line2AfterAccent,
}: HeroAnimatedHeadlineProps) {
  return (
    <h1 className="text-[clamp(2.5rem,5.2vw,4.5rem)] font-semibold text-text-primary tracking-[-0.025em] leading-[1.05] max-w-2xl">
      <span className="block animate-hero-line-1 motion-reduce:animate-none">
        {line1}
      </span>
      <span className="block mt-1 animate-hero-line-2 motion-reduce:animate-none">
        <span className="text-accent">{accentWord}</span> {line2AfterAccent}
      </span>
    </h1>
  );
}
