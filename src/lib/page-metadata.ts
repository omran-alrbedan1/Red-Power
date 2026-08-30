import type { Metadata } from "next";

import type { SiteLocale } from "@/config/site";
import { siteConfig } from "@/config/site";
import { getLanguageAlternates, getSiteUrl } from "@/lib/seo";

type PageMetadataInput = {
  locale: SiteLocale;
  path: string;
  title: string;
  description: string;
};

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
}: PageMetadataInput): Metadata {
  const url = `/${locale}${path}`;

  return {
    metadataBase: new URL(getSiteUrl()),
    title,
    description,
    keywords: [
      "Red Power Garage",
      "automotive performance",
      "garage services",
      "custom automotive work",
    ],
    robots: {
      index: true,
      follow: true,
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
