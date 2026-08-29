"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircleIcon,
  SparkleIcon,
  CaretRightIcon,
  BrowsersIcon,
} from "@phosphor-icons/react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { cn } from "@/lib/utils";
import { CRITICALLY_DAMPED_SPRING } from "@/lib/constants/physics";

interface ShowcaseItem {
  readonly id: string;
  readonly title: string;
  readonly tagline: string;
  readonly description: string;
  readonly iconSrc: string;
  readonly category: "Traffic" | "Testing" | "Recon" | "Utility";
  readonly badge: string;
  readonly isNew?: boolean;
  readonly features: readonly string[];
  readonly route: string;
}

const CATEGORY_FILTERS = [
  "All",
  "Traffic",
  "Testing",
  "Recon",
  "Utility",
] as const;

type CategoryFilter = (typeof CATEGORY_FILTERS)[number];

const SHOWCASE_ITEMS: readonly ShowcaseItem[] = [
  {
    id: "http-history",
    title: "HTTP History",
    tagline: "Live Traffic Stream & Deep Inspection",
    description:
      "Capture and inspect every HTTP and HTTPS transaction in real-time. Analyze request headers, query parameters, multipart bodies, and response latency with zero lag.",
    iconSrc: "/assets/app/http-history.png",
    category: "Traffic",
    badge: "Core Proxy",
    features: [
      "Real-time bidirectional stream capture",
      "Header, cookie, and body inspectors",
      "Instant search and status filtering",
    ],
    route: "/http-history",
  },
  {
    id: "intercept",
    title: "Intercept",
    tagline: "Mid-flight Traffic Interception & Tampering",
    description:
      "Hold live HTTP traffic mid-flight before it hits the target server or browser. Modify headers, rewrite request bodies, swap parameters, or drop unwanted packets on the fly.",
    iconSrc: "/assets/app/Intercept.png",
    category: "Traffic",
    badge: "Live Tamper",
    features: [
      "Mid-flight request and response holding",
      "Raw text and structured payload editors",
      "One-click forward, tamper, or drop",
    ],
    route: "/intercept",
  },
  {
    id: "repeater",
    title: "Repeater",
    tagline: "Iterative Request Replay",
    description:
      "Fine-tune HTTP requests and reissue them instantaneously. Analyze response status, headers, and body payloads across test iterations.",
    iconSrc: "/assets/app/repeater.png",
    category: "Testing",
    badge: "Analysis",
    features: [
      "Multi-tab request workspace",
      "Real-time response inspection",
      "Instant parameter mutations",
    ],
    route: "/repeater",
  },
  {
    id: "intruder",
    title: "Intruder",
    tagline: "High-Speed Automated Endpoint Fuzzing",
    description:
      "Pinpoint vulnerability surfaces with automated attacks. Place custom payload markers across headers or parameters, attach wordlists, and sort results by response delta.",
    iconSrc: "/assets/app/intruder.png",
    category: "Testing",
    badge: "Fuzzer",
    features: [
      "Visual payload marker positioning",
      "Custom wordlist & generator integration",
      "Real-time status & anomaly sorting",
    ],
    route: "/intruder",
  },
  {
    id: "port-scanner",
    title: "Port Scanner",
    tagline: "High-Speed Port Discovery & Service Recon",
    description:
      "Scan target hosts for open ports and running network services. Leverage preset port collections, stealth connection modes, and banner grabbing in a dedicated tab.",
    iconSrc: "/assets/app/port-scanner.png",
    category: "Recon",
    badge: "New Feature",
    isNew: true,
    features: [
      "Multi-threaded async TCP checks",
      "Top 100, 1000 & full port presets",
      "Service banner detection & stealth mode",
    ],
    route: "/port-scanner",
  },
  {
    id: "jwt",
    title: "JWT Analyzer",
    tagline: "Token Decoding, Editing & Cryptographic Signing",
    description:
      "Inspect, decode, and tamper with JSON Web Tokens. Edit header algorithms, modify payload claims, verify signatures, and audit for weak keys or none-algorithm flaws.",
    iconSrc: "/assets/app/jwt.png",
    category: "Testing",
    badge: "New Feature",
    isNew: true,
    features: [
      "Instant 3-part claim decoding",
      "Signature verification with secrets",
      "Token tampering for auth testing",
    ],
    route: "/jwt",
  },
  {
    id: "notes",
    title: "Notes & Scratchpad",
    tagline: "In-Context Markdown Workspace Documentation",
    description:
      "Record reproduction steps, store sample payloads, and document active targets without context switching. Notes persist seamlessly across your local sessions.",
    iconSrc: "/assets/app/notes.png",
    category: "Utility",
    badge: "Productivity",
    features: [
      "Markdown with syntax highlighting",
      "Quick PoC snippets & payload staging",
      "Local persistence in your workspace",
    ],
    route: "/notes",
  },
] as const;

