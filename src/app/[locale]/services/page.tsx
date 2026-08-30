import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { MediaPageHero } from "@/components/sections/media-page-hero";
import { images } from "@/constants/image";
import { ServiceCatalogSection } from "@/features/services/components/service-catalog-section";
import { ServiceFeatureGrid } from "@/features/services/components/service-feature-grid";
import { ServicesCtaStrip } from "@/features/services/components/services-cta-strip";
import { isValidLocale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/page-metadata";

type ServicesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ServicesPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "services" });

  return buildPageMetadata({
    locale,
    path: "/services",
    title: t("metadata.title"),
    description: t("metadata.description"),
  });
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "services.hero" });

  return (
    <>
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
