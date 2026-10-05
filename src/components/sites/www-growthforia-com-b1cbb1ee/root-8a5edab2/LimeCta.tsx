import { TICKET_URL } from "@/lib/growthforia/content";

type Props = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

const cls =
  "inline-flex cursor-pointer items-center justify-center rounded-gf-btn bg-gf-lime px-5 py-2.5 font-semibold uppercase tracking-[0.04em] text-[#0b0c0e] transition-transform duration-200 hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98]";

export function LimeCta({ href = TICKET_URL, onClick, children, className = "" }: Props) {
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${cls} ${className}`}>
        {children}
      </button>
    );
  }
  return (
    <a href={href} className={`${cls} ${className}`}>
      {children}
    </a>
  );
}

