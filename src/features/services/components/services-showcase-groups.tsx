import { Container } from "@/components/layout/container";
import { RevealPanel } from "@/components/ui/reveal-panel";
import {
  type ServiceItem,
  type ServicesMessages,
} from "@/features/services/services-page-messages";

import { ServicesShowcaseRow } from "./services-showcase-row";

type ServicesShowcaseGroupsProps = {
  catalog: ServicesMessages["catalog"];
  locale: "ar" | "en";
};

export function ServicesShowcaseGroups({
  catalog,
  locale,
}: ServicesShowcaseGroupsProps) {
  const itemsBySlug = new Map(catalog.items.map((item) => [item.slug, item]));
  const isArabic = locale === "ar";

  return (
    <>
      <section className="border-b border-white/8">
        <Container className="py-10 sm:py-12">
          <RevealPanel className="max-w-4xl">
            <p className="tracking-section text-sm uppercase text-red-500">
              RED POWER GARAGE
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {catalog.title}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">
              {catalog.description}
            </p>
          </RevealPanel>
        </Container>
      </section>

      <section>
        <Container className="py-0">
          <div className="space-y-px bg-white/8">
            {catalog.groups.map((group, groupIndex) => {
              const groupItems = group.itemSlugs
                .map((slug) => itemsBySlug.get(slug))
                .filter((item): item is ServiceItem => Boolean(item));

              return (
                <div
                  key={group.label}
                  className="grid gap-px bg-white/8 xl:grid-cols-[250px_minmax(0,1fr)]"
                >
                  <RevealPanel
                    className="bg-panel-strong px-6 py-8 sm:px-8 xl:py-10"
                    delay={groupIndex * 80}
                  >
                    <p className="tracking-kicker text-[0.72rem] font-medium uppercase text-red-500">
                      {group.label}
                    </p>
                    <h2 className="mt-4 text-2xl font-semibold leading-tight text-white">
                      {group.heading}
                    </h2>
                  </RevealPanel>
                  <div className="space-y-px bg-white/8">
                    {groupItems.map((item) => {
                      const itemIndex = catalog.items.findIndex(
                        (catalogItem) => catalogItem.slug === item.slug
                      );

                      return (
                        <ServicesShowcaseRow
                          key={item.slug}
                          ctaLabel={catalog.cta}
                          index={itemIndex}
                          isArabic={isArabic}
                          item={item}
                          locale={locale}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
