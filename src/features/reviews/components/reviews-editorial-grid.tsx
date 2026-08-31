"use client";

import { ChevronDown, ShieldCheck } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useState } from "react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buttonClassName } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { RevealPanel } from "@/components/ui/reveal-panel";

import type { ReviewsFeatureItem, ReviewsOverviewItem } from "./reviews-content";
import { buildEditorialReviews } from "./reviews-content";

const INITIAL_VISIBLE_ITEMS = 4;

type ReviewsEditorialGridProps = {
  ctaLabel: string;
  featureItems: ReviewsFeatureItem[];
  items: ReviewsOverviewItem[];
  loadMoreLabel: string;
};

export function ReviewsEditorialGrid({
  ctaLabel,
  featureItems,
  items,
  loadMoreLabel,
}: ReviewsEditorialGridProps) {
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const cards = buildEditorialReviews(items, featureItems);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_ITEMS);
  const visibleCards = cards.slice(0, visibleCount);
  const canLoadMore = visibleCount < cards.length;

  return (
    <Section className="bg-gallery-page py-6">
      <Container className="space-y-5">
        <div className="grid gap-5 lg:grid-cols-[1.18fr_0.82fr]">
          {visibleCards.slice(0, 1).map((card) => (
            <RevealPanel key={card.title} className="overflow-hidden rounded-[14px] border border-red-700/40 bg-gallery-panel shadow-[0_16px_44px_rgba(0,0,0,0.22)]">
              <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                <div className="relative min-h-[300px]">
                  <OptimizedImage
                    src={card.imageSrc}
                    alt={card.imageAlt ?? card.title}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="h-full rounded-none border-0 bg-black shadow-none"
                    imageClassName="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,6,6,0.08),rgba(6,6,6,0.8))]" />
                </div>
                <div className="flex items-center px-6 py-8 sm:px-8">
                  <div className="space-y-5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-red-600/35 bg-red-600/10 text-red-500">
                      <ShieldCheck className="size-5" />
                    </span>
                    <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white">
                      {card.title}
                    </h2>
                    <p className="text-base leading-8 text-zinc-300/92">
                      {card.body}
                    </p>
                    <Link
                      href={`/${locale}/contact`}
                      className={buttonClassName({
                        variant: "secondary",
                        className:
                          "rounded-[4px] border-red-600/50 px-5 py-3 text-xs tracking-[0.18em]",
                      })}
                    >
                      {ctaLabel}
                    </Link>
                  </div>
                </div>
              </div>
            </RevealPanel>
          ))}

          <div className="grid gap-5">
            {visibleCards.slice(1, 3).map((card, index) => (
              <RevealPanel
                key={card.title}
                delay={reduceMotion ? 0 : index * 90}
                className="overflow-hidden rounded-[14px] border border-white/10 bg-gallery-panel px-6 py-7 shadow-[0_14px_36px_rgba(0,0,0,0.18)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                    {card.title}
                  </h3>
                  <span className="text-sm text-zinc-500">01</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-zinc-400">
                  {card.body}
                </p>
                <Link
                  href={`/${locale}/contact`}
                  className="mt-6 inline-flex text-sm font-medium text-red-500 transition hover:text-red-400"
                >
                  {ctaLabel}
                </Link>
              </RevealPanel>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleCards.slice(3).map((card, index) => (
            <RevealPanel
              key={card.title}
              delay={reduceMotion ? 0 : index * 80}
              className="overflow-hidden rounded-[14px] border border-white/10 bg-gallery-panel shadow-[0_14px_36px_rgba(0,0,0,0.18)]"
            >
              <div className="relative min-h-[220px]">
                <OptimizedImage
                  src={card.imageSrc}
                  alt={card.imageAlt ?? card.title}
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
                  className="h-full rounded-none border-0 bg-black shadow-none"
                  imageClassName="absolute inset-0 h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,6,6,0.08),rgba(6,6,6,0.88))]" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-300/88">
                    {card.body}
                  </p>
                </div>
              </div>
            </RevealPanel>
          ))}
        </div>

        {canLoadMore ? (
          <RevealPanel className="flex justify-center pt-3">
            <button
              type="button"
              onClick={() => setVisibleCount(cards.length)}
              className={buttonClassName({
                variant: "secondary",
                className:
                  "min-w-[260px] rounded-[4px] border-red-600/55 bg-transparent px-8 py-4 text-sm font-semibold text-white hover:bg-red-600/8",
              })}
            >
              <span className="flex items-center gap-2">
                <ChevronDown className="size-4 text-red-500" />
                {loadMoreLabel}
              </span>
            </button>
          </RevealPanel>
        ) : null}
      </Container>
    </Section>
  );
}
