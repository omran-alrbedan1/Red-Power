import { images } from "@/constants/image";

export type ServiceVisualVariant =
  | "diagnostics"
  | "maintenance"
  | "mechanical"
  | "electrical"
  | "inspection"
  | "performance";

export type ServiceDetailProcessItem = {
  body: string;
  title: string;
};

export type ServiceDetailFeatureItem = {
  description: string;
  imageAlt: string;
  imageSrc: string;
  title: string;
};

export type ServiceDetailEntry = {
  featureItems: ServiceDetailFeatureItem[];
  hero: {
    description: string;
    imageAlt: string;
    title: string;
  };
  metadata: {
    description: string;
    title: string;
  };
  process: {
    description: string;
    items: ServiceDetailProcessItem[];
    title: string;
  };
};

export type ServiceDetailMessages = {
  cta: {
    primaryLabel: string;
    secondaryLabel: string;
  };
  entries: Record<string, ServiceDetailEntry>;
  shared: {
    eyebrow: string;
    processEyebrow: string;
    processLinkLabel: string;
    secondaryCtaLabel: string;
    secondaryCtaPath: string;
  };
};

const variantBySlug: Record<string, ServiceVisualVariant> = {
  "advanced-diagnostics": "diagnostics",
  "preventive-maintenance": "maintenance",
  "mechanical-maintenance": "mechanical",
  "electrical-systems": "electrical",
  "pre-purchase-inspection": "inspection",
  "performance-development": "performance",
};

const detailImageByPath: Record<string, string> = {
  "/images/red-power/service-details/mechanic-engine-service.png":
    images.serviceDetails.mechanicEngineService,
  "/images/red-power/service-details/brake-and-wheel-detail.png":
    images.serviceDetails.brakeAndWheelDetail,
  "/images/red-power/service-details/car-maintenance-workshop.png":
    images.serviceDetails.carMaintenanceWorkshop,
  "/images/red-power/service-details/red-dodge-garage-hero.png":
    images.serviceDetails.redDodgeGarageHero,
};

export function getServiceVisualVariant(slug: string): ServiceVisualVariant {
  return variantBySlug[slug] ?? "diagnostics";
}

export function resolveServiceDetailImage(src: string) {
  return detailImageByPath[src] ?? src;
}
