import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { RevealPanel } from "@/components/ui/reveal-panel";
import { images } from "@/constants/image";

export function AboutCta() {
  const locale = useLocale();
  const t = useTranslations("about.cta");

  return (
    <Section className="red-power-divider bg-[#0a0b0c]">
      <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <RevealPanel delay={120} direction="left">
          <div className="relative">
            <OptimizedImage
              src={images.about.techniciansWithDodge}
              alt={t("imageAlt")}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="aspect-[16/9] rounded-none border border-red-600/25 bg-black shadow-none"
              imageClassName="absolute inset-0 h-full w-full object-cover"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </RevealPanel>
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
              className="inline-flex items-center justify-center rounded-md bg-red-600 px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-white transition duration-200 ease-out hover:bg-red-500"
            >
              {t("primaryLabel")}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center rounded-md border border-white/15 px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-white transition duration-200 ease-out hover:border-red-500/70 hover:bg-white/5"
            >
              {t("secondaryLabel")}
            </Link>
          </div>
        </RevealPanel>
      </Container>
    </Section>
  );
}
