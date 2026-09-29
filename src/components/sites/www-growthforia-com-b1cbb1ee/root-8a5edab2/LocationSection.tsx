"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ASSET } from "@/lib/growthforia/content";
import { CheckIcon } from "../shared/icons";

const LOCATION_VIDEO = `${ASSET}/location.mp4`;
const HIDE_MS = 8000;
const SEATS = 12;

export function LocationSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const markReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    const el = videoRef.current;
    const section = document.getElementById("location");
    if (!el || !section) return;

    let poll = 0;
    let hide = 0;
    const start = () => {
      void el.play().catch(() => markReady());
      if (poll) return;
      poll = window.setInterval(() => {
        if (el.readyState >= 2 || !el.paused) markReady();
      }, 150);
      hide = window.setTimeout(() => {
        markReady();
        window.clearInterval(poll);
      }, HIDE_MS);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else el.pause();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(section);
    return () => {
      io.disconnect();
      window.clearInterval(poll);
      window.clearTimeout(hide);
    };
  }, [markReady]);

  return (
    <section id="location" className="bg-[#0b0c0e] py-20 md:py-[80px]">
      <div className="gf-container">
        <h2 className="text-center text-[40px] leading-[1.1] font-medium md:text-[48px] md:leading-[52.8px]">
          The <span className="gf-italic">Location</span>
        </h2>

        <div className="relative mt-12 h-[420px] overflow-hidden md:h-[560px]">
          <video
            ref={videoRef}
            className="absolute inset-0 h-[420px] w-full object-cover md:h-[560px]"
            muted
            loop
            playsInline
            preload="none"
            src={LOCATION_VIDEO}
            onPlaying={markReady}
            onCanPlay={markReady}
            onError={markReady}
            aria-hidden
          />

          <style>{`@keyframes gf-loc-hide{to{opacity:0;visibility:hidden}}#location-loader.is-pending{animation:gf-loc-hide .4s ease 1.1s forwards}`}</style>
          <div
            id="location-loader"
            className={`absolute inset-0 z-[1] flex items-center justify-center bg-[#0b0c0e] transition-opacity duration-500 motion-reduce:transition-none ${
              ready ? "pointer-events-none opacity-0" : "is-pending opacity-100"
            }`}
            role="status"
            aria-live="polite"
            aria-busy={!ready}
            aria-label={ready ? "Video loaded" : "Loading video"}
          >
            <div className="relative size-16 md:size-14" aria-hidden>
              <span className="absolute inset-[22%] rounded-full border border-white/20" />
              <span className="absolute inset-[34%] animate-pulse rounded-full bg-gf-lime/20 motion-reduce:animate-none" />
              <div className="absolute inset-0 animate-[spin_1.8s_linear_infinite] motion-reduce:animate-none">
                {Array.from({ length: SEATS }, (_, i) => (
                  <span
                    key={i}
                    className="absolute top-1/2 left-1/2 size-1.5 rounded-full bg-gf-lime"
                    style={{
                      opacity: 0.22 + (i / (SEATS - 1)) * 0.78,
                      marginLeft: -3,
                      marginTop: -3,
                      transform: `rotate(${i * 30}deg) translateY(-28px)`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

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
