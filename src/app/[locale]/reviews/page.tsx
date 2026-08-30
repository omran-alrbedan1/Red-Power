import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { MediaPageHero } from "@/components/sections/media-page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { images } from "@/constants/image";
import { ServiceDetailFeatureGrid } from "@/features/services/components/service-detail-feature-grid";
import { ServiceDetailProcessSection } from "@/features/services/components/service-detail-process-section";
import { ServicesCtaStrip } from "@/features/services/components/services-cta-strip";
import { isValidLocale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getSeoMessages } from "@/lib/seo-messages";
import { buildWebPageSchema } from "@/lib/seo";

type ReviewsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ReviewsPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "reviews" });
  const seo = await getSeoMessages(locale);

  return buildPageMetadata({
    locale,
    path: "/reviews",
    title: t("metadata.title"),
    description: t("metadata.description"),
    classification: seo.classification,
    openGraphAlt: seo.ogImageAlt,
    keywords: [...seo.keywords.default, ...seo.keywords.routes.reviews],
  });
}

export default async function ReviewsPage({ params }: ReviewsPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "reviews" });

  return (
    <>
      <JsonLd
        data={buildWebPageSchema({
          locale,
          path: "/reviews",
          title: t("metadata.title"),
          description: t("metadata.description"),
        })}
      />
      <MediaPageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        imageSrc={images.reviews.dodgeGarageWide}
        imageAlt={t("hero.imageAlt")}
        primaryCtaHref={`/${locale}/contact`}
        primaryCtaLabel={t("hero.primaryCta")}
        secondaryCtaHref={`/${locale}/services`}
        secondaryCtaLabel={t("hero.secondaryCta")}
      />
      <ServiceDetailProcessSection
        eyebrow={t("overview.eyebrow")}
        title={t("overview.title")}
        description={t("overview.description")}
        ctaLabel={t("overview.cta")}
        items={t.raw("overview.items")}
      />
      <ServiceDetailFeatureGrid
        eyebrow={t("features.eyebrow")}
        ctaLabel={t("features.cta")}
        items={t.raw("features.items")}
      />
      <ServicesCtaStrip />
    </>
  );
}
