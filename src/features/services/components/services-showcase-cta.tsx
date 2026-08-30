"use client";

import Link from "next/link";
import { Calendar, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { RevealPanel } from "@/components/ui/reveal-panel";
import { images } from "@/constants/image";

export function ServicesShowcaseCta() {
  const locale = useLocale();
  const t = useTranslations("services.cta");
  const isArabic = locale === "ar";

  return (
    <section className="pt-10 sm:pt-12">
      <Container>
        {/* Outer container with thin red border & dark subtle gradient background */}
        <div className="relative overflow-hidden rounded-md border border-red-600/60 bg-gradient-to-r from-black via-zinc-950 to-black p-4 sm:p-6 lg:p-8 shadow-[0_0_25px_rgba(220,38,38,0.15)]">
          <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-8">
            <RevealPanel className="relative min-h-[180px] w-full lg:col-span-4 lg:min-h-[220px]">
              <OptimizedImage
                src={images.services.servicesCta}
                alt={t("imageAlt")}
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="min-h-[180px] h-full w-full rounded-none border-0 bg-transparent shadow-none lg:min-h-[220px]"
                imageClassName="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.05]"
              />
            </RevealPanel>

            <RevealPanel
              className="services-scan-sheen flex flex-col justify-center text-center lg:col-span-5 lg:border-r lg:border-white/10 lg:px-6 lg:text-end ltr:lg:border-r-0 ltr:lg:border-l ltr:lg:text-start"
              delay={100}
            >
              <h2 className="text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl lg:text-3xl">
                {t("title")}
              </h2>
              <p className="mt-3 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                {t("description")}
              </p>
            </RevealPanel>

            <RevealPanel
              className="services-scan-sheen flex flex-col justify-center gap-3 lg:col-span-3"
              delay={180}
              direction={isArabic ? "left" : "right"}
            >
              <Link
                href={`/${locale}/contact`}
                className="group inline-flex w-full items-center justify-between rounded-sm bg-red-600 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_18px_44px_rgba(225,6,19,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-[0_24px_54px_rgba(225,6,19,0.3)]"
              >
                <span>{t("primaryLabel")}</span>
                <Calendar className="size-4 transition duration-300 group-hover:scale-110" />
              </Link>

              <Link
                href={`/${locale}/contact`}
                className="group inline-flex w-full items-center justify-between rounded-sm border border-zinc-800 bg-black/60 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
              >
                <span>{t("secondaryLabel")}</span>
                <Phone className="size-4 text-zinc-400 transition duration-300 group-hover:scale-110 group-hover:text-white" />
              </Link>
            </RevealPanel>
          </div>
        </div>
      </Container>
    </section>
  );
}
