import { Headset, Settings2, Zap } from "lucide-react";
import { useLocale, useMessages, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { RevealPanel } from "@/components/ui/reveal-panel";
import { images } from "@/constants/image";
import { cn } from "@/lib/utils";

const heroIcons = [Settings2, Headset, Zap] as const;

export function ContactHero() {
  const locale = useLocale();
  const t = useTranslations("contact");
  const messages = useMessages() as {
    contact: {
      hero: {
        highlights: string[];
      };
    };
  };
  const isArabic = locale === "ar";

  return (
    <Section className="relative overflow-hidden bg-black py-0">
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src={images.contact.hero}
          alt={t("hero.imageAlt")}
          priority
          sizes="100vw"
          className="h-full w-full rounded-none border-0 bg-black shadow-none"
          imageClassName="h-full w-full object-cover object-right"
        />

        {/* Black gradient - on the LEFT for Arabic (RTL), on the RIGHT for English (LTR) */}
        <div 
          className="absolute inset-0" 
          style={{
            background: isArabic 
              ? 'linear-gradient(90deg, #000000 0%, rgba(0,0,0,0.96) 30%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,0.3) 75%, transparent 100%)'
              : 'linear-gradient(270deg, #000000 0%, rgba(0,0,0,0.96) 30%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,0.3) 75%, transparent 100%)'
          }}
        />

        {/* Red ambient glow - on the LEFT for Arabic, on the RIGHT for English */}
        <div 
          className="absolute inset-0" 
          style={{
            background: isArabic
              ? 'radial-gradient(circle at 20% 50%, rgba(225,6,19,0.15), transparent 45%)'
              : 'radial-gradient(circle at 80% 50%, rgba(225,6,19,0.15), transparent 45%)'
          }}
        />
      </div>

      <Container
        className="relative z-10 flex min-h-[360px] items-center px-6 py-10 sm:min-h-[400px] sm:px-8 lg:min-h-[440px] lg:px-12"
      >
        <div
          dir={isArabic ? "rtl" : "ltr"}
          className={cn(
            "w-full",
            isArabic ? "max-w-xl mr-auto" : "max-w-xl ml-auto"
          )}
        >
          <RevealPanel className="space-y-3">
    
          <div className="relative z-10 w-full max-w-xl space-y-10">
            <RevealPanel className={cn("space-y-4", isArabic ? "text-right" : "text-left")}>
              <p className="text-xl font-medium text-red-500">{t("hero.eyebrow")}</p>
              <h1 className="text-6xl font-semibold leading-[0.9] tracking-[-0.05em] text-white sm:text-7xl lg:text-[5.6rem]">
                {t("hero.title")}
              </h1>
              <p className="max-w-lg text-lg leading-9 text-zinc-300/92">
                {t("hero.description")}
              </p>
            </RevealPanel>

            <RevealPanel delay={120} className="grid gap-px  border-t border-white/10 justify-start pt-5 sm:grid-cols-3">
              {messages.contact.hero.highlights.map((label, index) => {
                const Icon = heroIcons[index] ?? Zap;

                return (
                  <div
                    key={label}
                    className={cn(
                      "flex items-center gap-3 text-white",
                      isArabic ? "justify-end sm:flex-row-reverse" : "",
                      index > 0 && "sm:border-s sm:border-white/10 sm:ps-5"
                    )}
                  >
                    <span className="flex h-10 w-10 items-center justify-center text-red-500">
                      <Icon className="size-5" strokeWidth={1.8} />
                    </span>
                    <span className="text-base font-medium text-zinc-100">{label}</span>
                  </div>
                );
              })}
            </RevealPanel>
        </div>
          </RevealPanel>
        </div>
      </Container>
    </Section>
  );
}
