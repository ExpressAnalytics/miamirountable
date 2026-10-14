"use client";

import { useEffect, useRef, useState } from "react";

const SEATS = 16;

export function VideoCover({
  src,
  poster,
  eager = false,
  loaderClassName = "items-center",
}: {
  src: string;
  poster: string;
  eager?: boolean;
  loaderClassName?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [armed, setArmed] = useState(false);
  const showLoader = !ready && !failed;

  useEffect(() => {
    const posterEl = posterRef.current;
    if (posterEl?.complete && posterEl.naturalWidth > 0) setArmed(true);
  }, [poster]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !armed) return;

    // iOS autoplay checks the muted attribute. The React prop is not enough.
    el.muted = true;
    el.defaultMuted = true;
    el.setAttribute("muted", "");
    el.setAttribute("playsinline", "");

    const shouldPlay = { current: eager };
    const play = () => {
      if (!shouldPlay.current) return;
      void el.play().catch(() => {});
    };

    if (eager) play();

    const io = eager
      ? null
      : new IntersectionObserver(
          ([entry]) => {
            shouldPlay.current = entry.isIntersecting;
            if (entry.isIntersecting) play();
            else el.pause();
          },
          { rootMargin: "200px 0px" },
        );
    io?.observe(el);

    // Low Power Mode rejects the first autoplay. A later tap is a user gesture.
    window.addEventListener("pointerdown", play);
    el.addEventListener("canplay", play);

    return () => {
      shouldPlay.current = false;
      io?.disconnect();
      window.removeEventListener("pointerdown", play);
      el.removeEventListener("canplay", play);
    };
  }, [eager, armed]);

  return (
    <div className="absolute inset-0">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay={eager}
        muted
        loop
        playsInline
        preload={armed ? "auto" : "none"}
        src={armed ? src : undefined}
        onPlaying={() => setReady(true)}
        onError={() => setFailed(true)}
      />
      <img
        ref={posterRef}
        src={poster}
        alt=""
        width={1600}
        height={900}
        fetchPriority={eager ? "high" : "low"}
        decoding={eager ? "sync" : "async"}
        onLoad={() => setArmed(true)}
        className={`pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover transition-opacity duration-500 motion-reduce:transition-none ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        className={`absolute inset-0 z-[2] flex justify-center bg-[#0b0c0e]/25 transition-opacity duration-500 motion-reduce:transition-none ${loaderClassName} ${
          showLoader ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        role="status"
        aria-live="polite"
        aria-busy={showLoader}
        aria-label={showLoader ? "Loading video" : "Video loaded"}
      >
        <div className="relative size-16" aria-hidden>
          <span className="absolute inset-[22%] rounded-full border border-white/30" />
          <span className="absolute inset-[34%] animate-pulse rounded-full bg-gf-lime/30 motion-reduce:animate-none" />
          <div className="absolute inset-0 animate-[spin_1.8s_linear_infinite] motion-reduce:animate-none">
            {Array.from({ length: SEATS }, (_, i) => (
              <span
                key={i}
                className="absolute top-1/2 left-1/2 size-1.5 rounded-full bg-gf-lime"
                style={{
                  opacity: 0.22 + (i / (SEATS - 1)) * 0.78,
                  marginLeft: -3,
                  marginTop: -3,
                  transform: `rotate(${i * (360 / SEATS)}deg) translateY(-28px)`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
