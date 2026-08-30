import { getPublicEnv } from "@/config/env";
import { siteConfig, type SiteLocale } from "@/config/site";

const LANGUAGE_LABELS: Record<SiteLocale, string> = {
  ar: "Arabic",
  en: "English",
};

export function getSiteUrl(path = "") {
  const env = getPublicEnv();
  return new URL(path, env.siteUrl).toString();
}

export function getLocalizedPath(locale: SiteLocale, path = "") {
  return `/${locale}${path}`;
}

export function getLanguageAlternates(path = "") {
  return {
    ar: getLocalizedPath("ar", path),
    en: getLocalizedPath("en", path),
  };
}

export function buildWebsiteSchema(locale: SiteLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    inLanguage: locale,
    name: locale === "ar" ? siteConfig.arabicName : siteConfig.name,
    url: getSiteUrl(getLocalizedPath(locale)),
  };
}

export function buildAutomotiveBusinessSchema(locale: SiteLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${getSiteUrl(getLocalizedPath(locale, "/contact"))}#business`,
    name: locale === "ar" ? siteConfig.arabicName : siteConfig.name,
    description:
      locale === "ar"
        ? "وجهة احترافية لخدمات السيارات عالية الأداء والفحص والخدمات المتخصصة."
        : "A premium automotive destination for performance-focused service, diagnostics, and specialist requests.",
    url: getSiteUrl(getLocalizedPath(locale)),
    contactPoint: {
      "@type": "ContactPoint",
      availableLanguage: Object.values(LANGUAGE_LABELS),
      contactType: "customer support",
      email: "info@redpowergarage.com",
    },
  };
}
