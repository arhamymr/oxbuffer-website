import { Crosshair, Bug, Microscope, Wrench } from "lucide-react";

const audience = [
  {
    icon: Crosshair,
    title: "Penetration Testers",
    desc: "A complete workstation that replaces a patchwork of tools.",
  },
  {
    icon: Bug,
    title: "Bug Bounty Hunters",
    desc: "Find, verify, and document vulnerabilities faster.",
  },
  {
    icon: Microscope,
    title: "Security Researchers",
    desc: "Deep traffic analysis combined with AI-assisted discovery.",
  },
  {
    icon: Wrench,
    title: "Developers & QA",
    desc: "Debug APIs and test endpoint behavior manually.",
  },
];

export function AudienceSection() {
  return (
    <section id="audience" className="py-24 px-4 border-t border-border">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-normal mb-3">Who Is It For?</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Built for anyone who needs to inspect, test, and document web applications.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {audience.map((item) => (
            <div
              key={item.title}
              className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-border hover:bg-card/70"
            >
              <item.icon className="size-5 text-muted-foreground mb-2" />
              <h3 className="font-medium text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}