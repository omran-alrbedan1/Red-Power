import { ShieldCheck, UserCheck, Cpu, Heart } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { RevealPanel } from "@/components/ui/reveal-panel";
import { images } from "@/constants/image";
import { cn } from "@/lib/utils";

type AboutPassionItem = {
  title: string;
  body: string;
};

// Map items to corresponding Lucide icons matching the image reference
const ITEM_ICONS = [ShieldCheck, UserCheck, Cpu, Heart];

export function AboutPassion() {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("about.passion");
  const items = t.raw("items") as AboutPassionItem[];

  return (
    <Section className="bg-black py-6 sm:py-8 lg:py-10">
      {/* Expanded Max-Width Container */}
      <Container className="max-w-[90rem] px-4 sm:px-6 lg:px-8">
        {/* Expanded Outer Card with Red Glowing Border & Increased Padding */}
        <div className="relative rounded-xl border border-red-600/40 bg-[#08090a] p-8 sm:p-12 lg:p-14 shadow-[0_0_40px_rgba(220,38,38,0.15)]">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            
            {/* Left Showcase Image Block */}
            <RevealPanel
              direction={isArabic ? "right" : "left"}
              className="relative overflow-hidden rounded-lg lg:col-span-5"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-white/10">
                <OptimizedImage
                  src={images.about.garageWorkshopBackground}
                  alt={t("title")}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="h-full w-full rounded-none border-0 bg-black shadow-none"
                  imageClassName="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
                />
                {/* Ambient Red Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </RevealPanel>

            {/* Right Text & Feature Grid Block */}
            <div
              dir={isArabic ? "rtl" : "ltr"}
              className={cn(
                "space-y-10 lg:col-span-7",
                isArabic ? "text-right" : "text-left"
              )}
            >
              {/* Heading & Eyebrow Section */}
              <RevealPanel className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="h-4 w-1 -skew-x-12 bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
                  <p className="text-xs font-bold uppercase tracking-widest text-red-500 sm:text-sm">
                    {t("eyebrow")}
                  </p>
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {t("title")}
                </h2>
                <p className="max-w-3xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                  {t("description")}
                </p>
              </RevealPanel>

              {/* 4-Column Feature List with Icons and Vertical Separators */}
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6 sm:divide-x sm:divide-white/10 rtl:sm:divide-x-reverse">
                {items.slice(0, 4).map((item, index) => {
                  const Icon = ITEM_ICONS[index % ITEM_ICONS.length];

                  return (
                    <RevealPanel
                      key={item.title}
                      delay={index * 80}
                      className={cn(
                        "flex flex-col items-center text-center",
                        index !== 0 && "sm:px-4"
                      )}
                    >
                      {/* Red Outlined Icon Container */}
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-red-600/50 bg-red-950/20 text-red-500 shadow-[0_0_15px_rgba(220,38,38,0.25)]">
                        <Icon className="size-7 stroke-[1.75]" />
                      </div>

                      {/* Feature Title */}
                      <h3 className="mt-5 text-sm font-bold uppercase tracking-tight text-white sm:text-base">
                        {item.title}
                      </h3>

                      {/* Feature Description */}
                      <p className="mt-2 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                        {item.body}
                      </p>
                    </RevealPanel>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}