import type { Metadata } from "next";

import type { SiteLocale } from "@/config/site";
import { siteConfig } from "@/config/site";
import { getLanguageAlternates, getMetadataKeywords, getSiteUrl } from "@/lib/seo";

type PageMetadataInput = {
  locale: SiteLocale;
  path: string;
  title: string;
  description: string;
  keywords?: string[];
};

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  keywords = [],
}: PageMetadataInput): Metadata {
  const url = `/${locale}${path}`;

  return {
    metadataBase: new URL(getSiteUrl()),
    title,
    description,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.legalName,
    referrer: "origin-when-cross-origin",
    keywords: getMetadataKeywords(locale, path, title, keywords),
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
      canonical: url,
      languages: getLanguageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: getSiteUrl(url),
      type: "website",
      siteName: siteConfig.name,
      locale: locale === "ar" ? "ar_SA" : "en_US",
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
