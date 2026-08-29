import { CATEGORY_FILTERS, type CategoryFilter } from "./types";
import { SHOWCASE_ITEMS } from "./constants";
import { cn } from "@/lib/utils";

interface ShowcaseFilterBarProps {
  readonly activeCategory: CategoryFilter;
  readonly onSelectCategory: (category: CategoryFilter) => void;
}

export function ShowcaseFilterBar({
  activeCategory,
  onSelectCategory,
}: ShowcaseFilterBarProps) {
  return (
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
            onClick={() => onSelectCategory(cat)}
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
  );
}
