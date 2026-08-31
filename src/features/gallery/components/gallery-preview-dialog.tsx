"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { OptimizedImage } from "@/components/ui/optimized-image";
import type { GalleryItemView } from "./gallery-showcase";

type GalleryPreviewDialogProps = {
  item: GalleryItemView | null;
  onClose: () => void;
};

export function GalleryPreviewDialog({
  item,
  onClose,
}: GalleryPreviewDialogProps) {
  const t = useTranslations("gallery");

  useEffect(() => {
    if (!item) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [item, onClose]);

  if (!item) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/82 px-4 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
        aria-label={t("actions.closePreview")}
      />
      <div className="relative z-10 w-full max-w-6xl overflow-hidden rounded-[18px] border border-white/10 bg-gallery-panel shadow-[0_28px_80px_rgba(0,0,0,0.5)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute end-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-black/50 text-white transition hover:border-red-500/60 hover:text-red-400"
          aria-label={t("actions.closePreview")}
        >
          <X className="size-5" />
        </button>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
          <OptimizedImage
            src={item.imageSrc}
            alt={item.imageAlt}
            priority
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="aspect-[16/11] rounded-none border-0 bg-black shadow-none lg:h-full"
            imageClassName="absolute inset-0 h-full w-full object-cover"
          />
          <div className="space-y-4 border-t border-white/10 px-6 py-6 lg:border-t-0 lg:border-s lg:px-8 lg:py-8">
            <p className="text-[11px] font-semibold tracking-[0.24em] text-red-400">
              {item.category}
            </p>
            <h3 className="text-3xl font-semibold tracking-[-0.04em] text-white">
              {item.title}
            </h3>
            <p className="text-base leading-7 text-zinc-400">
              {item.imageAlt}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
