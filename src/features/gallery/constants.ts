import { Gauge, HeartHandshake, ScanSearch, type LucideIcon, Sparkles } from "lucide-react";

import { images } from "@/constants/image";

export type GalleryItemId =
  | "workshopAtmosphere"
  | "serviceInProgress"
  | "brandShowcase"
  | "technicalHighlights"
  | "eventPresence"
  | "eventSupportTeam";

export type GalleryItemConfig = {
  id: GalleryItemId;
  imageSrc: string;
};

export type GalleryHighlightIcon = {
  icon: LucideIcon;
  id: GalleryItemId;
};

export const GALLERY_HERO_IMAGE = images.gallery.dodgeGarageWide;

export const GALLERY_CTA_IMAGE = images.gallery.garageShowcaseCollage;

export const GALLERY_ITEMS: GalleryItemConfig[] = [
  { id: "workshopAtmosphere", imageSrc: images.gallery.dodgeGarageWide },
  { id: "serviceInProgress", imageSrc: images.gallery.carMaintenanceWorkshop },
  { id: "brandShowcase", imageSrc: images.gallery.garageShowcaseCollage },
  { id: "technicalHighlights", imageSrc: images.gallery.serviceGalleryStrip },
  { id: "eventPresence", imageSrc: images.gallery.eventCarExpo },
  { id: "eventSupportTeam", imageSrc: images.gallery.eventTeamGroup },
] as const;

export const GALLERY_HIGHLIGHT_ICONS: GalleryHighlightIcon[] = [
  { id: "workshopAtmosphere", icon: HeartHandshake },
  { id: "technicalHighlights", icon: ScanSearch },
  { id: "brandShowcase", icon: Gauge },
  { id: "eventPresence", icon: Sparkles },
] as const;
