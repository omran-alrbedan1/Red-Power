import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { RevealPanel } from "@/components/ui/reveal-panel";
import { images } from "@/constants/image";

type AboutPassionItem = {
  title: string;
  body: string;
};

export function AboutPassion() {
  const t = useTranslations("about.passion");
  const items = t.raw("items") as AboutPassionItem[];

  return (
    <Section className="bg-[#0a0b0c]">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <RevealPanel direction="left" className="relative">
          <OptimizedImage
            src={images.about.garageWorkshopBackground}
            alt={t("title")}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/3] rounded-none border border-red-600/25 bg-black shadow-none"
            imageClassName="absolute inset-0 h-full w-full object-cover"
          />
          <span className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-red-600" />
        </RevealPanel>
        <div className="space-y-8">
          <RevealPanel className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-red-500">
              {t("eyebrow")}
            </p>
            <h2 className="text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl">
              {t("title")}
            </h2>
            <p className="max-w-2xl text-base leading-7 text-zinc-400">
              {t("description")}
            </p>
          </RevealPanel>
          <div className="space-y-px border border-white/8 bg-white/8">
            {items.map((item, index) => (
              <RevealPanel
                key={item.title}
                delay={index * 80}
                className="flex gap-6 bg-[#101214] p-6 sm:p-7"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-red-600/40 text-sm font-semibold text-red-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-semibold uppercase tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-zinc-400">
                    {item.body}
                  </p>
                </div>
              </RevealPanel>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
