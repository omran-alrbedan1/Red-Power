import type { SiteLocale } from "@/config/site";

export function getNavigation(locale: SiteLocale) {
  return [
    { href: `/${locale}`, labelKey: "home" },
    { href: `/${locale}/services`, labelKey: "services" },
    { href: `/${locale}/about`, labelKey: "about" },
    { href: `/${locale}/specials`, labelKey: "specials" },
    { href: `/${locale}/gallery`, labelKey: "gallery" },
    { href: `/${locale}/reviews`, labelKey: "reviews" },
    { href: `/${locale}/contact`, labelKey: "contact" },
  ] as const;
}
