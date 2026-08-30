import { useTranslations } from "next-intl";

import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealPanel } from "@/components/ui/reveal-panel";

type ContactHubItem = {
  title: string;
  value: string;
};

export function ContactHubSection() {
  const t = useTranslations("contact.hub");
  const items = t.raw("items") as ContactHubItem[];

  return (
    <Section className="bg-[#0d0f11]">
      <Container className="grid gap-8 lg:grid-cols-[1.06fr_0.94fr] lg:items-start">
        <RevealPanel className="border border-white/10 bg-white/5 p-6 sm:p-8">
          <ContactForm />
        </RevealPanel>
        <RevealPanel
          delay={120}
          direction="right"
          className="space-y-6 border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 sm:p-8"
        >
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-red-500">
              {t("eyebrow")}
            </p>
            <h2 className="text-4xl font-semibold uppercase tracking-tight text-white sm:text-5xl">
              {t("title")}
            </h2>
            <p className="max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
              {t("description")}
            </p>
          </div>

          <div className="border border-white/8 bg-[#111315] p-5 sm:p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white">
              {t("panelTitle")}
            </p>
            <div className="mt-5 grid gap-4">
              {items.map((item) => (
                <div key={item.title} className="border border-white/8 bg-black/20 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-red-400">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-zinc-300">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealPanel>
      </Container>
    </Section>
  );
}
