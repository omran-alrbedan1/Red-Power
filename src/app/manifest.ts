import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0d",
    theme_color: "#e10613",
    icons: [
      {
        src: "/images/red-power/brand/red-power-logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/red-power/brand/red-power-logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
