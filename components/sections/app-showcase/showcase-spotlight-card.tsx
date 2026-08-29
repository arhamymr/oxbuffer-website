import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircleIcon, SparkleIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { CRITICALLY_DAMPED_SPRING } from "@/lib/constants/physics";
import type { ShowcaseItem } from "./types";

interface ShowcaseSpotlightCardProps {
  readonly selectedItem: ShowcaseItem;
}

export function ShowcaseSpotlightCard({
  selectedItem,
}: ShowcaseSpotlightCardProps) {
  return (
    <div
      className={cn(
        // Layout & Positioning
        "relative overflow-hidden",
        // Sizing & Spacing
        "mb-8 p-6 md:p-8 min-h-[220px]",
        // Backgrounds & Borders
        "rounded-xl border border-border bg-card shadow-sm"
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedItem.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={CRITICALLY_DAMPED_SPRING}
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
