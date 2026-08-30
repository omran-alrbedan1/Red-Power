import Link from "next/link";

import { Container } from "@/components/layout/container";
import { buttonClassName } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { RevealPanel } from "@/components/ui/reveal-panel";
import { type SiteLocale } from "@/config/site";
import { images } from "@/constants/image";
import { type ServicesMessages } from "@/features/services/services-page-messages";

type ServicesShowcaseHeroProps = {
  hero: ServicesMessages["hero"];
  locale: SiteLocale;
};

export function ServicesShowcaseHero({
  hero,
  locale,
}: ServicesShowcaseHeroProps) {
  const isArabic = locale === "ar";

  return (
    <section className="relative overflow-hidden border-b border-red-900/30 bg-page-deep">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src={images.services.servicesHero}
          alt={hero.imageAlt}
          priority
          sizes="100vw"
          className="h-full w-full rounded-none border-0 bg-black shadow-none"
          imageClassName="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <Container className="relative z-10 py-16 sm:py-24 lg:py-32">
        {/* Alignment Wrapper: Right-aligned for Arabic, Left-aligned for English */}
        <div
          className={`flex ${
            isArabic ? "justify-end text-right" : "justify-start text-left"
          }`}
        >
          <RevealPanel
            direction={isArabic ? "right" : "left"}
            className="max-w-2xl"
          >
            <div className="relative">
              <div className="relative z-10 space-y-6">
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl lg:leading-tight">
                  {hero.title}
                </h1>

                <p className="max-w-lg text-sm leading-relaxed text-zinc-300 sm:text-base">
                  {hero.description}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/${locale}/contact`}
                    className={buttonClassName({
                      className:
                        "inline-flex items-center gap-3 bg-red-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-700",
                    })}
                  >
                    <span className="text-sm">{isArabic ? "←" : "→"}</span>
                    <span>{hero.primaryCta}</span>
                  </Link>
                </div>
              </div>
            </div>
          </RevealPanel>
        </div>
      </Container>
    </section>
  );
}
