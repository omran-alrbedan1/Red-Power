import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { OptimizedImage } from "@/components/ui/optimized-image";
import { RevealPanel } from "@/components/ui/reveal-panel";
import { images } from "@/constants/image";
import { type ServiceItem } from "@/features/services/services-page-messages";
import { cn } from "@/lib/utils";

type ServicesShowcaseRowProps = {
  ctaLabel: string;
  index: number;
  isArabic: boolean;
  item: ServiceItem;
  locale: "ar" | "en";
};

const serviceImageMap: Record<string, string> = {
  "advanced-diagnostics": images.home.serviceDiagnosticsTablet,
  "pre-purchase-inspection": images.services.prePurchaseInspection,
  "preventive-maintenance": images.services.technicianWorking,
  "mechanical-maintenance": images.services.mechanicEngineService,
  "electrical-systems": images.services.galleryStrip,
  "performance-development": images.specials.hero,
};

export function ServicesShowcaseRow({
  ctaLabel,
  index,
  isArabic,
  item,
  locale,
}: ServicesShowcaseRowProps) {
  const imageSrc =
    serviceImageMap[item.slug] ?? images.services.garageShowcaseCollage;

  return (
    <RevealPanel
      delay={index * 90}
      direction={index % 2 === 0 ? "right" : "left"}
    >
      <Link
        href={`/${locale}/services/${item.slug}`}
        className="group block"
      >
        <div
          dir="ltr"
          className="services-panel grid gap-px  lg:grid-cols-[96px_minmax(0,1fr)_320px] xl:grid-cols-[104px_minmax(0,1fr)_360px]"
        >
          {/* Number */}
          <div
            className="services-scan-sheen flex items-start justify-center bg-[#080808] px-5 py-7 lg:py-8"
          >
            <span className="text-4xl font-bold leading-none tracking-tight text-red-600 transition duration-300 group-hover:scale-105 sm:text-5xl">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Content */}
          <div
            dir={isArabic ? "rtl" : "ltr"}
            className={cn(
              "relative flex min-h-[160px] flex-col justify-center bg-panel-solid px-6 py-6 sm:px-7",
              isArabic ? "text-right" : "text-left",
            )}
          >
            {/* Hover accent */}
            <div className="pointer-events-none absolute inset-y-6 left-0 w-px bg-gradient-to-b from-transparent via-red-600/24 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

            <h3 className="text-xl font-semibold leading-tight text-white sm:text-[1.7rem]">
              {item.title}
            </h3>

            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
              {item.body}
            </p>

            {/* CTA */}
            <div
              className={cn(
                "mt-4 inline-flex items-center gap-2 text-sm font-medium text-red-500 transition duration-300 group-hover:translate-x-1 group-hover:text-red-400",
                isArabic ? "self-start" : "self-start",
              )}
            >
              <span>{ctaLabel}</span>

              <ArrowLeft
                className={cn(
                  "size-4",
                  isArabic ? "rotate-180" : undefined,
                )}
              />
            </div>
          </div>

          {/* Image */}
          <div className="relative min-h-[160px] overflow-hidden bg-black">
            <OptimizedImage
              src={imageSrc}
              alt={item.title}
              sizes="(min-width: 1280px) 360px, (min-width: 1024px) 32vw, 100vw"
              className="h-full min-h-[160px] rounded-none border-0 bg-black shadow-none"
              imageClassName="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.06] group-hover:brightness-110"
            />
          </div>
        </div>
      </Link>
    </RevealPanel>
  );
}
