"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CRITICALLY_DAMPED_SPRING } from "@/lib/constants/physics";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  distance?: number;
}

const DIRECTION_MAP = {
  up: { y: 32, x: 0 },
  down: { y: -32, x: 0 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
} as const;

export function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  distance,
}: Readonly<ScrollRevealProps>) {
  const shouldReduceMotion = useReducedMotion();
  const offset = DIRECTION_MAP[direction];
  const initialY = direction === "up" || direction === "down" ? (distance ?? offset.y) : 0;
  const initialX = direction === "left" || direction === "right" ? (distance ?? offset.x) : 0;

  return (
    <motion.div
      className={cn(
        // Layout & Positioning
        "will-change-transform",
        // Custom className passed from caller
        className
      )}
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: initialY, x: initialX }
      }
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        ...CRITICALLY_DAMPED_SPRING,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
