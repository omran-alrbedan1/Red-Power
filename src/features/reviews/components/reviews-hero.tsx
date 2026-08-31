"use client";

import Link from "next/link";
import { Gauge, HeartHandshake, ScanSearch } from "lucide-react";
import { useLocale, useMessages, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buttonClassName } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { RevealPanel } from "@/components/ui/reveal-panel";
import { images } from "@/constants/image";
import { cn } from "@/lib/utils";

const heroIcons = [HeartHandshake, ScanSearch, Gauge] as const;

export function ReviewsHero() {
  const locale = useLocale();
  const t = useTranslations("reviews");

  const messages = useMessages() as {
    reviews: {
      hero: {
        highlights: string[];
      };
    };
  };

  const isArabic = locale === "ar";

  return (
    <Section className="relative overflow-hidden bg-black py-0">
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src={images.reviews.dodgeGarageWide}
          alt={t("hero.imageAlt")}
          priority
          sizes="100vw"
          className="h-full w-full rounded-none border-0 bg-black shadow-none"
          imageClassName="h-full w-full object-cover object-right"
        />

        {/* Black gradient - on the LEFT for Arabic (RTL), on the RIGHT for English (LTR) */}
        <div 
          className="absolute inset-0" 
          style={{
            background: isArabic 
              ? 'linear-gradient(90deg, #000000 0%, rgba(0,0,0,0.96) 30%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,0.3) 75%, transparent 100%)'
              : 'linear-gradient(270deg, #000000 0%, rgba(0,0,0,0.96) 30%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,0.3) 75%, transparent 100%)'
          }}
        />

        {/* Red ambient glow - on the LEFT for Arabic */}
        <div 
          className="absolute inset-0" 
          style={{
            background: isArabic
              ? 'radial-gradient(circle at 20% 50%, rgba(225,6,19,0.15), transparent 45%)'
              : 'radial-gradient(circle at 80% 50%, rgba(225,6,19,0.15), transparent 45%)'
          }}
        />
      </div>

      <Container
        className="relative z-10 flex min-h-[360px] items-center px-6 py-10 sm:min-h-[400px] sm:px-8 lg:min-h-[440px] lg:px-12"
      >
        <div
          dir={isArabic ? "rtl" : "ltr"}
          className={cn(
            "w-full",
            isArabic ? "max-w-lg mr-auto" : "max-w-lg ml-auto"
          )}
        >
          <RevealPanel className="space-y-3">
            <p className="text-sm font-semibold tracking-[0.08em] text-red-500">
              / {t("hero.eyebrow")}
            </p>

            <div className="space-y-1">
              <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                {t("hero.title")}
              </h1>

              <p className="text-4xl font-black leading-tight tracking-tight text-red-600 sm:text-5xl lg:text-6xl">
                {t("hero.titleAccent")}
              </p>
            </div>

            <p className="max-w-md text-xs leading-relaxed text-zinc-300 sm:text-sm">
              {t("hero.description")}
            </p>

            {/* Red accent line */}
            <span
              className={cn(
                "block h-[2px] w-10 bg-red-600",
                isArabic && "ms-auto"
              )}
            />
          </RevealPanel>

          <RevealPanel
            delay={120}
            className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4"
          >
            {messages.reviews.hero.highlights.map((label, index) => {
              const Icon = heroIcons[index] ?? Gauge;

              return (
                <div
                  key={label}
                  className={cn(
                    "flex flex-col items-start justify-center text-white",
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
              );
            })}
          </RevealPanel>

          <RevealPanel
            delay={220}
            className="mt-8 flex items-center gap-3"
          >
            <Link
              href={`/${locale}/contact`}
              className={buttonClassName({
                className:
                  "rounded-[2px] bg-red-600 px-5 py-3 text-xs font-bold tracking-wider text-white hover:bg-red-700",
              })}
            >
              {t("hero.primaryCta")}
            </Link>

            <Link
              href={`/${locale}/services`}
              className={buttonClassName({
                variant: "secondary",
                className:
                  "rounded-[2px] border border-white/20 bg-transparent px-5 py-3 text-xs font-bold tracking-wider text-white hover:bg-white/10",
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