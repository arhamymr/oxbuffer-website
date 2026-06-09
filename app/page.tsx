import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { DifferenceSection } from "@/components/sections/difference-section";
import { AudienceSection } from "@/components/sections/audience-section";
import { CtaSection } from "@/components/sections/cta-section";
import { OfflineSection } from "@/components/sections/offline-section";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
        <DifferenceSection />
        <AudienceSection />
        <OfflineSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
