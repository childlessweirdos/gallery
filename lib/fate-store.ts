import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  rememberRun,
  readStoredBoard,
  type FateScore,
} from "@/lib/fate-board";

const BOARD_KEY = "fate:board";
const LOCK_KEY = "fate:lock";

function redisEnv() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

export function boardIsShared() {
  return redisEnv() !== null || process.env.NODE_ENV !== "production";
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

function boardFile() {
  return path.join(process.cwd(), ".data", "fate-board.json");
}

async function readFileBoard() {
  try {
    const raw = await readFile(boardFile(), "utf8");
    return readStoredBoard(JSON.parse(raw) as unknown);
  } catch {
    return [];
  }
}

async function writeFileBoard(rows: FateScore[]) {
  const file = boardFile();
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

async function updateRedis(run: FateScore) {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const locked = await redis(["SET", LOCK_KEY, "1", "NX", "PX", 4000]);
    if (locked !== "OK") {
      await new Promise((resolve) => setTimeout(resolve, 80 * (attempt + 1)));
      continue;
    }
    try {
      const raw = await redis(["GET", BOARD_KEY]);
      const rows = typeof raw === "string" ? readStoredBoard(JSON.parse(raw) as unknown) : [];
      const next = rememberRun(rows, run);
      await redis(["SET", BOARD_KEY, JSON.stringify(next)]);
      return next;
    } finally {
      await redis(["DEL", LOCK_KEY]).catch(() => undefined);
    }
  }
  throw new Error("The board is busy.");
}

export async function readBoard() {
  if (redisEnv()) {
    const raw = await redis(["GET", BOARD_KEY]);
    if (typeof raw !== "string") return [];
    return readStoredBoard(JSON.parse(raw) as unknown);
  }
  if (process.env.NODE_ENV === "production") return [];
  return readFileBoard();
}

export async function recordRun(run: FateScore) {
  if (redisEnv()) return updateRedis(run);
  if (process.env.NODE_ENV === "production") {
    throw new Error("The shared board is not connected yet.");
  }
  return enqueueFile(async () => {
    const next = rememberRun(await readFileBoard(), run);
    await writeFileBoard(next);
    return next;
  });
}

export async function noteArrival(ip: string) {
  if (!redisEnv()) return true;
  const hour = new Date().toISOString().slice(0, 13);
  const key = `fate:rate:${hour}:${ip.slice(0, 80)}`;
  const count = Number(await redis(["INCR", key]));
  if (count === 1) await redis(["EXPIRE", key, 3600]);
  return Number.isFinite(count) && count <= 30;
}
