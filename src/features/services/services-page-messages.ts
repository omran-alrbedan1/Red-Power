import { type SiteLocale } from "@/config/site";

export type ServiceItem = {
  body: string;
  slug: string;
  title: string;
};

export type ServiceGroup = {
  heading: string;
  itemSlugs: string[];
  label: string;
};

export type ServicesMessages = {
  cta: {
    description: string;
    imageAlt: string;
    primaryLabel: string;
    secondaryLabel: string;
    title: string;
  };
  hero: {
    description: string;
    imageAlt: string;
    primaryCta: string;
    sectionLabel: string;
    title: string;
  };
  metadata: {
    description: string;
    title: string;
  };
  catalog: {
    cta: string;
    description: string;
    groups: ServiceGroup[];
    items: ServiceItem[];
    title: string;
  };
};

export async function getServicesMessages(locale: SiteLocale) {
  return locale === "ar"
    ? ((await import("@/messages/ar/services.json")).default as ServicesMessages)
    : ((await import("@/messages/en/services.json")).default as ServicesMessages);
}
