import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { serviceCatalog } from "@/config/services";
import { buttonClassName } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { RevealPanel } from "@/components/ui/reveal-panel";

export function ServiceFeatureGrid() {
  const locale = useLocale();
  const t = useTranslations("services.features");
  const items = t.raw("items") as Array<{
    description: string;
    imageAlt: string;
    slug: string;
    title: string;
  }>;

  return (
    <Section className="py-0">
      <Container className="space-y-px bg-white/8">
        {items.map((item, index) => {
          const service = serviceCatalog.find((entry) => entry.slug === item.slug);

          if (!service) {
            return null;
          }

          const content = (
            <div className="flex h-full items-center bg-[#101214] px-6 py-10 sm:px-10 lg:px-12">
              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-red-500">
                  {t("eyebrow")}
                </p>
                <h3 className="text-4xl font-semibold uppercase tracking-tight text-white sm:text-5xl">
                  {item.title}
                </h3>
                <p className="max-w-xl text-base leading-7 text-zinc-400">
                  {item.description}
                </p>
                <Link
                  href={`/${locale}/services/${item.slug}`}
                  className={buttonClassName({
                    className: "rounded-md px-5 py-3 text-xs uppercase tracking-[0.18em]",
                  })}
                >
                  {t("cta")}
                </Link>
              </div>
            </div>
          );

          const image = (
            <OptimizedImage
              src={service.featureImageSrc}
              alt={item.imageAlt}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[16/10] rounded-none border-0 bg-black shadow-none lg:min-h-[360px]"
              imageClassName="absolute inset-0 h-full w-full object-cover"
            />
          );

          return (
            <div key={item.slug} className="grid gap-px bg-white/8 lg:grid-cols-2">
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
