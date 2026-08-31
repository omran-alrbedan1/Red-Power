import Link from "next/link";
import { Gauge, MapPin, ShieldCheck, Trophy, Users } from "lucide-react";
import { useMessages, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealPanel } from "@/components/ui/reveal-panel";
import { cn } from "@/lib/utils";

type ContactFeatureItem = {
  description: string;
  title: string;
};

const featureIcons = [Trophy, ShieldCheck, Users, Gauge] as const;

export function ContactFeatures() {
  const t = useTranslations("contact");
  const messages = useMessages() as {
    contact: {
      features: {
        items: ContactFeatureItem[];
      };
      location: {
        address: string;
        buttonLabel: string;
        link: string;
        title: string;
      };
    };
  };
  const { features, location } = messages.contact;

  return (
    <Section className="bg-gallery-page pt-8">
      <Container className="space-y-6">
        <div className="overflow-hidden rounded-[22px] border border-red-700/35 bg-gallery-panel shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
          <div className="grid lg:grid-cols-[0.38fr_0.62fr]">
            <RevealPanel className="border-b border-white/10 p-8 lg:border-b-0 lg:border-e">
              <h2 className="text-center text-4xl font-semibold tracking-[-0.04em] text-white">
                {location.title}
              </h2>
              <span className="mx-auto mt-4 block h-1 w-12 rounded-full bg-red-600" />

              <div className="mt-8 rounded-[18px] border border-white/10 bg-black/30 p-6 text-right">
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-red-700/35 text-red-500">
                  <MapPin className="size-6" strokeWidth={1.8} />
                </span>
                <p className="text-xl leading-9 text-zinc-200">{location.address}</p>
                <Link
                  href={location.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex rounded-[8px] border border-red-600/50 px-6 py-3 text-base font-medium text-white transition hover:bg-red-600/10"
                >
                  {location.buttonLabel}
                </Link>
              </div>
            </RevealPanel>

            <RevealPanel delay={120} direction="left" className="relative min-h-[360px] overflow-hidden bg-black">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(225,6,19,0.25),transparent_10%),repeating-linear-gradient(90deg,rgba(255,255,255,0.06)_0,rgba(255,255,255,0.06)_2px,transparent_2px,transparent_78px),repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0,rgba(255,255,255,0.05)_2px,transparent_2px,transparent_72px),linear-gradient(180deg,rgba(15,15,15,0.96),rgba(5,5,5,0.88))]" />
              <div className="absolute inset-0 opacity-40 bg-[linear-gradient(35deg,transparent_0%,transparent_46%,rgba(255,255,255,0.12)_46%,rgba(255,255,255,0.12)_48%,transparent_48%,transparent_100%)]" />
              <div className="absolute left-[56%] top-[44%] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600 shadow-[0_0_28px_rgba(225,6,19,0.5)]" />
              <div className="absolute left-[56%] top-[44%] h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-600/45" />
              <div className="absolute left-[56%] top-[44%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-600/20" />
            </RevealPanel>
          </div>
        </div>

        <div className="overflow-hidden rounded-[22px] border border-white/10 bg-gallery-panel shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
          <RevealPanel className="px-6 pb-4 pt-8 text-center sm:px-8">
            <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              {t("features.title")}
            </h2>
            <span className="mx-auto mt-4 block h-1 w-12 rounded-full bg-red-600" />
          </RevealPanel>

          <div className="grid gap-px bg-white/10 lg:grid-cols-4">
            {features.items.map((item, index) => {
              const Icon = featureIcons[index] ?? Gauge;

              return (
                <RevealPanel
                  key={item.title}
                  delay={index * 70}
                  className={cn("bg-gallery-panel px-6 py-8 text-center")}
                >
                  <span className="mx-auto flex h-14 w-14 items-center justify-center text-red-500">
                    <Icon className="size-9" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-red-500">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-zinc-400">
                    {item.description}
                  </p>
                </RevealPanel>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
