import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { MarkdownContent } from "@/lib/markdown";

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
      <main className="min-h-[100vh] px-4 pb-24 pt-16 mt-5">
        <div className="container mx-auto max-w-4xl">
          <PageBreadcrumb current="Privacy Policy" />
          <div className="rounded-xl border border-border bg-card p-6 sm:p-10">
            <MarkdownContent markdown={markdown} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
