"use client";

import Link from "next/link";
import { useLocale, useMessages, useTranslations } from "next-intl";
import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buttonClassName } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { RevealPanel } from "@/components/ui/reveal-panel";
import { GALLERY_HIGHLIGHT_ICONS } from "@/features/gallery/constants";
import { cn } from "@/lib/utils";
import { images } from "@/constants/image";

type HighlightItem = {
  icon: LucideIcon;
  label: string;
};

export function GalleryHero() {
  const locale = useLocale();
  const messages = useMessages() as {
    gallery: {
      hero: {
        highlights: string[];
      };
    };
  };
  const t = useTranslations("gallery");

  const highlights: HighlightItem[] = GALLERY_HIGHLIGHT_ICONS.slice(0, 3).map((entry, index) => ({
    icon: entry.icon,
    label: messages.gallery.hero.highlights[index],
  }));

  return (
    <Section className="relative overflow-hidden bg-black py-0">
      {/* Background Image & Gradient Layer */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src={images.gallery.galleryHero}
          alt={t("hero.imageAlt")}
          priority
          sizes="100vw"
          className="h-full w-full rounded-none border-0 bg-black shadow-none"
          imageClassName="h-full w-full object-cover object-right sm:object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#000000_0%,rgba(0,0,0,0.95)_35%,rgba(0,0,0,0.7)_55%,rgba(0,0,0,0.2)_80%,transparent_100%)]" />
      </div>

      <Container className="relative z-10 flex min-h-[360px] items-center justify-end px-6 py-8 dir-ltr sm:min-h-[400px] lg:min-h-[440px] lg:px-12">
        <div className="w-full max-w-lg text-right ltr:[text-align:left]">
          
          {/* Main Title & Description */}
          <RevealPanel className="space-y-3">
            <p className="text-sm font-semibold tracking-[0.08em] text-red-500">
              / {t("hero.eyebrow")}
            </p>
            <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="max-w-md text-xs leading-relaxed text-zinc-300 sm:text-sm">
              {t("hero.description")}
            </p>
            {/* Red Horizontal Line */}
            <span className="block h-[2px] w-10 bg-red-600" />
          </RevealPanel>

          {/* Highlights Row */}
          <RevealPanel
            delay={120}
            className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4"
          >
            {highlights.map(({ icon: Icon, label }, index) => (
              <div
                key={label}
                className={cn(
                  "flex flex-col items-start justify-center text-left text-white",
                  index > 0 && "border-s border-white/10 ps-3"
                )}
              >
                <div className="mb-1.5 flex h-8 w-8 items-center justify-center rounded-full border border-red-600/40 bg-red-950/20 text-red-500 shadow-[0_0_10px_rgba(225,6,19,0.2)]">
                  <Icon className="size-4" strokeWidth={1.8} />
                </div>
                <span className="text-xs font-medium text-zinc-200">
                  {label}
                </span>
              </div>
            ))}
          </RevealPanel>

          {/* Action Buttons */}
          <RevealPanel delay={220} className="mt-12 flex items-center justify-start gap-3">
            <Link
              href={`/${locale}/contact`}
              className={buttonClassName({
                className: "bg-red-600 hover:bg-red-700 text-white rounded-[2px] px-5 py-3 text-xs font-bold tracking-wider",
              })}
            >
              {t("hero.primaryCta")}
            </Link>
            <Link
              href={`/${locale}/services`}
              className={buttonClassName({
                variant: "secondary",
                className:
                  "border border-white/20 bg-transparent text-white hover:bg-white/10 rounded-[2px] px-5 py-3 text-xs font-bold tracking-wider",
              })}
            >
              {t("hero.secondaryCta")}
            </Link>
          </RevealPanel>

        </div>
      </Container>
    </Section>
  );
}