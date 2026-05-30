import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Shield, Users, Zap, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About — 0xbuffer",
  description: "Learn about the team and mission behind 0xbuffer.",
};

const values = [
  {
    icon: Shield,
    title: "Security First",
    description: "We believe powerful tools should be accessible to the defenders who need them most.",
  },
  {
    icon: Zap,
    title: "All-in-One",
    description: "No tool sprawl. Everything you need for web application security testing, in one place.",
  },
  {
    icon: Target,
    title: "Precision",
    description: "Every feature is designed with real-world testing workflows in mind.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Built for penetration testers, bug bounty hunters, and security researchers, by people who live this work.",
  },
];

export default function About() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16 pb-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <section className="text-center mb-16">
            <h1 className="text-4xl font-normal mb-4">About 0xbuffer</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              0xbuffer is a desktop application that puts a complete security testing toolkit at your fingertips.
              We combine traffic interception, request crafting, automated attacks, AI-driven reconnaissance,
              and professional report building into one seamless experience.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-6 mb-16">
            {values.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <CardContent className="pt-6">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <CardTitle className="mb-2">{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="text-center bg-muted/30 rounded-xl p-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              0xBuffer is getting better and better day after day and we are happy to share our results with you.
              We are committed to building the definitive workstation for web application security testing —
              open, powerful, and constantly improving.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
