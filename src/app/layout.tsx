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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon" type="image/png" sizes="256x256" />
        <link rel="apple-touch-icon" href="/apple-icon" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
