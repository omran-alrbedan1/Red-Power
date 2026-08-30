"use client";

import Link from "next/link";
import { Wrench, Shield, Award, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buttonClassName } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { images } from "@/constants/image";

const ICON_MAP = {
  wrench: Wrench,
  shield: Shield,
  award: Award,
};

export function SpecialsHero() {
  const locale = useLocale();
  const t = useTranslations("specials.hero");

  return (
    <Section className="relative overflow-hidden py-0">
      {/* Background Image */}
      <OptimizedImage
        src={images.specials.hero}
        alt={t("imageAlt")}
        priority
        sizes="100vw"
        className="absolute inset-0 h-full rounded-none border-0 bg-black shadow-none"
        imageClassName="absolute inset-0 h-full w-full object-cover object-center brightness-[0.75] contrast-[1.1]"
      />
      {/* Bottom Vignette */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/40 to-transparent" />

      <Container className="relative z-10 flex min-h-[80vh] items-center justify-start py-16 md:py-24">
        {/* Left-Aligned Container */}
        <div className="mr-auto max-w-2xl space-y-6 text-right" >
          
          {/* Main Title */}
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>

          {/* Subtitle / Description */}
          <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
            {t("description")}
          </p>

          {/* Left-Aligned Call to Action Button */}
          <div className="flex justify-start pt-6">
            <Link
              href={`/${locale}/contact`}
              className={buttonClassName({
                className: "inline-flex items-center gap-2 rounded-md bg-red-600 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-red-700 active:scale-95",
              })}
            >
              <span>{t("primaryCta")}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}