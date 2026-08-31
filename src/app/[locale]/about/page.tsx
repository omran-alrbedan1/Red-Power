import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import {
  AboutCta,
  AboutHero,
  AboutPassion,
  AboutStats,
  AboutTeam,
} from "@/features/about/components";
import { isValidLocale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getSeoMessages } from "@/lib/seo-messages";
import { buildWebPageSchema } from "@/lib/seo";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AboutPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "about" });
  const seo = await getSeoMessages(locale);

  return buildPageMetadata({
    locale,
    path: "/about",
    title: t("metadata.title"),
    description: t("metadata.description"),
    classification: seo.classification,
    openGraphAlt: seo.ogImageAlt,
    keywords: [...seo.keywords.default, ...seo.keywords.routes.about],
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <div>
      <JsonLd
        data={buildWebPageSchema({
          locale,
          path: "/about",
          title: t("metadata.title"),
          description: t("metadata.description"),
        })}
      />
      <AboutHero />
      <AboutPassion />
      <AboutStats />
      <AboutTeam />
      <AboutCta />
    </div>
  );
}
