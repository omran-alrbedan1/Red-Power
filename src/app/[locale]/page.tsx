import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/sections/hero-section";
import { JsonLd } from "@/components/seo/json-ld";
import {
  BrandIntroductionSection,
  PerformanceSection,
  ServicesOverviewSection,
  WhyRedPowerSection,
} from "@/features/home/components";
import { isValidLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { getSeoMessages } from "@/lib/seo-messages";
import { buildWebPageSchema } from "@/lib/seo";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "home" });
  const seo = await getSeoMessages(locale);

  return buildMetadata(locale, {
    title: t("metadata.title"),
    description: t("metadata.description"),
    classification: seo.classification,
    openGraphAlt: seo.ogImageAlt,
    keywords: [...seo.keywords.default, ...seo.keywords.routes.home],
  });
}

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <>
      <JsonLd
        data={buildWebPageSchema({
          locale,
          path: "",
          title: t("metadata.title"),
          description: t("metadata.description"),
        })}
      />
      <HeroSection />
      <BrandIntroductionSection />
      <ServicesOverviewSection />
      <PerformanceSection />
      <WhyRedPowerSection />
    </>
  );
}
