import { HERO_POSTER, HERO_VIDEO } from "@/lib/growthforia/content";
import { CheckIcon, SeatsIcon } from "../shared/icons";
import { RequestInviteButton } from "./InviteModal";
import { VideoCover } from "./VideoCover";

function HeroDate({ month, days }: { month: string; days: string[] }) {
  return (
    <p
      className="flex max-w-full items-start gap-1.5 font-display text-[28px] leading-none sm:text-[36px] md:text-[44px] lg:text-[56px]"
      aria-label={`${days.map((day) => `${month} ${day}`).join(" and ")}, 2026`}
    >
      <span
        aria-hidden
        className="grid h-[2em] grid-rows-4 font-bold text-gf-lime"
      >
        <span className="text-[0.5em] leading-none">2</span>
        <span className="text-[0.5em] leading-none">0</span>
        <span className="text-[0.5em] leading-none">2</span>
        <span className="text-[0.5em] leading-none">6</span>
      </span>
      <span className="text-white">
        {days.map((day) => (
          <span key={day} className="block">
            {month} {day}
          </span>
        ))}
      </span>
    </p>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100dvh-11rem)] overflow-hidden bg-[#0b0c0e]">
      <VideoCover
        src={HERO_VIDEO}
        poster={HERO_POSTER}
        eager
        loaderClassName="items-end pb-[22vh] md:pb-16"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-transparent to-black/25" />

      <div
        className="gf-container relative z-10 grid w-full min-w-0 grid-cols-1 content-center gap-10 pt-28 pb-10 md:min-h-[calc(100dvh-11rem)] md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:pb-8"
        style={{ paddingInline: "max(1.25rem, calc(var(--gf-rail) + 14px))" }}
      >
        <div className="@container min-w-0 text-left">
          <p className="max-w-full text-[11px] leading-snug font-medium tracking-[0.08em] text-white/75 uppercase sm:text-[12px] md:text-[13px] md:tracking-[0.14em]">
            Seattle · Private Executive Dinner · November 2026
          </p>
          <h1
            className="font-display mt-3 max-w-full leading-[1.05] tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(1rem, calc((100cqi - 4px) / 15), 2.5rem)" }}
          >
            <span className="block">16 Leaders. One Table.</span>
            <span className="block text-gf-lime">Candid AI Conversations.</span>
          </h1>
          <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.55] text-white/92 md:text-[18px]">
            A private, off-the-record roundtable for senior Data, AI and
            Marketing leaders, on what it actually takes to move AI from
            ambition to measurable business impact. No vendor slides. No pitch.
          </p>
          <div className="mt-6 flex w-fit flex-col items-stretch">
            <RequestInviteButton className="h-[37px] min-h-[37px] min-w-full px-6 text-[14px]">
              Request an Invitation
            </RequestInviteButton>
            <ul className="mt-3 flex max-w-full flex-col gap-1 text-[13px] text-white/75 sm:flex-row sm:items-center sm:gap-5">
              <li className="flex min-h-11 items-center gap-2">
                <span className="text-gf-lime">
                  <SeatsIcon />
                </span>
                16 seats a night
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
            <HeroDate month="Nov" days={["9th", "10th"]} />
          </div>
        </div>
      </div>
    </section>
  );
}
