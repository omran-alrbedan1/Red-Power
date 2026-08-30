import Link from "next/link";
import { useLocale } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealPanel } from "@/components/ui/reveal-panel";

type ServiceDetailProcessSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  items: Array<{
    body: string;
    title: string;
  }>;
};

export function ServiceDetailProcessSection({
  eyebrow,
  title,
  description,
  ctaLabel,
  items,
}: ServiceDetailProcessSectionProps) {
  const locale = useLocale();

  return (
    <Section className="bg-[#0a0b0c]">
      <Container className="space-y-10">
        <RevealPanel className="max-w-4xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-red-500">
            {eyebrow}
          </p>
          <h2 className="text-4xl font-semibold uppercase tracking-tight text-white sm:text-5xl">
            {title}
          </h2>
          <p className="max-w-3xl text-base leading-7 text-zinc-400 sm:text-lg">
            {description}
          </p>
        </RevealPanel>
        <div className="grid gap-px border border-white/8 bg-white/8 lg:grid-cols-4">
          {items.map((item, index) => (
            <RevealPanel
              key={item.title}
              className="bg-[#111315] p-6 sm:p-8"
              delay={index * 60}
            >
              <p className="text-4xl font-semibold text-red-500">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-2xl font-semibold uppercase tracking-tight text-white">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-zinc-400">{item.body}</p>
              <Link
                href={`/${locale}/contact`}
                className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:text-red-400"
              >
                {ctaLabel}
              </Link>
            </RevealPanel>
          ))}
        </div>
      </Container>
    </Section>
  );
}
