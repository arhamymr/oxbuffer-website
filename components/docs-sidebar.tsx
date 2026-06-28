"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  ArrowUpDown,
  PauseCircle,
  RotateCw,
  Code2,
  Hexagon,
  LoaderPinwheel,
  AppWindow,
  BookText,
  Binary,
  Radio,
  Bug,
} from "lucide-react";

const menuItems = [
  {
    label: "Overview & Workspaces",
    icon: Home,
    href: "/docs/overview",
  },
  {
    label: "HTTP & WS History",
    icon: ArrowUpDown,
    href: "/docs/live-traffic",
  },
  {
    label: "Intercept & Breakpoints",
    icon: PauseCircle,
    href: "/docs/intercept",
  },
  {
    label: "Repeater & Replay",
    icon: RotateCw,
    href: "/docs/repeater",
  },
  {
    label: "Repeater Scripting",
    icon: Code2,
    href: "/docs/repeater-scripts",
  },
  {
    label: "Invoker Fuzzer",
    icon: Hexagon,
    href: "/docs/invoker",
  },
  {
    label: "Workflow Automation",
    icon: LoaderPinwheel,
    href: "/docs/automation",
  },
  {
    label: "Browser Crawler",
    icon: AppWindow,
    href: "/docs/browser-automation",
  },
  {
    label: "Documents & Evidence",
    icon: BookText,
    href: "/docs/documents",
  },
  {
    label: "Security Utilities",
    icon: Binary,
    href: "/docs/tools",
  },
  {
    label: "OOB Listener",
    icon: Radio,
    href: "/docs/listener",
  },
  {
    label: "Debugger & Regression",
    icon: Bug,
    href: "/docs/debugger",
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      <div className="px-3 mb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/75">
          Documentation Pages
        </span>
      </div>
      <div className="space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all hover:bg-muted/80",
                isActive
                  ? "bg-muted text-primary border-l-2 border-primary rounded-l-none pl-2.5"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("size-4 shrink-0", isActive ? "text-primary" : "text-muted-foreground")} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
