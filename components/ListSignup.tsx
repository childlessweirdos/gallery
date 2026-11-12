import { site } from "@/content/site";

export function ListSignup({ className = "" }: { className?: string }) {
  return (
    <form
      action="https://buttondown.com/api/emails/embed-subscribe/childlessweirdos"
      method="post"
      className={`max-w-md border-t border-ink pt-4 ${className}`}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.14em]">The list</p>
      <p className="mt-2 max-w-[36ch] font-sans text-sm leading-relaxed">
        A note when a new piece is up.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <label htmlFor="list-email" className="sr-only">
          Email address
        </label>
        <input
          id="list-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email address"
          className="min-w-0 flex-1 border border-ink bg-transparent px-3 py-2 font-sans text-sm outline-none placeholder:text-ink/40"
        />
        <input type="hidden" name="embed" value="1" />
        <button
          type="submit"
          className="border border-ink px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] hover:bg-ink hover:text-paper"
        >
          Sign up
        </button>
      </div>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/55">
        <a href={site.list} className="ink-link">
          Buttondown
        </a>{" "}
        sends the confirm.
      </p>
    </form>
  );
}
