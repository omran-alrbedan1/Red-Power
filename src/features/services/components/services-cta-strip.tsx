import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { images } from "@/constants/image";
import { buttonClassName } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { RevealPanel } from "@/components/ui/reveal-panel";

export function ServicesCtaStrip() {
  const locale = useLocale();
  const t = useTranslations("services.cta");

  return (
    <Section className="red-power-divider bg-[#0b0c0d]">
      <Container className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <RevealPanel className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-red-500">
            {t("eyebrow")}
          </p>
          <h2 className="text-4xl font-semibold uppercase tracking-tight text-white sm:text-5xl">
            {t("title")}
          </h2>
          <p className="max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            {t("description")}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/${locale}/contact`}
              className={buttonClassName({
                className: "rounded-md px-5 py-3 text-xs uppercase tracking-[0.18em]",
              })}
            >
              {t("primaryLabel")}
            </Link>
            <Link
              href={`/${locale}/specials`}
              className={buttonClassName({
                variant: "secondary",
                className: "rounded-md px-5 py-3 text-xs uppercase tracking-[0.18em]",
              })}
            >
              {t("secondaryLabel")}
            </Link>
          </div>
        </RevealPanel>
        <RevealPanel delay={120} direction="right">
          <OptimizedImage
            src={images.services.galleryStrip}
            alt={t("imageAlt")}
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="aspect-[16/6] rounded-none border border-red-600/25 bg-black shadow-none"
            imageClassName="absolute inset-0 h-full w-full object-cover"
          />
        </RevealPanel>
      </Container>
    </Section>
  );
}
