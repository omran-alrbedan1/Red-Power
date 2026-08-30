import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { type SiteLocale } from "@/config/site";
import { ServicesShowcaseCta } from "@/features/services/components/services-showcase-cta";
import { ServicesShowcaseGroups } from "@/features/services/components/services-showcase-groups";
import { ServicesShowcaseHero } from "@/features/services/components/services-showcase-hero";
import { getServicesMessages } from "@/features/services/services-page-messages";
import { isValidLocale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getSeoMessages } from "@/lib/seo-messages";
import { buildWebPageSchema } from "@/lib/seo";

type ServicesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ServicesPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "services" });
  const seo = await getSeoMessages(locale);

  return buildPageMetadata({
    locale,
    path: "/services",
    title: t("metadata.title"),
    description: t("metadata.description"),
    classification: seo.classification,
    openGraphAlt: seo.ogImageAlt,
    keywords: [...seo.keywords.default, ...seo.keywords.routes.services],
  });
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as SiteLocale;
  const messages = await getServicesMessages(typedLocale);
  const { hero, catalog, metadata } = messages;

  return (
    <>
      <JsonLd
        data={buildWebPageSchema({
          locale: typedLocale,
          path: "/services",
          title: metadata.title,
          description: metadata.description,
        })}
      />

      <div className="bg-page-deep pb-16 text-white sm:pb-20">
        <ServicesShowcaseHero hero={hero} locale={typedLocale} />
        <ServicesShowcaseGroups catalog={catalog} locale={typedLocale} />
        <ServicesShowcaseCta />
      </div>
    </>
  );
}
