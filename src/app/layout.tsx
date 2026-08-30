import type { Metadata } from "next";
import type { ReactNode } from "react";

import { getSiteUrl } from "@/lib/seo";
import "./globals.css";

type RootLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Red Power Garage",
    template: "%s | Red Power Garage",
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
