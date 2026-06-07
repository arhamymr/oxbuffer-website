"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  KeyRound,
  PlusCircle,
  FileText,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logout } from "../lib/actions";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "All Licenses", href: "/admin/licenses", icon: KeyRound },
  { label: "Generate", href: "/admin/licenses/new", icon: PlusCircle },
  { label: "Blog", href: "/admin/blog", icon: FileText },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const NavContent = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      <div className="flex h-13 items-center gap-2 border-b border-border px-4">
        <div className="flex size-6 items-center justify-center rounded bg-primary">
          <KeyRound className="size-3.5 text-primary-foreground" />
        </div>
        <span className="font-mono text-sm font-semibold">0xbuffer</span>
        <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          admin
        </span>
      </div>

      <nav className="flex-1 space-y-0.5 p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => mobile && setMobileOpen(false)}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                active
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="size-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-2">
        <form action={logout}>
          <button
            type="submit"
            className={cn(
              "flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm",
              "text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            )}
          >
            <LogOut className="size-4 shrink-0" />
            Sign out
          </button>
        </form>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile header */}
      <div className="sticky top-0 z-30 flex h-13 items-center justify-between border-b border-border bg-background px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded bg-primary">
            <KeyRound className="size-3.5 text-primary-foreground" />
          </div>
          <span className="font-mono text-sm font-semibold">0xbuffer</span>
          <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            admin
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </Button>
      </div>

      {/* Mobile nav dropdown */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-13 z-20 flex flex-col border-b border-border bg-background lg:hidden">
          <NavContent mobile />
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r border-border bg-background lg:flex">
        <NavContent />
      </aside>
    </>
  );
}
