import type { Metadata } from "next";

import { siteConfig, type SiteLocale } from "@/config/site";
import {
  getLanguageAlternates,
  getLocalizedPath,
  getMetadataKeywords,
  getSiteUrl,
} from "@/lib/seo";

const SOCIAL_IMAGE_PATH = "/images/red-power/brand/og-share-background-og.jpg";

type LocalizedMetadata = {
  title: string;
  description: string;
  classification: string;
  openGraphAlt: string;
  keywords?: string[];
};

export function buildMetadata(
  locale: SiteLocale,
  metadata: LocalizedMetadata
): Metadata {
  const { title, description, classification, openGraphAlt, keywords = [] } =
    metadata;
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
    keywords: getMetadataKeywords(keywords, title),
    category: "Automotive",
    classification,
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
          url: getSiteUrl(SOCIAL_IMAGE_PATH),
          width: 1200,
          height: 630,
          alt: openGraphAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [getSiteUrl(SOCIAL_IMAGE_PATH)],
    },
  };
}
