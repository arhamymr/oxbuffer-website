import { db } from "@/db";
import { licenses, activations } from "@/db/schema";
import { eq, desc, sql, count } from "drizzle-orm";

export interface LicenseWithActivations {
  id: string;
  key: string;
  email: string | null;
  plan: string;
  maxDevices: number;
  status: string;
  activationCount: number;
  createdAt: Date;
}

export interface DashboardStats {
  totalLicenses: number;
  activeLicenses: number;
  revokedLicenses: number;
  totalActivations: number;
}

function generateLicenseKey(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const segments: string[] = [];
  for (let s = 0; s < 4; s++) {
    let segment = "";
    for (let i = 0; i < 5; i++) {
      segment += chars[Math.floor(Math.random() * chars.length)];
    }
    segments.push(segment);
  }
  return `0XB-${segments.join("-")}`;
}

export async function getAllLicenses(): Promise<LicenseWithActivations[]> {
  const result = await db
    .select({
      id: licenses.id,
      key: licenses.key,
      email: licenses.email,
      plan: licenses.plan,
      maxDevices: licenses.maxDevices,
      status: licenses.status,
      createdAt: licenses.createdAt,
      activationCount: count(activations.id),
    })
    .from(licenses)
    .leftJoin(activations, eq(licenses.id, activations.licenseId))
    .groupBy(licenses.id)
    .orderBy(desc(licenses.createdAt));

  return result;
}

export async function getLicenseByKey(
  key: string
): Promise<LicenseWithActivations | null> {
  const result = await db
    .select({
      id: licenses.id,
      key: licenses.key,
      email: licenses.email,
      plan: licenses.plan,
      maxDevices: licenses.maxDevices,
      status: licenses.status,
      createdAt: licenses.createdAt,
      activationCount: count(activations.id),
    })
    .from(licenses)
    .leftJoin(activations, eq(licenses.id, activations.licenseId))
    .where(eq(licenses.key, key))
    .groupBy(licenses.id)
    .limit(1);

  return result[0] ?? null;
}

export async function getLicenseById(
  id: string
): Promise<LicenseWithActivations | null> {
  const result = await db
    .select({
      id: licenses.id,
      key: licenses.key,
      email: licenses.email,
      plan: licenses.plan,
      maxDevices: licenses.maxDevices,
      status: licenses.status,
      createdAt: licenses.createdAt,
      activationCount: count(activations.id),
    })
    .from(licenses)
    .leftJoin(activations, eq(licenses.id, activations.licenseId))
    .where(eq(licenses.id, id))
    .groupBy(licenses.id)
    .limit(1);

  return result[0] ?? null;
}

export async function createLicense(params: {
  email?: string;
  plan?: string;
  maxDevices?: number;
}): Promise<LicenseWithActivations> {
  const key = generateLicenseKey();

  const [inserted] = await db
    .insert(licenses)
    .values({
      key,
      email: params.email || null,
      plan: params.plan || "lifetime",
      maxDevices: params.maxDevices || 3,
    })
    .returning();

  return {
    ...inserted,
    activationCount: 0,
  };
}

export async function revokeLicenseByKey(
  key: string
): Promise<{ revoked: boolean }> {
  await db
    .update(licenses)
    .set({ status: "revoked" })
    .where(eq(licenses.key, key));

  return { revoked: true };
}

export async function getStats(): Promise<DashboardStats> {
  const [stats] = await db
    .select({
      totalLicenses: sql<number>`count(*)::int`,
      activeLicenses:
        sql<number>`count(*) filter (where ${licenses.status} = 'active')::int`,
      revokedLicenses:
        sql<number>`count(*) filter (where ${licenses.status} = 'revoked')::int`,
    })
    .from(licenses);

  const [{ totalActivations }] = await db
    .select({ totalActivations: sql<number>`count(*)::int` })
    .from(activations);

  return {
    totalLicenses: stats?.totalLicenses ?? 0,
    activeLicenses: stats?.activeLicenses ?? 0,
    revokedLicenses: stats?.revokedLicenses ?? 0,
    totalActivations: totalActivations ?? 0,
  };
}

export async function getRecentLicenses(
  limit = 10
): Promise<LicenseWithActivations[]> {
  const result = await db
    .select({
      id: licenses.id,
      key: licenses.key,
      email: licenses.email,
      plan: licenses.plan,
      maxDevices: licenses.maxDevices,
      status: licenses.status,
      createdAt: licenses.createdAt,
      activationCount: count(activations.id),
    })
    .from(licenses)
    .leftJoin(activations, eq(licenses.id, activations.licenseId))
    .groupBy(licenses.id)
    .orderBy(desc(licenses.createdAt))
    .limit(limit);

  return result;
}
