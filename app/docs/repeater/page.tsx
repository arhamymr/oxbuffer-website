"use client";

import Link from "next/link";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { ArrowLeft, RotateCw, Code2, Terminal } from "lucide-react";
import { TextEditor } from "@/components/ui/text-editor";

export default function RepeaterDoc() {
  return (
    <>
      <div className="mt-10">
          <PageBreadcrumb current="Repeater & Scripting" />
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 mt-10 mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" /> Back to docs
          </Link>

          <h1 className="text-4xl font-normal mb-3">Repeater & Scripting</h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            Manually craft HTTP requests, connect to live WebSockets, and run 
            custom sandboxed JavaScript Pre-Request and Test/Assertion scripts.
          </p>

          {/* HTTP Replay */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <RotateCw className="size-5 text-muted-foreground" />
              Manual Replay & Crafting
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Repeater is designed for tweaking individual requests and checking response behaviors. 
              Edit paths, headers, query variables, or raw payloads in a clean layout and execute the Send operation immediately.
            </p>
          </section>

          {/* Scripting Engine */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Code2 className="size-5 text-muted-foreground" />
              JavaScript Scripting Sandbox
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Write custom JavaScript code to execute before dispatching a request or upon receiving its response:
            </p>
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-2.5 font-medium text-muted-foreground">Script Type</th>
                    <th className="px-4 py-2.5 font-medium text-muted-foreground">Execution Point</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Pre-Request Script", "Runs in sandbox. Set dynamic variables (e.g. CSRF tokens), timestamps, or compute signatures to inject in headers."],
                    ["Test / Assertion Script", "Runs upon response arrival. Inspect status codes, headers, and body syntax using the expect library and propagate variables."],
                  ].map(([col, desc]) => (
                    <tr key={col} className="border-b border-border last:border-0">
                      <td className="px-4 py-2.5 font-medium">{col}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Environment Variables */}
          <section className="mb-16">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Terminal className="size-5 text-muted-foreground" />
              Environment Variables Integration
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Use the global `script` namespace to communicate with the environment:
            </p>
            <div className="rounded-lg border border-border overflow-hidden mt-4" style={{ height: 120 }}>
              <TextEditor
                value={`// Get, set, and delete variables
const token = script.environment.get("token");
script.environment.set("token", "new_value");
script.environment.unset("temp");`}
                options={{ readOnly: true }}
                height={120}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Reference variables in URL fields, Headers, or request Bodies using the double curly-brace syntax {"`{{variableName}}`"}.
              For a detailed guide on sandbox APIs, JavaScript helpers, and step-by-step token chaining, check out the <Link href="/docs/repeater-scripts" className="text-primary hover:underline font-medium">Repeater Scripting Engine Guide</Link>.
            </p>
          </section>
        </div>
      </>
  );
}
