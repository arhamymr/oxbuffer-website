import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PulseTriangle } from "@/components/pulse-triangle";

export function HeroSection() {
  return (
    <section className="py-16 px-4 mt-10 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="mb-3 flex items-center justify-center gap-2 text-green-500 lg:justify-start">
              <PulseTriangle />
              <p>
                Security Testing, Recon, and Reporting in One App
              </p>
            </div>
          
            <h1 className="text-4xl md:text-4xl lg:text-5xl !font-normal tracking-tight mb-6">
              From Recon to Report,<br />All in One Place
            </h1>
            <p className="text-md md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10">
              0xbufferr brings web app recon, testing, and documentation into one focused desktop app.
            </p>
            <Button size="lg" className="gap-2" asChild>
              <Link href="/downloads">Download Now</Link>
            </Button>
          </div>
          <div className="hidden md:block relative w-[1000px] h-[570px] border border-border rounded-md overflow-hidden">
            <Image
              src="/assets/image.png"
              alt="0xbufferr Interface"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="dark:hidden"
              priority
            />
            <Image
              src="/assets/image-dark.png"
              alt="0xbufferr Interface"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="hidden dark:block"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
