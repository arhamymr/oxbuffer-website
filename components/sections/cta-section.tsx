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
            <Button size="lg" className="gap-2" asChild>
              <a href="https://dist.0xbuffer.com/0xbuffer_0.1.0_aarch64.dmg">
                Download for macOS
              </a>
            </Button>
          )}
          <Button size="lg" className="gap-2" disabled>
            Windows — Coming Soon
          </Button>
        </div>
        <p className="mt-4">
          <a href="/downloads" className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors">
            Available for macOS — Windows coming soon
          </a>
        </p>
      </div>
    </section>
  );
}
