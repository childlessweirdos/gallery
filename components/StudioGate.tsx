"use client";

import { useActionState } from "react";
import { openStudio } from "@/app/studio/actions";

export function StudioGate() {
  const [state, action, pending] = useActionState(openStudio, undefined);

  return (
    <form action={action} className="mt-8 max-w-sm">
      <label htmlFor="studio-password" className="font-mono text-[11px] uppercase tracking-[0.14em]">
        Password
      </label>
      <input
        id="studio-password"
        name="password"
        type="password"
        required
        autoComplete="current-password"
        className="mt-2 w-full border border-ink bg-transparent px-3 py-2 font-sans text-sm outline-none"
      />
      <button
        type="submit"
        disabled={pending}
        className="mt-3 border border-ink px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] hover:bg-ink hover:text-paper disabled:opacity-50"
      >
        {pending ? "Opening" : "Open"}
      </button>
      {state?.error ? <p className="mt-3 font-sans text-sm text-vermilion">{state.error}</p> : null}
    </form>
  );
}
