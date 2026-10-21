import { headers } from "next/headers";
import { acceptRun, visibleBoard } from "@/lib/fate-board";
import { boardIsShared, noteArrival, readBoard, recordRun } from "@/lib/fate-store";

function json(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function GET() {
  await headers();
  if (!boardIsShared()) return json({ shared: false, rows: [] });
  try {
    const rows = visibleBoard(await readBoard());
    return json({ shared: true, rows });
  } catch {
    return json({ shared: false, rows: [] });
  }
}

export async function POST(request: Request) {
  await headers();
  if (!boardIsShared()) {
    return json({ shared: false, error: "The shared board is not connected yet." }, 503);
  }

  const text = await request.text();
  if (text.length > 4000) return json({ error: "That run could not be read." }, 400);
  let body: unknown;
  try {
    body = JSON.parse(text) as unknown;
  } catch {
    return json({ error: "That run could not be read." }, 400);
  }

  const run = acceptRun(body, Date.now());
  if (typeof run === "string") return json({ error: run }, 400);

  try {
    const headerList = await headers();
    const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    const allowed = await noteArrival(ip);
    if (!allowed) return json({ error: "The board is busy. Try again in a little while." }, 429);
    const rows = visibleBoard(await recordRun(run));
    return json({ shared: true, rows });
  } catch {
    return json({ error: "The board could not be saved." }, 500);
  }
}
