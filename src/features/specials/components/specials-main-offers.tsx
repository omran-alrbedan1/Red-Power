"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { RevealPanel } from "@/components/ui/reveal-panel";
import { images } from "@/constants/image";
import { cn } from "@/lib/utils";

type MainOfferItem = {
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  imageAlt: string;
};

export function SpecialsMainOffers() {
  const locale = useLocale();
  const t = useTranslations("specials.mainOffers");
  const isArabic = locale === "ar";
  const items = t.raw("items") as MainOfferItem[];

  return (
    <Section className="bg-[#0b0c0d]">
      <Container className="space-y-12">
        <RevealPanel className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-red-500">
            {t("eyebrow")}
          </p>
          <h2 className="text-4xl font-semibold uppercase tracking-tight text-white sm:text-5xl">
            {t("title")}
          </h2>
        </RevealPanel>

        <div className="grid gap-8 lg:grid-cols-2">
          {items.map((item, index) => (
            <RevealPanel
              key={item.title}
              delay={index * 80}
              className="group relative overflow-hidden rounded-xl border border-white/8 bg-[#101214] transition-all hover:border-red-600/40"
            >
              <div className="relative h-64 overflow-hidden">
                <OptimizedImage
                  src={index === 0 ? images.specials.brakeAndWheelDetail : images.specials.serviceGalleryStrip}
                  alt={item.imageAlt}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-full w-full rounded-none border-0 bg-black shadow-none"
                  imageClassName="absolute inset-0 h-full w-full object-cover brightness-[0.7] contrast-[1.1] transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101214] via-transparent to-transparent" />
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold uppercase tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-red-500">
                    {item.subtitle}
                  </p>
                </div>
                <p className="text-sm leading-7 text-zinc-400">
                  {item.description}
                </p>
                <Link
                  href={`/${locale}/contact`}
                  className={cn(
                    "inline-flex items-center rounded-md bg-red-600 px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-red-500",
                    isArabic ? "mr-auto" : "ml-auto"
                  )}
                >
                  {item.cta}
                </Link>
              </div>
            </RevealPanel>
          ))}
        </div>
      </Container>
    </Section>
  );
}
