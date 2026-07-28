import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ButtonGroup({ className, children, ...props }: ButtonGroupProps) {
  return (
    <div
      data-slot="button-group"
      className={cn("inline-flex flex-wrap items-center gap-1.5", className)}
      {...props}
    >
      {children}
    </div>
  );
}
