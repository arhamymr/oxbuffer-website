"use client";

import { useEffect } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

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
    <>
      <SiteHeader />
      <main className="flex items-center justify-center min-h-screen">
        <div className="text-center px-4">
          <p className="text-sm font-mono text-muted-foreground mb-4">500</p>
          <h1 className="text-2xl md:text-3xl font-normal tracking-tight mb-3">
            Something went wrong
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Try again
          </button>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
