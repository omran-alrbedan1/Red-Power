import Link from "next/link";
import { Calendar, MessageCircle } from "lucide-react";

import { Container } from "@/components/layout/container";
import { buttonClassName } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { RevealPanel } from "@/components/ui/reveal-panel";
import { images } from "@/constants/image";
import { type SiteLocale } from "@/config/site";
import { type ServicesMessages } from "@/features/services/services-page-messages";

type ServicesShowcaseCtaProps = {
  cta: ServicesMessages["cta"];
  locale: SiteLocale;
};

export function ServicesShowcaseCta({
  cta,
  locale,
}: ServicesShowcaseCtaProps) {
  const isArabic = locale === "ar";

  return (
    <section className="pt-10 sm:pt-12">
      <Container>
        <div className="grid gap-px border border-red-600/25 bg-white/8 xl:grid-cols-[0.72fr_1.28fr]">
          <RevealPanel>
            <OptimizedImage
              src={images.home.dodgeGarageWide}
              alt={cta.imageAlt}
              sizes="(min-width: 1280px) 32vw, 100vw"
              className="min-h-[220px] rounded-none border-0 bg-black shadow-none sm:min-h-[260px]"
              imageClassName="absolute inset-0 h-full w-full object-cover"
            />
          </RevealPanel>
          <div className="grid gap-px bg-white/8 lg:grid-cols-[minmax(0,1fr)_260px]">
            <RevealPanel className="bg-panel-solid px-6 py-8 sm:px-8 sm:py-10" delay={100}>
              <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                {cta.title}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                {cta.description}
              </p>
            </RevealPanel>
            <RevealPanel
              className="flex flex-col justify-center gap-3 bg-[#0b0b0b] p-6"
              delay={180}
              direction={isArabic ? "left" : "right"}
            >
              <Link
                href={`/${locale}/contact`}
                className={buttonClassName({
                  className:
                    "w-full justify-between rounded-none px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em]",
                })}
              >
                <span>{cta.primaryLabel}</span>
                <Calendar className="size-4" />
              </Link>
              <Link
                href={`/${locale}/specials`}
                className={buttonClassName({
                  variant: "secondary",
                  className:
                    "w-full justify-between rounded-none px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em]",
                })}
              >
                <span>{cta.secondaryLabel}</span>
                <MessageCircle className="size-4" />
              </Link>
            </RevealPanel>
          </div>
        </div>
      </Container>
    </section>
  );
}
