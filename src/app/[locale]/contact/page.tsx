import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import {
  ContactHero,
  ContactHubSection,
  ContactLocation,
} from "@/features/contact/components";
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
      <ContactHero />
      <ContactHubSection />
      <ContactLocation/>
    </>
  );
}
  