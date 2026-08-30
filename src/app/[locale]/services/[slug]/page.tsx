import { notFound } from "next/navigation";

import { MediaPageHero } from "@/components/sections/media-page-hero";
import { getServiceBySlug, serviceCatalog } from "@/config/services";
import { type SiteLocale } from "@/config/site";
import { ServiceDetailFeatureGrid } from "@/features/services/components/service-detail-feature-grid";
import { ServiceDetailProcessSection } from "@/features/services/components/service-detail-process-section";
import { ServicesCtaStrip } from "@/features/services/components/services-cta-strip";
import { isValidLocale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/page-metadata";

type ServiceDetailsPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

type ServiceDetailsMessages = {
  cta: {
    primaryLabel: string;
    secondaryLabel: string;
  };
  entries: Record<
    string,
    {
      featureItems: Array<{
        description: string;
        imageAlt: string;
        imageSrc: string;
        title: string;
      }>;
      hero: {
        description: string;
        imageAlt: string;
        title: string;
      };
      metadata: {
        description: string;
        title: string;
      };
      process: {
        description: string;
        items: Array<{
          body: string;
          title: string;
        }>;
        title: string;
      };
    }
  >;
  shared: {
    eyebrow: string;
    processEyebrow: string;
    processLinkLabel: string;
    secondaryCtaLabel: string;
    secondaryCtaPath: string;
  };
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
      ? ((await import("@/messages/ar/service-details.json")).default as ServiceDetailsMessages)
      : ((await import("@/messages/en/service-details.json")).default as ServiceDetailsMessages);
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

  if (!service || !entry) {
    return {};
  }

  return buildPageMetadata({
    locale,
    path: `/services/${slug}`,
    title: entry.metadata.title,
    description: entry.metadata.description,
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
      <MediaPageHero
        eyebrow={messages.shared.eyebrow}
        title={entry.hero.title}
        description={entry.hero.description}
        imageSrc={service.detailImageSrc}
        imageAlt={entry.hero.imageAlt}
        primaryCtaHref={`/${locale}/contact`}
        primaryCtaLabel={messages.cta.primaryLabel}
        secondaryCtaHref={`/${locale}${messages.shared.secondaryCtaPath}`}
        secondaryCtaLabel={messages.shared.secondaryCtaLabel}
      />
      <ServiceDetailProcessSection
        eyebrow={messages.shared.processEyebrow}
        title={entry.process.title}
        description={entry.process.description}
        ctaLabel={messages.shared.processLinkLabel}
        items={entry.process.items}
      />
      <ServiceDetailFeatureGrid
        eyebrow={messages.shared.eyebrow}
        ctaLabel={messages.shared.processLinkLabel}
        items={entry.featureItems}
      />
      <ServicesCtaStrip />
    </>
  );
}
