'use server'
import { cookies } from "next/headers";

export async function getServerSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (sessionCookie) {
    try {
      const session = JSON.parse(sessionCookie.value);
      if (session.expiresAt > Date.now()) {
        return session;
      }
    } catch (error) {
      console.error("Error parsing session cookie:", error);
    }
  }

  return null;
}