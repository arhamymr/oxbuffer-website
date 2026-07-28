import * as React from "react"
import { Slot } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    // Layout & Positioning
    "inline-flex items-center justify-center cursor-pointer gap-1 whitespace-nowrap shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none",

    // Sizing, Typography & Borders
    "rounded-md border border-transparent font-medium transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  ],
  {
    variants: {
      variant: {
        // ponytail: Clean 3D style using vertical translation and box shadows to represent physical depth without layout shift.
        default:
          "bg-background border-primary text-primary hover:bg-primary/10 shadow-[0_2px_0_0_var(--primary)] active:translate-y-[2px] active:shadow-none active:transition-none",
        destructive:
          "bg-destructive border-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 shadow-destructive-3d active:translate-y-[2px] active:shadow-none active:transition-none",
        outline:
          "border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-card dark:border-border/80 dark:text-foreground dark:hover:bg-accent/80 dark:hover:text-foreground shadow-[0_2px_0_0_rgba(0,0,0,0.15)] dark:shadow-[0_2px_0_0_rgba(255,255,255,0.15)] active:translate-y-[2px] active:shadow-none active:transition-none",
        secondary:
          "bg-secondary border-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-secondary/80 dark:text-secondary-foreground dark:hover:bg-secondary shadow-[0_2px_0_0_rgba(0,0,0,0.15)] dark:shadow-[0_2px_0_0_rgba(255,255,255,0.15)] active:translate-y-[2px] active:shadow-none active:transition-none",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9.5 px-4 text-[0.925rem] gap-1.5 rounded-md",
        xs: "h-6.5 px-2.5 text-xs gap-1 rounded-sm [&_svg:not([class*='size-'])]:size-3.5",
        sm: "h-8 px-3 text-xs font-medium gap-1 rounded-sm [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 px-5 text-base font-semibold gap-2 rounded-md [&_svg:not([class*='size-'])]:size-5",
        xl: "h-13 px-7 text-lg font-semibold gap-2.5 rounded-lg [&_svg:not([class*='size-'])]:size-5",
        icon: "size-9.5 rounded-md",
        "icon-xs": "size-6.5 rounded-sm [&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm": "size-8 rounded-sm [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-11 rounded-md [&_svg:not([class*='size-'])]:size-5",
        "icon-xl": "size-13 rounded-lg [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: Readonly<
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean
    }
>) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export { Button, buttonVariants }
