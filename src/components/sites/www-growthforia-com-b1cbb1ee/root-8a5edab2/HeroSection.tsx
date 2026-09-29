import { CheckIcon, SeatsIcon } from "../shared/icons";
import { HeroVideo } from "./HeroVideo";
import { LimeCta } from "./LimeCta";

function HeroDate({ month, day }: { month: string; day: string }) {
  return (
    <p className="flex max-w-full items-start gap-1.5 font-display text-[28px] leading-none sm:text-[36px] md:text-[44px] lg:text-[56px]">
      <span
        aria-label="2026"
        className="grid h-[2em] grid-rows-4 font-bold text-gf-lime"
      >
        <span aria-hidden className="text-[0.5em] leading-none">
          2
        </span>
        <span aria-hidden className="text-[0.5em] leading-none">
          0
        </span>
        <span aria-hidden className="text-[0.5em] leading-none">
          2
        </span>
        <span aria-hidden className="text-[0.5em] leading-none">
          6
        </span>
      </span>
      <span className="text-white">
        <span className="block">{month}</span>
        <span className="block">{day}</span>
      </span>
    </p>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100dvh-11rem)] overflow-hidden bg-[#0b0c0e]">
      <HeroVideo />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-transparent to-black/25" />

      <div
        className="gf-container relative z-10 grid w-full min-w-0 grid-cols-1 content-center gap-10 pt-28 pb-10 md:min-h-[calc(100dvh-11rem)] md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:pb-8"
        style={{ paddingInline: "max(1.25rem, calc(var(--gf-rail) + 14px))" }}
      >
        <div className="min-w-0">
          <p className="text-[12px] font-medium tracking-[0.14em] text-white/80 uppercase md:text-[13px]">
            Miami · Private Executive Dinner · October 2026
          </p>
          <h1 className="font-display mt-4 max-w-full whitespace-nowrap text-[clamp(0.65rem,2.15vw,2.35rem)] leading-[1.05] tracking-[-0.03em] text-white">
            12 Leaders. One Table.{" "}<br />
            <span className="text-gf-lime">Candid AI Conversations.</span>
          </h1>
          <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.55] text-white/92 md:text-[18px]">
            A private, off-the-record roundtable for senior Data, AI and
            Marketing leaders, on what it actually takes to move AI from
            ambition to measurable business impact. No vendor slides. No pitch.
          </p>
          {/* <div className="mt-5 max-w-[48ch] text-[14px] leading-[1.5] text-white/80 md:text-[15px]">
            <p className="font-medium text-white">COTE Miami: Private Gold Room</p>
            <p>America&apos;s first and only Michelin-starred Korean Steakhouse</p>
            <p className="mt-1">
              6:30 – 9:00 PM · Networking, moderated roundtable & dinner
            </p>
          </div> */}
          <div className="mt-6 flex w-fit flex-col items-stretch">
            <LimeCta
              href="#cta"
              className="h-[37px] min-h-[37px] min-w-full px-6 text-[14px]"
            >
              Request an Invitation
            </LimeCta>
            <ul className="mt-3 flex max-w-full flex-col gap-1 text-[13px] text-white/75 sm:flex-row sm:items-center sm:gap-5">
              <li className="flex min-h-11 items-center gap-2">
                <span className="text-gf-lime">
                  <SeatsIcon />
                </span>
                12 seats per evening
              </li>
              <li className="flex min-h-11 items-center gap-2">
                <span className="text-gf-lime">
                  <CheckIcon />
                </span>
                Reviewed for fit
              </li>
            </ul>
          </div>
        </div>

        <div className="flex min-w-0 items-end justify-end md:self-end">
          <div className="flex max-w-full flex-col items-end gap-6 md:gap-8">
            <HeroDate month="Oct" day="14th" />
          </div>
        </div>
      </div>
    </section>
  );
}

