import Image from "next/image";
import Link from "next/link";

import { images } from "@/constants/image";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  homeLabel: string;
  href: string;
  name: string;
  className?: string;
  compact?: boolean;
};

export function SiteLogo({
  homeLabel,
  href,
  name,
  className,
  compact = false,
}: SiteLogoProps) {
  return (
    <Link
      href={href}
      aria-label={homeLabel}
      className={cn(
        "inline-flex min-h-11 items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500",
        className
      )}
    >
      <Image
        src={images.brand.redPowerLogo}
        alt={name}
        width={compact ? 92 : 220}
        height={compact ? 36 : 82}
        priority
        className={cn(
          "h-auto object-contain",
          compact ? "w-20 sm:w-24" : "w-32 sm:w-40"
        )}
      />
    </Link>
  );
}
