import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { serviceCatalog } from "@/config/services";
import { RevealPanel } from "@/components/ui/reveal-panel";

export function ServiceCatalogSection() {
  const locale = useLocale();
  const t = useTranslations("services.catalog");
  const items = t.raw("items") as Array<{
    body: string;
    slug: string;
    title: string;
  }>;

  return (
    <Section className="bg-[#0a0b0c]">
      <Container className="space-y-10">
        <RevealPanel className="max-w-4xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-red-500">
            {t("eyebrow")}
          </p>
          <h2 className="text-4xl font-semibold uppercase tracking-tight text-white sm:text-5xl">
            {t("title")}
          </h2>
          <p className="max-w-3xl text-base leading-7 text-zinc-400 sm:text-lg">
            {t("description")}
          </p>
        </RevealPanel>
        <div className="grid gap-px border border-white/8 bg-white/8 lg:grid-cols-2 xl:grid-cols-3">
          {items
            .filter((item) =>
              serviceCatalog.some((service) => service.slug === item.slug)
            )
            .map((item, index) => (
              <RevealPanel
                key={item.slug}
                className="bg-[#111315] p-6 sm:p-8"
                delay={index * 60}
              >
                <p className="text-4xl font-semibold text-red-500">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-2xl font-semibold uppercase tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-zinc-400">
                  {item.body}
                </p>
                <Link
                  href={`/${locale}/services/${item.slug}`}
                  className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:text-red-400"
                >
                  {t("cta")}
                </Link>
              </RevealPanel>
            ))}
        </div>
      </Container>
    </Section>
  );
}
