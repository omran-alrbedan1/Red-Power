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
  const groupsWithItems = catalog.groups.map((group, groupIndex) => {
    const itemOffset = catalog.groups
      .slice(0, groupIndex)
      .reduce((total, previousGroup) => total + previousGroup.itemSlugs.length, 0);

    const items = group.itemSlugs
      .map((slug) => itemsBySlug.get(slug))
      .filter(
        (item): item is ServiceItem => Boolean(item),
      );

    return {
      ...group,
      delay: itemOffset * 70,
      items: items.map((item, itemIndex) => ({
        item,
        displayIndex: itemOffset + itemIndex,
      })),
    };
  });

  return (
    <section dir="ltr">
      <Container className="py-0">
        <div className="space-y-3 bg-page-deep">
          {groupsWithItems.map((group) => (
              <RevealPanel
                key={group.label}
                delay={group.delay}
                direction="right"
                className="grid gap-px bg-white/8 xl:grid-cols-[220px_minmax(0,1fr)]"
              >
                {/* Service group heading */}
                <div className="services-scan-sheen flex min-h-[132px] flex-col justify-center border-l border-red-600/70 bg-panel-strong px-5 py-6 sm:min-h-[150px] sm:px-7 sm:py-7 xl:min-h-[160px] xl:px-8 xl:py-8">
                  <p className="tracking-kicker text-[0.68rem] font-medium uppercase text-red-500 sm:text-[0.72rem]">
                    {group.label}
                  </p>
                  <h2
                    dir={isArabic ? "rtl" : "ltr"}
                    className="mt-3 max-w-[12ch] text-2xl font-medium leading-snug text-zinc-200 sm:mt-4 xl:max-w-[10ch]"
                  >
                    {group.heading}
                  </h2>
                </div>

                {/* Services */}
                <div className="space-y-px">
                  {group.items.map(({ item, displayIndex }) => (
                      <ServicesShowcaseRow
                        key={item.slug}
                        ctaLabel={catalog.cta}
                        index={displayIndex}
                        isArabic={isArabic}
                        item={item}
                        locale={locale}
                      />
                    ))}
                </div>
              </RevealPanel>
            ))}
        </div>
      </Container>
    </section>
  );
}
