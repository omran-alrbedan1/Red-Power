"use client";

import { ChevronDown, Grid2x2, Search, SlidersHorizontal } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buttonClassName } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { RevealPanel } from "@/components/ui/reveal-panel";
import { cn } from "@/lib/utils";
import type { GalleryItemView } from "./gallery-showcase";

type GalleryGridProps = {
  activeFilter: string;
  canLoadMore: boolean;
  filters: string[];
  items: GalleryItemView[];
  onFilterChange: (filter: string) => void;
  onLoadMore: () => void;
  onPreview: (item: GalleryItemView) => void;
};

export function GalleryGrid({
  activeFilter,
  canLoadMore,
  filters,
  items,
  onFilterChange,
  onLoadMore,
  onPreview,
}: GalleryGridProps) {
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const t = useTranslations("gallery");
  const isArabic = locale === "ar";

  return (
    <Section className="bg-gallery-page pt-6 lg:pt-8">
      <Container className="space-y-6">
        <RevealPanel className={cn(isArabic ? "text-right" : "text-left")}>
          <p className="text-sm font-semibold tracking-[0.22em] text-red-500">
            {t("overview.eyebrow")}
          </p>
        </RevealPanel>

        <RevealPanel delay={80}>
          <div className="overflow-hidden rounded-[18px] border border-white/10 bg-gallery-panel shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
            <div
              className={cn(
                "flex gap-2 overflow-x-auto px-4 py-3 scrollbar-none sm:px-5",
                isArabic ? "sm:flex-row-reverse" : ""
              )}
            >
              <div className="me-2 flex shrink-0 items-center gap-2 rounded-[10px] border border-red-600/35 bg-black/35 px-4 py-3 text-sm text-zinc-100">
                <SlidersHorizontal className="size-4 text-red-500" />
              </div>

              {filters.map((filter) => {
                const isActive = filter === activeFilter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => onFilterChange(filter)}
                    className={cn(
                      "relative shrink-0 rounded-[10px] px-5 py-3 text-lg font-semibold text-zinc-200 transition duration-200 hover:text-white",
                      isActive && "text-red-500"
                    )}
                  >
                    {filter}
                    <span
                      className={cn(
                        "absolute inset-x-3 -bottom-3 h-0.5 rounded-full bg-transparent transition-colors",
                        isActive && "bg-red-600"
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </RevealPanel>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => (
            <RevealPanel
              key={`${item.category}-${item.title}`}
              delay={reduceMotion ? 0 : index * 70}
            >
              <article
                role="button"
                tabIndex={0}
                onClick={() => onPreview(item)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onPreview(item);
                  }
                }}
                aria-label={`${t("actions.preview")}: ${item.title}`}
                className="group relative overflow-hidden rounded-[14px] border border-white/10 bg-gallery-surface shadow-[0_18px_44px_rgba(0,0,0,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <OptimizedImage
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
                  className="aspect-[1.12/1] rounded-none border-0 bg-black shadow-none"
                  imageClassName="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.045]"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.02)_0%,rgba(5,5,5,0.24)_40%,rgba(5,5,5,0.9)_100%)] transition duration-300 group-hover:bg-[linear-gradient(180deg,rgba(5,5,5,0.02)_0%,rgba(5,5,5,0.34)_38%,rgba(5,5,5,0.94)_100%)]" />
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600/45 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onPreview(item);
                  }}
                  aria-label={`${t("actions.preview")}: ${item.title}`}
                  className="absolute bottom-4 left-4 z-20 flex h-10 w-10 items-center justify-center rounded-[6px] bg-red-700 text-white transition duration-200 hover:bg-red-600 focus-visible:outline-none"
                >
                  <Search className="size-4" strokeWidth={2} />
                </button>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[11px] font-semibold tracking-[0.24em] text-red-400">
                    {item.category}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                    {item.title}
                  </h3>
                </div>
              </article>
            </RevealPanel>
          ))}
        </div>

        {canLoadMore ? (
          <RevealPanel delay={140} className="flex justify-center pt-2">
            <button
              type="button"
              onClick={onLoadMore}
              className={buttonClassName({
                variant: "secondary",
                className:
                  "min-w-[220px] rounded-[6px] border-red-600/60 bg-transparent px-8 py-4 text-sm font-semibold text-white hover:bg-red-600/8",
              })}
            >
                <span className="flex items-center gap-2">
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
