import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { Geist, Noto_Kufi_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { WebsiteLayout } from "@/components/layout/website-layout";
import { DocumentLocale } from "@/components/providers/document-locale";
import { JsonLd } from "@/components/seo/json-ld";
import { getDirection, isValidLocale } from "@/lib/i18n";
import { getSeoMessages } from "@/lib/seo-messages";
import {
  buildAutomotiveBusinessSchema,
  buildOrganizationSchema,
  buildWebsiteSchema,
} from "@/lib/seo";
import { siteConfig, type SiteLocale } from "@/config/site";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-kufi-arabic",
  weight: ["400", "500", "700"],
});

export function generateStaticParams() {
  return siteConfig.locales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as SiteLocale;
  setRequestLocale(typedLocale);
  const seo = await getSeoMessages(typedLocale);

  return (
    <div
      lang={typedLocale}
      dir={getDirection(typedLocale)}
      className={`${geist.variable} ${notoKufiArabic.variable}`}
    >
      <div className={typedLocale === "ar" ? "font-arabic" : undefined}>
        <JsonLd
          data={buildWebsiteSchema({
            locale: typedLocale,
            description: seo.schema.websiteDescription,
          })}
        />
        <JsonLd
          data={buildOrganizationSchema({
            locale: typedLocale,
            description: seo.schema.organizationDescription,
          })}
        />
        <JsonLd
          data={buildAutomotiveBusinessSchema({
            locale: typedLocale,
            description: seo.schema.automotiveBusinessDescription,
          })}
        />
        <NextIntlClientProvider>
          <DocumentLocale />
          <WebsiteLayout>
            {children}
          </WebsiteLayout>
        </NextIntlClientProvider>
      </div>
    </div>
  );
}
