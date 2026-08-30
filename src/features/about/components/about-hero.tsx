"use client";

import Link from "next/link";
import { Calendar, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { images } from "@/constants/image";
import { cn } from "@/lib/utils";

export function AboutHero() {
  const locale = useLocale();
  const t = useTranslations("about.hero");
  const isArabic = locale === "ar";

  const titleWords = t("title").split(" ");
  const mainTitle = titleWords.slice(0, -1).join(" ");
  const highlightedWord = titleWords[titleWords.length - 1];

  return (
    <Section className="relative overflow-hidden border-b md:-mt-32 border-white/8 bg-black py-0">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src={images.about.hero}
          alt={t("imageAlt")}
          priority
          sizes="100vw"
          className="h-full w-full rounded-none border-0 bg-black shadow-none"
          imageClassName="absolute inset-0 h-full w-full object-cover object-center brightness-[0.75] contrast-[1.1]"
        />
      </div>

      <Container className="relative z-10 py-12 sm:py-16 lg:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          
          {/* Content Block */}
          <div
            dir={isArabic ? "rtl" : "ltr"}
            className={cn(
              "flex flex-col justify-center lg:col-span-6 xl:col-span-5",
              isArabic ? "text-right" : "text-left"
            )}
          >
            {/* Top Red Tech Accent Line */}
            <div className="mb-4 flex items-center gap-2">
              <div className="h-4 w-1 -skew-x-12 bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
              <p className="text-xs font-bold uppercase tracking-widest text-red-500 sm:text-sm">
                {t("eyebrow")}
              </p>
            </div>

            {/* Title with Glowing Red Accent */}
            <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {mainTitle}{" "}
              <span className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                {highlightedWord}
              </span>
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-xl text-xs leading-relaxed text-zinc-300 sm:text-sm lg:text-base">
              {t("description")}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {/* Primary CTA (Solid Red Button with Calendar Icon) */}
              <Link
                href={`/${locale}/contact`}
                className="group inline-flex items-center gap-3 rounded-sm bg-red-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-all hover:bg-red-700 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]"
              >
                <span>{t("primaryCta")}</span>
                <Calendar className="size-4 transition-transform group-hover:scale-110" />
              </Link>

              {/* Secondary CTA (Outlined Dark Button with Phone Icon) */}
              <Link
                href={`/${locale}/contact`}
                className="group inline-flex items-center gap-3 rounded-sm border border-zinc-800 bg-black/60 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-200 transition-all hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
              >
                <span>{t("secondaryCta")}</span>
                <Phone className="size-4 text-zinc-400 transition-transform group-hover:scale-110 group-hover:text-white" />
              </Link>
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}