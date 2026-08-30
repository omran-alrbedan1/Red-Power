import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { RevealPanel } from "@/components/ui/reveal-panel";

type GalleryItem = {
  category: string;
  imageAlt: string;
  imageSrc: string;
  title: string;
};

const layoutClassNames = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-2",
] as const;

export function GalleryGridSection() {
  const t = useTranslations("gallery");
  const items = t.raw("grid.items") as GalleryItem[];

  return (
    <Section className="bg-[#0a0b0c] pt-0">
      <Container className="space-y-10">
        <RevealPanel className="max-w-4xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-red-500">
            {t("overview.eyebrow")}
          </p>
          <h2 className="text-4xl font-semibold uppercase tracking-tight text-white sm:text-5xl">
            {t("overview.title")}
          </h2>
          <p className="max-w-3xl text-base leading-7 text-zinc-400 sm:text-lg">
            {t("overview.description")}
          </p>
        </RevealPanel>

        <div className="grid gap-4 md:grid-cols-4">
          {items.map((item, index) => (
            <RevealPanel
              key={item.title}
              delay={index * 70}
              className={layoutClassNames[index] ?? "md:col-span-2"}
            >
              <div className="group relative h-full overflow-hidden border border-white/8 bg-[#101214]">
                <OptimizedImage
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="aspect-[5/4] h-full rounded-none border-0 bg-black shadow-none md:min-h-[300px]"
                  imageClassName="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,10,0.04)_0%,rgba(8,9,10,0.72)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-red-400">
                    {item.category}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold uppercase tracking-tight text-white sm:text-2xl">
                    {item.title}
                  </h3>
                </div>
              </div>
            </RevealPanel>
          ))}
        </div>
      </Container>
    </Section>
  );
}
