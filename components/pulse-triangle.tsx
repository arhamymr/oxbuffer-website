import { Triangle, TriangleDashed } from "lucide-react";

import { cn } from "@/lib/utils";

type PulseTriangleSize = "small" | "medium" | "large";

const pulseTriangleSizes: Record<PulseTriangleSize, string> = {
  small: "size-3",
  medium: "size-4",
  large: "size-6",
};

const pulseTriangleAnimation =
  "animate-[triangle-pulse_2.8s_cubic-bezier(0.45,0,0.2,1)_infinite] motion-reduce:animate-[triangle-pulse_4s_cubic-bezier(0.45,0,0.2,1)_infinite]";
const pulseTriangleIconBase =
  "absolute inset-0 block origin-center will-change-[opacity,transform]";
const pulseTriangleSolidAnimation =
  "animate-[triangle-solid_2.8s_cubic-bezier(0.45,0,0.2,1)_infinite] motion-reduce:animate-[triangle-solid_4s_cubic-bezier(0.45,0,0.2,1)_infinite]";
const pulseTriangleDashedAnimation =
  "animate-[triangle-dashed_2.8s_cubic-bezier(0.45,0,0.2,1)_infinite] motion-reduce:animate-[triangle-dashed_4s_cubic-bezier(0.45,0,0.2,1)_infinite]";

type PulseTriangleProps = {
  size?: PulseTriangleSize;
  className?: string;
};

export function PulseTriangle({ size = "medium", className }: PulseTriangleProps) {
  const sizeClass = pulseTriangleSizes[size];

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0",
        pulseTriangleAnimation,
        sizeClass,
        className
      )}
      aria-hidden="true"
    >
      <Triangle
        className={cn(
          pulseTriangleIconBase,
          pulseTriangleSolidAnimation,
          sizeClass
        )}
      />
      <TriangleDashed
        className={cn(
          pulseTriangleIconBase,
          pulseTriangleDashedAnimation,
          sizeClass
        )}
      />
    </span>
  );
}