export function AppShowcaseSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [selectedId, setSelectedId] = useState<string>("http-history");

  const filteredItems =
    activeCategory === "All"
      ? SHOWCASE_ITEMS
      : SHOWCASE_ITEMS.filter((item) => item.category === activeCategory);

  const selectedItem =
    SHOWCASE_ITEMS.find((item) => item.id === selectedId) ?? SHOWCASE_ITEMS[0];

  return (
    <section
      id="features"
      className={cn(
        // Layout & Positioning
        "relative overflow-hidden",
        // Sizing & Spacing
        "py-20 md:py-28 px-4 sm:px-6 lg:px-8",
        // Backgrounds & Borders
        "border-t border-border"
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
        <ScrollReveal>
          {/* Section Header: Minimal & Clear */}
          <div
            className={cn(
              // Layout & Positioning
              "flex flex-col items-start text-start",
              // Sizing & Spacing
              "mb-12 max-w-2xl"
            )}
          >
            <div
              className={cn(
                // Layout & Positioning
                "inline-flex items-center gap-1.5",
                // Sizing & Spacing
                "px-2.5 py-1 mb-4 rounded-full",
                // Backgrounds & Borders
                "border border-border bg-card",
                // Typography
                "text-xs font-mono text-emerald-400"
              )}
            >
              <BrowsersIcon className="size-3.5" />
              <span>APPLICATION SUITE</span>
            </div>
            <h2
              className={cn(
                // Typography
                "text-2xl sm:text-4xl font-semibold tracking-tight text-foreground",
                // Sizing & Spacing
                "mb-3"
              )}
            >
              Built-in modules for every phase of testing.
            </h2>
            <p
              className={cn(
                // Typography
                "text-base text-muted-foreground leading-relaxed"
              )}
            >
              Seven dedicated desktop tools engineered for web application reconnaissance, traffic analysis, and vulnerability discovery.
            </p>
          </div>

          {/* Filter Bar: Clean & Minimalist */}
          <div
            className={cn(
              // Layout & Positioning
              "flex flex-wrap items-center",
              // Sizing & Spacing
              "gap-2 mb-8"
            )}
          >
            {CATEGORY_FILTERS.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    // Layout & Positioning
                    "inline-flex items-center justify-center",
                    // Sizing & Spacing
                    "px-3 py-1.5 rounded-lg",
                    // Typography
                    "text-xs font-medium tracking-tight",
                    // Backgrounds & Borders
                    isActive
                      ? "bg-foreground text-background font-semibold"
                      : "bg-card text-muted-foreground border border-border hover:text-foreground hover:border-neutral-700",
                    // Interactive & States
                    "transition-colors duration-150 cursor-pointer"
                  )}
                >
                  {cat === "All" ? `All (${SHOWCASE_ITEMS.length})` : cat}
                </button>
              );
            })}
          </div>

          {/* Spotlight Detail Card */}
          <div
            className={cn(
              // Sizing & Spacing
              "mb-8 p-6 md:p-8",
              // Backgrounds & Borders
              "rounded-xl border border-border bg-card shadow-sm"
            )}
          >
            <div
              className={cn(
                // Layout & Positioning
                "grid md:grid-cols-[auto_1fr] items-start",
                // Sizing & Spacing
                "gap-6"
              )}
            >
              {/* App Icon */}

                <Image
                  src={selectedItem.iconSrc}
                  alt={selectedItem.title}
                  width={72}
                  height={72}
                  className={cn(
                    // Sizing & Spacing
                    "size-14 md:size-16 object-contain rounded-md"
                  )}
                />

              {/* Tool Meta & Description */}
              <div className="min-w-0 flex-1">
                <div
                  className={cn(
                    // Layout & Positioning
                    "flex flex-wrap items-center",
                    // Sizing & Spacing
                    "gap-2 mb-2"
                  )}
                >
                  <h3
                    className={cn(
                      // Typography
                      "text-lg md:text-xl font-semibold tracking-tight text-foreground"
                    )}
                  >
                    {selectedItem.title}
                  </h3>
                  <span
                    className={cn(
                      // Sizing & Spacing
                      "px-2 py-0.5 rounded",
                      // Typography
                      "text-xs font-mono text-muted-foreground",
                      // Backgrounds & Borders
                      "border border-border bg-muted"
                    )}
                  >
                    {selectedItem.badge}
                  </span>
                  {selectedItem.isNew && (
                    <span
                      className={cn(
                        // Layout & Positioning
                        "inline-flex items-center gap-1",
                        // Sizing & Spacing
                        "px-2 py-0.5 rounded",
                        // Typography
                        "text-xs font-semibold text-emerald-400",
                        // Backgrounds & Borders
                        "border border-emerald-500 bg-card"
                      )}
                    >
                      <SparkleIcon className="size-3" weight="fill" />
                      NEW
                    </span>
                  )}
                </div>

                <p
                  className={cn(
                    // Typography
                    "text-sm font-medium text-foreground",
                    // Sizing & Spacing
                    "mb-1.5"
                  )}
                >
                  {selectedItem.tagline}
                </p>

                <p
                  className={cn(
                    // Typography
                    "text-sm text-muted-foreground leading-relaxed",
                    // Sizing & Spacing
                    "mb-4 max-w-3xl"
                  )}
                >
                  {selectedItem.description}
                </p>

                {/* Checklist features */}
                <div
                  className={cn(
                    // Layout & Positioning
                    "grid sm:grid-cols-2 md:grid-cols-3",
                    // Sizing & Spacing
                    "gap-2.5 pt-4",
                    // Backgrounds & Borders
                    "border-t border-border"
                  )}
                >
                  {selectedItem.features.map((feature) => (
                    <div
                      key={feature}
                      className={cn(
                        // Layout & Positioning
                        "flex items-start gap-2",
                        // Typography
                        "text-xs text-foreground"
                      )}
                    >
                      <CheckCircleIcon
                        className={cn(
                          // Sizing & Spacing
                          "size-3.5 shrink-0 mt-0.5",
                          // Typography
                          "text-emerald-400"
                        )}
                        weight="fill"
                      />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Minimal Grid of Modules */}
          <div
            className={cn(
              // Layout & Positioning
              "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
              // Sizing & Spacing
              "gap-3.5"
            )}
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => {
                const isSelected = item.id === selectedId;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      ...CRITICALLY_DAMPED_SPRING,
                      delay: index * 0.02,
                    }}
                    onClick={() => setSelectedId(item.id)}
                    className={cn(
                      // Layout & Positioning
                      "flex flex-col justify-between text-start",
                      // Sizing & Spacing
                      "p-4 rounded-xl",
                      // Backgrounds & Borders
                      "border bg-card cursor-pointer",
                      isSelected
                        ? "border-emerald-500 bg-muted"
                        : "border-border hover:border-neutral-700 hover:bg-muted",
                      // Interactive & States
                      "group transition-all duration-150"
                    )}
                  >
                    <div>
                      {/* Card Header: Icon + Category Badge */}
                      <div
                        className={cn(
                          // Layout & Positioning
                          "flex items-center justify-between",
                          // Sizing & Spacing
                          "mb-3"
                        )}
                      >
                          <Image
                            src={item.iconSrc}
                            alt={item.title}
                            width={36}
                            height={36}
                            className={cn(
                              // Sizing & Spacing
                              "size-8 object-contain rounded-sm"
                            )}
                          />
                        <div
                          className={cn(
                            // Layout & Positioning
                            "flex items-center gap-1.5"
                          )}
                        >
                          {item.isNew && (
                            <span
                              className={cn(
                                // Sizing & Spacing
                                "px-1.5 py-0.5 rounded",
                                // Typography
                                "text-[10px] font-mono font-bold text-emerald-400",
                                // Backgrounds & Borders
                                "border border-emerald-500 bg-card"
                              )}
                            >
                              NEW
                            </span>
                          )}
                          <span
                            className={cn(
                              // Sizing & Spacing
                              "px-2 py-0.5 rounded",
                              // Typography
                              "text-[10px] font-mono text-muted-foreground",
                              // Backgrounds & Borders
                              "border border-border bg-card"
                            )}
                          >
                            {item.category}
                          </span>
                        </div>
                      </div>

                      {/* Card Title & Snippet */}
                      <h4
                        className={cn(
                          // Typography
                          "font-medium text-foreground tracking-tight text-sm",
                          // Sizing & Spacing
                          "mb-1"
                        )}
                      >
                        {item.title}
                      </h4>
                      <p
                        className={cn(
                          // Typography
                          "text-xs text-muted-foreground line-clamp-2 leading-relaxed",
                          // Sizing & Spacing
                          "mb-3"
                        )}
                      >
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
