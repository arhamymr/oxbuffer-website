import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { MarkdownContent } from "@/lib/markdown";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Privacy Policy — hexbuffer",
  description: "Read the hexbuffer privacy policy.",
};

async function getPrivacyPolicy() {
  return readFile(path.join(process.cwd(), "docs/privacy-policy.md"), "utf8");
}

export default async function PrivacyPolicy() {
  const markdown = await getPrivacyPolicy();

  return (
    <>
      <SiteHeader />
      <main
        className={cn(
          // Layout & Positioning
          "min-h-[100vh]",
          // Sizing & Spacing
          "mt-5 px-4 sm:px-6 lg:px-8 pt-16 pb-24"
        )}
      >
        <div
          className={cn(
            // Layout & Positioning
            "container mx-auto",
            // Sizing & Spacing
            "max-w-5xl"
          )}
        >
          <PageBreadcrumb current="Privacy Policy" />
          <div
            className={cn(
              // Sizing & Spacing
              "p-6 sm:p-10",
              // Backgrounds & Borders
              "rounded-xl border border-border bg-card"
            )}
          >
            <MarkdownContent markdown={markdown} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
