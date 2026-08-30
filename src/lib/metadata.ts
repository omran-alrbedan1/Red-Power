import type { Metadata } from "next";

import { siteConfig, type SiteLocale } from "@/config/site";
import { getLanguageAlternates, getLocalizedPath, getSiteUrl } from "@/lib/seo";

type LocalizedMetadata = {
  title: string;
  description: string;
};

export function buildMetadata(
  locale: SiteLocale,
  metadata: LocalizedMetadata
): Metadata {
  const { title, description } = metadata;
  const localizedPath = getLocalizedPath(locale);

  return {
    metadataBase: new URL(getSiteUrl()),
    title,
    description,
    applicationName: siteConfig.name,
    keywords: [
      "Red Power Garage",
      "performance garage",
      "auto repair",
      "diagnostics",
      "custom automotive services",
      "ريد باور جراج",
      "خدمات سيارات",
      "فحص سيارات",
    ],
    category: "Automotive",
    robots: {
      index: true,
      follow: true,
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
          alt: "Red Power Garage social preview",
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
