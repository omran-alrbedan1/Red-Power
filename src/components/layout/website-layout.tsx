import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

type WebsiteLayoutProps = {
  children: ReactNode;
};

export async function WebsiteLayout({ children }: WebsiteLayoutProps) {
  const t = await getTranslations("common.a11y");

  return (
    <div className="min-h-screen bg-transparent text-white">
      <a
        href="#main-content"
        className="sr-only absolute start-4 top-4 z-50 rounded-full bg-white px-5 py-3 text-sm font-medium text-black shadow-lg focus:not-sr-only focus:absolute focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
      >
        {t("skipToContent")}
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
