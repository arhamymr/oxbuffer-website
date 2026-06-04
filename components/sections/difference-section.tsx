import { PulseTriangle } from "@/components/pulse-triangle";

export function DifferenceSection() {
  return (
    <section className="py-24 px-4 bg-muted/30 border-t border-border">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="size-12 rounded-lg bg-accent-dim/10 flex items-center justify-center mx-auto mb-6">
          <PulseTriangle size="large" className="text-accent-dim" />
        </div>
        <h2 className="text-3xl md:text-4xl font-normal mb-4">How Is It Different?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          0xbuffer combines real-time traffic interception, manual request crafting, automated attacks, AI-driven reconnaissance (AI feature currently under development), and professional report building in a single desktop application. No web-based tool sprawl. No juggling five different windows. Just open 0xbuffer and get to work.
        </p>
      </div>
    </section>
  );
}
