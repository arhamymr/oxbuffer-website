import { Eye, Edit, Zap, Wifi, Bot, Brain, FileText, Wrench, Hexagon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Eye,
    title: "Watch Live Traffic",
    description: "See every HTTP request and response flowing through your device in real time. Filter by URL, method, status, or custom tags."
  },
  {
    icon: Edit,
    title: "Intercept & Tamper",
    description: "Pause web traffic mid-flight. Edit the raw HTTP before it reaches the server — or drop it entirely."
  },
  {
    icon: Zap,
    title: "Repeat & Craft Requests",
    description: "Manually compose HTTP requests from scratch and send them to any endpoint."
  },
  {
    icon: Hexagon,
    title: "Automate Attacks",
    description: "Run high-speed brute force and fuzzing campaigns with marked payload positions."
  },
  {
    icon: Wifi,
    title: "Sniff Raw Packets",
    description: "Capture raw network traffic from Wi-Fi or localhost interfaces. View hex dumps, reconstruct TCP streams."
  },
  {
    icon: Bot,
    title: "Automate Browser",
    description: "Let AI drive a browser to crawl target websites on your behalf."
  },
  {
    icon: Brain,
    title: "Analyze with AI",
    description: "Ask an AI assistant to review your discovered assets against OWASP Top 10 frameworks."
  },
  {
    icon: FileText,
    title: "Build Recon Reports",
    description: "Document your findings as you work. Create structured reports with markdown sections."
  },
  {
    icon: Wrench,
    title: "Utility Toolkit",
    description: "Built-in encoder/decoder, hash generators, subdomain enumeration, port scanning, and more."
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 bg-muted/30 border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-normal mb-4">What Can You Do?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Modern web security testing is fragmented. 0xbuffer brings all of that into one seamless workspace.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Card key={i} className="border-border/50">
              <CardHeader className="flex gap-1 items-center">
                <div className="size-10 rounded-lg bg-accent-dim/10 flex items-center justify-center">
                  <feature.icon className="size-5 text-accent-dim" />
                </div>
                <CardTitle className="text-lg flex items-center gap-2">
                  {feature.title}
                  {i === 3 || i === 4 || i === 5 || i === 6 || i === 7 || i === 8 ? (
                    <Badge variant="outline" className="text-xs border-accent-dim/50 text-accent-dim">Coming Soon</Badge>
                  ) : null}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}