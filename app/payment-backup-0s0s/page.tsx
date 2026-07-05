import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PageBreadcrumb } from "@/components/page-breadcrumb";

export const metadata: Metadata = {
  title: "Buy License — hexbuffer",
  description: "Buy a hexbuffer license",
};

export default function PaymentPage() {
  return (
    <>
      <SiteHeader />

      <main className="pt-16 pb-24 px-4 min-h-[100vh] mt-5">
        <div className="container mx-auto max-w-4xl">
          <PageBreadcrumb current="Buy License" />
          <div className="border border-border p-10 rounded-lg">
            <h1 className="mb-3 text-4xl font-normal tracking-tight">Buy License</h1>
            <p className="text-muted-foreground">
              Payments are not available during early access. Licenses will be available for purchase once hexbuffer reaches a stable release.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
