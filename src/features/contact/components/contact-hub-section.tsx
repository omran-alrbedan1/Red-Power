import {
  Clock3,
  Headset,
  MapPin,
  PhoneCall,
} from "lucide-react";
import { useMessages, useTranslations } from "next-intl";

import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealPanel } from "@/components/ui/reveal-panel";
import { cn } from "@/lib/utils";

type ContactHubItem = {
  kind: "phone" | "location" | "hours" | "support";
  note: string;
  title: string;
  value: string;
};

const iconMap = {
  hours: Clock3,
  location: MapPin,
  phone: PhoneCall,
  support: Headset,
} as const;

export function ContactHubSection() {
  const t = useTranslations("contact.hub");
  const messages = useMessages() as {
    contact: {
      hub: {
        items: ContactHubItem[];
      };
    };
  };
  const items = messages.contact.hub.items;

  return (
    <Section className="bg-gallery-page pt-10">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[0.45fr_0.55fr]">
          <RevealPanel className="overflow-hidden rounded-[22px] border border-red-700/35 bg-gallery-panel p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] sm:p-8">
            <h2 className="text-center text-4xl font-semibold tracking-[-0.04em] text-white">
              {t("infoTitle")}
            </h2>
            <span className="mx-auto mt-4 block h-1 w-12 rounded-full bg-red-600" />

            <div className="mt-8 space-y-5">
              {items.map((item) => {
                const Icon = iconMap[item.kind];

                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 border-b border-red-950/60 pb-5 last:border-b-0 last:pb-0"
                  >
                    <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-red-700/35 bg-[radial-gradient(circle,rgba(225,6,19,0.22),rgba(0,0,0,0.12))] text-red-500">
                      <Icon className="size-7" strokeWidth={1.8} />
                    </span>
                    <div className="text-right">
                      <p className="text-xl font-semibold text-white">{item.title}</p>
                      <p className="mt-2 text-lg leading-8 text-zinc-200">{item.value}</p>
                      {item.note ? (
                        <p className="mt-2 text-sm text-red-400">{item.note}</p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </RevealPanel>

          <RevealPanel
            delay={120}
            direction="left"
            className="overflow-hidden rounded-[22px] border border-red-700/35 bg-gallery-panel p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] sm:p-8"
          >
            <div className={cn("mx-auto max-w-2xl")}>
              <ContactForm />
            </div>
          </RevealPanel>
        </div>
      </Container>
    </Section>
  );
}
