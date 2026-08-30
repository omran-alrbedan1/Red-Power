"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealPanel } from "@/components/ui/reveal-panel";
import { buttonClassName } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SpecialsInquirySection() {
  const locale = useLocale();
  const t = useTranslations("specials.inquiry");
  const tCustom = useTranslations("specials.customService");
  const isArabic = locale === "ar";

  return (
    <Section className="bg-[#0a0b0c]">
      <Container className="space-y-12">
        {/* Inquiry Section */}
        <RevealPanel className="border border-white/8 bg-[#101214] p-8 sm:p-12">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-red-500">
              {t("eyebrow")}
            </p>
            <h2 className="text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl">
              {t("title")}
            </h2>
            <p className="max-w-2xl text-base leading-7 text-zinc-400">
              {t("description")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/contact`}
                className={buttonClassName({
                  className: "rounded-md px-6 py-3 text-xs uppercase tracking-[0.18em]",
                })}
              >
                {t("primaryCta")}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className={buttonClassName({
                  variant: "secondary",
                  className: "rounded-md px-6 py-3 text-xs uppercase tracking-[0.18em]",
                })}
              >
                {t("secondaryCta")}
              </Link>
            </div>
          </div>
        </RevealPanel>

        {/* Custom Service Section */}
        <RevealPanel className="border border-white/8 bg-[#101214] p-8 sm:p-12">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-red-500">
              {tCustom("eyebrow")}
            </p>
            <h2 className="text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl">
              {tCustom("title")}
            </h2>
            <p className="max-w-2xl text-base leading-7 text-zinc-400">
              {tCustom("description")}
            </p>
            <Link
              href={`/${locale}/contact`}
              className={cn(
                "inline-flex items-center rounded-md bg-red-600 px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-red-500",
                isArabic ? "mr-auto" : "ml-auto"
              )}
            >
              {tCustom("cta")}
            </Link>
          </div>
        </RevealPanel>
      </Container>
    </Section>
  );
}
