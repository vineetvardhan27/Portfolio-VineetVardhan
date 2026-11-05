"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";

export const CAROUSEL_VARIANT: "coverflow" | "flat" = "coverflow";

interface ProjectSlide {
  name: string;
  label: string;
  live: string;
  caseStudy: string;
  image: string;
  alt: string;
}

const REAL_PROJECTS: ProjectSlide[] = [
  {
    name: "Hotel Greenery View",
    label: "Hotel website",
    live: "https://www.hotelgreeneryview.com/",
    caseStudy: "/work/hotel-greenery-view",
    image: "/hero/greenery-view.webp",
    alt: "Hotel Greenery View homepage",
  },
  {
    name: "Anugra Travels",
    label: "Travel website",
    live: "https://www.anugratravels.com/",
    caseStudy: "/work/anugra-travels",
    image: "/hero/anugra.webp",
    alt: "Anugra Travels homepage",
  },
  {
    name: "Grove PMS",
    label: "Property management system",
    live: "https://grovepms.me/",
    caseStudy: "/work/grove-pms",
    image: "/hero/grove.webp",
    alt: "Grove PMS homepage",
  },
];

// Duplicate slides once (6 total) for seamless infinite looping in Embla
const ALL_SLIDES: ProjectSlide[] = [...REAL_PROJECTS, ...REAL_PROJECTS];

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: false,
    duration: 30,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const isPausedRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  // Update slide 3D / coverflow transforms continuously on scroll progress
  const updateSlideTransforms = useCallback(() => {
    if (!emblaApi) return;
    const scrollProgress = emblaApi.scrollProgress();
    const snaps = emblaApi.scrollSnapList();
    const numSnaps = snaps.length;
    if (!numSnaps) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const variant = isMobile ? "flat" : CAROUSEL_VARIANT;

    const slideNodes = emblaApi.slideNodes();

    snaps.forEach((scrollSnap, snapIndex) => {
      let diff = scrollSnap - scrollProgress;
      // Circular distance in [-0.5, 0.5] range
      diff = (((diff % 1) + 1.5) % 1) - 0.5;
      const factor = diff * numSnaps;
      const absFactor = Math.abs(factor);
      const clampedAbs = Math.min(1, absFactor);

      const slideNode = slideNodes[snapIndex];
      if (!slideNode) return;

      const innerNode = slideNode.firstElementChild as HTMLElement | null;
      if (!innerNode) return;

      if (variant === "coverflow") {
        const scale = 1 - 0.18 * clampedAbs;
        const opacity = 1 - 0.45 * clampedAbs;
        const rotateY = Math.max(-18, Math.min(18, -factor * 18));
        const translateXPercent = Math.max(-12, Math.min(12, -factor * 12));
        const zIndex = Math.round(20 - clampedAbs * 10);

        slideNode.style.zIndex = `${zIndex}`;
        innerNode.style.transform = `scale(${scale}) rotateY(${rotateY}deg) translateX(${translateXPercent}%)`;
        innerNode.style.opacity = `${opacity}`;
        innerNode.style.transformOrigin = "center center";
      } else {
        const scale = 1 - 0.06 * clampedAbs;
        const opacity = 1 - 0.3 * clampedAbs;
        const zIndex = Math.round(20 - clampedAbs * 10);

        slideNode.style.zIndex = `${zIndex}`;
        innerNode.style.transform = `scale(${scale})`;
        innerNode.style.opacity = `${opacity}`;
        innerNode.style.transformOrigin = "center center";
      }
    });
  }, [emblaApi]);

  const onScroll = useCallback(() => {
    if (rafIdRef.current !== null) return;
    rafIdRef.current = requestAnimationFrame(() => {
      updateSlideTransforms();
      rafIdRef.current = null;
    });
  }, [updateSlideTransforms]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Reduced motion preference detection
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(media.matches);

    const onChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  // Embla listeners
  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("scroll", onScroll);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", () => {
      onSelect();
      updateSlideTransforms();
    });

    // Initial transform application
    updateSlideTransforms();

    const onResize = () => {
      updateSlideTransforms();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [emblaApi, onScroll, onSelect, updateSlideTransforms]);

  // Autoplay management
  useEffect(() => {
    if (!emblaApi || isReducedMotion) return;

    let timer: ReturnType<typeof setInterval> | null = null;

    const startTimer = () => {
      if (timer) clearInterval(timer);
      if (isPausedRef.current || document.visibilityState === "hidden") return;
      timer = setInterval(() => {
        if (emblaApi && !isPausedRef.current && document.visibilityState !== "hidden") {
          emblaApi.scrollNext();
        }
      }, 4500);
    };

    startTimer();

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        if (timer) clearInterval(timer);
      } else {
        startTimer();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    const onPointerDown = () => {
      isPausedRef.current = true;
      setIsPaused(true);
      if (timer) clearInterval(timer);
    };

    const onPointerUp = () => {
      isPausedRef.current = false;
      setIsPaused(false);
      startTimer();
    };

    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("pointerUp", onPointerUp);

    return () => {
      if (timer) clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [emblaApi, isReducedMotion]);

  const handleMouseEnter = () => {
    isPausedRef.current = true;
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    isPausedRef.current = false;
    setIsPaused(false);
  };

  const handleFocus = () => {
    isPausedRef.current = true;
    setIsPaused(true);
  };

  const handleBlur = () => {
    isPausedRef.current = false;
    setIsPaused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      emblaApi?.scrollPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      emblaApi?.scrollNext();
    }
  };

  const activeRealIndex = selectedIndex % 3;
  const isAutoplayActive = !isReducedMotion && !isPaused;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected projects"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className="relative w-full max-w-full outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg rounded-2xl"
    >
      {/* Viewport with perspective for 3D coverflow */}
      <div
        ref={emblaRef}
        className="overflow-hidden w-full select-none min-h-[320px] sm:min-h-[350px] lg:min-h-[370px] touch-pan-y"
        style={{ perspective: "1200px", touchAction: "pan-y" }}
      >
        <div
          className="flex touch-pan-y py-4"
          style={{ transformStyle: "preserve-3d", touchAction: "pan-y" }}
        >
          {ALL_SLIDES.map((project, index) => {
            const isDuplicate = index >= 3;
            const realIndex = index % 3;

            return (
              <div
                key={`${project.name}-${index}`}
                role="group"
                aria-roledescription="slide"
                aria-label={!isDuplicate ? `${realIndex + 1} of 3: ${project.name}` : undefined}
                aria-hidden={isDuplicate ? "true" : undefined}
                className="flex-[0_0_78vw] max-w-[320px] md:max-w-none md:flex-[0_0_60vw] lg:flex-[0_0_380px] px-2"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="slide-inner w-full h-full will-change-transform"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Link
                    href={project.caseStudy}
                    prefetch={false}
                    tabIndex={isDuplicate ? -1 : 0}
                    className="group block rounded-[12px] border border-border dark:border-white/[0.08] bg-card dark:bg-[#141519] shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-none overflow-hidden transition-[border-color] duration-200 hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface dark:bg-[#101114]">
                      <Image
                        src={project.image}
                        alt={project.alt}
                        width={960}
                        height={540}
                        priority={index === 0}
                        unoptimized
                        sizes="(min-width: 1024px) 380px, (min-width: 768px) 60vw, 78vw"
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="p-4 sm:p-5 flex flex-col justify-between">
                      <div>
                        <h3 className="text-[18px] font-semibold text-text-primary tracking-[-0.015em] leading-snug">
                          {project.name}
                        </h3>
                        <p className="text-[13px] font-medium text-text-muted mt-1">
                          {project.label}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-border/50 dark:border-white/[0.04] flex items-center justify-between">
                        <span className="text-[14px] font-medium text-accent group-hover:text-accent-hover inline-flex items-center gap-1.5 transition-colors">
                          View case study
                          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accessible live region: active only when autoplay is off */}
      {!isAutoplayActive && (
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Slide {activeRealIndex + 1} of 3: {REAL_PROJECTS[activeRealIndex].name}
        </div>
      )}

      {/* Controls: Prev/Next buttons (min 44x44px tap target) and 3 indicators mapping to real projects */}
      <div className="mt-4 flex items-center justify-between px-2">
        {/* Previous button */}
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous project"
          className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-border dark:border-white/[0.1] bg-card dark:bg-[#141519] flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* 3 Indicators showing active real project */}
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Projects pagination">
          {REAL_PROJECTS.map((project, i) => {
            const isActive = activeRealIndex === i;
            return (
              <button
                key={project.name}
                type="button"
                role="tab"
                onClick={() => {
                  if (!emblaApi) return;
                  const currentSnap = emblaApi.selectedScrollSnap();
                  const targetSnap = currentSnap - (currentSnap % 3) + i;
                  emblaApi.scrollTo(targetSnap);
                }}
                aria-label={`Go to project ${i + 1}: ${project.name}`}
                aria-selected={isActive}
                className="relative py-3 px-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full"
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-6 bg-accent"
                      : "w-2 bg-text-muted/30 hover:bg-text-muted/60"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Next button */}
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next project"
          className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-border dark:border-white/[0.1] bg-card dark:bg-[#141519] flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
