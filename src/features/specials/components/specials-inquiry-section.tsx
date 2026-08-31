"use client";

import Link from "next/link";
import { TicketPercent } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealPanel } from "@/components/ui/reveal-panel";
import { buttonClassName } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SpecialsInquirySection() {
  const locale = useLocale();
  const t = useTranslations("specials.inquiry");
  const isArabic = locale === "ar";

  return (
    <Section className="bg-[#090909] py-12 sm:py-14">
      <Container className="space-y-4">
        <RevealPanel className="relative overflow-hidden rounded-[12px] border border-red-600/35 bg-[linear-gradient(90deg,#151515_0%,#101010_45%,#0b0b0b_100%)] px-4 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] sm:px-6">
          <div className="absolute inset-y-0 left-0 w-32 bg-[radial-gradient(circle_at_left,rgba(220,38,38,0.2),transparent_72%)]" />
          <div
            className={cn(
              "relative grid gap-5 lg:grid-cols-[84px_minmax(0,1fr)_220px] lg:items-center",
              isArabic && "lg:grid-cols-[84px_minmax(0,1fr)_220px]"
            )}
          >
            <div className="flex justify-center lg:justify-start">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/35 bg-red-600/10 text-red-500 shadow-[0_0_30px_rgba(220,38,38,0.28)]">
                <TicketPercent className="size-7" strokeWidth={1.9} />
              </div>
            </div>

            <div className={cn("space-y-2", isArabic ? "text-right" : "text-left")}>
              <p className="text-xs font-semibold tracking-[0.24em] text-red-500">
                {t("eyebrow")}
              </p>
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                {t("title")}
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-zinc-300/85">
                {t("description")}
              </p>
            </div>

            <div className="flex flex-col gap-2 lg:w-full">
              <Link
                href={`/${locale}/contact`}
                className={buttonClassName({
                  className:
                    "w-full justify-center rounded-[4px] px-5 py-3 text-xs tracking-[0.14em]",
                })}
              >
                {t("primaryCta")}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className={buttonClassName({
                  variant: "secondary",
                  className:
                    "w-full justify-center rounded-[4px] border-white/20 bg-transparent px-5 py-3 text-xs tracking-[0.14em] text-white hover:border-red-500/60 hover:bg-white/5",
                })}
              >
                {t("secondaryCta")}
              </Link>
            </div>
          </div>
        </RevealPanel>

      </Container>
    </Section>
  );
}
