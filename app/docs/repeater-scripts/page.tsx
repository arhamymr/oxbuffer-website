"use client";

import Link from "next/link";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { ArrowLeft, Code2, Terminal, Play, CheckCircle } from "lucide-react";
import { TextEditor } from "@/components/ui/text-editor";

const ENV_SNIPPET = `// Get a variable value
const token = script.environment.get("authToken");

// Set/update a variable value
script.environment.set("timestamp", Date.now().toString());

// Check if variable exists
if (script.environment.has("userId")) { ... }

// Delete/remove a variable
script.environment.unset("tempCode");`;

const ASSERT_SNIPPET = `script.test("Status is 200", () => {
  expect(script.response.code).to.equal(200);
});`;

const LOG_SNIPPET = `script.log("Variables loaded successfully");
console.log("Response body structure:", script.response.json());`;

const AUTH_TEST_SNIPPET = `// 1. Confirm success status
script.test("Login request returned 200 OK", () => {
  expect(script.response.code).to.equal(200);
});

// 2. Parse response and save token
script.test("Login response contains session token", () => {
  const data = script.response.json();
  expect(data.token).to.be.ok();
  expect(data.token).to.be.a("string");

  // Store token in the active context environment
  script.environment.set("authToken", data.token);
  script.log("Saved authToken variable successfully!");
});`;

const AUTH_HEADER_SNIPPET = `Authorization: Bearer {{authToken}}`;

const PRE_REQUEST_SNIPPET = `// Generate timestamp and transaction ID values
const timestamp = Date.now().toString();
const txId = "TX-" + Math.floor(Math.random() * 1000000);

// Register variables
script.environment.set("currentTimestamp", timestamp);
script.environment.set("txId", txId);`;

