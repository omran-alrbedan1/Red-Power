import type { SiteLocale } from "@/config/site";

type SeoMessages = {
  classification: string;
  ogImageAlt: string;
  keywords: {
    default: string[];
    routes: Record<string, string[]>;
    serviceDetails: string[];
  };
  schema: {
    websiteDescription: string;
    organizationDescription: string;
    automotiveBusinessDescription: string;
  };
};

type CommonMessages = {
  seo: SeoMessages;
};

export async function getSeoMessages(locale: SiteLocale): Promise<SeoMessages> {
  const messages =
    locale === "ar"
      ? ((await import("@/messages/ar/common.json")).default as CommonMessages)
      : ((await import("@/messages/en/common.json")).default as CommonMessages);

  return messages.seo;
}
