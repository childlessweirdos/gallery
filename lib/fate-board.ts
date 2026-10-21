export type FatePath = "ascend" | "descend";

export type FateGame = {
  total: number;
  path: FatePath;
  fated: number;
};

export type FateScore = {
  name: string;
  sum: number;
  loss: boolean;
  negatives: number;
  games: FateGame[];
  at: number;
};

const BOARD_SIZE = 40;
export const BOARD_VISIBLE = 12;

export function compareFates(a: FateScore, b: FateScore) {
  if (a.loss !== b.loss) return a.loss ? 1 : -1;
  if (a.negatives !== b.negatives) return a.negatives - b.negatives;
  const distance = Math.abs(a.sum) - Math.abs(b.sum);
  if (distance !== 0) return distance;
  return a.at - b.at;
}

export function visibleBoard(rows: FateScore[]) {
  return rows.slice().sort(compareFates).slice(0, BOARD_VISIBLE);
}

function fatedFor(total: number, path: FatePath) {
  return path === "ascend" ? 350 - total : total - 100;
}

export function acceptRun(body: unknown, at: number): FateScore | string {
  if (!body || typeof body !== "object") return "That run could not be read.";
  const record = body as { name?: unknown; games?: unknown };
  if (typeof record.name !== "string") return "Add a name.";
  const name = record.name.trim().replace(/\s+/g, " ").slice(0, 24);
  if (!name || /[\u0000-\u001f]/.test(name)) return "Add a name.";
  if (!Array.isArray(record.games) || record.games.length !== 6) {
    return "A finished run is six games.";
  }

  const games: FateGame[] = [];
  for (const game of record.games) {
    if (!game || typeof game !== "object") return "A game in this run is missing.";
    const total = (game as { total?: unknown }).total;
    const path = (game as { path?: unknown }).path;
    if (typeof total !== "number" || !Number.isInteger(total) || total < 0 || total > 800) {
      return "A game total is outside the table.";
    }
    if (path !== "ascend" && path !== "descend") return "A path is missing.";
    games.push({ total, path, fated: fatedFor(total, path) });
  }

  const negatives = games.filter((game) => game.fated < 0).length;
  return {
    name,
    sum: games.reduce((total, game) => total + game.fated, 0),
    loss: negatives > 0,
    negatives,
    games,
    at,
  };
}

export function rememberRun(rows: FateScore[], run: FateScore) {
  const signature = runSignature(run);
  const duplicate = rows.some(
    (row) => runSignature(row) === signature && Math.abs(row.at - run.at) < 20_000,
  );
  const next = duplicate ? rows.slice() : rows.concat(run);
  return next.sort(compareFates).slice(0, BOARD_SIZE);
}

function runSignature(row: FateScore) {
  return `${row.name}\n${row.games.map((game) => `${game.path}:${game.total}`).join(",")}`;
}

export function readStoredBoard(raw: unknown): FateScore[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((row) => {
    const accepted = acceptRun(row, 0);
    if (typeof accepted === "string") return [];
    const at = row && typeof row === "object" && typeof (row as { at?: unknown }).at === "number"
      ? (row as { at: number }).at
      : accepted.at;
    return [{ ...accepted, at }];
  });
}
