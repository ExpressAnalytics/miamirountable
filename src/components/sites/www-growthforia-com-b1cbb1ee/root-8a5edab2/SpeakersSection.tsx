import { speakers } from "@/lib/growthforia/content";

export function SpeakersSection() {
  return (
    <section id="speakers" className="bg-[#0b0c0e] py-20 md:py-[80px]">
      <div className="gf-container">
        <h2 className="text-center text-[40px] leading-[1.1] font-medium md:text-[48px] md:leading-[52.8px]">
          The <span className="gf-italic">Moderators</span>
        </h2>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {speakers.map((speaker) => (
            <article
              key={speaker.name}
              className="group relative h-[400px] w-full max-w-[340px] overflow-hidden rounded-[20px] bg-gf-lime"
            >
              <img
                src={speaker.image}
                alt={speaker.name}
                className="absolute inset-0 h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl bg-[#0b0c0e] px-4 py-3">
                <div className="min-w-0">
                  <h3 className="text-[18px] leading-tight font-medium text-white md:text-[20px]">
                    {speaker.name}
                  </h3>
                  <p className="mt-1 text-[11px] leading-snug tracking-[0.04em] text-gf-lime uppercase">
                    {speaker.role}
                  </p>
                  <a
                    href={`mailto:${speaker.email}`}
                    className="mt-1 block truncate text-[12px] text-white/70 underline-offset-2 transition-colors duration-200 hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gf-lime"
                  >
                    {speaker.email}
                  </a>
                </div>
                <a
                  href={speaker.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${speaker.name} on LinkedIn`}
                  className="grid size-11 shrink-0 cursor-pointer place-items-center text-[16px] font-semibold text-white transition-colors duration-200 hover:text-gf-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gf-lime"
                >
                  in
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
