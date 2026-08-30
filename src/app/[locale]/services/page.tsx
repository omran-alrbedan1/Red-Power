import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { MediaPageHero } from "@/components/sections/media-page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { images } from "@/constants/image";
import { ServiceCatalogSection } from "@/features/services/components/service-catalog-section";
import { ServiceFeatureGrid } from "@/features/services/components/service-feature-grid";
import { ServicesCtaStrip } from "@/features/services/components/services-cta-strip";
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

  const t = await getTranslations({ locale, namespace: "services.hero" });
  const metadataT = await getTranslations({ locale, namespace: "services.metadata" });

  return (
    <>
      <JsonLd
        data={buildWebPageSchema({
          locale,
          path: "/services",
          title: metadataT("title"),
          description: metadataT("description"),
        })}
      />
      <MediaPageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        imageSrc={images.services.mechanicEngineService}
        imageAlt={t("imageAlt")}
        primaryCtaHref={`/${locale}/contact`}
        primaryCtaLabel={t("primaryCta")}
        secondaryCtaHref={`/${locale}`}
        secondaryCtaLabel={t("secondaryCta")}
      />
      <ServiceCatalogSection />
      <ServiceFeatureGrid />
      <ServicesCtaStrip />
    </>
  );
}
