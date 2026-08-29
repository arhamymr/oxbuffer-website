import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { CRITICALLY_DAMPED_SPRING } from "@/lib/constants/physics";
import { AUTO_CYCLE_INTERVAL_MS } from "./constants";
import type { ShowcaseItem } from "./types";

interface ShowcaseGridItemProps {
  readonly item: ShowcaseItem;
  readonly index: number;
  readonly isSelected: boolean;
  readonly isPaused: boolean;
  readonly onSelect: (id: string) => void;
}

export function ShowcaseGridItem({
  item,
  index,
  isSelected,
  isPaused,
  onSelect,
}: ShowcaseGridItemProps) {
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
      onClick={() => onSelect(item.id)}
      className={cn(
        // Layout & Positioning
        "relative flex flex-col justify-between text-start overflow-hidden",
        // Sizing & Spacing
        "p-4 rounded-xl",
        // Backgrounds & Borders
        "border bg-card cursor-pointer",
        isSelected
          ? "border-emerald-500 bg-muted"
          : "border-border hover:border-neutral-700 hover:bg-muted",
        // Interactive & States
        "group transition-all duration-200"
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

      {/* Slide Active Progress Indicator */}
      {isSelected && !isPaused && (
        <div
          className={cn(
            // Layout & Positioning
            "absolute bottom-0 left-0 right-0 overflow-hidden",
            // Sizing & Spacing
            "h-1 rounded-b-xl",
            // Backgrounds & Borders
            "bg-neutral-800"
          )}
        >
          <motion.div
            key={item.id}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: AUTO_CYCLE_INTERVAL_MS / 1000,
              ease: "linear",
            }}
            className={cn(
              // Sizing & Spacing
              "h-full",
              // Backgrounds & Borders
              "bg-emerald-500"
            )}
          />
        </div>
      )}
    </motion.div>
  );
}
