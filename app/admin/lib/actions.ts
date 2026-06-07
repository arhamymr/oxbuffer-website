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
  createArticle,
  updateArticle,
  deleteArticle,
  getArticleById,
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

// ---------------------------------------------------------------------------
// Article Actions
// ---------------------------------------------------------------------------

export type ArticleResult =
  | { success: true; id: string }
  | { success: false; error: string };

export async function createArticleAction(
  _prev: ArticleResult | null,
  formData: FormData
): Promise<ArticleResult> {
  await requireAuth();

  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const status = String(formData.get("status") ?? "draft");

  if (!title) return { success: false, error: "Title is required." };
  if (!slug) return { success: false, error: "Slug is required." };
  if (!content) return { success: false, error: "Content is required." };

  try {
    const article = await createArticle({ title, slug, excerpt, content, status });
    return { success: true, id: article.id };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "Failed to create article.",
    };
  }
}

export async function updateArticleAction(
  _prev: ArticleResult | null,
  formData: FormData
): Promise<ArticleResult> {
  await requireAuth();

  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const status = String(formData.get("status") ?? "draft");

  if (!id) return { success: false, error: "Article ID is required." };
  if (!title) return { success: false, error: "Title is required." };
  if (!slug) return { success: false, error: "Slug is required." };
  if (!content) return { success: false, error: "Content is required." };

  try {
    const existing = await getArticleById(id);
    const publishedAt =
      status === "published" && existing?.status !== "published"
        ? new Date()
        : status === "published"
          ? existing?.publishedAt ?? new Date()
          : existing?.publishedAt ?? null;

    await updateArticle(id, { title, slug, excerpt, content, status, publishedAt });
    return { success: true, id };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "Failed to update article.",
    };
  }
}

export type SimpleResult =
  | { success: true }
  | { success: false; error: string };

export async function deleteArticleAction(
  _prev: SimpleResult | null,
  id: string
): Promise<SimpleResult> {
  await requireAuth();

  try {
    await deleteArticle(id);
    return { success: true };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "Failed to delete article.",
    };
  }
}

export async function toggleArticleStatusAction(
  _prev: SimpleResult | null,
  id: string
): Promise<SimpleResult> {
  await requireAuth();

  try {
    const existing = await getArticleById(id);
    if (!existing) return { success: false, error: "Article not found." };

    const newStatus = existing.status === "published" ? "draft" : "published";
    const publishedAt =
      newStatus === "published"
        ? existing.publishedAt ?? new Date()
        : existing.publishedAt;

    await updateArticle(id, { status: newStatus, publishedAt });
    return { success: true };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "Failed to toggle status.",
    };
  }
}
