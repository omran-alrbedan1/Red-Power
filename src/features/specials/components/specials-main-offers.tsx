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
  const offerImages = [
    images.specials.brakeAndWheelDetail,
    images.services.mechanicEngineService,
  ] as const;

  return (
    <Section className="bg-[#090909] py-14 sm:py-16">
      <Container className="space-y-8">
        <RevealPanel className="flex flex-col items-center gap-3 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-white/90 sm:tracking-[0.3em]">
            {t("eyebrow")}
          </p>
          <span className="h-0.5 w-7 rounded-full bg-red-600" />
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            {t("title")}
          </h2>
        </RevealPanel>

        <div className="space-y-4">
          {items.map((item, index) => {
            const isReverse = index % 2 === 1;

            return (
              <RevealPanel
                key={item.title}
                delay={index * 80}
                className="group relative overflow-hidden rounded-[10px] border border-white/8 bg-[#0d0d0d] shadow-[0_24px_48px_rgba(0,0,0,0.32)]"
              >
                <div
                  className={cn(
                    "grid min-h-[226px] items-stretch lg:grid-cols-[1.02fr_1fr]",
                    isReverse && "lg:grid-cols-[1fr_1.02fr]"
                  )}
                >
                  <div
                    className={cn(
                      "relative min-h-[220px] overflow-hidden",
                      isReverse && "lg:order-2"
                    )}
                  >
                    <OptimizedImage
                      src={offerImages[index]}
                      alt={item.imageAlt}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="h-full rounded-none border-0 bg-black shadow-none"
                      imageClassName="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.5),rgba(0,0,0,0.08)_48%,rgba(0,0,0,0.5))]" />
                  </div>

                  <div
                    className={cn(
                      "relative flex items-center overflow-hidden px-5 py-6 sm:px-8 lg:px-10",
                      isReverse && "lg:order-1"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute inset-y-5 z-10 w-px bg-red-600/90",
                        isArabic ? "right-4" : "left-4"
                      )}
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute top-3 text-[88px] font-bold leading-none text-white/[0.035] sm:text-[104px]",
                        isArabic ? "left-8" : "right-8"
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div
                      className={cn(
                        "relative z-10 max-w-[320px] space-y-3",
                        isArabic ? "mr-6 text-right" : "ml-6 text-left"
                      )}
                    >
                      <div className="space-y-1">
                        <h3 className="text-2xl font-semibold text-white sm:text-[2rem]">
                          {item.title}
                        </h3>
                        <p className="text-sm font-semibold text-red-500 sm:text-base">
                          {item.subtitle}
                        </p>
                      </div>
                      <p className="text-sm leading-6 text-zinc-300/85">
                        {item.description}
                      </p>
                      <Link
                        href={`/${locale}/contact`}
                        className="inline-flex items-center rounded-[4px] border border-red-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-600"
                      >
                        <span className="flex items-center gap-2">
                          <span aria-hidden="true">←</span>
                          {item.cta}
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </RevealPanel>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
