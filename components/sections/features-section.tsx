import { Eye, Edit, Zap, Wifi, Bot, Brain, FileText, Wrench, Hexagon } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Watch Live Traffic",
    description: "See every HTTP request and response in real time. Filter by URL, method, status, or custom tags.",
  },
  {
    icon: Edit,
    title: "Intercept & Tamper",
    description: "Pause traffic mid-flight. Edit raw HTTP before it reaches the server — or drop it entirely.",
  },
  {
    icon: Zap,
    title: "Repeat & Craft Requests",
    description: "Compose HTTP requests from scratch and send them to any endpoint.",
  },
  {
    icon: Hexagon,
    title: "Automate Attacks",
    description: "Run high-speed brute force and fuzzing campaigns with marked payload positions.",
    soon: true,
  },
  {
    icon: Wifi,
    title: "Sniff Raw Packets",
    description: "Capture raw network traffic. View hex dumps, reconstruct TCP streams.",
    soon: true,
  },
  {
    icon: Bot,
    title: "Automate Browser",
    description: "Let AI drive a browser to crawl target websites on your behalf.",
    soon: true,
  },
  {
    icon: Brain,
    title: "Analyze with AI",
    description: "Review discovered assets against OWASP Top 10 frameworks.",
    soon: true,
  },
  {
    icon: FileText,
    title: "Build Recon Reports",
    description: "Document findings as you work. Create structured reports with markdown sections.",
    soon: true,
  },
  {
    icon: Wrench,
    title: "Utility Toolkit",
    description: "Encoder/decoder, hash generators, subdomain enumeration, port scanning, and more.",
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
              className="group flex gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-border hover:bg-card/70"
            >
              <div className="size-10 shrink-0 rounded-lg bg-muted flex items-center justify-center mt-0.5">
                <feature.icon className="size-5 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <h3 className="font-medium text-foreground mb-0.5 flex items-center gap-2">
                  {feature.title}
                  {feature.soon && (
                    <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
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