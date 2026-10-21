import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { getBySlug } from "@/lib/artworks";

const LIST_KEY = "print-interest";
const LOCK_KEY = "print-interest:lock";
const LIMIT = 400;

export type PrintRequest = {
  email: string;
  slug: string;
  title: string;
  at: number;
};

function redisEnv() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

async function redis(command: (string | number)[]) {
  const env = redisEnv();
  if (!env) throw new Error("Redis is not configured.");
  const response = await fetch(env.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Redis returned ${response.status}.`);
  const payload = (await response.json()) as { result?: unknown; error?: string };
  if (payload.error) throw new Error(payload.error);
  return payload.result;
}

function listFile() {
  return path.join(process.cwd(), ".data", "print-interest.json");
}

function parseList(raw: unknown): PrintRequest[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((row) => {
    if (!row || typeof row !== "object") return [];
    const email = (row as { email?: unknown }).email;
    const slug = (row as { slug?: unknown }).slug;
    const title = (row as { title?: unknown }).title;
    const at = (row as { at?: unknown }).at;
    if (typeof email !== "string" || typeof slug !== "string" || typeof title !== "string") return [];
    if (typeof at !== "number") return [];
    return [{ email, slug, title, at }];
  });
}

async function readFileList() {
  try {
    return parseList(JSON.parse(await readFile(listFile(), "utf8")) as unknown);
  } catch {
    return [];
  }
}

async function writeFileList(rows: PrintRequest[]) {
  const file = listFile();
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(rows));
}

let fileQueue = Promise.resolve();

function enqueueFile<T>(job: () => Promise<T>) {
  const run = fileQueue.then(job, job);
  fileQueue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

export function acceptPrintRequest(body: unknown, at: number): PrintRequest | string {
  if (!body || typeof body !== "object") return "That request could not be read.";
  const record = body as { email?: unknown; slug?: unknown; company?: unknown };
  if (typeof record.company === "string" && record.company.trim()) {
    return { email: "", slug: "", title: "", at };
  }
  if (typeof record.slug !== "string") return "That drawing is not on the wall.";
  const artwork = getBySlug(record.slug);
  if (!artwork) return "That drawing is not on the wall.";
  if (typeof record.email !== "string") return "Add an email address.";
  const email = record.email.trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "That address could not be read.";
  }
  return { email, slug: artwork.slug, title: artwork.title, at };
}

function remember(rows: PrintRequest[], request: PrintRequest) {
  if (!request.email) return rows;
  const without = rows.filter(
    (row) => !(row.email === request.email && row.slug === request.slug),
  );
  return without.concat(request).slice(-LIMIT);
}

async function updateRedis(request: PrintRequest) {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const locked = await redis(["SET", LOCK_KEY, "1", "NX", "PX", 4000]);
    if (locked !== "OK") {
      await new Promise((resolve) => setTimeout(resolve, 80 * (attempt + 1)));
      continue;
    }
    try {
      const raw = await redis(["GET", LIST_KEY]);
      const rows = typeof raw === "string" ? parseList(JSON.parse(raw) as unknown) : [];
      const next = remember(rows, request);
      await redis(["SET", LIST_KEY, JSON.stringify(next)]);
      return;
    } finally {
      await redis(["DEL", LOCK_KEY]).catch(() => undefined);
    }
  }
  throw new Error("The list is busy.");
}

export function printsAreOpen() {
  return redisEnv() !== null || process.env.NODE_ENV !== "production";
}

export async function recordPrintRequest(request: PrintRequest) {
  if (!request.email) return;
  if (redisEnv()) {
    await updateRedis(request);
    return;
  }
  if (process.env.NODE_ENV === "production") {
    throw new Error("The list is not connected.");
  }
  await enqueueFile(async () => {
    await writeFileList(remember(await readFileList(), request));
  });
}

export async function readPrintRequests() {
  if (redisEnv()) {
    const raw = await redis(["GET", LIST_KEY]);
    const rows = typeof raw === "string" ? parseList(JSON.parse(raw) as unknown) : [];
    return rows.sort((a, b) => b.at - a.at);
  }
  if (process.env.NODE_ENV === "production") return [];
  return (await readFileList()).sort((a, b) => b.at - a.at);
}

export async function allowBurst(name: string, ip: string, max: number) {
  if (!redisEnv()) return true;
  try {
    const hour = new Date().toISOString().slice(0, 13);
    const key = `${name}:rate:${hour}:${ip.slice(0, 80)}`;
    const count = Number(await redis(["INCR", key]));
    if (count === 1) await redis(["EXPIRE", key, 3600]);
    return Number.isFinite(count) && count <= max;
  } catch {
    return true;
  }
}

export async function notePrintArrival(ip: string) {
  return allowBurst("print-interest", ip, 8);
}
