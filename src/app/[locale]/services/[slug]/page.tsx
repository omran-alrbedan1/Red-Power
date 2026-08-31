import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { getServiceBySlug, serviceCatalog } from "@/config/services";
import { type SiteLocale } from "@/config/site";
import { ServiceDetailPage } from "@/features/services/components";
import { type ServiceDetailMessages } from "@/features/services/service-detail-content";
import { isValidLocale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getSeoMessages } from "@/lib/seo-messages";
import { buildServiceSchema, buildWebPageSchema } from "@/lib/seo";

type ServiceDetailsPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return serviceCatalog.flatMap((service) => [
    { locale: "ar", slug: service.slug },
    { locale: "en", slug: service.slug },
  ]);
}

async function getServiceEntry(locale: SiteLocale, slug: string) {
  const messages =
    locale === "ar"
      ? ((await import("@/messages/ar/service-details.json")).default as ServiceDetailMessages)
      : ((await import("@/messages/en/service-details.json")).default as ServiceDetailMessages);
  return {
    messages,
    entry: messages.entries[slug],
  };
}

export async function generateMetadata({ params }: ServiceDetailsPageProps) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const service = getServiceBySlug(slug);
  const { entry } = await getServiceEntry(locale, slug as string);
  const seo = await getSeoMessages(locale);

  if (!service || !entry) {
    return {};
  }

  return buildPageMetadata({
    locale,
    path: `/services/${slug}`,
    title: entry.metadata.title,
    description: entry.metadata.description,
    classification: seo.classification,
    openGraphAlt: seo.ogImageAlt,
    keywords: [...seo.keywords.default, ...seo.keywords.serviceDetails],
  });
}

export default async function ServiceDetailsPage({
  params,
}: ServiceDetailsPageProps) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const service = getServiceBySlug(slug);
  const { messages, entry } = await getServiceEntry(locale, slug);

  if (!service || !entry) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={buildWebPageSchema({
          locale,
          path: `/services/${slug}`,
          title: entry.metadata.title,
          description: entry.metadata.description,
        })}
      />
      <JsonLd
        data={buildServiceSchema({
          locale,
          path: `/services/${slug}`,
          title: entry.metadata.title,
          description: entry.metadata.description,
        })}
      />
      <ServiceDetailPage
        entry={entry}
        heroImageSrc={service.detailImageSrc}
        locale={locale}
        messages={messages}
        slug={service.slug}
      />
      
    </>
  );
}
