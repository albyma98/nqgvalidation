import { headers } from "next/headers";
import { getCityFromHost } from "@/lib/cities";
import HeroSection from "@/components/HeroSection";
import WhatIsItSection from "@/components/WhatIsItSection";
import ThePlaceSection from "@/components/ThePlaceSection";
import JoinSection from "@/components/JoinSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  const host = headers().get("host") ?? "";
  const city = getCityFromHost(host);

  return (
    <main>
      <HeroSection subtitle={city.heroSubtitle} heroVideo={city.heroVideo} heroPoster={city.heroPoster} />
      <WhatIsItSection cityName={city.name} />
      <ThePlaceSection
        title={city.placeTitle}
        caption={city.placeCaption}
        image={city.placeImage}
      />
      <JoinSection
        waitlistTitle={city.waitlistTitle}
        citySlug={city.supabaseCity}
        cityName={city.name}
      />
      <FooterSection cityName={city.name} />
    </main>
  );
}
