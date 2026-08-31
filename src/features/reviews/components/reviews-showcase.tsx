"use client";

import { useLocale, useTranslations } from "next-intl";

import { images } from "@/constants/image";

import {
  buildReviewsHighlights,
  type ReviewsFeatureItem,
  type ReviewsOverviewItem,
} from "./reviews-content";
import { ReviewsCta } from "./reviews-cta";
import { ReviewsEditorialGrid } from "./reviews-editorial-grid";
import { ReviewsHero } from "./reviews-hero";
import { ReviewsTrustPanel } from "./reviews-trust-panel";

export function ReviewsShowcase() {
  const locale = useLocale();
  const t = useTranslations("reviews");
  const overviewItems = t.raw("overview.items") as ReviewsOverviewItem[];
  const featureItems = t.raw("features.items") as ReviewsFeatureItem[];
  const highlights = buildReviewsHighlights(overviewItems).slice(0, 3);

  return (
    <>
      <ReviewsHero
        description={t("hero.description")}
        eyebrow={t("hero.eyebrow")}
        highlights={highlights}
        imageAlt={t("hero.imageAlt")}
        imageSrc={images.reviews.dodgeGarageWide}
        isArabic={locale === "ar"}
        primaryCtaHref={`/${locale}/contact`}
        primaryCtaLabel={t("hero.primaryCta")}
        secondaryHeadline={t("overview.title")}
        secondaryCtaHref={`/${locale}/services`}
        secondaryCtaLabel={t("hero.secondaryCta")}
        title={t("hero.title")}
      />

      <ReviewsTrustPanel
        description={t("overview.description")}
        items={overviewItems}
        title={t("overview.eyebrow")}
      />

      <ReviewsEditorialGrid
        ctaLabel={t("features.cta")}
        featureItems={featureItems}
        items={overviewItems}
        loadMoreLabel={t("actions.loadMore")}
      />

      <ReviewsCta
        description={t("cta.description")}
        eyebrow={t("cta.eyebrow")}
        imageAlt={featureItems[1]?.imageAlt ?? t("hero.imageAlt")}
        imageSrc={featureItems[1]?.imageSrc ?? images.reviews.carMaintenanceWorkshop}
        primaryCtaHref={`/${locale}/contact`}
        primaryCtaLabel={t("hero.primaryCta")}
        secondaryCtaHref={`/${locale}/services`}
        secondaryCtaLabel={t("hero.secondaryCta")}
        title={t("cta.title")}
      />
    </>
  );
}
