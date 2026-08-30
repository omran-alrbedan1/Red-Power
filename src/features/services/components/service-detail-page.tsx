import { type ServiceSlug } from "@/config/services";
import {
  getServiceVisualVariant,
  type ServiceDetailEntry,
  type ServiceDetailMessages,
} from "@/features/services/service-detail-content";

import { ServiceDetailCta } from "./service-detail-cta";
import { ServiceDetailFeatureStories } from "./service-detail-feature-stories";
import { ServiceDetailHero } from "./service-detail-hero";
import { ServiceDetailProcess } from "./service-detail-process";
import { ServiceDetailStatement } from "./service-detail-statement";

type ServiceDetailPageProps = {
  entry: ServiceDetailEntry;
  heroImageSrc: string;
  locale: "ar" | "en";
  messages: ServiceDetailMessages;
  slug: ServiceSlug;
};

export function ServiceDetailPage({
  entry,
  heroImageSrc,
  locale,
  messages,
  slug,
}: ServiceDetailPageProps) {
  const variant = getServiceVisualVariant(slug);

  return (
    <div className=" text-white">
      <ServiceDetailHero
        entry={entry}
        eyebrow={messages.shared.eyebrow}
        heroImageSrc={heroImageSrc}
        locale={locale}
        primaryCtaLabel={messages.cta.primaryLabel}
        secondaryCtaHref={`/${locale}${messages.shared.secondaryCtaPath}`}
        secondaryCtaLabel={messages.shared.secondaryCtaLabel}
        variant={variant}
      />
      <ServiceDetailStatement
        description={entry.process.description}
        eyebrow={messages.shared.processEyebrow}
        locale={locale}
        supportingCopy={entry.hero.description}
        title={entry.process.title}
      />
      <ServiceDetailProcess
        ctaLabel={messages.shared.processLinkLabel}
        description={entry.process.description}
        eyebrow={messages.shared.processEyebrow}
        items={entry.process.items}
        locale={locale}
        title={entry.process.title}
      />
      <ServiceDetailFeatureStories
        ctaLabel={messages.shared.processLinkLabel}
        items={entry.featureItems}
        locale={locale}
        variant={variant}
      />
      <ServiceDetailCta
        entry={entry}
        eyebrow={messages.shared.eyebrow}
        imageSrc={heroImageSrc}
        locale={locale}
        primaryLabel={messages.cta.primaryLabel}
        secondaryHref={`/${locale}${messages.shared.secondaryCtaPath}`}
        secondaryLabel={messages.cta.secondaryLabel}
        variant={variant}
      />
    </div>
  );
}
