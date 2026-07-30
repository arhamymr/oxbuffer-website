"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GithubLogoIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { PulseTriangle } from "@/components/pulse-triangle";
import { cn } from "@/lib/utils";
import { CRITICALLY_DAMPED_SPRING } from "@/lib/constants/physics";

const NAV_ITEMS = [
  { label: "Docs", href: "https://docs.0xbuffer.com", target: "_blank", rel: "noreferrer" },
  { label: "Blogs", href: "/blogs" },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        // Layout & Positioning
        "fixed top-0 z-50 w-full",
        // Backgrounds & Borders
        "border-b border-border border-t-neutral-800/40 bg-background backdrop-blur-xl",
        // Interactive & States
        "transition-colors duration-200"
      )}
    >
      <div
        className={cn(
          // Layout & Positioning
          "mx-auto flex w-full max-w-6xl flex-col"
        )}
      >
        <div
          className={cn(
            // Layout & Positioning
            "flex min-h-13 items-center justify-between",
            // Sizing & Spacing
            "px-4 py-2"
          )}
        >
          <Link
            href="/"
            className={cn(
              // Layout & Positioning
              "flex min-w-0 items-center gap-2",
              // Interactive & States
              "active:scale-95 transition-transform duration-100 ease-out"
            )}
            onClick={() => setMenuOpen(false)}
          >
            <PulseTriangle />
            <span className={cn("truncate font-mono text-sm font-semibold text-foreground")}>
              hexbuffer
            </span>
            <span
              className={cn(
                // Typography
                "text-[10px] font-medium uppercase tracking-wider text-muted-foreground",
                // Sizing & Spacing
                "px-1.5 py-0.5 rounded",
                // Backgrounds & Borders
                "bg-muted border border-border"
              )}
            >
              Early version
            </span>
          </Link>

          <nav
            className={cn(
              // Layout & Positioning
              "hidden items-center gap-6 md:flex"
            )}
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target={"target" in item ? item.target : undefined}
                rel={"rel" in item ? item.rel : undefined}
                className={cn(
                  // Typography
                  "text-sm font-medium text-muted-foreground",
                  // Interactive & States
                  "transition-colors hover:text-foreground active:scale-95"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button variant="outline" size="sm" className="gap-1.5" asChild>
              <a
                href="https://github.com/arhamymr/hexbuffer"
                target="_blank"
                rel="noreferrer"
              >
                <GithubLogoIcon className="size-4" />
                <span>Star us on GitHub</span>
              </a>
            </Button>
            <Button size="sm" asChild>
              <Link href="/downloads">Download</Link>
            </Button>
          </nav>

          <div
            className={cn(
              // Layout & Positioning
              "flex items-center gap-1 md:hidden"
            )}
          >
            <Button
              variant="ghost"
              size="icon"
              className={cn("size-8 text-muted-foreground hover:text-foreground")}
              asChild
            >
              <a
                href="https://github.com/arhamymr/hexbuffer"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Repository"
              >
                <GithubLogoIcon className="size-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn("size-8")}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <XIcon className="size-5" /> : <ListIcon className="size-5" />}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={CRITICALLY_DAMPED_SPRING}
              className={cn(
                // Layout & Positioning
                "overflow-hidden md:hidden",
                // Sizing & Spacing
                "px-4 py-3",
                // Backgrounds & Borders
                "border-t border-border bg-background"
              )}
            >
              <div
                className={cn(
                  // Layout & Positioning
                  "flex flex-col gap-1"
                )}
              >
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    target={"target" in item ? item.target : undefined}
                    rel={"rel" in item ? item.rel : undefined}
                    className={cn(
                      // Sizing & Spacing
                      "px-2 py-2 rounded-md",
                      // Typography
                      "text-sm font-medium text-muted-foreground",
                      // Interactive & States
                      "transition-colors hover:bg-muted hover:text-foreground active:scale-98"
                    )}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href="https://github.com/arhamymr/hexbuffer"
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    // Layout & Positioning
                    "flex items-center gap-2",
                    // Sizing & Spacing
                    "px-2 py-2 rounded-md",
                    // Typography
                    "text-sm font-medium text-muted-foreground",
                    // Interactive & States
                    "transition-colors hover:bg-muted hover:text-foreground active:scale-98"
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  <GithubLogoIcon className="size-5" />
                  <span>Star us on GitHub</span>
                </a>
                <Button variant="outline" size="sm" className="mt-2 w-full" asChild>
                  <Link href="/downloads" onClick={() => setMenuOpen(false)}>
                    Download
                  </Link>
                </Button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
