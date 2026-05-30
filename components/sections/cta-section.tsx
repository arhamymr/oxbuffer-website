"use client";

import { useEffect, useState } from "react";
import { Apple, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

type OS = "macos" | "windows" | "linux" | null;

function detectOS(): OS {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("mac")) return "macos";
  if (ua.includes("win")) return "windows";
  if (ua.includes("linux")) return "linux";
  return null;
}

export function CtaSection() {
  const [os, setOS] = useState<OS>(null);

  useEffect(() => {
    setOS(detectOS());
  }, []);

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-normal mb-4">
          0xBuffer is getting better and better day after day and we are happy to share our results with you.
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {(os === null || os === "macos") && (
            <Button size="lg" className="gap-2">
              Download for macOS
            </Button>
          )}
          {(os === null || os === "windows") && (
            <Button size="lg" className="gap-2">
              Download for Windows
            </Button>
          )}
        </div>
        <p className="mt-4">
          <a href="/downloads" className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors">
            Available for Windows & macOS
          </a>
        </p>
      </div>
    </section>
  );
}
