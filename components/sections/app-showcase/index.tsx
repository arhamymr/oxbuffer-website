"use client";

import { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { cn } from "@/lib/utils";
import { ShowcaseHeader } from "./showcase-header";
import { ShowcaseFilterBar } from "./showcase-filter-bar";
import { ShowcaseSpotlightCard } from "./showcase-spotlight-card";
import { ShowcaseGrid } from "./showcase-grid";
import { SHOWCASE_ITEMS, AUTO_CYCLE_INTERVAL_MS } from "./constants";
import type { CategoryFilter } from "./types";

export function AppShowcaseSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [selectedId, setSelectedId] = useState<string>("http-history");
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const filteredItems =
    activeCategory === "All"
      ? SHOWCASE_ITEMS
      : SHOWCASE_ITEMS.filter((item) => item.category === activeCategory);

  const selectedItem =
    filteredItems.find((item) => item.id === selectedId) ??
    filteredItems[0] ??
    SHOWCASE_ITEMS[0];

  useEffect(() => {
    if (isPaused || filteredItems.length <= 1) return;

    const interval = setInterval(() => {
      setSelectedId((currentId) => {
        const currentIndex = filteredItems.findIndex(
          (item) => item.id === currentId
        );
        const nextIndex =
          currentIndex === -1 || currentIndex === filteredItems.length - 1
            ? 0
            : currentIndex + 1;
        return filteredItems[nextIndex].id;
      });
    }, AUTO_CYCLE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [filteredItems, isPaused]);

  const handleCategorySelect = (cat: CategoryFilter) => {
    setActiveCategory(cat);
    const newFiltered =
      cat === "All"
        ? SHOWCASE_ITEMS
        : SHOWCASE_ITEMS.filter((item) => item.category === cat);
    if (
      newFiltered.length > 0 &&
      !newFiltered.some((item) => item.id === selectedId)
    ) {
      setSelectedId(newFiltered[0].id);
    }
  };

  return (
    <section
      id="features"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
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
          <ShowcaseHeader />
          <ShowcaseFilterBar
            activeCategory={activeCategory}
            onSelectCategory={handleCategorySelect}
          />
          <ShowcaseSpotlightCard selectedItem={selectedItem} />
          <ShowcaseGrid
            items={filteredItems}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}

export * from "./types";
export * from "./constants";
