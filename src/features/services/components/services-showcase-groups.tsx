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
  const itemsBySlug = new Map(
    catalog.items.map((item) => [item.slug, item]),
  );

  const isArabic = locale === "ar";
  let displayIndex = 0;

  return (
    <section dir="ltr">
      <Container className="py-0">
        <div className="space-y-3 bg-page-deep">
          {catalog.groups.map((group) => {
            const groupDelay = displayIndex * 70;
            const groupItems = group.itemSlugs
              .map((slug) => itemsBySlug.get(slug))
              .filter(
                (item): item is ServiceItem => Boolean(item),
              );

            return (
              <RevealPanel
                key={group.label}
                delay={groupDelay}
                direction="right"
                className="grid gap-px bg-white/8 xl:grid-cols-[220px_minmax(0,1fr)]"
              >
                {/* Service group heading */}
                <div className="services-scan-sheen flex min-h-[160px] flex-col justify-center border-l border-red-600/70 bg-panel-strong px-6 py-8 sm:px-8">
                  <h2
                    dir={isArabic ? "rtl" : "ltr"}
                    className="mt-4 max-w-[10ch] text-2xl font-medium leading-snug text-zinc-200"
                  >
                    {group.heading}
                  </h2>
                </div>

                {/* Services */}
                <div className="space-y-px ">
                  {groupItems.map((item) => {
                    const currentIndex = displayIndex;
                    displayIndex += 1;

                    return (
                      <ServicesShowcaseRow
                        key={item.slug}
                        ctaLabel={catalog.cta}
                        index={currentIndex}
                        isArabic={isArabic}
                        item={item}
                        locale={locale}
                      />
                    );
                  })}
                </div>
              </RevealPanel>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
