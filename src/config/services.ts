import { images } from "@/constants/image";

export const serviceCatalog = [
  {
    slug: "advanced-diagnostics",
    imageSrc: images.services.technicianWorking,
    featureImageSrc: images.services.mechanicEngineService,
    detailImageSrc: images.serviceDetails.mechanicEngineService,
  },
  {
    slug: "preventive-maintenance",
    imageSrc: images.services.garageShowcaseCollage,
    featureImageSrc: images.services.brakeAndWheelDetail,
    detailImageSrc: images.serviceDetails.brakeAndWheelDetail,
  },
  {
    slug: "mechanical-maintenance",
    imageSrc: images.services.mechanicEngineService,
    featureImageSrc: images.services.technicianWorking,
    detailImageSrc: images.serviceDetails.carMaintenanceWorkshop,
  },
  {
    slug: "electrical-systems",
    imageSrc: images.services.technicianWorking,
    featureImageSrc: images.services.galleryStrip,
    detailImageSrc: images.serviceDetails.mechanicEngineService,
  },
  {
    slug: "pre-purchase-inspection",
    imageSrc: images.services.brakeAndWheelDetail,
    featureImageSrc: images.services.mechanicEngineService,
    detailImageSrc: images.serviceDetails.brakeAndWheelDetail,
  },
  {
    slug: "performance-development",
    imageSrc: images.services.galleryStrip,
    featureImageSrc: images.services.garageShowcaseCollage,
    detailImageSrc: images.serviceDetails.redDodgeGarageHero,
  },
  {
    slug: "american-vehicle-services",
    imageSrc: images.home.redDodgeGarageHero,
    featureImageSrc: images.services.garageShowcaseCollage,
    detailImageSrc: images.serviceDetails.redDodgeGarageHero,
  },
  {
    slug: "fleet-solutions",
    imageSrc: images.services.garageShowcaseCollage,
    featureImageSrc: images.services.galleryStrip,
    detailImageSrc: images.serviceDetails.carMaintenanceWorkshop,
  },
  {
    slug: "event-support",
    imageSrc: images.services.galleryStrip,
    featureImageSrc: images.services.technicianWorking,
    detailImageSrc: images.serviceDetails.carMaintenanceWorkshop,
  },
] as const;

export type ServiceSlug = (typeof serviceCatalog)[number]["slug"];

export function getServiceBySlug(slug: string) {
  return serviceCatalog.find((service) => service.slug === slug);
}
