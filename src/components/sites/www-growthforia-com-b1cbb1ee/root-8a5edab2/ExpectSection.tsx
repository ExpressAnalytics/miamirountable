const frames = [
  {
    n: "1",
    title: "Roundtables",
    body: "An evening of networking, a moderated roundtable discussion, and a multi-course dinner. The room is not recorded, keeping every seat off the record for a genuinely candid conversation among peers.",
  },
  {
    n: "3",
    title: "Moderators",
    body: "A panel of three, led by Jorge Sepulveda, Chief Revenue Officer, Express Analytics, steering the discussion, not presenting to it.",
    cta: { href: "#speakers", label: "View Moderators" },
  },
  {
    n: "12",
    title: "In the Room",
    body: "A table of twelve, C-suite, VP and Head-of leaders across Data, Analytics, AI, Digital, Technology and Marketing. Attendance is curated for fit: company, seniority and current priorities.",
  },
];

export function ExpectSection() {
  return (
    <section id="expect" className="bg-[#0b0c0e] py-20 md:py-[80px]">
      <div className="gf-container">
        <h2 className="text-center text-[40px] leading-[1.1] font-medium md:text-[48px] md:leading-[52.8px]">
          What to <span className="gf-italic">Expect</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {frames.map((frame) => (
            <article
              key={frame.title}
              className="relative flex h-full flex-col overflow-hidden rounded-[28px] bg-[#121316] p-7 md:p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_46%_at_94%_108%,rgba(255,0,59,0.42),transparent_68%)]"
              />
              <p className="font-display relative text-[56px] leading-none tracking-[-0.04em] text-white md:text-[64px]">
                {frame.n}
              </p>
              <h3 className="relative mt-4 text-[24px] leading-tight font-medium text-white md:text-[28px]">
                {frame.title}
              </h3>
              <p className="relative mt-3 max-w-[42ch] text-[15px] leading-[1.55] text-white/75 md:text-[16px]">
                {frame.body}
              </p>
              {frame.cta ? (
                <div className="relative mt-auto pt-8">
                  <a
                    href={frame.cta.href}
                    className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center rounded-gf-btn border border-white/20 text-[14px] font-semibold text-white transition-colors duration-200 hover:border-gf-lime hover:text-gf-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gf-lime"
                  >
                    {frame.cta.label}
                  </a>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
