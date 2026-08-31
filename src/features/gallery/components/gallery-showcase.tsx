"use client";

import { useMessages, useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import { GALLERY_ITEMS, type GalleryItemId } from "@/features/gallery/constants";

import { GalleryCta } from "./gallery-cta";
import { GalleryGrid } from "./gallery-grid";
import { GalleryHero } from "./gallery-hero";
import { GalleryPreviewDialog } from "./gallery-preview-dialog";

export type GalleryItemView = {
  category: string;
  id: GalleryItemId;
  imageAlt: string;
  imageSrc: string;
  title: string;
};

export function GalleryShowcase() {
  const messages = useMessages() as {
    gallery: {
      grid: {
        items: Record<
          GalleryItemId,
          { category: string; imageAlt: string; title: string }
        >;
      };
    };
  };
  const t = useTranslations("gallery");
  const allLabel = t("actions.all");
  const translationItems = messages.gallery.grid.items;

  const items = useMemo<GalleryItemView[]>(
    () =>
      GALLERY_ITEMS.map((item) => ({
        ...translationItems[item.id],
        id: item.id,
        imageSrc: item.imageSrc,
      })),
    [translationItems]
  );

  const filters = useMemo(
    () => [allLabel, ...Array.from(new Set(items.map((item) => item.category)))],
    [allLabel, items]
  );

  const [activeFilter, setActiveFilter] = useState(allLabel);
  const [visibleCount, setVisibleCount] = useState(4);
  const [previewItem, setPreviewItem] = useState<GalleryItemView | null>(null);

  const filteredItems =
    activeFilter === allLabel
      ? items
      : items.filter((item) => item.category === activeFilter);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredItems.length;

  function handleFilterChange(filter: string) {
    setActiveFilter(filter);
    setVisibleCount(4);
  }

  function handleLoadMore() {
    setVisibleCount((current) => current + 4);
  }

  return (
    <>
      <GalleryHero />
      <GalleryGrid
        activeFilter={activeFilter}
        canLoadMore={canLoadMore}
        filters={filters}
        items={visibleItems}
        onFilterChange={handleFilterChange}
        onLoadMore={handleLoadMore}
        onPreview={setPreviewItem}
      />
      <GalleryCta />
      <GalleryPreviewDialog
        item={previewItem}
        onClose={() => setPreviewItem(null)}
      />
    </>
  );
}
