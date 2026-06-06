import type { Metadata } from "next";
import Script from "next/script";
import { CreditCard, ShieldCheck } from "lucide-react";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const checkoutUrl = "https://muhammad-arham-62904.myr.id/pl/0xbuffer-license";
const lightboxUrl = `${checkoutUrl}?iframe=true`;

export const metadata: Metadata = {
  title: "Buy License — 0xbuffer",
  description: "Buy a 0xbuffer license through the official Mayar checkout.",
};

export default function PaymentPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[100vh] px-4 pb-24 pt-16 mt-5">
        <div className="container mx-auto max-w-4xl">
          <PageBreadcrumb current="Buy License" />

          <section className="mb-10 mt-20 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge variant="secondary">0xbuffer License</Badge>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ShieldCheck className="size-3.5" />
                  Secure Mayar checkout
                </span>
              </div>
              <h1 className="mb-3 text-4xl font-normal tracking-tight">Buy License</h1>
              <p className="max-w-2xl text-muted-foreground">
                Complete your 0xbuffer license purchase using the embedded checkout below, or open the
                Mayar payment lightbox with the button.
              </p>
            </div>

            <a
              className={cn(
                "mayar-button iframe-lightbox-link",
                buttonVariants({ size: "lg" }),
                "w-full gap-2 sm:w-auto"
              )}
              href={lightboxUrl}
              data-padding-bottom="30%"
              data-scrolling="true"
            >
              <CreditCard className="size-4" />
              <span>Buy License</span>
            </a>
          </section>

          <section className="overflow-hidden rounded-lg border border-border bg-card">
            <div className="border-b border-border px-4 py-3">
              <h2 className="text-sm font-medium">Checkout</h2>
            </div>
            <div className="h-[760px] min-h-[70vh] bg-background">
              <iframe
                allowFullScreen
                {...{ allowpaymentrequest: "allowpaymentrequest" }}
                scrolling="no"
                frameBorder="0"
                width="100%"
                height="100%"
                src={checkoutUrl}
                data-hide-merchant-logo="true"
                data-hide-product-images="true"
                data-hide-header="true"
                data-hide-badge-secure="true"
                data-hide-language="true"
                data-hide-desc-product="true"
                title="0xbuffer license checkout"
              />
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
      <Script src="https://mayarembed.r2.mayar.id/mayar-new-min.js" strategy="afterInteractive" />
      <Script src="https://mayarembed.r2.mayar.id/mayarEmbed.min.js" strategy="afterInteractive" />
    </>
  );
}
