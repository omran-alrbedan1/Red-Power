import { useTranslations } from "next-intl";

import { ServiceRequestForm } from "@/components/forms/service-request-form";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealPanel } from "@/components/ui/reveal-panel";

type RequestFlowItem = string;

export function SpecialsRequestSection() {
  const t = useTranslations("specials.requestFlow");
  const items = t.raw("items") as RequestFlowItem[];

  return (
    <Section className="bg-[#0d0f11]">
      <Container className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <RevealPanel className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-red-500">
            {t("eyebrow")}
          </p>
          <h2 className="text-4xl font-semibold uppercase tracking-tight text-white sm:text-5xl">
            {t("title")}
          </h2>
          <p className="max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
            {t("description")}
          </p>
          <div className="border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white">
              {t("panelTitle")}
            </p>
            <ul className="mt-5 grid gap-4 text-sm leading-7 text-zinc-300">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </RevealPanel>
        <RevealPanel delay={120} direction="right" className="border border-white/10 bg-white/5 p-6 sm:p-8">
          <ServiceRequestForm />
        </RevealPanel>
      </Container>
    </Section>
  );
}
