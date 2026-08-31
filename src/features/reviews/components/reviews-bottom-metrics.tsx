"use client";

import { Award, ShieldCheck, Users, Wrench } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealPanel } from "@/components/ui/reveal-panel";

import type { ReviewsSummaryMetric } from "./reviews-content";

const metricIcons = [Award, Users, Wrench, ShieldCheck] as const;

export function ReviewsBottomMetrics() {
  const t = useTranslations("reviews.summary");
  const items = t.raw("items") as ReviewsSummaryMetric[];

  return (
    <Section className="bg-gallery-page py-12">
      <Container className="space-y-8">
        <RevealPanel className="flex items-center gap-5">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-red-700/70" />
          <h2 className="text-center text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            {t("title")}
          </h2>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-red-700/70" />
        </RevealPanel>

        <div className="grid gap-px bg-white/10 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = metricIcons[index] ?? Award;

            return (
              <RevealPanel key={item.label} delay={index * 60} className="bg-gallery-page px-6 py-7">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center text-red-500">
                    <Icon className="size-8" strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="text-5xl font-semibold tracking-[-0.04em] text-red-500">
                      {item.value}
                    </p>
                    <p className="mt-2 text-lg text-zinc-300">{item.label}</p>
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
