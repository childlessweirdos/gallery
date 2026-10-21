"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { allowBurst } from "@/lib/print-interest";
import { passwordMatches, sessionValue, studioConfigured, studioCookie } from "@/lib/studio-gate";

export async function openStudio(
  _state: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  if (!studioConfigured()) return { error: "The gate is not connected yet." };
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const allowed = await allowBurst("studio", ip, 8);
  if (!allowed) return { error: "The gate is busy. Try again in a little while." };
  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) return { error: "That password did not open the studio." };
  const jar = await cookies();
  jar.set(studioCookie.name, sessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/studio",
    maxAge: studioCookie.maxAge,
  });
  redirect("/studio");
}

export async function closeStudio() {
  const jar = await cookies();
  jar.set(studioCookie.name, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/studio",
    maxAge: 0,
  });
  redirect("/studio");
}
