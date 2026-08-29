import { AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { ShowcaseGridItem } from "./showcase-grid-item";
import type { ShowcaseItem } from "./types";

interface ShowcaseGridProps {
  readonly items: readonly ShowcaseItem[];
  readonly selectedId: string;
  readonly onSelect: (id: string) => void;
}

export function ShowcaseGrid({
  items,
  selectedId,
  onSelect,
}: ShowcaseGridProps) {
  return (
    <div
      className={cn(
        // Layout & Positioning
        "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        // Sizing & Spacing
        "gap-3.5"
      )}
    >
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => (
          <ShowcaseGridItem
            key={item.id}
            item={item}
            index={index}
            isSelected={item.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
