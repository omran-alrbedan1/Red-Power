import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { MediaPageHero } from "@/components/sections/media-page-hero";
import { images } from "@/constants/image";
import { GalleryGridSection } from "@/features/gallery/components/gallery-grid-section";
import { ServicesCtaStrip } from "@/features/services/components/services-cta-strip";
import { isValidLocale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/page-metadata";

type GalleryPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: GalleryPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "gallery" });

  return buildPageMetadata({
    locale,
    path: "/gallery",
    title: t("metadata.title"),
    description: t("metadata.description"),
  });
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "gallery" });

  return (
    <>
      <MediaPageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        imageSrc={images.gallery.dodgeGarageWide}
        imageAlt={t("hero.imageAlt")}
        primaryCtaHref={`/${locale}/contact`}
        primaryCtaLabel={t("hero.primaryCta")}
        secondaryCtaHref={`/${locale}/services`}
        secondaryCtaLabel={t("hero.secondaryCta")}
      />
      <GalleryGridSection />
      <ServicesCtaStrip />
    </>
  );
}
