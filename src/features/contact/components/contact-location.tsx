"use client";

import { MapPin, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealPanel } from "@/components/ui/reveal-panel";
import { cn } from "@/lib/utils";

interface ContactLocationProps {
  className?: string;
}

export function ContactLocation({ className }: ContactLocationProps) {
  const t = useTranslations("contact.location");

  return (
    <Section className={cn("overflow-hidden bg-black py-16", className)}>
      <Container className="px-6 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left Side - Location Info */}
          <RevealPanel className="flex flex-col justify-center space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold tracking-[0.08em] text-red-500">
                {t("title")}
              </p>
              <h2 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                {t("title")}
              </h2>
              <span className="block h-[2px] w-10 bg-red-600" />
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 size-5 flex-shrink-0 text-red-500" />
                <p className="text-base leading-relaxed text-zinc-300 sm:text-lg">
                  {t("address")}
                </p>
              </div>

              <a
                href={t("link")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[2px] bg-red-600 px-6 py-3 text-sm font-bold tracking-wider text-white transition-colors hover:bg-red-700"
              >
                {t("buttonLabel")}
                <ExternalLink className="size-4" />
              </a>
            </div>
          </RevealPanel>

          {/* Right Side - Map Embed */}
          <RevealPanel delay={120} className="relative min-h-[300px] overflow-hidden rounded-lg border border-white/10 lg:min-h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3712.456!2d39.123456!3d21.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDA3JzI0LjQiTiAzOcKwMDcnMjYuMCJF!5e0!3m2!1sen!2ssa!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full"
              title={t("title")}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </RevealPanel>
        </div>
      </Container>
    </Section>
  );
}
