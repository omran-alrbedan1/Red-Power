import { getPublicEnv } from "@/config/env";
import { siteConfig, type SiteLocale } from "@/config/site";

const LANGUAGE_LABELS: Record<SiteLocale, string> = {
  ar: "Arabic",
  en: "English",
};

const DEFAULT_KEYWORDS: Record<SiteLocale, string[]> = {
  en: [
    "Red Power Garage",
    "auto repair",
    "car maintenance",
    "vehicle diagnostics",
    "performance garage",
    "American car service",
    "Mopar service",
    "brake repair",
    "electrical diagnostics",
  ],
  ar: [
    "ريد باور جراج",
    "صيانة سيارات",
    "فحص سيارات",
    "تشخيص أعطال السيارات",
    "ورشة سيارات احترافية",
    "خدمات سيارات أمريكية",
    "خدمة موبار",
    "صيانة مكابح",
    "فحص كهرباء السيارات",
  ],
};

const ROUTE_KEYWORDS: Record<string, Record<SiteLocale, string[]>> = {
  "": {
    en: ["performance workshop", "premium garage", "automotive specialists"],
    ar: ["ورشة أداء", "ورشة احترافية", "خبراء السيارات"],
  },
  "/about": {
    en: ["about Red Power Garage", "garage experts", "automotive workshop team"],
    ar: ["من نحن ريد باور جراج", "فريق الورشة", "خبراء صيانة السيارات"],
  },
  "/services": {
    en: ["garage services", "engine diagnostics", "preventive maintenance"],
    ar: ["خدمات الورشة", "تشخيص المحرك", "الصيانة الوقائية"],
  },
  "/specials": {
    en: ["service offers", "garage specials", "seasonal maintenance packages"],
    ar: ["عروض الخدمة", "عروض الورشة", "باقات صيانة موسمية"],
  },
  "/gallery": {
    en: ["garage gallery", "workshop photos", "performance car workshop"],
    ar: ["معرض الورشة", "صور الورشة", "ورشة سيارات الأداء"],
  },
  "/reviews": {
    en: ["customer reviews", "garage reputation", "service quality"],
    ar: ["تقييمات العملاء", "سمعة الورشة", "جودة الخدمة"],
  },
  "/contact": {
    en: ["book car service", "contact garage", "request diagnostics"],
    ar: ["احجز صيانة", "تواصل مع الورشة", "طلب تشخيص"],
  },
};

function getLocalizedDescription(locale: SiteLocale) {
  return locale === "ar"
    ? siteConfig.arabicDescription
    : siteConfig.description;
}

function normalizeSiteUrl(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function getSiteUrl(path = "") {
  const env = getPublicEnv();
  return new URL(path, `${normalizeSiteUrl(env.siteUrl)}/`).toString();
}

export function getLocalizedPath(locale: SiteLocale, path = "") {
  return `/${locale}${path}`;
}

export function getLanguageAlternates(path = "") {
  return {
    ar: getLocalizedPath("ar", path),
    en: getLocalizedPath("en", path),
    "x-default": getLocalizedPath(siteConfig.defaultLocale, path),
  };
}

export function getMetadataKeywords(
  locale: SiteLocale,
  path: string,
  title: string,
  extraKeywords: string[] = []
) {
  const routeKeywords =
    ROUTE_KEYWORDS[path]?.[locale] ??
    (path.startsWith("/services/")
      ? locale === "ar"
        ? ["تفاصيل الخدمة", "خدمة متخصصة", "صيانة احترافية"]
        : ["service details", "specialist car service", "professional maintenance"]
      : []);

  return Array.from(
    new Set([
      ...DEFAULT_KEYWORDS[locale],
      ...routeKeywords,
      ...extraKeywords,
      title,
      siteConfig.name,
      siteConfig.arabicName,
    ])
  );
}

export function buildWebsiteSchema(locale: SiteLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${getSiteUrl(getLocalizedPath(locale))}#website`,
    inLanguage: locale,
    name: locale === "ar" ? siteConfig.arabicName : siteConfig.name,
    alternateName: locale === "ar" ? siteConfig.name : siteConfig.arabicName,
    description: getLocalizedDescription(locale),
    url: getSiteUrl(getLocalizedPath(locale)),
    publisher: {
      "@id": `${getSiteUrl(getLocalizedPath(locale, "/contact"))}#organization`,
    },
  };
}

export function buildOrganizationSchema(locale: SiteLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${getSiteUrl(getLocalizedPath(locale, "/contact"))}#organization`,
    name: locale === "ar" ? siteConfig.arabicName : siteConfig.name,
    alternateName: locale === "ar" ? siteConfig.name : siteConfig.arabicName,
    url: getSiteUrl(getLocalizedPath(locale)),
    description: getLocalizedDescription(locale),
    email: siteConfig.contactEmail,
    foundingDate: `${siteConfig.foundedYear}`,
    sameAs: [siteConfig.instagramUrl, siteConfig.mapsUrl],
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
    email: siteConfig.contactEmail,
    foundingDate: `${siteConfig.foundedYear}`,
    sameAs: [siteConfig.instagramUrl, siteConfig.mapsUrl],
    parentOrganization: {
      "@id": `${getSiteUrl(getLocalizedPath(locale, "/contact"))}#organization`,
    },
    contactPoint: {
      "@type": "ContactPoint",
      availableLanguage: Object.values(LANGUAGE_LABELS),
      contactType: "customer support",
      email: siteConfig.contactEmail,
    },
  };
}

type WebPageSchemaInput = {
  locale: SiteLocale;
  path: string;
  title: string;
  description: string;
};

export function buildWebPageSchema({
  locale,
  path,
  title,
  description,
}: WebPageSchemaInput) {
  const url = getSiteUrl(getLocalizedPath(locale, path));

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: locale,
    isPartOf: {
      "@id": `${getSiteUrl(getLocalizedPath(locale))}#website`,
    },
    about: {
      "@id": `${getSiteUrl(getLocalizedPath(locale, "/contact"))}#business`,
    },
  };
}

type ServiceSchemaInput = {
  locale: SiteLocale;
  path: string;
  title: string;
  description: string;
};

export function buildServiceSchema({
  locale,
  path,
  title,
  description,
}: ServiceSchemaInput) {
  const url = getSiteUrl(getLocalizedPath(locale, path));

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: title,
    serviceType: title,
    description,
    url,
    provider: {
      "@id": `${getSiteUrl(getLocalizedPath(locale, "/contact"))}#business`,
    },
  };
}
