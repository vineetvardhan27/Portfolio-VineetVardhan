import React from "react";
import { HeroAnimatedHeadline } from "./HeroAnimatedHeadline";
import { HeroCarousel } from "./HeroCarousel";

export const COPY_VARIANTS = {
  A: {
    h1: {
      line1: "Hotel websites that take",
      accent: "direct",
      line2AfterAccent: "bookings.",
    },
    sub: "I build websites and booking systems for hotels, resorts and travel businesses in India. Guests book on your own site, not through an OTA that keeps up to 25% of every stay.",
  },
  B: {
    h1: {
      line1: "Your own site should be your",
      accent: "best",
      line2AfterAccent: "booking channel.",
    },
    sub: "I design and build hotel websites, booking flows and property management software. One developer, from first call to launch.",
  },
  C: {
    h1: {
      line1: "Fewer OTA commissions.",
      accent: "More",
      line2AfterAccent: "direct guests.",
    },
    sub: "Hotel websites with room pages, WhatsApp enquiries and a CMS your staff can actually update.",
  },
} as const;

type VariantKey = keyof typeof COPY_VARIANTS;
const ACTIVE_VARIANT: VariantKey = "A";

const WHATSAPP_URL =
  "https://wa.me/919798504212?text=Hi%20Vineet%2C%20please%20audit%20my%20hotel%20website%3A%20%5BURL%5D";

export function Hero() {
  const copy = COPY_VARIANTS[ACTIVE_VARIANT];

  return (
    <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28 xl:pt-44 xl:pb-32 text-text-primary transition-colors duration-200 overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column Content Wrapper: behaves as contents on mobile/tablet for order flexibility */}
          <div className="contents lg:flex lg:flex-col lg:items-start lg:col-span-7 w-full order-1">
            {/* 1. Headline and subtext block */}
            <div className="flex flex-col items-start w-full order-1">
              {/* H1 Headline with single entrance animation */}
              <HeroAnimatedHeadline
                line1={copy.h1.line1}
                accentWord={copy.h1.accent}
                line2AfterAccent={copy.h1.line2AfterAccent}
              />

              {/* Subtext */}
              <p className="mt-3.5 sm:mt-4 text-[17px] sm:text-[18px] text-text-secondary max-w-[56ch] leading-[1.6] font-normal">
                {copy.sub}
              </p>
            </div>

            {/* 2. CTAs and microcopy block */}
            <div className="flex flex-col items-start w-full order-2 mt-5 sm:mt-7">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-6 w-full sm:w-auto">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-[6px] bg-accent hover:bg-accent-hover text-[#0B0C0E] font-medium text-[15px] sm:text-[16px] tracking-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  Get a free website audit
                </a>

                <a
                  href="#work"
                  className="inline-flex items-center text-[15px] sm:text-[16px] font-medium tracking-normal text-text-primary underline underline-offset-4 decoration-border dark:decoration-white/20 hover:decoration-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm"
                >
                  See live hotel sites
                </a>
              </div>

              {/* Microcopy under CTAs */}
              <p className="mt-2.5 text-[13px] sm:text-[14px] text-text-secondary">
                Reply within 24 hours. 15 minute call, no commitment.
              </p>
            </div>

            {/* 3. Proof line: order-3 on mobile (<md), order-4 on tablet (md to lg), natural flow inside col-span-7 on desktop */}
            <div className="w-full order-3 md:order-4 lg:order-3 mt-6 lg:mt-8 pt-5 lg:pt-6 border-t border-border dark:border-white/[0.08]">
              <p className="text-[13px] sm:text-[14px] text-text-secondary">
                Live work:{" "}
                <a
                  href="https://hotelgreeneryview.com"
                  target="_blank"
                  rel="noopener"
                  className="text-text-primary underline underline-offset-2 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-xs"
                >
                  Hotel Greenery View
                </a>
                ,{" "}
                <a
                  href="https://anugratravels.com"
                  target="_blank"
                  rel="noopener"
                  className="text-text-primary underline underline-offset-2 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-xs"
                >
                  Anugra Travels
                </a>
                ,{" "}
                <a
                  href="https://grovepms.vercel.app"
                  target="_blank"
                  rel="noopener"
                  className="text-text-primary underline underline-offset-2 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-xs"
                >
                  Grove PMS
                </a>
              </p>
            </div>
          </div>

          {/* Right Column / Carousel: order-4 on mobile (below proof line), order-3 on tablet (below CTAs), col-span-5 on desktop */}
          <div className="w-full order-4 md:order-3 lg:order-2 lg:col-span-5 flex items-center justify-center lg:-mr-6 lg:w-[calc(100%+24px)]">
            <HeroCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
