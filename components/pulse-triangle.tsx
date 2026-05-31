import { Triangle, TriangleDashed } from "lucide-react";

import { cn } from "@/lib/utils";

type PulseTriangleSize = "small" | "medium" | "large";

const pulseTriangleSizes: Record<PulseTriangleSize, string> = {
  small: "size-3",
  medium: "size-4",
  large: "size-6",
};

type PulseTriangleProps = {
  size?: PulseTriangleSize;
  className?: string;
};

export function PulseTriangle({ size = "medium", className }: PulseTriangleProps) {
  const sizeClass = pulseTriangleSizes[size];

  return (
    <span
      className={cn("pulse-triangle-root relative inline-flex shrink-0", sizeClass, className)}
      aria-hidden="true"
    >
      <Triangle
        className={cn(
          "pulse-triangle-solid absolute inset-0",
          sizeClass
        )}
      />
      <TriangleDashed
        className={cn(
          "pulse-triangle-dashed absolute inset-0",
          sizeClass
        )}
      />
    </span>
  );
}
