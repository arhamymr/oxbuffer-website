/**
 * Apple Design Physics & Motion Constants
 * Tailored for Next.js 16, React 19, and Motion (web-hexbuffer edition)
 */

/**
 * Default critically damped spring (damping ratio 1.0, zero overshoot).
 * Safe house style default for menus, popovers, tabs, and static UI transitions.
 */
export const CRITICALLY_DAMPED_SPRING = {
  type: "spring",
  bounce: 0,
  duration: 0.35,
} as const;

/**
 * Under-damped spring (damping ratio ~0.8, slight physical bounce).
 * Reserved strictly for momentum-driven interactions (flicks, throws, drags).
 */
export const MOMENTUM_FLICK_SPRING = {
  type: "spring",
  bounce: 0.2,
  duration: 0.4,
} as const;

/**
 * Physics preset for bottom sheets, drawers, and modal overlays.
 */
export const DRAWER_SHEET_SPRING = {
  type: "spring",
  bounce: 0.15,
  duration: 0.3,
} as const;

/**
 * Exponential deceleration rate (Apple standard scroll deceleration: ~0.998).
 */
export const DEFAULT_DECELERATION_RATE = 0.998;

/**
 * Rubber-banding constant for progressive resistance beyond gesture bounds.
 */
export const DEFAULT_RUBBERBAND_CONSTANT = 0.55;

/**
 * Projects the resting endpoint of a moving element based on release velocity (px/s).
 * Uses Apple's exponential decay formula.
 */
export function projectMomentum(
  initialVelocity: number,
  decelerationRate: number = DEFAULT_DECELERATION_RATE
): number {
  return ((initialVelocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

/**
 * Calculates the nearest snap point based on current position and projected momentum endpoint.
 */
export function calculateSnapPoint(
  currentPos: number,
  velocity: number,
  snapPoints: number[]
): number {
  if (snapPoints.length === 0) return currentPos;
  const projectedPos = currentPos + projectMomentum(velocity);
  return snapPoints.reduce((prev, curr) =>
    Math.abs(curr - projectedPos) < Math.abs(prev - projectedPos) ? curr : prev
  );
}

/**
 * Applies progressive resistance past a boundary.
 *
 * @param overshoot Distance past the boundary in pixels.
 * @param dimension Total dimension of the container.
 * @param constant Resistance constant (default 0.55).
 */
export function rubberband(
  overshoot: number,
  dimension: number,
  constant: number = DEFAULT_RUBBERBAND_CONSTANT
): number {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}
