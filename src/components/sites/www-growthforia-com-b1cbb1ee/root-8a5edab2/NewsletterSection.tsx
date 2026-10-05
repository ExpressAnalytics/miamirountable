import { InviteForm } from "./InviteForm";

const NEXT = [
  {
    n: "01",
    title: "Submit your request",
    body: "Contact details plus three quick questions on your Data/AI priorities, about 90 seconds.",
  },
  {
    n: "02",
    title: "We review within 48 hours",
    body: "Jorge and our team confirm fit against company, seniority/function, geography and current priorities to keep the table balanced.",
  },
  {
    n: "03",
    title: "Personal confirmation",
    body: "You hear back directly, either your seat is confirmed, or we let you know you're on the list for a future evening.",
  },
];

export function NewsletterSection() {
  return (
    <section id="cta" className="scroll-mt-24 bg-[#0b0c0e] py-20 md:py-[80px]">
      <div className="gf-container">
        <h2 className="font-display mx-auto max-w-full px-3 text-center text-[clamp(1.85rem,8.2vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-white md:px-0 md:text-[56px]">
          <span className="block md:inline">What happens</span>{" "}
          <span className="gf-italic block md:inline">next</span>
        </h2>
        <ol className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {NEXT.map((item) => (
            <li key={item.n} className="text-center">
              <span className="font-display text-[22px] leading-none tracking-[-0.04em] text-white">
                {item.n}
              </span>
              <p className="mt-3 text-[16px] font-medium text-white">{item.title}</p>
              <p className="mx-auto mt-1 max-w-[42ch] text-[14px] leading-[1.55] text-white/75">
                {item.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="relative mx-auto mt-12 w-full max-w-[640px] overflow-hidden rounded-gf-btn bg-[#ff003b] pt-10 text-white md:mt-16 md:pt-14">
          <InviteForm />
        </div>
      </div>
    </section>
  );
}
