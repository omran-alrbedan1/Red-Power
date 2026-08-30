import type { Metadata } from "next";

import { siteConfig, type SiteLocale } from "@/config/site";
import {
  getLanguageAlternates,
  getLocalizedPath,
  getMetadataKeywords,
  getSiteUrl,
} from "@/lib/seo";

type LocalizedMetadata = {
  title: string;
  description: string;
  keywords?: string[];
};

export function buildMetadata(
  locale: SiteLocale,
  metadata: LocalizedMetadata
): Metadata {
  const { title, description, keywords = [] } = metadata;
  const localizedPath = getLocalizedPath(locale);

  return {
    metadataBase: new URL(getSiteUrl()),
    title,
    description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.legalName,
    referrer: "origin-when-cross-origin",
    keywords: getMetadataKeywords(locale, "", title, keywords),
    category: "Automotive",
    classification:
      locale === "ar"
        ? "صيانة السيارات وخدمات الأداء"
        : "Automotive maintenance and performance services",
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: localizedPath,
      languages: getLanguageAlternates(),
    },
    openGraph: {
      title,
      description,
      url: getSiteUrl(localizedPath),
      type: "website",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      siteName: siteConfig.name,
      images: [
        {
          url: getSiteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt:
            locale === "ar"
              ? "صورة مشاركة لريد باور جراج"
              : "Red Power Garage social preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [getSiteUrl("/twitter-image")],
    },
  };
}
