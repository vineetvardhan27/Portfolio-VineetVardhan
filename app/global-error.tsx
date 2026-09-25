"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-zinc-900 min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-4 max-w-md">
          <h2 className="text-2xl font-bold">Critical Application Error</h2>
          <p className="text-sm text-zinc-600">
            A critical error occurred while rendering the application.
          </p>
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 bg-[#C99552] text-[#0B0C0E] rounded-lg text-sm font-semibold hover:bg-[#B9823F] transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
