import { Eye, Edit, Zap, Globe, Brain, FileText, Wrench, Hexagon, Bot, Sparkles, LoaderPinwheel, Astroid, Box, RotateCw, PauseCircle } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Watch Live Traffic",
    description: "See every HTTP request and response in real time. Filter by URL, method, status, or custom tags.",
  },
  {
    icon: PauseCircle,
    title: "Intercept & Tamper",
    description: "Pause traffic mid-flight. Edit raw HTTP before it reaches the server — or drop it entirely.",
  },
  {
    icon: RotateCw,
    title: "Repeat & Craft Requests",
    description: "Compose HTTP requests from scratch and send them to any endpoint.",
  },
  {
    icon: Hexagon,
    title: "Automate Request",
    description: "Run high-speed brute force and fuzzing campaigns with marked payload positions.",
  },
  {
    icon: Globe,
    title: "Automate Browser",
    description: "Let AI drive a browser to crawl target websites on your behalf.",
  },
  {
    icon: FileText,
    title: "Build Recon Reports",
    description: "Document findings as you work. Create structured reports with markdown sections.",
  },
  {
    icon: Box,
    title: "Utility Toolkit",
    description: "Encoder/decoder, hash generators, subdomain enumeration, port scanning, and more.",
  },
  {
    icon: LoaderPinwheel,
    title: "Automate Workflows",
    description: "Chain tools together into automated pipelines. Schedule scans, trigger alerts, and let 0xbuffer handle the repetitive work.",
  },
  {
    icon: Astroid,
    title: "AI Assistant",
    description: "Get contextual suggestions, payload ideas, and guided remediation steps powered by an AI security analyst.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 border-t border-border">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-normal mb-3">What Can You Do?</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Modern web security testing is fragmented. 0xbuffer brings it all into one workspace.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group flex gap-4 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-border hover:bg-card/70"
            >
              <div className="size-10 shrink-0 rounded-md border border-border bg-muted flex items-center justify-center mt-0.5">
                <feature.icon className="size-5 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <h3 className="font-medium text-foreground mb-0.5 flex items-center gap-2">
                  {feature.title}
                  {feature.soon && (
                    <span className="text-[10px] border border-border font-medium uppercase tracking-wider text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                      Soon
                    </span>
                  )}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}