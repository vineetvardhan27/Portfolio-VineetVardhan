"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { frame, cancelFrame } from "framer-motion";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with refined inertia scrolling settings
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Synchronize Lenis with Framer Motion's internal ticker loop
    function update({ timestamp }: { timestamp: number }) {
      lenis.raf(timestamp);
    }

    frame.update(update, true);

    return () => {
      cancelFrame(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
