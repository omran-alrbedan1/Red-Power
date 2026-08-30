import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/sections/hero-section";
import { BrandIntroductionSection } from "@/features/home/components/brand-introduction-section";
import { PerformanceSection } from "@/features/home/components/performance-section";
import { ServicesOverviewSection } from "@/features/home/components/services-overview-section";
import { WhyRedPowerSection } from "@/features/home/components/why-red-power-section";
import { isValidLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "home" });

  return buildMetadata(locale, {
    title: t("metadata.title"),
    description: t("metadata.description"),
  });
}

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <>
      <HeroSection />
      <BrandIntroductionSection />
      <ServicesOverviewSection />
      <PerformanceSection />
      <WhyRedPowerSection />
    </>
  );
}
