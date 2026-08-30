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
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src={images.services.servicesHero}
          alt={hero.imageAlt}
          priority
          sizes="100vw"
          className="h-full w-full rounded-none border-0 bg-black shadow-none"
          imageClassName="h-full w-full scale-[1.02] object-cover object-center transition duration-700"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.82)_0%,rgba(5,5,5,0.58)_42%,rgba(5,5,5,0.28)_100%)]" />
        <div className="services-hero-glow absolute -left-[10%] top-[10%] h-56 w-56 rounded-full bg-red-600/16 blur-3xl" />
        <div className="services-hero-glow absolute right-[12%] bottom-[8%] h-64 w-64 rounded-full bg-red-700/14 blur-3xl [animation-delay:1.4s]" />
      </div>

      <Container className="relative z-10 py-16 sm:py-24 lg:py-32">
        <div
          className={`flex ${
            isArabic ? "justify-end text-right" : "justify-start text-left"
          }`}
        >
          <RevealPanel
            direction={isArabic ? "right" : "left"}
            className="services-scan-sheen max-w-2xl border border-white/10 bg-black/18 px-6 py-8 backdrop-blur-[2px] sm:px-8 sm:py-10"
          >
            <div className="relative">
              <div className="relative z-10 space-y-6">
                <h1 className="tracking-display-tight text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl lg:leading-tight">
                  {hero.title}
                </h1>

                <p className="max-w-lg text-sm leading-7 text-zinc-300 sm:text-base">
                  {hero.description}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/${locale}/contact`}
                    className={buttonClassName({
                      className:
                        "inline-flex items-center gap-3 bg-red-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_18px_50px_rgba(225,6,19,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-[0_24px_60px_rgba(225,6,19,0.32)]",
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
