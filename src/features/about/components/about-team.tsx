import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { RevealPanel } from "@/components/ui/reveal-panel";
import { images } from "@/constants/image";

type AboutTeamItem = {
  title: string;
  body: string;
};

export function AboutTeam() {
  const t = useTranslations("about.team");
  const items = t.raw("items") as AboutTeamItem[];

  return (
    <Section className="bg-[#0a0b0c]">
      <Container className="space-y-12">
        <RevealPanel className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-red-500">
            {t("eyebrow")}
          </p>
          <h2 className="text-4xl font-semibold uppercase tracking-tight text-white sm:text-5xl">
            {t("title")}
          </h2>
        </RevealPanel>
        
        <RevealPanel className="relative border border-red-600/25 bg-[#101214] p-8 sm:p-10">
          <span className="pointer-events-none absolute inset-y-0 right-0 w-1 bg-red-600" />
          <blockquote className="relative space-y-4">
            <p className="text-xl leading-8 text-zinc-300 sm:text-2xl">
              "{t("quote")}"
            </p>
            <footer className="mt-6">
              <cite className="not-italic">
                <span className="block text-sm font-semibold uppercase tracking-wider text-red-500">
                  {t("quoteAuthor")}
                </span>
              </cite>
            </footer>
          </blockquote>
        </RevealPanel>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <RevealPanel
              key={item.title}
              delay={index * 80}
              className="group relative overflow-hidden border border-white/8 bg-[#101214] p-7 transition-colors hover:border-red-600/40"
            >
              <span className="block h-0.5 w-8 bg-red-600" />
              <h3 className="mt-6 text-xl font-semibold uppercase tracking-tight text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{item.body}</p>
            </RevealPanel>
          ))}
        </div>
      </Container>
    </Section>
  );
}
