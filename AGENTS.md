<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Component Usage & Styling Rules

## Components Usage
Use components inside `@/components/ui` (or `src/components/ui`). Do NOT pass custom `className` props to modify component styling — use the original components as designed.

## Component Styling Standard
MANDATORY: For all React component styling and Tailwind CSS classes in this project, ALWAYS organize classes passed to `cn(...)` or `cva(...)` into line-separated, commented category sections:

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

## No Inline Styles
Do NOT use inline `style` props (e.g. `style={{ height: 120 }}`) on applied components or HTML elements. Use Tailwind CSS utility classes instead.

## No Opacity Modifiers on Color Classes
Do NOT use slash opacity modifiers on Tailwind color classes (e.g., `border-primary/30`, `bg-primary/10`, `text-primary/80`). Avoid adding opacity suffixes (`/<number>`) to color classes. Use solid color classes or dedicated semantic color variables instead.

## Constant Naming Standard
Top-level constants and static values MUST always be named in UPPERCASE / UPPER_SNAKE_CASE (e.g., `CONST_EXAMPLE`, `QUICKSTART_CODE_SNIPPET`).
