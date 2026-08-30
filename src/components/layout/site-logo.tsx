import Image from "next/image";
import Link from "next/link";

import { images } from "@/constants/image";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  homeLabel: string;
  href: string;
  name: string;
  tagline?: string;
  className?: string;
  compact?: boolean;
  showText?: boolean;
};

export function SiteLogo({
  homeLabel,
  href,
  name,
  tagline,
  className,
  compact = false,
  showText = true,
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
          compact ? "w-20 sm:w-24" : "w-36 sm:w-44"
        )}
      />
      {showText ? (
        <span className="space-y-1">
          <span className="block text-sm font-semibold uppercase tracking-[0.22em] text-white sm:text-base">
            {name}
          </span>
          {tagline ? (
            <span className="block text-[10px] uppercase tracking-[0.28em] text-zinc-500 sm:text-[11px]">
              {tagline}
            </span>
          ) : null}
        </span>
      ) : null}
    </Link>
  );
}
