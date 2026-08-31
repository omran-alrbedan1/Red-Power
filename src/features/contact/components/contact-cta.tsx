import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { RevealPanel } from "@/components/ui/reveal-panel";
import { images } from "@/constants/image";
import { cn } from "@/lib/utils";

export function ContactCta() {
  const locale = useLocale();
  const t = useTranslations("contact");
  const isArabic = locale === "ar";

  return (
    <Section className="bg-gallery-page py-8">
      <Container>
        <div className="overflow-hidden rounded-[22px] border border-red-700/35 bg-gallery-panel shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
          <div className="grid items-stretch lg:grid-cols-[0.36fr_0.64fr]">
            <RevealPanel direction="right" className="relative min-h-[260px]">
              <OptimizedImage
                src={images.contact.technicianWorking}
                alt={t("hero.imageAlt")}
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="h-full rounded-none border-0 bg-black shadow-none"
                imageClassName="absolute inset-0 h-full w-full object-cover object-left"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,6,0.18),rgba(6,6,6,0.82))]" />
            </RevealPanel>

            <RevealPanel className="flex items-center px-8 py-10 sm:px-10">
              <div className={cn("w-full space-y-6", isArabic ? "text-right" : "text-left")}>
                <h2 className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-white">
                  {t("cta.title")}
                </h2>
                <p className="text-lg leading-8 text-zinc-300/88">
                  {t("cta.description")}
                </p>
                <div className="flex">
                  <Link
                    href={`/${locale}/contact`}
                    className="inline-flex items-center gap-3 rounded-[10px] bg-gradient-to-r from-red-700 to-red-600 px-8 py-4 text-lg font-semibold text-white transition hover:from-red-600 hover:to-red-500"
                  >
                    {t("cta.buttonLabel")}
                    <ArrowRight className={cn("size-5", isArabic ? "rotate-180" : "")} />
                  </Link>
                </div>
              </div>
            </RevealPanel>
          </div>
        </div>
      </Container>
    </Section>
  );
}