export default function RepeaterScriptsDoc() {
  return (
    <>
      <div className="mt-10">
        <PageBreadcrumb current="Repeater Scripting" />
        <Link
          href="/docs"
          className="inline-flex items-center gap-1.5 mt-10 mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" /> Back to docs
        </Link>

        <h1 className="text-4xl font-normal mb-3">Repeater Scripting Engine</h1>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          Automate security workflows by running custom JavaScript code before
          requests go out (Pre-Request Scripts) and after responses arrive (Test
          / Assertion Scripts).
        </p>

        {/* Script Lifecycle */}
        <section className="mb-16">
          <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
            <Play className="size-5 text-muted-foreground" />
            Script Lifecycle
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Repeater processes request scripts in a linear cycle:
          </p>
          <div className="rounded-lg border border-border bg-card p-5 space-y-3 text-sm text-muted-foreground">
            <p>1. <strong>Pre-Request Script</strong>: Runs first. Calculates signatures, adds timestamp tokens, and registers variables.</p>
            <p>2. <strong>Variable Expansion</strong>: The main request URL, headers, and body are parsed to replace {"`{{variableName}}`"} placeholders with current values.</p>
            <p>3. <strong>HTTP Dispatch</strong>: Sends the HTTP request via the native client transport.</p>
            <p>4. <strong>Test Script</strong>: Evaluates when response arrives. Runs tests, validates payloads, and updates context environment variables for subsequent requests.</p>
          </div>
        </section>

        {/* API Reference */}
        <section className="mb-16">
          <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
            <Code2 className="size-5 text-muted-foreground" />
            Sandbox API Reference
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Both pre-request and test scripts execute in an isolated JavaScript
            runtime with a global <code>script</code> helper:
          </p>

          <h3 className="text-lg font-medium mb-3">Environment Context</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Manage variables in the active environment:
          </p>
          <div className="rounded-lg border border-border overflow-hidden mb-6">
            <TextEditor value={ENV_SNIPPET} options={{ readOnly: true }} height={220} />
          </div>

          <h3 className="text-lg font-medium mb-3">Request Details</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-6">
            <li><code>script.request.url</code> — Request URL string.</li>
            <li><code>script.request.method</code> — HTTP method (e.g. GET, POST).</li>
            <li><code>script.request.headers</code> — Key-value dictionary of headers.</li>
            <li><code>script.request.body</code> — Raw string payload of the request body.</li>
          </ul>

          <h3 className="text-lg font-medium mb-3">Response Details (Test Scripts Only)</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground mb-6">
            <li><code>script.response.code</code> — HTTP status code integer (e.g. 200, 403).</li>
            <li><code>script.response.status</code> — HTTP status description string.</li>
            <li><code>script.response.headers</code> — Key-value dictionary of response headers.</li>
            <li><code>script.response.text()</code> — Returns the raw response body string.</li>
            <li><code>script.response.json()</code> — Parses and returns the response body as JSON.</li>
          </ul>

          <h3 className="text-lg font-medium mb-3">Assertions & Tests</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Run test blocks and assert constraints in test scripts:
          </p>
          <div className="rounded-lg border border-border overflow-hidden mb-6">
            <TextEditor value={ASSERT_SNIPPET} options={{ readOnly: true }} height={80} />
          </div>

          <h3 className="text-lg font-medium mb-3">Logs</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Send debugger logs to the output panel:
          </p>
          <div className="rounded-lg border border-border overflow-hidden mb-6">
            <TextEditor value={LOG_SNIPPET} options={{ readOnly: true }} height={60} />
          </div>

          <h3 className="text-lg font-medium mb-3">Built-in Utilities</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li><code>JSON</code> — Payload parsing and stringifying.</li>
            <li><code>Math</code> — Dynamic randomness and calculations.</li>
            <li><code>Date</code> — Timing and timestamps.</li>
            <li><code>RegExp</code> — Regex matching patterns.</li>
          </ul>
        </section>

        {/* Assertions table */}
        <section className="mb-16">
          <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
            <CheckCircle className="size-5 text-muted-foreground" />
            Assertion Matchers (`expect`)
          </h2>
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-2.5 font-medium text-muted-foreground">Matcher</th>
                  <th className="px-4 py-2.5 font-medium text-muted-foreground">Example</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [".to.equal(value)", "expect(script.response.code).to.equal(200);"],
                  [".to.not.equal(value)", "expect(script.response.code).to.not.equal(500);"],
                  [".to.include(substring)", 'expect(script.response.text()).to.include("Success");'],
                  [".to.be.a(typeString)", 'expect(token).to.be.a("string");'],
                  [".to.be.ok()", "expect(data.id).to.be.ok();"],
                ].map(([matcher, example]) => (
                  <tr key={matcher} className="border-b border-border last:border-0">
                    <td className="px-4 py-2.5 font-mono text-xs font-semibold">{matcher}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* End to End Example */}
        <section className="mb-16">
          <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
            <Terminal className="size-5 text-muted-foreground" />
            Complete Example: Token Chaining Workflow
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            A complete step-by-step flow to authenticate, save a token, and use it in later queries.
          </p>

          <h3 className="text-sm font-semibold mb-2">1. The Auth Request (POST /api/login)</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Configure the login endpoint with raw JSON credentials, then add this code to the <strong>Test / Assertion Script</strong> editor:
          </p>
          <div className="rounded-lg border border-border overflow-hidden mb-6">
            <TextEditor value={AUTH_TEST_SNIPPET} options={{ readOnly: true }} height={240} />
          </div>

          <h3 className="text-sm font-semibold mb-2">2. The Authenticated Query (GET /api/profile)</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Reference the stored token in the Authorization header:
          </p>
          <div className="rounded-lg border border-border overflow-hidden mb-6">
            <TextEditor value={AUTH_HEADER_SNIPPET} options={{ readOnly: true }} height={40} />
          </div>

          <h3 className="text-sm font-semibold mb-2">3. Inject Dynamic Header Signature (Pre-Request Script)</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Calculate and inject timestamp headers before the request fires:
          </p>
          <div className="rounded-lg border border-border overflow-hidden">
            <TextEditor value={PRE_REQUEST_SNIPPET} options={{ readOnly: true }} height={160} />
          </div>
        </section>
      </div>
    </>
  );
}
