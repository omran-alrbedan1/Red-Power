import { MessageSquareMore, Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealPanel } from "@/components/ui/reveal-panel";
import { cn } from "@/lib/utils";

import type {
  ReviewsDistributionItem,
  ReviewsStatCard,
} from "./reviews-content";

const statIcons = [MessageSquareMore, Star] as const;

export function ReviewsSummary() {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("reviews.stats");
  const distribution = t.raw("distribution") as ReviewsDistributionItem[];
  const statCards = t.raw("statCards") as ReviewsStatCard[];

  return (
    <Section className="bg-gallery-page pt-8">
      <Container>
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-[0.94fr_1.06fr_0.7fr_0.7fr]">
          <RevealPanel className={cn("bg-gallery-panel px-6 py-7 sm:px-8", isArabic && "text-right")}>
            <p className="text-sm text-zinc-400">{t("averageLabel")}</p>
            <p className="mt-3 text-7xl font-semibold tracking-[-0.06em] text-red-500">
              {t("averageValue")}
            </p>
            <div className={cn("mt-3 flex items-center gap-1 text-red-500", isArabic && "flex-row-reverse")}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="size-6 fill-current" />
              ))}
            </div>
            <p className="mt-3 text-base text-zinc-300">{t("outOf")}</p>
          </RevealPanel>

          <RevealPanel delay={80} className={cn("bg-gallery-panel px-6 py-7 sm:px-8", isArabic && "text-right")}>
            <div className="space-y-4">
              {distribution.map((item) => (
                <div key={item.label} className="grid grid-cols-[60px_1fr_52px] items-center gap-4">
                  <span className="text-base text-zinc-200">{item.label}</span>
                  <div className="h-2 rounded-full bg-white/6">
                    <div
                      className="h-full rounded-full bg-red-600"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className={cn("text-base text-zinc-200", isArabic && "text-left")}>
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </RevealPanel>

          {statCards.map((item, index) => {
            const Icon = statIcons[index] ?? Star;

            return (
              <RevealPanel
                key={item.label}
                delay={index * 80 + 120}
                className="bg-gallery-panel px-6 py-7 text-center"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center text-red-500">
                  <Icon className="size-8" strokeWidth={1.8} />
                </span>
                <p className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-white">
                  {item.value}
                </p>
                <p className="mt-3 text-lg text-zinc-300">{item.label}</p>
              </RevealPanel>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
