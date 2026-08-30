import Link from "next/link";

import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";
import { type ServiceDetailProcessItem } from "@/features/services/service-detail-content";

type ServiceDetailProcessProps = {
  ctaLabel: string;
  description: string;
  eyebrow: string;
  items: ServiceDetailProcessItem[];
  locale: "ar" | "en";
  title: string;
};

export function ServiceDetailProcess({
  ctaLabel,
  description,
  eyebrow,
  items,
  locale,
  title,
}: ServiceDetailProcessProps) {
  const isArabic = locale === "ar";

  return (
    <section className="border-b border-white/8 bg-page-deep py-12 sm:py-16 lg:py-20">
      <Container>
        <div
          dir={isArabic ? "rtl" : "ltr"}
          className={cn(
            "mx-auto max-w-3xl text-center",
            isArabic ? "lg:text-right" : "lg:text-center",
          )}
        >
          <p className="tracking-kicker text-[0.68rem] font-medium uppercase text-red-500 sm:text-[0.74rem]">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base">
            {description}
          </p>
        </div>

        <ol className="mt-10 space-y-3 lg:hidden">
          {items.map((item, index) => (
            <li
              key={item.title}
              dir={isArabic ? "rtl" : "ltr"}
              className="grid grid-cols-[88px_minmax(0,1fr)] gap-px border border-white/8 bg-white/8"
            >
              <div className="flex items-start justify-center bg-page-deep px-4 py-6">
                <span className="text-4xl font-black leading-none text-red-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className={cn("bg-panel-strong px-5 py-6", isArabic ? "text-right" : "text-left")}>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{item.body}</p>
                <Link
                  href={`/${locale}/contact`}
                  className="mt-4 inline-flex text-xs font-semibold uppercase tracking-ui text-red-500 transition hover:text-red-400"
                >
                  {ctaLabel}
                </Link>
              </div>
            </li>
          ))}
        </ol>

        <ol
          className="relative mt-14 hidden gap-6 lg:grid"
          style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
        >
          {items.map((item, index) => (
            <li
              key={item.title}
              dir={isArabic ? "rtl" : "ltr"}
              className={cn(
                "relative px-1",
                index < items.length - 1
                  ? "after:absolute after:top-5 after:h-px after:w-full after:bg-gradient-to-r after:from-red-600 after:to-red-600/20"
                  : undefined,
                isArabic ? "after:right-[calc(50%+2rem)]" : "after:left-[calc(50%+2rem)]",
              )}
            >
              <div className="relative z-10 w-fit bg-page-deep pe-4">
                <span className="text-4xl font-black leading-none text-red-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className={cn("mt-6 border-t border-white/10 pt-5", isArabic ? "text-right" : "text-left")}>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
