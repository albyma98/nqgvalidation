import { headers } from "next/headers";
import { getCityFromHost } from "@/lib/cities";
import HeroSection from "@/components/HeroSection";
import WhatIsItSection from "@/components/WhatIsItSection";
import ThePlaceSection from "@/components/ThePlaceSection";
import WaitlistSection from "@/components/WaitlistSection";
import PreorderSection from "@/components/PreorderSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  const host = headers().get("host") ?? "";
  const city = getCityFromHost(host);

  return (
    <main>
      <HeroSection subtitle={city.heroSubtitle} />
      <WhatIsItSection />
      <ThePlaceSection
        title={city.placeTitle}
        caption={city.placeCaption}
        image={city.placeImage}
      />
      <WaitlistSection
        title={city.waitlistTitle}
        citySlug={city.supabaseCity}
      />
      <PreorderSection
        body={city.preorderBody}
        citySlug={city.supabaseCity}
      />
      <FooterSection />
    </main>
  );
}
