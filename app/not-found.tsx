import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-24 pb-16">
      <div className="container-custom text-center space-y-6 max-w-md">
        <div className="text-sm font-bold uppercase tracking-wider text-accent">
          404 Error
        </div>
        <h1 className="text-4xl sm:text-5xl font-semibold text-text-primary">
          Page Not Found
        </h1>
        <p className="text-text-secondary text-base">
          The page or case study you are looking for doesn't exist or has been moved.
        </p>
        <div className="pt-4">
          <Button href="/" variant="primary" size="md">
            <ArrowLeft size={16} />
            <span>Return to Home</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
