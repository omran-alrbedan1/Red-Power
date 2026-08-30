"use client";

import Link from "next/link";
import { Wrench, Shield, Zap } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealPanel } from "@/components/ui/reveal-panel";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  wrench: Wrench,
  shield: Shield,
  zap: Zap,
};

type SelectedOfferItem = {
  title: string;
  description: string;
  icon: keyof typeof ICON_MAP;
  cta: string;
};

export function SpecialsSelectedOffers() {
  const locale = useLocale();
  const t = useTranslations("specials.selectedOffers");
  const isArabic = locale === "ar";
  const items = t.raw("items") as SelectedOfferItem[];

  return (
    <Section className="bg-[#0a0b0c]">
      <Container className="space-y-12">
        <RevealPanel className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-red-500">
            {t("eyebrow")}
          </p>
          <h2 className="text-4xl font-semibold uppercase tracking-tight text-white sm:text-5xl">
            {t("title")}
          </h2>
        </RevealPanel>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const Icon = ICON_MAP[item.icon];
            return (
              <RevealPanel
                key={item.title}
                delay={index * 80}
                className="group relative overflow-hidden border border-white/8 bg-[#101214] p-7 transition-colors hover:border-red-600/40"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-600/10">
                  <Icon className="size-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold uppercase tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  {item.description}
                </p>
                <Link
                  href={`/${locale}/contact`}
                  className={cn(
                    "mt-6 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-red-500 transition-colors hover:text-red-400",
                    isArabic ? "mr-auto" : "ml-auto"
                  )}
                >
                  {item.cta}
                </Link>
              </RevealPanel>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
