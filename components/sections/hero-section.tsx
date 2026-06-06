import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Asterisk } from "lucide-react";
import { TrafficIllustration } from "@/components/traffic-illustration";
import { ShinyText } from "@/components/shiny-text";

export function HeroSection() {
  return (
    <section className="py-16 px-4 mt-10 overflow-hidden">
      <div className="container mx-auto max-w-4xl">
        <div className="rounded-xl relative border border-border h-100 overflow-hidden bg-card p-8 md:p-12">

            <div className="flex items-start flex-col justify-center h-full">
              <div className="mb-3 flex items-center justify-center gap-1 text-green-500 lg:justify-start">
                <Asterisk className="hidden md:block animate-spin size-5 [animation-duration:2s]"/>
                <ShinyText
                  text="Testing, Recon, and Reporting"
                  className="text-sm md:text-md"
                  speed={2}
                  shineColor="#bbf7d0"
                />
              </div>
            
              <h1 className="text-3xl lg:text-4xl !font-normal tracking-tight mb-6">
                From Recon to Report,<br />All in One Place
              </h1>
              <p className="text-md md:text-lg text-muted-foreground max-w-sm mx-auto lg:mx-0 mb-10">
                0xbuffer brings web app recon, testing, and documentation into one focused desktop app.
              </p>
              <Button size="lg" className="gap-2" asChild>
                <Link href="/#features">See Features</Link>
             
              </Button>
            </div>
            <div className="hidden md:block absolute w-[1000px] h-[620px] scale-[0.8] top-0 -right-[480px]">
              <TrafficIllustration />
            </div>
          
        </div>
      </div>
    </section>
  );
}
