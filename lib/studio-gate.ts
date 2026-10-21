import { createHmac, timingSafeEqual } from "node:crypto";

const MONTH = 60 * 60 * 24 * 30;

function studioPassword() {
  return process.env["STUDIO_PASSWORD"] ?? "";
}

export function studioConfigured() {
  return studioPassword().length >= 8;
}

function sign(exp: number) {
  return createHmac("sha256", studioPassword()).update(String(exp)).digest("base64url");
}

export function sessionValue(now = Date.now()) {
  const exp = now + MONTH * 1000;
  return `${exp}.${sign(exp)}`;
}

export function sessionValid(value: string | undefined, now = Date.now()) {
  if (!value || !studioConfigured()) return false;
  const [expRaw, mac] = value.split(".");
  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || !mac || exp < now) return false;
  const expected = sign(exp);
  const left = Buffer.from(mac);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function passwordMatches(input: string) {
  const expected = studioPassword();
  const left = Buffer.from(input);
  const right = Buffer.from(expected);
  if (left.length !== right.length) {
    timingSafeEqual(right, right);
    return false;
  }
  return timingSafeEqual(left, right);
}

export const studioCookie = {
  name: "studio",
  maxAge: MONTH,
};
