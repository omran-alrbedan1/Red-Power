"use client";

import { ChevronDown } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useLocale, useMessages, useTranslations } from "next-intl";
import { useState } from "react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buttonClassName } from "@/components/ui/button";
import { RevealPanel } from "@/components/ui/reveal-panel";

import { ReviewCard } from "./review-card";
import type { ReviewsTestimonialItem } from "./reviews-content";

const INITIAL_VISIBLE_ITEMS = 6;

export function ReviewsGrid() {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const reduceMotion = useReducedMotion();
  const t = useTranslations("reviews");
  const messages = useMessages() as {
    reviews: {
      testimonials: {
        items: ReviewsTestimonialItem[];
      };
    };
  };
  const cards = messages.reviews.testimonials.items;
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_ITEMS);
  const visibleCards = cards.slice(0, visibleCount);
  const canLoadMore = visibleCount < cards.length;

  return (
    <Section className="bg-gallery-page pt-8">
      <Container className="space-y-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleCards.map((card, index) => (
            <RevealPanel
              key={`${card.name}-${card.vehicle}`}
              delay={reduceMotion ? 0 : index * 80}
              className="h-full"
            >
              <ReviewCard item={card} />
            </RevealPanel>
          ))}
        </div>

        {canLoadMore ? (
          <RevealPanel className="flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount(cards.length)}
              className={buttonClassName({
                variant: "secondary",
                className:
                  "min-w-[240px] rounded-[3px] border-red-600/55 bg-transparent px-8 py-4 text-sm font-semibold text-white hover:bg-red-600/8",
              })}
            >
              <span className={isArabic ? "flex flex-row-reverse items-center justify-center gap-2" : "flex items-center justify-center gap-2"}>
                <ChevronDown className="size-4 text-red-500" />
                {t("actions.loadMore")}
              </span>
            </button>
          </RevealPanel>
        ) : null}
      </Container>
    </Section>
  );
}
