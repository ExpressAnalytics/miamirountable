"use client";

import { useEffect, useRef } from "react";
import { CloseIcon } from "../shared/icons";
import { InviteForm } from "./InviteForm";
import { LimeCta } from "./LimeCta";

const OPEN = "gf-open-invite";

export function openInviteModal() {
  window.dispatchEvent(new Event(OPEN));
}

export function RequestInviteButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <LimeCta onClick={openInviteModal} className={className}>
      {children}
    </LimeCta>
  );
}

export function InviteModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const open = () => dialogRef.current?.showModal();
    window.addEventListener(OPEN, open);
    return () => window.removeEventListener(OPEN, open);
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="invite-dialog-title"
      className="m-auto w-[min(920px,calc(100vw-2.75rem))] max-h-[92dvh] overflow-y-auto border-0 bg-[#ff003b] p-0 text-white backdrop:bg-[#0b0c0e]/75"
      onMouseDown={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const inside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;
        if (!inside) e.currentTarget.close();
      }}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-[#ff003b] px-5 py-3 sm:px-10">
        <h2
          id="invite-dialog-title"
          className="font-display text-[22px] leading-tight sm:text-[28px]"
        >
          Request an invitation
        </h2>
        <button
          type="button"
          aria-label="Close"
          onClick={() => dialogRef.current?.close()}
          className="grid size-11 shrink-0 cursor-pointer place-items-center text-white transition-colors duration-200 hover:text-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <CloseIcon />
        </button>
      </div>
      <InviteForm />
    </dialog>
  );
}
