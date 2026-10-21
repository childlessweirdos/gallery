export function InkMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 24"
      fill="none"
      className={`ink-draw block h-4 ${className}`}
    >
      <path
        fill="#a8493f"
        d="M2 14.5C26 14 38 6.5 64 8c28 1.6 38 9 70 7.2 24-1.4 40-8 64-5.2-8 3.2-22 7.4-46 8.6-32 1.6-44-6.2-72-7.6C50 10 36 16.5 2 16.2Z"
      />
    </svg>
  );
}
