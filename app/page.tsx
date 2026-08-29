import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroSection } from "@/components/sections/hero-section";
import { AppShowcaseSection } from "@/components/sections/app-showcase-section";
import { AudienceSection } from "@/components/sections/audience-section";
import { CtaSection } from "@/components/sections/cta-section";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <AppShowcaseSection />
        <AudienceSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}

