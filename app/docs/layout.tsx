"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DocsSidebar } from "@/components/docs-sidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isIndex = pathname === "/docs";

  return (
    <>
      <SiteHeader />
      <main className="pt-16 pb-24 px-4 min-h-[100vh] mt-5">
        <div
          className={`container mx-auto ${
            isIndex
              ? "max-w-4xl"
              : "max-w-6xl grid md:grid-cols-[220px_1fr] gap-8"
          }`}
        >
          {!isIndex && (
            <aside className="hidden md:block shrink-0 sticky top-24 self-start border-r border-border/40 pr-6 h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin">
              <DocsSidebar />
            </aside>
          )}
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
