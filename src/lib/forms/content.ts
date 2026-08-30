import "server-only";

import { getTranslations } from "next-intl/server";

import type { SiteLocale } from "@/config/site";
import type { ValidationCode } from "@/types/forms";

export async function getValidationMessage(
  locale: SiteLocale,
  code: ValidationCode
) {
  const t = await getTranslations({ locale, namespace: "forms.errors" });
  return t(code);
}

export async function getFormApiMessage(
  locale: SiteLocale,
  key: "contactSuccess" | "serviceRequestSuccess"
) {
  const t = await getTranslations({ locale, namespace: "forms.api" });
  return t(key);
}
