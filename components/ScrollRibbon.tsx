export function ScrollRibbon() {
  return (
    <div className="scroll-ribbon mt-3" aria-hidden="true">
      <iframe
        src="/shan-shui/ribbon.html?v=4"
        title="A generated landscape, slowly unrolling"
        tabIndex={-1}
        scrolling="no"
        className="pointer-events-none block h-14 w-full border-0 md:h-16"
      />
    </div>
  );
}
