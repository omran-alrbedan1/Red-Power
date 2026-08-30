import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealPanel } from "@/components/ui/reveal-panel";

type AboutStatsItem = {
  number: string;
  label: string;
};

export function AboutStats() {
  const t = useTranslations("about.stats");
  const items = t.raw("items") as AboutStatsItem[];

  return (
    <Section className="bg-[#0b0c0d]">
      <Container className="space-y-10">
        <RevealPanel className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-red-500">
            {t("eyebrow")}
          </p>
          <h2 className="text-4xl font-semibold uppercase tracking-tight text-white sm:text-5xl">
            {t("title")}
          </h2>
        </RevealPanel>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <RevealPanel
              key={item.number}
              delay={index * 80}
              className="group relative overflow-hidden border border-white/8 bg-[#101214] p-7 transition-colors hover:border-red-600/40"
            >
              <span className="block h-0.5 w-8 bg-red-600" />
              <h3 className="mt-6 text-4xl font-semibold uppercase tracking-tight text-white sm:text-5xl">
                {item.number}
              </h3>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{item.label}</p>
            </RevealPanel>
          ))}
        </div>
      </Container>
    </Section>
  );
}
