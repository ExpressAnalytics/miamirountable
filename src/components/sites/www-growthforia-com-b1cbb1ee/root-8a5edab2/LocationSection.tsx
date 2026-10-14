import { ASSET } from "@/lib/growthforia/content";
import { CheckIcon } from "../shared/icons";

const VENUE_SITE = "https://www.charlotterestaurantseattle.com/private-dining";

export function LocationSection() {
  return (
    <section id="location" className="bg-[#0b0c0e] py-20 md:py-[80px]">
      <div className="gf-container">
        <h2 className="text-center text-[40px] leading-[1.1] font-medium md:text-[48px] md:leading-[52.8px]">
          The <span className="gf-italic">Location</span>
        </h2>

        <div className="relative mt-12 h-[420px] overflow-hidden md:h-[560px]">
          <img
            src={`${ASSET}/images/seattle.webp`}
            alt="Charlotte Restaurant and Lounge on the 16th floor of the Lotte Hotel Seattle"
            width={1600}
            height={900}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[2] bg-[#0b0c0e]/45"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-[#0b0c0e]/80 via-[#0b0c0e]/35 to-transparent"
          />

          <div className="pointer-events-none absolute inset-0 z-[3] flex flex-col justify-end px-6 pb-10 pl-16 md:px-10 md:pr-10 md:pb-14 md:pl-[72px]">
            <p className="text-[12px] font-medium tracking-[0.14em] text-white/70 uppercase md:text-[13px]">
              Venue
            </p>
            <h2 className="font-display mt-4 text-[32px] leading-[1.1] tracking-[-0.03em] text-white md:text-[48px]">
              Charlotte Restaurant &amp; Lounge
            </h2>
            <p className="mt-3 max-w-[36ch] text-[16px] text-white/80 md:text-[18px]">
              Contemporary Pacific Northwest fine dining at the Lotte Hotel Seattle
            </p>
            <p className="mt-4 max-w-[48ch] text-[15px] leading-[1.55] text-white/75 md:text-[16px]">
              809 5th Ave, 16th Floor, Seattle, WA 98104
            </p>
            <ul className="mt-5 space-y-2.5 text-[15px] text-white/90 md:text-[16px]">
              <li className="flex items-center gap-2.5">
                <span className="text-gf-lime">
                  <CheckIcon />
                </span>
                16th floor, panoramic downtown views
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-gf-lime">
                  <CheckIcon />
                </span>
                Sixteen guests each night
              </li>
            </ul>
            {/* <a
              href={VENUE_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto mt-5 inline-flex min-h-11 w-fit items-center text-[15px] text-gf-lime underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gf-lime"
            >
              Private dining
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
}

