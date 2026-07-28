---
name: apple-design
description: Apple's approach to interface design and fluid, physical motion, translated for Next.js 16, React 19, Motion, and Tailwind CSS v4 in the web-hexbuffer project. Use when building or reviewing gesture-driven UI, spring animations, drag/swipe/sheet interactions, momentum and interruptible transitions, translucent dark materials, typography (optical sizing, tracking, leading), reduced-motion, or Apple-style UI foundations.
---

# Apple Design (web-hexbuffer Edition)

How Apple builds interfaces that stop feeling like a computer and start feeling like an extension of you — translated specifically for the **web-hexbuffer** codebase (Next.js 16, React 19, `motion/react`, Tailwind CSS v4, dark-mode native aesthetics, and glowing emerald accents).

The core principle: **an interface feels alive when motion starts from the current on-screen value, inherits the user's velocity, projects momentum forward, and can be grabbed and reversed at any instant.** Springs are the primary tool because they are inherently interruptible and velocity-aware.

---

## Codebase Standards & Rules (AGENTS.md Compliance)

When implementing Apple-style design patterns in React components for this project, always strictly enforce:
1. **Commented `cn(...)` Categories**: Group Tailwind classes into line-separated, commented category sections:
   ```tsx
   cn(
     // Layout & Positioning
     "flex items-center justify-between",
     // Sizing & Spacing
     "w-full px-4 py-2",
     // Typography
     "text-sm font-medium text-foreground",
     // Backgrounds & Borders
     "bg-background border border-border rounded-md",
     // Interactive & States
     "hover:bg-accent transition-colors focus-visible:outline-none"
   )
   ```
2. **No Inline Styles**: Avoid inline `style={{ ... }}` props. Use Tailwind classes or CSS custom properties in `globals.css`.
3. **No Opacity Modifiers on Color Classes**: Avoid slash opacity modifiers (`bg-primary/10`, `border-emerald-500/20`). Use solid classes (`bg-card`, `bg-muted`, `border-border`) or dedicated semantic color variables.
4. **UPPER_SNAKE_CASE Constants**: All top-level physics constants and config objects must be named in `UPPER_SNAKE_CASE` (e.g. `CRITICALLY_DAMPED_SPRING`, `DEFAULT_DECELERATION_RATE`).

---

## 1. Response — Kill Latency

Response is the foundation everything else is built on. Lag destroys direct manipulation.

- **Respond on pointer-down, not on release.** Highlight a button the instant it is pressed (`active:scale-95`).
- **Continuous feedback during interaction.** Update the UI 1:1 with pointer movements — never animate only when a gesture completes.

```tsx
import { cn } from "@/lib/utils";

export function ActionButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        // Layout & Positioning
        "inline-flex items-center justify-center",
        // Sizing & Spacing
        "px-4 py-2 rounded-lg",
        // Typography
        "text-sm font-medium text-foreground",
        // Backgrounds & Borders
        "bg-surface border border-border",
        // Interactive & States
        "active:scale-95 transition-transform duration-100 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      )}
    >
      {children}
    </button>
  );
}
```

---

## 2. Direct Manipulation — 1:1 Tracking

> "Touch/pointer and content should move together."

- Use Pointer Events with `setPointerCapture` so tracking continues seamlessly even if the pointer leaves element bounds.
- Always offset from *where the pointer grabbed the element*, avoiding sudden snaps to the element center.

```tsx
"use client";

import React, { useRef } from "react";

export function usePointerGrab() {
  const grabOffsetRef = useRef<number>(0);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    target.setPointerCapture(e.pointerId);
    const rect = target.getBoundingClientRect();
    grabOffsetRef.current = e.clientY - rect.top;
  };

  return { handlePointerDown, grabOffsetRef };
}
```

---

## 3. Interruptibility — The Core Principle

Every animation must be interruptible and redirectable at any moment. A user must be able to grab a moving sheet or modal mid-flight and reverse it without waiting for completion.

- **Never lock out input during a transition.**
- **Animate from presentation (live) values**, never forcing a jump to logical targets.
- **Decompose 2D motion into independent X and Y springs** to prevent diagonal sync issues when axes carry different velocities.
- Use `motion/react` (or `motion`) components which handle interruption and velocity blending natively.

---

## 4. Behavior Over Animation — Use Springs

Physics parameters in Apple design translate directly into spring parameters in Motion:

- **Critically Damped (`bounce: 0` / damping 1.0)**: Graceful, zero overshoot. Use for general UI transitions (menus, tabs, popovers).
- **Under-Damped (`bounce: 0.15–0.25` / damping ~0.8)**: Slight bounce. Use ONLY when the user gesture carried physical momentum (flicks, throws, sheet drags).

### Standard Physics Constants

```tsx
export const CRITICALLY_DAMPED_SPRING = {
  type: "spring",
  bounce: 0,
  duration: 0.35,
} as const;

export const MOMENTUM_FLICK_SPRING = {
  type: "spring",
  bounce: 0.2,
  duration: 0.4,
} as const;

export const DRAWER_SHEET_SPRING = {
  type: "spring",
  bounce: 0.15,
  duration: 0.3,
} as const;
```

---

## 5. Velocity Handoff

When a gesture ends, pass the pointer's release velocity to the spring so there is no visual seam between dragging and animating.

