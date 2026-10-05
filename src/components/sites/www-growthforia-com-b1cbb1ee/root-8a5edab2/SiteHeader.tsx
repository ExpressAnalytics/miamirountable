"use client";

import { useState } from "react";
import { ASSET } from "@/lib/growthforia/content";
import { CloseIcon, MenuIcon } from "../shared/icons";
import { openInviteModal } from "./InviteModal";
import { LimeCta } from "./LimeCta";

const links = [
  { href: "#speakers", label: "Moderators" },
  { href: "#program", label: "Program" },
  { href: "#location", label: "Location" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="pointer-events-none fixed top-[25px] left-0 z-[999] w-full px-4 md:px-8">
      <div className="pointer-events-auto mx-auto flex w-full max-w-[1344px] items-center justify-center">
        <div className="flex max-w-full items-center rounded-[20px] border border-white/10 bg-[#2a2a2c]/50 py-1.5 pr-3 pl-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-xl backdrop-saturate-150 sm:pr-4 sm:pl-4">
          <a
            href="/"
            className="mr-3 flex min-w-0 shrink-0 cursor-pointer items-center gap-1 sm:mr-5"
            aria-label="express analytics"
          >
            <img
              src={`${ASSET}/logos/ea-logo.png`}
              alt="express analytics logo"
              width={40}
              height={40}
              className="h-9 w-9 shrink-0 object-contain object-center md:h-10 md:w-10"
            />
            <span className="-ml-[1.5px] whitespace-nowrap font-sans text-[16px] font-bold leading-none tracking-[-0.02em] md:-ml-[2px] md:text-[18px]">
              <span className="text-[#ff003b]">express</span>
              <span className="text-white"> analytics</span>
            </span>
          </a>
          <div className="hidden items-center gap-4 lg:flex">
            <nav className="flex items-center gap-4" aria-label="Primary">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="cursor-pointer py-1.5 text-[13px] font-medium uppercase tracking-[0.06em] text-white/90 transition-colors duration-200 hover:text-gf-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gf-lime"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <LimeCta
              onClick={openInviteModal}
              className="h-[37px] min-h-[37px] px-5 text-[13px]"
            >
              Request an Invitation
            </LimeCta>
          </div>
          <button
            type="button"
            aria-label={open ? "Close menu" : "menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 cursor-pointer place-items-center rounded-full bg-white/5 text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gf-lime lg:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="pointer-events-auto absolute top-[58px] left-1/2 w-[min(320px,calc(100%-2rem))] -translate-x-1/2 rounded-[16px] border border-white/10 bg-[#2a2a2c]/50 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl backdrop-saturate-150 lg:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="min-h-11 cursor-pointer py-2 text-[15px] font-medium uppercase tracking-[0.06em] transition-colors duration-200 hover:text-gf-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gf-lime"
              >
                {link.label}
              </a>
            ))}
            <LimeCta
              onClick={() => {
                setOpen(false);
                openInviteModal();
              }}
              className="h-[37px] min-h-[37px] w-full px-5 text-[13px]"
            >
              Request an Invitation
            </LimeCta>
          </nav>
        </div>
      ) : null}
    </header>
  );
}



