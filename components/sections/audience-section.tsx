import { Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const audience = [
  { title: "Penetration Testers", desc: "A complete workstation that replaces a patchwork of tools." },
  { title: "Bug Bounty Hunters", desc: "Find, verify, and document vulnerabilities faster." },
  { title: "Security Researchers", desc: "Deep traffic analysis combined with AI-assisted discovery." },
  { title: "Developers & QA", desc: "Debug APIs and test endpoint behavior manually." }
];

export function AudienceSection() {
  return (
    <section id="audience" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-normal mb-4">Who Is It For?</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {audience.map((item, i) => (
            <Card key={i} className="border-border/50">
              <CardHeader>
                <div className="size-10 rounded-lg bg-accent-dim/10 flex items-center justify-center mb-3">
                  <Users className="size-5 text-accent-dim" />
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.desc}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}