"use client";

import Link from "next/link";
import { GithubLogoIcon } from "@phosphor-icons/react";
import { Button } from "@celestia-project/ui";
import { PulseTriangle } from "./pulse-triangle";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer
      className={cn(
        // Layout & Positioning
        "w-full",
        // Sizing & Spacing
        "pt-16 pb-12 px-4 sm:px-6 lg:px-8",
        // Backgrounds & Borders
        "border-t border-border bg-background"
      )}
    >
      <div
        className={cn(
          // Layout & Positioning
          "container mx-auto",
          // Sizing & Spacing
          "max-w-5xl"
        )}
      >
        <div
          className={cn(
            // Layout & Positioning
            "grid grid-cols-1 gap-10 md:grid-cols-12",
            // Sizing & Spacing
            "pb-12"
          )}
        >
          {/* Left Column: Brand & Mission */}
          <div
            className={cn(
              // Layout & Positioning
              "md:col-span-6 space-y-3.5 pe-0 md:pe-6"
            )}
          >
            <div className={cn("flex items-center gap-2")}>
              <PulseTriangle size="small" />
              <span className={cn("font-mono text-base font-semibold tracking-tight text-foreground")}>
                Hexbuffer
              </span>
            </div>
            <p className={cn("text-sm text-muted-foreground leading-relaxed max-w-sm")}>
              Local-first desktop application and developer tooling for HTTP traffic
              inspection, request interception, payload testing, and security analysis.
            </p>
            <div className={cn("pt-1")}>
              <Button
                variant="outline"
                size="sm"
                render={
                  <a
                    href="https://github.com/dev-celestia/hexbuffer"
                    target="_blank"
                    rel="noreferrer"
                  />
                }
              >
                <GithubLogoIcon className="size-4" />
                <span>Star on GitHub</span>
              </Button>
            </div>
          </div>

          {/* Right Column 1: Product & Tools */}
          <div className={cn("md:col-span-3 space-y-3")}>
            <h4 className={cn("text-xs font-semibold uppercase tracking-wider text-foreground")}>
              Product & Tools
            </h4>
            <ul className={cn("space-y-2 text-sm text-muted-foreground")}>
              <li>
                <Link
                  href="/downloads"
                  className={cn("hover:text-foreground transition-colors inline-block")}
                >
                  Downloads
                </Link>
              </li>
              <li>
                <a
                  href="https://docs.0xbuffer.com"
                  target="_blank"
                  rel="noreferrer"
                  className={cn("hover:text-foreground transition-colors inline-block")}
                >
                  Documentation
                </a>
              </li>
              <li>
                <Link
                  href="/proxy"
                  className={cn("hover:text-foreground transition-colors inline-block")}
                >
                  Proxy Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column 2: Legal & Support */}
          <div className={cn("md:col-span-3 space-y-3")}>
            <h4 className={cn("text-xs font-semibold uppercase tracking-wider text-foreground")}>
              Legal & Support
            </h4>
            <ul className={cn("space-y-2 text-sm text-muted-foreground")}>
              <li>
                <Link
                  href="/privacy-policy"
                  className={cn("hover:text-foreground transition-colors inline-block")}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href="mailto:arhamymr@gmail.com"
                  className={cn("hover:text-foreground transition-colors inline-block")}
                >
                  Feedback & Support
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/dev-celestia/hexbuffer"
                  target="_blank"
                  rel="noreferrer"
                  className={cn("hover:text-foreground transition-colors inline-block")}
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div
          className={cn(
            // Layout & Positioning
            "pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4",
            // Typography
            "text-sm text-muted-foreground"
          )}
        >
          <p className={cn("text-xs text-muted-foreground")}>
            © {new Date().getFullYear()} Hexbuffer. All rights reserved.
          </p>
          <div className={cn("flex items-center gap-2")}>
            <span className={cn("size-2 rounded-full bg-emerald-400 animate-pulse")} />
            <span className={cn("font-mono text-xs text-muted-foreground")}>Active Development</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
