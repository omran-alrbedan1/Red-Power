import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { GalleryShowcase } from "@/features/gallery/components";
import { isValidLocale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getSeoMessages } from "@/lib/seo-messages";
import { buildWebPageSchema } from "@/lib/seo";

type GalleryPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: GalleryPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "gallery" });
  const seo = await getSeoMessages(locale);

  return buildPageMetadata({
    locale,
    path: "/gallery",
    title: t("metadata.title"),
    description: t("metadata.description"),
    classification: seo.classification,
    openGraphAlt: seo.ogImageAlt,
    keywords: [...seo.keywords.default, ...seo.keywords.routes.gallery],
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
      <JsonLd
        data={buildWebPageSchema({
          locale,
          path: "/gallery",
          title: t("metadata.title"),
          description: t("metadata.description"),
        })}
      />
      <GalleryShowcase />
    </>
  );
}
