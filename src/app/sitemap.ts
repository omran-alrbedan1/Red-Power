import type { MetadataRoute } from "next";

import { serviceCatalog } from "@/config/services";
import { siteConfig } from "@/config/site";
import { getLanguageAlternates, getLocalizedPath, getSiteUrl } from "@/lib/seo";

const staticRoutes = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.85, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/specials", priority: 0.75, changeFrequency: "weekly" },
  { path: "/gallery", priority: 0.75, changeFrequency: "weekly" },
  { path: "/reviews", priority: 0.7, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.8, changeFrequency: "weekly" },
] as const satisfies Array<{
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  path: string;
  priority: number;
}>;

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceRoutes = serviceCatalog.map((service) => ({
    path: `/services/${service.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));
  const routes = [...staticRoutes, ...serviceRoutes];

  return siteConfig.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: getSiteUrl(getLocalizedPath(locale, route.path)),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: getLanguageAlternates(route.path),
      },
    }))
  );
}
