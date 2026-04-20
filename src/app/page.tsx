import HeroSection from "@/components/HeroSection";
import WhatIsItSection from "@/components/WhatIsItSection";
import ThePlaceSection from "@/components/ThePlaceSection";
import WaitlistSection from "@/components/WaitlistSection";
import PreorderSection from "@/components/PreorderSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <WhatIsItSection />
      <ThePlaceSection />
      <WaitlistSection />
      <PreorderSection />
      <FooterSection />
    </main>
  );
}
