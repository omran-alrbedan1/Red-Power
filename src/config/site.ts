export const siteConfig = {
  name: "Red Power Garage",
  arabicName: "ريد باور جراج",
  tagline: "Performance • Precision • Trust",
  companyLine: "تحت مظلة شركة قمرة الرائدة",
  description:
    "Professional vehicle maintenance, diagnostics, and performance services for Red Power Garage.",
  localeCookie: "red-power-locale",
  locales: ["ar", "en"] as const,
  defaultLocale: "ar" as const,
};

export type SiteLocale = (typeof siteConfig.locales)[number];
