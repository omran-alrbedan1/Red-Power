export function getPublicEnv() {
  return {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    defaultLocale:
      process.env.NEXT_PUBLIC_DEFAULT_LOCALE === "en" ? "en" : "ar",
  } as const;
}
