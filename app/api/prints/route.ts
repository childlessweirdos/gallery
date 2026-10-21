import { headers } from "next/headers";
import { acceptPrintRequest, notePrintArrival, printsAreOpen, recordPrintRequest } from "@/lib/print-interest";

function json(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  await headers();
  if (!printsAreOpen()) {
    return json({ error: "That request could not be kept." }, 503);
  }

  const text = await request.text();
  if (text.length > 2000) return json({ error: "That request could not be read." }, 400);
  let body: unknown;
  try {
    body = JSON.parse(text) as unknown;
  } catch {
    return json({ error: "That request could not be read." }, 400);
  }

  const entry = acceptPrintRequest(body, Date.now());
  if (typeof entry === "string") return json({ error: entry }, 400);

  try {
    const headerList = await headers();
    const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    const allowed = await notePrintArrival(ip);
    if (!allowed) {
      return json({ error: "The list is busy. Try again in a little while." }, 429);
    }
    await recordPrintRequest(entry);
    return json({ ok: true });
  } catch {
    return json({ error: "That request could not be kept." }, 500);
  }
}
