import { siteConfig, type SiteLocale } from "@/config/site";

export function isValidLocale(value: string): value is SiteLocale {
  return siteConfig.locales.includes(value as SiteLocale);
}

export function getDirection(locale: SiteLocale) {
  return locale === "ar" ? "rtl" : "ltr";
}
