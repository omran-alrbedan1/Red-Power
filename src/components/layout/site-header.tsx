"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { SiteLogo } from "@/components/layout/site-logo";
import { buttonClassName } from "@/components/ui/button";

export function SiteHeader() {
  const locale = useLocale();
  const t = useTranslations("common");

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(8,9,10,0.94)] backdrop-blur-xl">
      <Container className="flex flex-row-reverse items-center justify-between gap-4 py-4">
        <SiteLogo
          href={`/${locale}`}
          homeLabel={t("brand.homeLabel")}
          name={t("brand.name")}
          tagline={t("brand.tagline")}
          showText={false}
          className="shrink-0"
        />
        <DesktopNav />
        <Link
          href={`/${locale}/contact`}
          className={buttonClassName({
            size: "md",
            className:
              "hidden min-h-12 border border-red-500 bg-red-600 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] shadow-[0_20px_50px_rgba(225,6,19,0.28)] md:inline-flex",
          })}
        >
          {t("header.bookNow")}
        </Link>
        <MobileMenu />
      </Container>
    </header>
  );
}
