export interface CityConfig {
  slug: string;
  name: string;
  heroSubtitle: string;
  placeTitle: string;
  placeCaption: string;
  placeImage: string;
  preorderBody: string;
  waitlistTitle: string;
  supabaseCity: string;
}

const cities: Record<string, CityConfig> = {
  gallipoli: {
    slug: "gallipoli",
    name: "Gallipoli",
    heroSubtitle: "Presto a Gallipoli.",
    placeTitle: "A Gallipoli, d'estate.",
    placeCaption:
      "L'esperienza si svolge tra la Fontana Greca, il Castello, i vicoli del centro storico e il lungomare. Si gioca dal tramonto in poi.",
    placeImage: "/images/gallipoli-night.jpg",
    preorderBody:
      "Con 1€ ti riserviamo una notte a Gallipoli. Quando apriremo, riceverai una email con un codice personale: potrai usarlo per accedere all'esperienza a 6,90€ invece di 9,90€. Se cambi idea, l'euro ti viene rimborsato. Nessuna trappola.",
    waitlistTitle: "Ti avvertiremo quando L'Ombra sarà pronta.",
    supabaseCity: "gallipoli",
  },
  roma: {
    slug: "roma",
    name: "Roma",
    heroSubtitle: "Presto a Roma.",
    placeTitle: "A Roma, di notte.",
    placeCaption:
      "L'esperienza si svolge tra i vicoli del centro storico, lontano dai turisti. Si gioca dal tramonto in poi.",
    placeImage: "/images/roma-night.jpg",
    preorderBody:
      "Con 1€ ti riserviamo una notte a Roma. Quando apriremo, riceverai una email con un codice personale: potrai usarlo per accedere all'esperienza a 6,90€ invece di 9,90€. Se cambi idea, l'euro ti viene rimborsato. Nessuna trappola.",
    waitlistTitle: "Ti avvertiremo quando L'Ombra sarà pronta.",
    supabaseCity: "roma",
  },
  ortigia: {
    slug: "ortigia",
    name: "Ortigia",
    heroSubtitle: "Presto a Ortigia.",
    placeTitle: "A Ortigia, dopo il tramonto.",
    placeCaption:
      "L'esperienza si svolge sull'isola di Ortigia, tra le strade silenziose e il mare. Si gioca dal tramonto in poi.",
    placeImage: "/images/ortigia-night.jpg",
    preorderBody:
      "Con 1€ ti riserviamo una notte a Ortigia. Quando apriremo, riceverai una email con un codice personale: potrai usarlo per accedere all'esperienza a 6,90€ invece di 9,90€. Se cambi idea, l'euro ti viene rimborsato. Nessuna trappola.",
    waitlistTitle: "Ti avvertiremo quando L'Ombra sarà pronta.",
    supabaseCity: "ortigia",
  },
  matera: {
    slug: "matera",
    name: "Matera",
    heroSubtitle: "Presto a Matera.",
    placeTitle: "A Matera, nei Sassi.",
    placeCaption:
      "L'esperienza si svolge tra i Sassi, nelle strade scavate nella roccia. Si gioca dal tramonto in poi.",
    placeImage: "/images/matera-night.jpg",
    preorderBody:
      "Con 1€ ti riserviamo una notte a Matera. Quando apriremo, riceverai una email con un codice personale: potrai usarlo per accedere all'esperienza a 6,90€ invece di 9,90€. Se cambi idea, l'euro ti viene rimborsato. Nessuna trappola.",
    waitlistTitle: "Ti avvertiremo quando L'Ombra sarà pronta.",
    supabaseCity: "matera",
  },
};

export const DEFAULT_CITY = cities.gallipoli;

export function getCityFromHost(host: string): CityConfig {
  const subdomain = host.split(".")[0].toLowerCase();
  return cities[subdomain] ?? DEFAULT_CITY;
}
