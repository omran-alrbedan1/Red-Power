import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buttonClassName } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";

type MediaPageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  imageAlt: string;
  imageSrc: string;
  primaryCtaHref: string;
  primaryCtaLabel: string;
  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;
};

export function MediaPageHero({
  eyebrow,
  title,
  description,
  imageAlt,
  imageSrc,
  primaryCtaHref,
  primaryCtaLabel,
  secondaryCtaHref,
  secondaryCtaLabel,
}: MediaPageHeroProps) {
  return (
    <Section className="overflow-hidden py-0">
      <OptimizedImage
        src={imageSrc}
        alt={imageAlt}
        priority
        sizes="100vw"
        className="absolute inset-0 h-full rounded-none border-0 bg-black shadow-none"
        imageClassName="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,9,10,0.9)_0%,rgba(8,9,10,0.68)_40%,rgba(8,9,10,0.5)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#08090A] to-transparent" />
      <Container className="relative z-10 grid min-h-[calc(72svh-77px)] items-center py-20 md:py-24">
        <div className="max-w-3xl space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-red-500">
            {eyebrow}
          </p>
          <h1 className="text-5xl font-semibold uppercase leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-zinc-300 sm:text-xl sm:leading-8">
            {description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={primaryCtaHref}
              className={buttonClassName({
                className: "rounded-md px-6 py-3 text-xs uppercase tracking-[0.18em]",
              })}
            >
              {primaryCtaLabel}
            </Link>
            {secondaryCtaHref && secondaryCtaLabel ? (
              <Link
                href={secondaryCtaHref}
                className={buttonClassName({
                  variant: "secondary",
                  className: "rounded-md px-6 py-3 text-xs uppercase tracking-[0.18em]",
                })}
              >
                {secondaryCtaLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
