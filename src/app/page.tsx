import { CookieBanner } from "@/components/sites/www-growthforia-com-b1cbb1ee/root-8a5edab2/CookieBanner";
import { InviteModal } from "@/components/sites/www-growthforia-com-b1cbb1ee/root-8a5edab2/InviteModal";
import { ExpectSection } from "@/components/sites/www-growthforia-com-b1cbb1ee/root-8a5edab2/ExpectSection";
import { FaqSection } from "@/components/sites/www-growthforia-com-b1cbb1ee/root-8a5edab2/FaqSection";
import { HeroSection } from "@/components/sites/www-growthforia-com-b1cbb1ee/root-8a5edab2/HeroSection";
import { IntroSection } from "@/components/sites/www-growthforia-com-b1cbb1ee/root-8a5edab2/IntroSection";
import { LocationSection } from "@/components/sites/www-growthforia-com-b1cbb1ee/root-8a5edab2/LocationSection";
import { LogoMarquee } from "@/components/sites/www-growthforia-com-b1cbb1ee/root-8a5edab2/LogoMarquee";
import { NewsletterSection } from "@/components/sites/www-growthforia-com-b1cbb1ee/root-8a5edab2/NewsletterSection";
import { PricingSection } from "@/components/sites/www-growthforia-com-b1cbb1ee/root-8a5edab2/PricingSection";
import { ProgramSection } from "@/components/sites/www-growthforia-com-b1cbb1ee/root-8a5edab2/ProgramSection";
import { RecapSection } from "@/components/sites/www-growthforia-com-b1cbb1ee/root-8a5edab2/RecapSection";
import { SectionLine } from "@/components/sites/www-growthforia-com-b1cbb1ee/root-8a5edab2/SectionLine";
import { SiteFooter } from "@/components/sites/www-growthforia-com-b1cbb1ee/root-8a5edab2/SiteFooter";
import { SiteHeader } from "@/components/sites/www-growthforia-com-b1cbb1ee/root-8a5edab2/SiteHeader";
import { SpeakersSection } from "@/components/sites/www-growthforia-com-b1cbb1ee/root-8a5edab2/SpeakersSection";

export default function Home() {
  return (
    <main className="gf-page bg-[#0b0c0e]">
      <SiteHeader />
      <HeroSection />
      <SectionLine />
      <IntroSection />
      <SectionLine />
      <LogoMarquee />
      <SectionLine />
      <ExpectSection />
      <SectionLine />
      <SectionLine />
      <LocationSection />
      <SectionLine />
      <SectionLine />
      <SpeakersSection />
      <SectionLine />
      <ProgramSection />
      <SectionLine />
      <SectionLine />
      <NewsletterSection />
      <SectionLine />
      <FaqSection />
      <SectionLine />
      <SiteFooter />
      <CookieBanner />
      <InviteModal />
    </main>
  );
}

