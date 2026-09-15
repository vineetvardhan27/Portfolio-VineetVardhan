"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center pt-24 pb-16">
      <div className="container-custom text-center space-y-4 max-w-md">
        <div className="text-xs font-bold uppercase tracking-wider text-red-600">
          Application Error
        </div>
        <h2 className="text-3xl font-semibold text-text-primary">
          Something went wrong
        </h2>
        <p className="text-text-secondary text-sm">
          An unexpected error occurred. Please try reloading the page.
        </p>
        <div className="pt-2">
          <Button variant="primary" size="sm" onClick={() => reset()}>
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
