export function SiteFooter() {
  return (
    <footer className="bg-[#0b0c0e] py-3">
      <div className="gf-container flex flex-col gap-3 text-[13px] text-white/45 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-1">
          <p>
            &copy; {new Date().getFullYear()} Express Analytics. Seattle
            Executive Roundtable Series. All rights reserved.
          </p>
          <p className="leading-[1.5]">
            Attendance is curated based on company fit, seniority and current
            Data/AI priorities. A member of our team will follow up on all
            requests.
          </p>
        </div>
        <p className="flex flex-wrap gap-x-4 gap-y-1">
          <a
            href="https://www.expressanalytics.com/privacy"
            className="hover:text-white"
          >
            Privacy policy
          </a>
          <a
            href="https://www.expressanalytics.com/terms"
            className="hover:text-white"
          >
            Terms &amp; Conditions
          </a>
        </p>
      </div>
    </footer>
  );
}

