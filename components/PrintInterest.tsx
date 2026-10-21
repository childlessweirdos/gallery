"use client";

import { useState } from "react";

export function PrintInterest({
  slug,
  title,
  idSuffix = "",
}: {
  slug: string;
  title: string;
  idSuffix?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/prints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          email: String(data.get("email") ?? ""),
          company: String(data.get("company") ?? ""),
        }),
      });
      const body = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setStatus("idle");
        setError(body.error || "That request could not be kept.");
        return;
      }
      setStatus("done");
    } catch {
      setStatus("idle");
      setError("That request could not be kept.");
    }
  }

  if (status === "done") {
    return (
      <p className="mt-4 border-t border-ink pt-3 font-sans text-sm leading-relaxed">
        Noted. If a print of {title} is made, that address is the one to write.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 border-t border-ink pt-3">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em]">Print</p>
      <p className="mt-2 max-w-[46ch] font-sans text-sm leading-relaxed">
        A print of this drawing is not offered. Leave an address if you want to be told, should one ever be made.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <label htmlFor={`print-email-${slug}${idSuffix}`} className="sr-only">
          Email address
        </label>
        <input
          id={`print-email-${slug}${idSuffix}`}
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          placeholder="Email address"
          className="min-w-0 flex-1 border border-ink bg-transparent px-3 py-2 font-sans text-sm outline-none placeholder:text-ink/40"
        />
        <input
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
          defaultValue=""
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="border border-ink px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] hover:bg-ink hover:text-paper disabled:opacity-50"
        >
          {status === "sending" ? "Sending" : "Ask to be told"}
        </button>
      </div>
      {error ? <p className="mt-2 font-sans text-sm text-vermilion">{error}</p> : null}
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/55">
        Kept only to write if a print is made.
      </p>
    </form>
  );
}
