import Link from "next/link";

import { Container } from "@/components/layout/container";
import { buttonClassName } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { cn } from "@/lib/utils";
import {
  type ServiceDetailEntry,
  type ServiceVisualVariant,
} from "@/features/services/service-detail-content";

type ServiceDetailCtaProps = {
  entry: ServiceDetailEntry;
  eyebrow: string;
  imageSrc: string;
  locale: "ar" | "en";
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  variant: ServiceVisualVariant;
};

const ctaImagePositionByVariant: Record<ServiceVisualVariant, string> = {
  diagnostics: "object-center",
  maintenance: "object-center",
  mechanical: "object-center",
  electrical: "object-center",
  inspection: "object-right",
  performance: "object-center",
};

export function ServiceDetailCta({
  entry,
  eyebrow,
  imageSrc,
  locale,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  variant,
}: ServiceDetailCtaProps) {
  const isArabic = locale === "ar";

  return (
    <section className="border-t border-white/8 bg-page-deep py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="grid gap-3 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="relative min-h-[220px] border border-white/8 bg-black sm:min-h-[280px] lg:h-full lg:min-h-[320px]">
              <OptimizedImage
                src={imageSrc}
                alt={entry.hero.imageAlt}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-full min-h-[220px] rounded-none border-0 bg-black shadow-none sm:min-h-[280px] lg:min-h-[320px]"
                imageClassName={cn(
                  "absolute inset-0 h-full w-full object-cover brightness-[0.85]",
                  ctaImagePositionByVariant[variant],
                )}
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.18)_0%,rgba(8,8,8,0.45)_100%)]" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div
              dir={isArabic ? "rtl" : "ltr"}
              className={cn(
                "flex h-full flex-col justify-center border border-white/8 bg-panel-strong px-6 py-8 sm:px-8 lg:min-h-[320px] lg:px-10",
                isArabic ? "text-right" : "text-left",
              )}
            >
              <p className="tracking-kicker text-[0.68rem] font-medium uppercase text-red-500 sm:text-[0.74rem]">
                {eyebrow}
              </p>
              <h2 className="mt-4 max-w-[14ch] text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                {entry.metadata.title}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                {entry.metadata.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/${locale}/contact`}
                  className={buttonClassName({
                    className:
                      "justify-center rounded-none border border-red-600 bg-red-600 px-5 py-3.5 text-xs font-semibold uppercase tracking-ui shadow-none sm:min-w-[180px]",
                  })}
                >
                  {primaryLabel}
                </Link>
                <Link
                  href={secondaryHref}
                  className={buttonClassName({
                    variant: "secondary",
                    className:
                      "justify-center rounded-none border-white/12 bg-transparent px-5 py-3.5 text-xs font-semibold uppercase tracking-ui shadow-none sm:min-w-[180px]",
                  })}
                >
                  {secondaryLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
