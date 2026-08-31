import Link from "next/link";
import { Calendar, Phone } from "lucide-react";

import { Container } from "@/components/layout/container";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { cn } from "@/lib/utils";
import {
  type ServiceDetailEntry,
  type ServiceVisualVariant,
} from "@/features/services/service-detail-content";

type ServiceDetailHeroProps = {
  entry: ServiceDetailEntry;
  eyebrow: string;
  heroImageSrc: string;
  locale: "ar" | "en";
  primaryCtaLabel: string;
  secondaryCtaHref: string;
  secondaryCtaLabel: string;
  variant: ServiceVisualVariant;
};

const heroImagePositionByVariant: Record<ServiceVisualVariant, string> = {
  diagnostics: "object-center",
  maintenance: "object-center",
  mechanical: "object-center",
  electrical: "object-center",
  inspection: "object-right",
  performance: "object-center",
};

export function ServiceDetailHero({
  entry,
  eyebrow,
  heroImageSrc,
  locale,
  primaryCtaLabel,
  secondaryCtaHref,
  secondaryCtaLabel,
  variant,
}: ServiceDetailHeroProps) {
  const isArabic = locale === "ar";

  const titleWords = entry.hero.title.split(" ");
  const midPoint = Math.ceil(titleWords.length / 2);
  const titlePart1 = titleWords.slice(0, midPoint).join(" ");
  const titlePart2 = titleWords.slice(midPoint).join(" ");

  return (
    <section className="relative min-w-full  border-b border-white/8 bg-black py-0 w-full">
        <div className="relative grid min-h-[520px] items-center lg:grid-cols-12 lg:min-h-[580px]">
          
          {/* Content Box (Left side in LTR, Right side in RTL) */}
          <div
            dir={isArabic ? "rtl" : "ltr"}
            className={cn(
              "relative z-20 flex mx-12 h-full flex-col justify-center py-10 lg:col-span-5 lg:py-16",
              isArabic ? "text-right lg:pl-6" : "text-left lg:pr-6"
            )}
          >
            {/* Dynamic Two-Tone Title */}
            <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {titlePart1}{" "}
              <span className="text-red-600 drop-shadow-[0_0_12px_rgba(220,38,38,0.4)]">
                {titlePart2}
              </span>
            </h1>

            {/* Subtitle / Description */}
            <p className="mt-4 max-w-xl text-xs leading-relaxed text-zinc-300 sm:text-sm lg:text-base">
              {entry.hero.description}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {/* Primary CTA (Solid Red with Glow) */}
              <Link
                href={`/${locale}/contact`}
                className="group inline-flex items-center gap-3 rounded-sm bg-red-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-all hover:bg-red-700 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]"
              >
                <span>{primaryCtaLabel}</span>
                <Calendar className="size-4 transition-transform group-hover:scale-110" />
              </Link>

              {/* Secondary CTA (Dark Outlined) */}
              <Link
                href={secondaryCtaHref}
                className="group inline-flex items-center gap-3 rounded-sm border border-zinc-800 bg-black/60 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-200 transition-all hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
              >
                <span>{secondaryCtaLabel}</span>
                <Phone className="size-4 text-zinc-400 transition-transform group-hover:scale-110 group-hover:text-white" />
              </Link>
            </div>
          </div>

          {/* Right Hero Image Container with Angled Red Divider */}
          <div className="relative h-full min-h-[350px] lg:col-span-7 lg:min-h-[580px]">
            {/* Angled Red Separator Accent */}
            <div
              className={cn(
                "pointer-events-none absolute inset-y-0 z-10 hidden w-1 bg-gradient-to-b from-red-600 via-red-500 to-red-700 shadow-[0_0_15px_rgba(220,38,38,0.8)] lg:block",
                isArabic
                  ? "right-0 -skew-x-12"
                  : "left-0 -skew-x-12"
              )}
            />

            {/* Image Wrapper */}
            <div className="relative h-full w-full overflow-hidden">
              <OptimizedImage
                src={heroImageSrc}
                alt={entry.hero.imageAlt}
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="h-full w-full rounded-none border-0 bg-black shadow-none"
                imageClassName={cn(
                  "absolute inset-0 h-full w-full object-cover brightness-[0.85] contrast-[1.05]",
                  heroImagePositionByVariant[variant]
                )}
              />

              {/* Dark Gradients for Content Contrast */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent lg:bg-gradient-to-r",
                  isArabic
                    ? "lg:from-transparent lg:via-black/20 lg:to-black"
                    : "lg:from-black lg:via-black/20 lg:to-transparent"
                )}
              />

              {/* Bottom Right Racing Hazard Stripes Accent */}
              <div
                className={cn(
                  "pointer-events-none absolute bottom-4 z-20 h-3 w-28 bg-[repeating-linear-gradient(-45deg,#dc2626,#dc2626_8px,transparent_8px,transparent_16px)] opacity-80",
                  isArabic ? "left-4" : "right-4"
                )}
              />
            </div>
          </div>

        </div>
    </section>
  );
}