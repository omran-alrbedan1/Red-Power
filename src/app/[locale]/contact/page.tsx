import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { MediaPageHero } from "@/components/sections/media-page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { images } from "@/constants/image";
import { ContactHubSection } from "@/features/contact/components";
import {
  ServiceDetailFeatureGrid,
  ServiceDetailProcessSection,
  ServicesCtaStrip,
} from "@/features/services/components";
import { isValidLocale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getSeoMessages } from "@/lib/seo-messages";
import { buildWebPageSchema } from "@/lib/seo";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ContactPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "contact" });
  const seo = await getSeoMessages(locale);

  return buildPageMetadata({
    locale,
    path: "/contact",
    title: t("metadata.title"),
    description: t("metadata.description"),
    classification: seo.classification,
    openGraphAlt: seo.ogImageAlt,
    keywords: [...seo.keywords.default, ...seo.keywords.routes.contact],
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <>
      <JsonLd
        data={buildWebPageSchema({
          locale,
          path: "/contact",
          title: t("metadata.title"),
          description: t("metadata.description"),
        })}
      />
      <MediaPageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        imageSrc={images.contact.hero}
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
      <ContactHubSection />
      <ServicesCtaStrip />
    </>
  );
}
