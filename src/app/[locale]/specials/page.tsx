import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import {
  SpecialsCustomServiceRequest,
  SpecialsHero,
  SpecialsInquirySection,
  SpecialsMainOffers,
  SpecialsSelectedOffers,
} from "@/features/specials/components";
import { isValidLocale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getSeoMessages } from "@/lib/seo-messages";
import { buildWebPageSchema } from "@/lib/seo";

type SpecialsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: SpecialsPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "specials" });
  const seo = await getSeoMessages(locale);

  return buildPageMetadata({
    locale,
    path: "/specials",
    title: t("metadata.title"),
    description: t("metadata.description"),
    classification: seo.classification,
    openGraphAlt: seo.ogImageAlt,
    keywords: [...seo.keywords.default, ...seo.keywords.routes.specials],
  });
}

export default async function SpecialsPage({ params }: SpecialsPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "specials" });

  return (
    <>
      <JsonLd
        data={buildWebPageSchema({
          locale,
          path: "/specials",
          title: t("metadata.title"),
          description: t("metadata.description"),
        })}
      />
      <SpecialsHero />
      <SpecialsSelectedOffers />
      <SpecialsMainOffers />
      <SpecialsInquirySection />
        <SpecialsCustomServiceRequest/>
    </>
  );
}
