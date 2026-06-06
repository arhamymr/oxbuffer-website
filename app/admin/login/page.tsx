"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, type LoginResult } from "../lib/actions";

export default function AdminLoginPage() {
  const [state, formAction] = useActionState<LoginResult | null, FormData>(
    login,
    null
  );

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary">
            <KeyRound className="size-5 text-primary-foreground" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-semibold">Admin Access</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter your admin API key to continue.
            </p>
          </div>
        </div>

        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              name="apiKey"
              type="password"
              placeholder="Your admin key..."
              autoComplete="off"
              className="h-10 font-mono"
              required
            />
          </div>

          {state && !state.success && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {state.error}
            </p>
          )}

          <LoginButton />
        </form>
      </div>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="h-10 w-full" disabled={pending}>
      {pending ? "Verifying..." : "Sign in"}
    </Button>
  );
}
