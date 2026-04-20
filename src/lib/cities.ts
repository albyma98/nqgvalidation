export interface CityConfig {
  slug: string;
  name: string;
  heroSubtitle: string;
  heroVideo: string;
  heroPoster: string;
  placeTitle: string;
  placeCaption: string;
  placeImage: string;
  preorderBody: string;
  waitlistTitle: string;
  supabaseCity: string;
}

function makeCity(
  slug: string,
  name: string,
  opts: {
    heroSubtitle: string;
    placeTitle: string;
    placeCaption: string;
    preorderBody: string;
  }
): CityConfig {
  return {
    slug,
    name,
    heroSubtitle: opts.heroSubtitle,
    heroVideo: `/videos/${slug}-hero.mp4`,
    heroPoster: `/images/${slug}-hero-poster.webp`,
    placeTitle: opts.placeTitle,
    placeCaption: opts.placeCaption,
    placeImage: `/images/${slug}-night.jpg`,
    preorderBody: opts.preorderBody,
    waitlistTitle: "Ti avvertiremo quando L'Ombra sarà pronta.",
    supabaseCity: slug,
  };
}

const cities: Record<string, CityConfig> = {
  gallipoli: makeCity("gallipoli", "Gallipoli", {
    heroSubtitle: "Presto a Gallipoli.",
    placeTitle: "A Gallipoli, d'estate.",
    placeCaption:
      "L'esperienza si svolge tra la Fontana Greca, il Castello, i vicoli del centro storico e il lungomare. Si gioca dal tramonto in poi.",
    preorderBody:
      "Con 1€ ti riserviamo una notte a Gallipoli. Quando apriremo, riceverai una email con un codice personale: potrai usarlo per accedere all'esperienza a 6,90€ invece di 9,90€. Se cambi idea, l'euro ti viene rimborsato. Nessuna trappola.",
  }),
  roma: makeCity("roma", "Roma", {
    heroSubtitle: "Presto a Roma.",
    placeTitle: "A Roma, di notte.",
    placeCaption:
      "L'esperienza si svolge tra i vicoli del centro storico, lontano dai turisti. Si gioca dal tramonto in poi.",
    preorderBody:
      "Con 1€ ti riserviamo una notte a Roma. Quando apriremo, riceverai una email con un codice personale: potrai usarlo per accedere all'esperienza a 6,90€ invece di 9,90€. Se cambi idea, l'euro ti viene rimborsato. Nessuna trappola.",
  }),
  ortigia: makeCity("ortigia", "Ortigia", {
    heroSubtitle: "Presto a Ortigia.",
    placeTitle: "A Ortigia, dopo il tramonto.",
    placeCaption:
      "L'esperienza si svolge sull'isola di Ortigia, tra le strade silenziose e il mare. Si gioca dal tramonto in poi.",
    preorderBody:
      "Con 1€ ti riserviamo una notte a Ortigia. Quando apriremo, riceverai una email con un codice personale: potrai usarlo per accedere all'esperienza a 6,90€ invece di 9,90€. Se cambi idea, l'euro ti viene rimborsato. Nessuna trappola.",
  }),
  matera: makeCity("matera", "Matera", {
    heroSubtitle: "Presto a Matera.",
    placeTitle: "A Matera, nei Sassi.",
    placeCaption:
      "L'esperienza si svolge tra i Sassi, nelle strade scavate nella roccia. Si gioca dal tramonto in poi.",
    preorderBody:
      "Con 1€ ti riserviamo una notte a Matera. Quando apriremo, riceverai una email con un codice personale: potrai usarlo per accedere all'esperienza a 6,90€ invece di 9,90€. Se cambi idea, l'euro ti viene rimborsato. Nessuna trappola.",
  }),
};

export const DEFAULT_CITY = cities.gallipoli;

export function getCityFromHost(host: string): CityConfig {
  const subdomain = host.split(".")[0].toLowerCase();
  return cities[subdomain] ?? DEFAULT_CITY;
}
