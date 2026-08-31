"use client";

import Link from "next/link";
import { useLocale, useMessages, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buttonClassName } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { RevealPanel } from "@/components/ui/reveal-panel";
import {
  GALLERY_CTA_IMAGE,
  type GalleryItemId,
} from "@/features/gallery/constants";
import { cn } from "@/lib/utils";

export function GalleryCta() {
  const locale = useLocale();
  const t = useTranslations("gallery");
  const isArabic = locale === "ar";

  return (
    <Section className="bg-gallery-page pt-8">
      <Container>
        <div className="overflow-hidden rounded-[20px] border border-white/10 bg-gallery-panel shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
          <div className="grid items-stretch lg:grid-cols-[0.95fr_1.05fr]">
            <RevealPanel className="space-y-6 px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
              <p className="text-xs font-semibold tracking-[0.24em] text-red-500">
                {t("cta.eyebrow")}
              </p>
              <h2 className="max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                {t("cta.title")}
              </h2>
              <p className="max-w-2xl text-base leading-8 text-zinc-400">
                {t("cta.description")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/${locale}/contact`}
                  className={buttonClassName({
                    className: "rounded-[4px] px-6 py-3 text-xs tracking-[0.18em]",
                  })}
                >
                  {t("hero.primaryCta")}
                </Link>
                <Link
                  href={`/${locale}/services`}
                  className={buttonClassName({
                    variant: "secondary",
                    className:
                      "rounded-[4px] border-white/15 px-6 py-3 text-xs tracking-[0.18em]",
                  })}
                >
                  {t("hero.secondaryCta")}
                </Link>
              </div>
            </RevealPanel>

            <RevealPanel direction={isArabic ? "left" : "right"} className="relative min-h-[260px]">
              <OptimizedImage
                src={GALLERY_CTA_IMAGE}
                alt={'gallery cta'}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-full rounded-none border-0 bg-black shadow-none"
                imageClassName={cn(
                  "absolute inset-0 h-full w-full object-cover",
                  isArabic ? "object-left" : "object-right"
                )}
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.18),rgba(10,10,10,0.68))]" />
            </RevealPanel>
          </div>
        </div>
      </Container>
    </Section>
  );
}
