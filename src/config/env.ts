import { siteConfig } from "@/config/site";

export function getPublicEnv() {
  return {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.siteUrl,
    defaultLocale:
      process.env.NEXT_PUBLIC_DEFAULT_LOCALE === "en" ? "en" : "ar",
  } as const;
}
