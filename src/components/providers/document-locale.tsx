"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";

import { getDirection } from "@/lib/i18n";

export function DocumentLocale() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getDirection(locale);
  }, [locale]);

  return null;
}
