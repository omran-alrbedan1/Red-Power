import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buttonClassName } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { RevealPanel } from "@/components/ui/reveal-panel";

type ReviewsCtaProps = {
  description: string;
  eyebrow: string;
  imageAlt: string;
  imageSrc: string;
  primaryCtaHref: string;
  primaryCtaLabel: string;
  secondaryCtaHref: string;
  secondaryCtaLabel: string;
  title: string;
};

export function ReviewsCta({
  description,
  eyebrow,
  imageAlt,
  imageSrc,
  primaryCtaHref,
  primaryCtaLabel,
  secondaryCtaHref,
  secondaryCtaLabel,
  title,
}: ReviewsCtaProps) {
  return (
    <Section className="bg-gallery-page pt-8">
      <Container>
        <div className="overflow-hidden rounded-[20px] border border-red-700/35 bg-gallery-panel shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
          <div className="grid items-stretch lg:grid-cols-[0.42fr_0.58fr]">
            <RevealPanel direction="left" className="relative min-h-[220px]">
              <OptimizedImage
                src={imageSrc}
                alt={imageAlt}
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="h-full rounded-none border-0 bg-black shadow-none"
                imageClassName="absolute inset-0 h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,6,0.15),rgba(6,6,6,0.78))]" />
            </RevealPanel>

            <RevealPanel className="space-y-6 px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
              <p className="text-xs font-semibold tracking-[0.24em] text-red-500">
                {eyebrow}
              </p>
              <h2 className="max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                {title}
              </h2>
              <p className="max-w-2xl text-base leading-8 text-zinc-400">
                {description}
              </p>
              <div className="flex flex-wrap gap-4">
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
              </div>
            </RevealPanel>
          </div>
        </div>
      </Container>
    </Section>
  );
}
