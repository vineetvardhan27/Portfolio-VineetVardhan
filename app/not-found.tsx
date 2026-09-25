import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Home, FolderKanban, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page or case study you are looking for does not exist.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center pt-32 pb-20 bg-bg">
      <div className="container-custom text-center space-y-6 max-w-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-surface/60 dark:bg-white/[0.04] border border-border text-xs font-sans font-medium text-accent">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span>404 · Page Not Found</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-semibold text-text-primary tracking-[-0.025em]">
          Page not found
        </h1>

        <p className="text-text-secondary text-base leading-relaxed max-w-md mx-auto font-normal">
          The page or case study you requested could not be located. It may have been moved or the URL might be mistyped.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Button href="/" variant="primary" size="md">
            <Home size={16} />
            <span>Return to Homepage</span>
          </Button>

          <Button href="/#work" variant="secondary" size="md">
            <FolderKanban size={16} />
            <span>View Projects</span>
          </Button>
        </div>

        <div className="pt-6 border-t border-border/80 text-xs text-text-muted font-sans">
          Need assistance? Reach out directly at{" "}
          <a
            href="mailto:vineetvardhanwork@gmail.com"
            className="text-text-primary hover:text-accent underline transition-colors"
          >
            vineetvardhanwork@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
