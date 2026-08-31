import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buttonClassName } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { RevealPanel } from "@/components/ui/reveal-panel";
import { cn } from "@/lib/utils";

import type { ReviewsHighlight } from "./reviews-content";

type ReviewsHeroProps = {
  description: string;
  eyebrow: string;
  highlights: ReviewsHighlight[];
  imageAlt: string;
  imageSrc: string;
  isArabic: boolean;
  primaryCtaHref: string;
  primaryCtaLabel: string;
  secondaryHeadline: string;
  secondaryCtaHref: string;
  secondaryCtaLabel: string;
  title: string;
};

export function ReviewsHero({
  description,
  eyebrow,
  highlights,
  imageAlt,
  imageSrc,
  isArabic,
  primaryCtaHref,
  primaryCtaLabel,
  secondaryHeadline,
  secondaryCtaHref,
  secondaryCtaLabel,
  title,
}: ReviewsHeroProps) {
  return (
    <Section className="overflow-hidden bg-gallery-page py-0">
      <Container className="grid min-h-[calc(80svh-76px)] items-stretch gap-0 px-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative flex items-center overflow-hidden border-b border-white/8 bg-gallery-page px-6 py-16 sm:px-8 lg:border-e lg:border-b-0 lg:px-14 lg:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(225,6,19,0.14),transparent_24%),linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.78))]" />
          <div className="relative z-10 w-full max-w-xl space-y-8">
            <RevealPanel className={cn("space-y-4", isArabic ? "text-right" : "text-left")}>
              <p className="text-sm font-semibold tracking-[0.16em] text-red-500">
                / {eyebrow}
              </p>
              <div className="space-y-2">
                <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
                  {title}
                </h1>
                <p className="text-5xl font-semibold leading-[0.95] tracking-[-0.045em] text-red-600 sm:text-6xl lg:text-7xl">
                  {secondaryHeadline}
                </p>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-zinc-300/92">
                {description}
              </p>
              <span className="block h-1 w-12 rounded-full bg-red-600" />
            </RevealPanel>

            <RevealPanel
              delay={120}
              className="grid gap-5 border-t border-white/8 pt-7 sm:grid-cols-3"
            >
              {highlights.map(({ icon: Icon, label }, index) => (
                <div
                  key={label}
                  className={cn(
                    "flex items-center gap-3 text-white sm:flex-col sm:text-center",
                    index > 0 && "sm:border-s sm:border-white/10 sm:ps-5"
                  )}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-red-600/30 bg-red-600/8 text-red-500 shadow-[0_0_24px_rgba(225,6,19,0.18)]">
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <span className="text-base font-medium text-zinc-100">
                    {label}
                  </span>
                </div>
              ))}
            </RevealPanel>

            <RevealPanel delay={220} className="flex flex-wrap gap-4">
              <Link
                href={primaryCtaHref}
                className={buttonClassName({
                  className: "rounded-[4px] px-6 py-3 text-xs tracking-[0.18em]",
                })}
              >
                {primaryCtaLabel}
              </Link>
              <Link
                href={secondaryCtaHref}
                className={buttonClassName({
                  variant: "secondary",
                  className:
                    "rounded-[4px] border-white/15 px-6 py-3 text-xs tracking-[0.18em]",
                })}
              >
                {secondaryCtaLabel}
              </Link>
            </RevealPanel>
          </div>
        </div>

        <RevealPanel direction={isArabic ? "left" : "right"} className="relative min-h-[340px] lg:min-h-full">
          <OptimizedImage
            src={imageSrc}
            alt={imageAlt}
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="h-full rounded-none border-0 bg-black shadow-none"
            imageClassName="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,6,0.9)_0%,rgba(6,6,6,0.28)_24%,rgba(6,6,6,0)_46%,rgba(6,6,6,0.14)_100%)]" />
        </RevealPanel>
      </Container>
    </Section>
  );
}
