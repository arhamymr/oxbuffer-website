"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { cn } from "@/lib/utils";
import { ShowcaseHeader } from "./showcase-header";
import { ShowcaseFilterBar } from "./showcase-filter-bar";
import { ShowcaseSpotlightCard } from "./showcase-spotlight-card";
import { ShowcaseGrid } from "./showcase-grid";
import {
  SHOWCASE_ITEMS,
  AUTO_CYCLE_INTERVAL_MS,
  PAUSE_DURATION_MS,
} from "./constants";
import type { CategoryFilter } from "./types";

export function AppShowcaseSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [selectedId, setSelectedId] = useState<string>("http-history");
  const [direction, setDirection] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const filteredItems =
    activeCategory === "All"
      ? SHOWCASE_ITEMS
      : SHOWCASE_ITEMS.filter((item) => item.category === activeCategory);

  const currentIndex = Math.max(
    0,
    filteredItems.findIndex((item) => item.id === selectedId)
  );

  const selectedItem =
    filteredItems[currentIndex] ?? SHOWCASE_ITEMS[0];

  const triggerPause = useCallback(() => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, PAUSE_DURATION_MS);
  }, []);

  const handleMouseEnter = () => {
    triggerPause();
  };

  const handleMouseLeave = () => {
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    setIsPaused(false);
  };

  const handleNext = useCallback(() => {
    setDirection(1);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedId(filteredItems[nextIndex].id);
  }, [currentIndex, filteredItems]);

  const handleSelect = (id: string) => {
    const targetIndex = filteredItems.findIndex((item) => item.id === id);
    setDirection(targetIndex >= currentIndex ? 1 : -1);
    setSelectedId(id);
    triggerPause();
  };

  useEffect(() => {
    if (isPaused || filteredItems.length <= 1) return;

    const interval = setInterval(() => {
      handleNext();
    }, AUTO_CYCLE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [filteredItems.length, handleNext, isPaused]);

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

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
      setDirection(1);
      setSelectedId(newFiltered[0].id);
    }
    triggerPause();
  };

  return (
    <section
      id="features"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
          <ShowcaseSpotlightCard
            selectedItem={selectedItem}
            direction={direction}
          />
          <ShowcaseGrid
            items={filteredItems}
            selectedId={selectedId}
            isPaused={isPaused}
            onSelect={handleSelect}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}

export * from "./types";
export * from "./constants";
