import Link from "next/link";

import { Container } from "@/components/layout/container";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { cn } from "@/lib/utils";
import {
  resolveServiceDetailImage,
  type ServiceDetailFeatureItem,
  type ServiceVisualVariant,
} from "@/features/services/service-detail-content";

type ServiceDetailFeatureStoriesProps = {
  ctaLabel: string;
  items: ServiceDetailFeatureItem[];
  locale: "ar" | "en";
  variant: ServiceVisualVariant;
};

const featureImagePositionByVariant: Record<ServiceVisualVariant, string> = {
  diagnostics: "object-center",
  maintenance: "object-center",
  mechanical: "object-center",
  electrical: "object-center",
  inspection: "object-right",
  performance: "object-center",
};

export function ServiceDetailFeatureStories({
  ctaLabel,
  items,
  locale,
  variant,
}: ServiceDetailFeatureStoriesProps) {
  const isArabic = locale === "ar";

  return (
    <section className="bg-page-deep py-3 sm:py-4">
      <Container className="space-y-3 sm:space-y-4">
        {items.map((item, index) => {
          const number = String(index + 1).padStart(2, "0");
          const imageFirst = index % 2 === 0;
          const image = (
            <div className="relative h-full min-h-[260px] border border-white/8 bg-black sm:min-h-[360px] lg:min-h-[420px]">
              <OptimizedImage
                src={resolveServiceDetailImage(item.imageSrc)}
                alt={item.imageAlt}
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="h-full min-h-[260px] rounded-none border-0 bg-black shadow-none sm:min-h-[360px] lg:min-h-[420px]"
                imageClassName={cn(
                  "absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]",
                  featureImagePositionByVariant[variant],
                )}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.28))]" />
            </div>
          );

          const content = (
            <div
              dir={isArabic ? "rtl" : "ltr"}
              className={cn(
                "relative flex h-full min-h-[260px] items-center border border-white/8 bg-panel-solid px-5 py-8 sm:px-8 lg:min-h-[420px] lg:px-10",
                isArabic ? "text-right" : "text-left",
              )}
            >
              <span className="pointer-events-none absolute inset-inline-start-5 top-4 text-[4.5rem] font-black leading-none text-white/6 sm:top-6 sm:text-[6rem]">
                {number}
              </span>
              <div className="relative z-10 max-w-2xl">
                <p className="tracking-kicker text-[0.68rem] font-medium uppercase text-red-500 sm:text-[0.74rem]">
                  {number}
                </p>
                <h3 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base">
                  {item.description}
                </p>
                <Link
                  href={`/${locale}/contact`}
                  className="mt-6 inline-flex text-xs font-semibold uppercase tracking-ui text-red-500 transition hover:text-red-400"
                >
                  {ctaLabel}
                </Link>
              </div>
            </div>
          );

          return (
            <article
              key={`${item.title}-${index}`}
              className="group grid gap-3 lg:grid-cols-12 lg:gap-3"
            >
              <div
                className={cn(
                  "lg:col-span-6",
                  imageFirst ? "lg:order-1" : "lg:order-2",
                )}
              >
                {image}
              </div>
              <div
                className={cn(
                  "lg:col-span-6",
                  imageFirst ? "lg:order-2" : "lg:order-1",
                )}
              >
                {content}
              </div>
            </article>
          );
        })}
      </Container>
    </section>
  );
}
