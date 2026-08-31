import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { ReviewsShowcase } from "@/features/reviews/components";
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
      <ReviewsShowcase />
    </>
  );
}
