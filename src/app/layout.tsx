import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { getSiteUrl } from "@/lib/seo";
import "./globals.css";

type RootLayoutProps = {
  children: ReactNode;
};

export const viewport: Viewport = {
  themeColor: "#e10613",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Red Power Garage",
    template: "%s | Red Power Garage",
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={siteConfig.defaultLocale} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