```tsx
"use client";

import { motion, useMotionValue, animate } from "motion/react";
import { DRAWER_SHEET_SPRING } from "@/lib/constants/physics";

export function VelocityHandoffExample() {
  const y = useMotionValue(0);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: { velocity: { y: number } }) => {
    // Pass raw velocity in px/s directly to motion animate
    animate(y, 0, {
      ...DRAWER_SHEET_SPRING,
      velocity: info.velocity.y,
    });
  };

  return <motion.div drag="y" style={{ y }} onDragEnd={handleDragEnd} />;
}
```

---

## 6. Momentum Projection

Project the resting endpoint using release velocity before choosing the nearest snap point:

```tsx
export const DEFAULT_DECELERATION_RATE = 0.998;

export function projectMomentum(initialVelocity: number, decelerationRate = DEFAULT_DECELERATION_RATE): number {
  return ((initialVelocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

export function calculateSnapPoint(currentPos: number, velocity: number, snapPoints: number[]): number {
  const projectedPos = currentPos + projectMomentum(velocity);
  return snapPoints.reduce((prev, curr) =>
    Math.abs(curr - projectedPos) < Math.abs(prev - projectedPos) ? curr : prev
  );
}
```

---

## 7. Spatial Consistency & Origins

- **Symmetric Paths**: Enter and exit along the same path (e.g. slide in from right → dismiss to right).
- **Anchored Origins**: Set `transform-origin` to match trigger origins for popovers, dropdowns, and dialogs.

```tsx
"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { CRITICALLY_DAMPED_SPRING } from "@/lib/constants/physics";

export function AnchoredPopover() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={CRITICALLY_DAMPED_SPRING}
      className={cn(
        // Layout & Positioning
        "absolute top-full right-0 z-50 mt-2 origin-top-right",
        // Sizing & Spacing
        "w-64 p-4 rounded-xl",
        // Backgrounds & Borders
        "bg-neutral-900 border border-neutral-800 shadow-2xl backdrop-blur-xl"
      )}
    >
      <p className={cn("text-xs text-muted-foreground")}>Anchored Popover Content</p>
    </motion.div>
  );
}
```

---

## 8. Rubber-Banding

Apply progressive resistance when dragging past boundaries:

```tsx
export const DEFAULT_RUBBERBAND_CONSTANT = 0.55;

export function rubberband(overshoot: number, dimension: number, constant = DEFAULT_RUBBERBAND_CONSTANT): number {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}
```

---

## 9. Dark Translucent Materials & Depth (Hexbuffer Style)

Apple's material hierarchy adapted for `web-hexbuffer`'s native dark mode with glowing emerald accents:

- **Translucent Floating Chrome**: Use `backdrop-blur-md` or `backdrop-blur-lg` over dark surface colors with clean border definition.
- **Top Edge Catch Light**: Highlighting top borders (`border-t-neutral-700` or glowing emerald subtle borders) captures light like real glass.
- **No Opacity Modifiers**: Use semantic theme classes (`bg-card`, `bg-background`, `bg-neutral-950`) with backdrop filters.

```tsx
import { cn } from "@/lib/utils";

export function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        // Layout & Positioning
        "relative overflow-hidden",
        // Sizing & Spacing
        "p-6 rounded-2xl",
        // Backgrounds & Borders
        "bg-neutral-900 border border-neutral-800 border-t-neutral-700 shadow-xl backdrop-blur-xl",
        // Interactive & States
        "transition-colors duration-200"
      )}
    >
      {children}
    </div>
  );
}
```

---

## 10. Typography — Optical Sizing, Tracking, Leading

- **Display Headings**: Tight line-height (`leading-none` or `leading-tight`), negative tracking (`tracking-tight` or `-0.02em`), capped ceiling (`clamp(2rem, 5vw, 4rem)`).
- **Body Text**: Balanced line-height (`leading-relaxed`), neutral tracking, strict contrast (WCAG AA).
- **Emerald Highlights**: Accent important technical metrics or key terms with glowing emerald tokens (`text-emerald-400`).

---

## 11. Reduced Motion & Accessibility

Honor user motion preferences with non-vestibular cross-fades:

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import { CRITICALLY_DAMPED_SPRING } from "@/lib/constants/physics";

export function AccessibleModal({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  const animationVariants = {
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 },
    animate: shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 },
    exit: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 },
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={animationVariants}
      transition={CRITICALLY_DAMPED_SPRING}
    >
      {children}
    </motion.div>
  );
}
```

---

## Quick Reference Summary

| Goal | Technique | Recommendation for web-hexbuffer |
| --- | --- | --- |
| Default UI Transition | Critically damped spring | `type: "spring", bounce: 0, duration: 0.35` |
| Drag / Flick Release | Velocity handoff + bounce | `type: "spring", bounce: 0.15–0.25`, pass `velocity` |
| Endpoint Snap | Exponential momentum projection | `projectMomentum(v, 0.998)` |
| Modal / Sheet Anchor | Spatial consistency | `origin-bottom` or `origin-top-right` matching trigger |
| Glass Chrome | Translucent dark backdrop | `backdrop-blur-xl bg-neutral-900 border-t-neutral-700` |
| Styling Standard | Commented `cn(...)` | Group by Layout, Sizing, Typography, Backgrounds, Interactive |
