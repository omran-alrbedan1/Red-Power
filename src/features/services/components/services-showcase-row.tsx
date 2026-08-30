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
  "pre-purchase-inspection": images.home.redDodgeGarageHero,
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
  const imageSrc = serviceImageMap[item.slug] ?? images.services.garageShowcaseCollage;

  return (
    <RevealPanel delay={index * 70}>
      <Link href={`/${locale}/services/${item.slug}`} className="group block">
        <div className="grid gap-px bg-white/8 lg:grid-cols-[104px_minmax(0,1fr)_360px]">
          <div className="flex items-start justify-center bg-[#080808] px-6 py-8 lg:py-10">
            <span className="text-4xl font-bold tracking-tight text-red-600 sm:text-5xl">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="flex min-h-[180px] flex-col justify-center bg-panel-solid px-6 py-8 sm:px-8">
            <h3 className="text-2xl font-semibold leading-tight text-white sm:text-[2rem]">
              {item.title}
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
              {item.body}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-red-500 transition group-hover:text-red-400">
              <span>{ctaLabel}</span>
              <ArrowLeft className={cn("size-4", isArabic ? "rotate-180" : undefined)} />
            </div>
          </div>
          <OptimizedImage
            src={imageSrc}
            alt={item.title}
            sizes="(min-width: 1280px) 360px, (min-width: 1024px) 32vw, 100vw"
            className="aspect-[16/9] rounded-none border-0 bg-black shadow-none lg:min-h-[180px]"
            imageClassName="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </Link>
    </RevealPanel>
  );
}
