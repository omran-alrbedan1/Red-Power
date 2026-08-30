import { Wrench, Target, Users, Quote } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { RevealPanel } from "@/components/ui/reveal-panel";
import { images } from "@/constants/image";

type AboutTeamItem = {
  title: string;
  body: string;
};

const CARD_ICONS = [Wrench, Target, Users];

const CARD_IMAGES = [
  images.about.experts,
  images.about.statsBackground,
  images.about.team,
];

export function AboutTeam() {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("about.team");
  const items = t.raw("items") as AboutTeamItem[];

  return (
    <Section className="bg-black py-8 sm:py-12 lg:py-16">
      <Container className="max-w-[90rem] space-y-10 px-4 sm:px-6 lg:px-8">

        {/* Header Block: Centered Eyebrow & Main Title */}
        <RevealPanel className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 justify-center">
            <span className="text-xs font-bold text-red-600 sm:text-sm">/</span>
            <p className="text-xs font-bold uppercase tracking-widest text-red-600 sm:text-sm">
              {t("eyebrow")}
            </p>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
        </RevealPanel>

        {/* 4-Card Horizontal Grid Layout */}
        <div
          dir={isArabic ? "rtl" : "ltr"}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Card 1: Quote Box (Dark Solid Box with Red Accents) */}
          <RevealPanel className="relative flex flex-col justify-between rounded-xl border border-white/10 bg-[#0a0a0a] p-6 sm:p-8 shadow-lg">
            <div className="space-y-4">
              <Quote className="size-8 text-red-600 fill-red-600/20" />
              <p className="text-sm font-medium leading-relaxed text-zinc-300 sm:text-base">
                "{t("quote")}"
              </p>
            </div>

            <footer className="mt-8 pt-4 border-t border-white/5">
              <p className="text-xs font-bold text-red-600 tracking-wider">
                — {t("quoteAuthor")}
              </p>
            </footer>
          </RevealPanel>

          {/* Cards 2, 3, 4: Image Top + Circular Red Icon + Text Bottom */}
          {items.slice(0, 3).map((item, index) => {
            const Icon = CARD_ICONS[index % CARD_ICONS.length];
            const imgSrc = CARD_IMAGES[index % CARD_IMAGES.length];

            return (
              <RevealPanel
                key={item.title}
                delay={(index + 1) * 80}
                className="group relative flex flex-col rounded-xl border border-white/10 bg-[#0a0a0a] text-center shadow-lg transition-all duration-300 hover:border-red-600/40"
              >
                {/* Image */}
                <div className="relative h-44 w-full overflow-hidden rounded-t-xl bg-zinc-900 sm:h-48">
                  <OptimizedImage
                    src={imgSrc}
                    alt={item.title}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full rounded-none border-0 bg-transparent shadow-none"
                    imageClassName="h-full w-full object-cover brightness-[0.7] contrast-[1.1] transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                </div>

                {/* Icon — NOT inside the overflow-hidden image */}
                <div className="relative flex justify-center">
                  <div className="absolute -top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#0a0a0a] bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                    <Icon className="size-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-6 pt-8">
                  <div>
                    <h3 className="text-lg font-bold uppercase tracking-tight text-white sm:text-xl">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                      {item.body}
                    </p>
                  </div>
                </div>
              </RevealPanel>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}