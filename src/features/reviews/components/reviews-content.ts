import { BadgeCheck, Headset, ShieldCheck, Users, Wrench } from "lucide-react";

export type ReviewsOverviewItem = {
  body: string;
  title: string;
};

export type ReviewsFeatureItem = {
  description: string;
  imageAlt: string;
  imageSrc: string;
  title: string;
};

export type ReviewsHighlight = {
  icon: typeof BadgeCheck;
  label: string;
};

const highlightIcons = [ShieldCheck, Users, BadgeCheck, Headset] as const;

export function buildReviewsHighlights(items: ReviewsOverviewItem[]) {
  return items.map((item, index) => ({
    icon: highlightIcons[index] ?? Wrench,
    label: item.title,
  }));
}

export function buildEditorialReviews(
  overviewItems: ReviewsOverviewItem[],
  featureItems: ReviewsFeatureItem[]
) {
  return overviewItems.map((item, index) => ({
    body: item.body,
    imageAlt: featureItems[index % featureItems.length]?.imageAlt,
    imageSrc: featureItems[index % featureItems.length]?.imageSrc,
    kind: index === 0 ? ("featured" as const) : ("standard" as const),
    title: item.title,
  }));
}
