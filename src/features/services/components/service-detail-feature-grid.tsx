import Link from "next/link";
import { useLocale } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buttonClassName } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { RevealPanel } from "@/components/ui/reveal-panel";

type ServiceDetailFeatureGridProps = {
  eyebrow: string;
  ctaLabel: string;
  items: Array<{
    description: string;
    imageAlt: string;
    imageSrc: string;
    title: string;
  }>;
};

export function ServiceDetailFeatureGrid({
  eyebrow,
  ctaLabel,
  items,
}: ServiceDetailFeatureGridProps) {
  const locale = useLocale();

  return (
    <Section className="py-0">
      <Container className="space-y-px bg-white/8">
        {items.map((item, index) => {
          const content = (
            <div className="flex h-full items-center bg-[#101214] px-6 py-10 sm:px-10 lg:px-12">
              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-red-500">
                  {eyebrow}
                </p>
                <h3 className="text-4xl font-semibold uppercase tracking-tight text-white sm:text-5xl">
                  {item.title}
                </h3>
                <p className="max-w-xl text-base leading-7 text-zinc-400">
                  {item.description}
                </p>
                <Link
                  href={`/${locale}/contact`}
                  className={buttonClassName({
                    className: "rounded-md px-5 py-3 text-xs uppercase tracking-[0.18em]",
                  })}
                >
                  {ctaLabel}
                </Link>
              </div>
            </div>
          );

          const image = (
            <OptimizedImage
              src={item.imageSrc}
              alt={item.imageAlt}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[16/10] rounded-none border-0 bg-black shadow-none lg:min-h-[360px]"
              imageClassName="absolute inset-0 h-full w-full object-cover"
            />
          );

          return (
            <div key={item.title} className="grid gap-px bg-white/8 lg:grid-cols-2">
              <RevealPanel direction={index % 2 === 0 ? "left" : "right"}>
                {index % 2 === 0 ? content : image}
              </RevealPanel>
              <RevealPanel delay={100} direction={index % 2 === 0 ? "right" : "left"}>
                {index % 2 === 0 ? image : content}
              </RevealPanel>
            </div>
          );
        })}
      </Container>
    </Section>
  );
}
