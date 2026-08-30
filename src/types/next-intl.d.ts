import type about from "@/messages/en/about.json";
import type common from "@/messages/en/common.json";
import type contact from "@/messages/en/contact.json";
import type forms from "@/messages/en/forms.json";
import type gallery from "@/messages/en/gallery.json";
import type home from "@/messages/en/home.json";
import type reviews from "@/messages/en/reviews.json";
import type serviceDetails from "@/messages/en/service-details.json";
import type specials from "@/messages/en/specials.json";
import type services from "@/messages/en/services.json";
import type { SiteLocale } from "@/config/site";

declare module "next-intl" {
  interface AppConfig {
    Locale: SiteLocale;
    Messages: {
      about: typeof about;
      common: typeof common;
      contact: typeof contact;
      forms: typeof forms;
      gallery: typeof gallery;
      home: typeof home;
      reviews: typeof reviews;
      serviceDetails: typeof serviceDetails;
      specials: typeof specials;
      services: typeof services;
    };
  }
}
