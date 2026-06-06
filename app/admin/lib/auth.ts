import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function getAdminApiKey(): Promise<string | null> {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value ?? null;
}

export async function setAdminApiKey(key: string): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, key, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

export async function clearAdminApiKey(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export function verifyAdmin(key: string): boolean {
  return key === process.env.ADMIN_API_KEY;
}
