import type { Metadata } from "next";
import { cookies } from "next/headers";
import { closeStudio } from "@/app/studio/actions";
import { StudioGate } from "@/components/StudioGate";
import { readPrintRequests } from "@/lib/print-interest";
import { sessionValid, studioConfigured, studioCookie } from "@/lib/studio-gate";

export const instant = false;

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

function when(at: number) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/New_York",
  }).format(new Date(at));
}

export default async function StudioPage() {
  const jar = await cookies();

  return (
    <article className="mx-auto w-full max-w-6xl py-10">
      <h1 className="font-display text-5xl leading-[0.9] tracking-[-0.03em]">Studio</h1>
      {studioConfigured() ? (
        sessionValid(jar.get(studioCookie.name)?.value) ? (
          <StudioList />
        ) : (
          <>
            <p className="mt-6 max-w-[36ch] font-sans text-sm leading-relaxed">
              The print requests are behind this gate.
            </p>
            <StudioGate />
          </>
        )
      ) : (
        <p className="mt-6 max-w-[36ch] font-sans text-sm leading-relaxed">
          The gate is not connected yet.
        </p>
      )}
    </article>
  );
}

async function StudioList() {
  let rows: Awaited<ReturnType<typeof readPrintRequests>> = [];
  let failed = false;
  try {
    rows = await readPrintRequests();
  } catch {
    failed = true;
  }

  return (
    <>
      <form action={closeStudio} className="mt-6">
        <button
          type="submit"
          className="font-mono text-[11px] uppercase tracking-[0.14em] underline"
        >
          Close the studio
        </button>
      </form>
      <h2 className="mt-10 font-mono text-[11px] uppercase tracking-[0.16em]">
        Print requests
      </h2>
      {failed ? (
        <p className="mt-4 font-sans text-sm">The list could not be read.</p>
      ) : rows.length === 0 ? (
        <p className="mt-4 font-sans text-sm">No one has asked yet.</p>
      ) : (
        <ul className="mt-4 max-w-xl">
          {rows.map((row) => (
            <li key={`${row.slug}-${row.email}-${row.at}`} className="border-t border-ink py-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em]">{row.title}</p>
              <p className="mt-1 font-sans text-sm">{row.email}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/55">
                {when(row.at)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
