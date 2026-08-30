import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { buttonClassName } from "@/components/ui/button";
export function FloatingContactAction() {
  const locale = useLocale();
  const t = useTranslations("common");

  return (
    <Link
      href={`/${locale}/contact`}
      className={buttonClassName({
        className:
          "fixed bottom-5 end-5 z-30 shadow-[var(--glow)] md:bottom-8 md:end-8",
      })}
    >
      {t("floatingAction.label")}
    </Link>
  );
}
