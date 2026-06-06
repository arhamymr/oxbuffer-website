"use server";

import { redirect } from "next/navigation";
import {
  getAdminApiKey,
  setAdminApiKey,
  clearAdminApiKey,
  verifyAdmin,
} from "./auth";
import {
  createLicense as dbCreateLicense,
  revokeLicenseByKey,
} from "./db";

async function requireAuth(): Promise<string> {
  const apiKey = await getAdminApiKey();
  if (!apiKey || !verifyAdmin(apiKey)) redirect("/admin/login");
  return apiKey;
}

export type LoginResult =
  | { success: true }
  | { success: false; error: string };

export async function login(
  _prev: LoginResult | null,
  formData: FormData
): Promise<LoginResult> {
  const apiKey = String(formData.get("apiKey") ?? "").trim();

  if (!apiKey) {
    return { success: false, error: "API key is required." };
  }

  if (!verifyAdmin(apiKey)) {
    return { success: false, error: "Invalid API key. Access denied." };
  }

  await setAdminApiKey(apiKey);
  redirect("/admin");
}

export type GenerateResult =
  | {
      success: true;
      data: {
        key: string;
        email: string | null;
        plan: string;
        maxDevices: number;
      };
    }
  | { success: false; error: string };

export async function generateLicense(
  _prev: GenerateResult | null,
  formData: FormData
): Promise<GenerateResult> {
  await requireAuth();

  const email = String(formData.get("email") ?? "").trim() || undefined;
  const plan = String(formData.get("plan") ?? "lifetime");
  const maxDevices = Number(formData.get("maxDevices") ?? 1);

  try {
    const result = await dbCreateLicense({ email, plan, maxDevices });
    return {
      success: true,
      data: {
        key: result.key,
        email: result.email ?? null,
        plan: result.plan,
        maxDevices: result.maxDevices,
      },
    };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "Failed to generate license.",
    };
  }
}

export type RevokeResult =
  | { success: true }
  | { success: false; error: string };

export async function revokeLicenseAction(
  _prev: RevokeResult | null,
  key: string
): Promise<RevokeResult> {
  await requireAuth();

  try {
    await revokeLicenseByKey(key);
    return { success: true };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "Failed to revoke license.",
    };
  }
}

export async function logout(): Promise<void> {
  await clearAdminApiKey();
  redirect("/admin/login");
}
