import { getPublicEnv } from "@/config/env";
import { siteConfig, type SiteLocale } from "@/config/site";

const LANGUAGE_LABELS: Record<SiteLocale, string> = {
  ar: "Arabic",
  en: "English",
};

const LOCALIZED_SITE_NAMES: Record<SiteLocale, string> = {
  ar: siteConfig.arabicName,
  en: siteConfig.name,
};

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
  baseKeywords: string[],
  title: string,
  extraKeywords: string[] = []
) {
  return Array.from(
    new Set([
      ...baseKeywords,
      ...extraKeywords,
      title,
      siteConfig.name,
      siteConfig.arabicName,
    ])
  );
}

type SchemaInput = {
  locale: SiteLocale;
  description: string;
};

export function buildWebsiteSchema({ locale, description }: SchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${getSiteUrl(getLocalizedPath(locale))}#website`,
    inLanguage: locale,
    name: LOCALIZED_SITE_NAMES[locale],
    alternateName:
      locale === "ar" ? LOCALIZED_SITE_NAMES.en : LOCALIZED_SITE_NAMES.ar,
    description,
    url: getSiteUrl(getLocalizedPath(locale)),
    publisher: {
      "@id": `${getSiteUrl(getLocalizedPath(locale, "/contact"))}#organization`,
    },
  };
}

export function buildOrganizationSchema({ locale, description }: SchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${getSiteUrl(getLocalizedPath(locale, "/contact"))}#organization`,
    name: LOCALIZED_SITE_NAMES[locale],
    alternateName:
      locale === "ar" ? LOCALIZED_SITE_NAMES.en : LOCALIZED_SITE_NAMES.ar,
    url: getSiteUrl(getLocalizedPath(locale)),
    description,
    email: siteConfig.contactEmail,
    foundingDate: `${siteConfig.foundedYear}`,
    sameAs: [siteConfig.instagramUrl, siteConfig.mapsUrl],
  };
}

export function buildAutomotiveBusinessSchema({
  locale,
  description,
}: SchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${getSiteUrl(getLocalizedPath(locale, "/contact"))}#business`,
    name: LOCALIZED_SITE_NAMES[locale],
    description,
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
