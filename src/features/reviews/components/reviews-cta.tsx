import Link from "next/link";
import { CalendarDays, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buttonClassName } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { RevealPanel } from "@/components/ui/reveal-panel";
import { images } from "@/constants/image";
import { cn } from "@/lib/utils";

export function ReviewsCta() {
  const locale = useLocale();
  const t = useTranslations("reviews");
  const isArabic = locale === "ar";

  return (
    <Section className="bg-gallery-page pb-8 pt-8">
      <Container>
        <div className="grid overflow-hidden border border-red-700/35 bg-gallery-panel lg:grid-cols-[0.44fr_0.56fr]">
          <RevealPanel direction={isArabic ? "right" : "left"} className="relative min-h-[260px]">
            <OptimizedImage
              src={images.services.brakeAndWheelDetail}
              alt={t("cta.imageAlt")}
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="h-full rounded-none border-0 bg-black shadow-none"
              imageClassName="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,6,0.15),rgba(6,6,6,0.85))] lg:bg-[linear-gradient(90deg,rgba(6,6,6,0.12)_0%,rgba(6,6,6,0.55)_55%,rgba(6,6,6,0.9)_100%)]" />
          </RevealPanel>

          <RevealPanel delay={120} className="flex items-center px-6 py-10 sm:px-10 lg:px-12 lg:py-12">
            <div className={cn("w-full max-w-xl space-y-6", isArabic ? "text-right" : "text-left")}>
              <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                {t("cta.title")}
              </h2>
              <p className="text-base leading-8 text-zinc-400">{t("cta.description")}</p>
              <div className={cn("flex flex-wrap gap-4", isArabic && "flex-row-reverse")}>
                <Link
                  href={`/${locale}/contact`}
                  className={buttonClassName({
                    className: "rounded-[3px] px-6 py-3 text-xs tracking-[0.18em] uppercase",
                  })}
                >
                  <CalendarDays className="size-4" />
                  {t("hero.primaryCta")}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className={buttonClassName({
                    variant: "secondary",
                    className: "rounded-[3px] px-6 py-3 text-xs tracking-[0.18em] uppercase",
                  })}
                >
                  <Phone className="size-4 text-red-500" />
                  {t("cta.secondaryCta")}
                </Link>
              </div>
            </div>
          </RevealPanel>
        </div>
      </Container>
    </Section>
  );
}
