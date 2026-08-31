export const siteConfig = {
  name: "Red Power Garage",
  arabicName: "ريد باور",
  legalName: "Red Power Garage",
  tagline: "Performance • Precision • Trust",
  companyLine: "تحت مظلة شركة قمرة الرائدة",
  siteUrl: "https://red-power.vercel.app",
  foundedYear: 2025,
  contactEmail: "info@qamrah-pioneer.com",
  instagramUrl: "https://www.instagram.com/red_power_carage/",
  mapsUrl: "https://maps.app.goo.gl/XzxTbW7bU86WPg679?g_st=ic",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=285%2C%20Asfan%20Industrial%20Area%2C%20Jeddah%2C%20Saudi%20Arabia&output=embed",
  description:
    "Professional vehicle maintenance, diagnostics, and performance services for Red Power Garage.",
  arabicDescription:
    "خدمات احترافية لصيانة المركبات وتشخيص الأعطال وتطوير الأداء في ريد باور.",
  localeCookie: "red-power-locale",
  locales: ["ar", "en"] as const,
  defaultLocale: "ar" as const,
};

export type SiteLocale = (typeof siteConfig.locales)[number];
