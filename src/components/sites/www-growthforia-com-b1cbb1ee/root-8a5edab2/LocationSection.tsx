import { ASSET, LOCATION_POSTER } from "@/lib/growthforia/content";
import { CheckIcon } from "../shared/icons";
import { VideoCover } from "./VideoCover";

const LOCATION_VIDEO = `${ASSET}/location.mp4`;

export function LocationSection() {
  return (
    <section id="location" className="bg-[#0b0c0e] py-20 md:py-[80px]">
      <div className="gf-container">
        <h2 className="text-center text-[40px] leading-[1.1] font-medium md:text-[48px] md:leading-[52.8px]">
          The <span className="gf-italic">Location</span>
        </h2>

        <div className="relative mt-12 h-[420px] overflow-hidden md:h-[560px]">
          <VideoCover src={LOCATION_VIDEO} poster={LOCATION_POSTER} />

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
              COTE Miami
            </h2>
            <p className="mt-3 text-[16px] text-white/80 md:text-[18px]">
              Private Gold Room · Miami Design District
            </p>
            <p className="mt-4 max-w-[48ch] text-[15px] leading-[1.55] text-white/75 md:text-[16px]">
              3900 NE 2nd Ave, Miami, FL 33137
            </p>
            <ul className="mt-5 space-y-2.5 text-[15px] text-white/90 md:text-[16px]">
              <li className="flex items-center gap-2.5">
                <span className="text-gf-lime">
                  <CheckIcon />
                </span>
                America&apos;s first and only Michelin-starred Korean Steakhouse
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-gf-lime">
                  <CheckIcon />
                </span>
                Hosted valet parking provided.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

