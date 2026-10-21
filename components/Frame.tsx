import type { ReactNode } from "react";

type FrameProps = {
  children: ReactNode;
  className?: string;
};

export function Frame({ children, className = "" }: FrameProps) {
  return (
    <div className={`inline-block max-w-full bg-ink p-2 sm:p-2.5 ${className}`}>
      <div className="bg-[#fbfaf6] p-3 sm:p-5">{children}</div>
    </div>
  );
}
