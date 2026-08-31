import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { RevealPanel } from "@/components/ui/reveal-panel";

import type { ReviewsOverviewItem } from "./reviews-content";

type ReviewsTrustPanelProps = {
  description: string;
  items: ReviewsOverviewItem[];
  title: string;
};

export function ReviewsTrustPanel({
  description,
  items,
  title,
}: ReviewsTrustPanelProps) {
  return (
    <Section className="bg-gallery-page pb-8 pt-8">
      <Container>
        <div className="overflow-hidden rounded-[18px] border border-white/10 bg-gallery-panel shadow-[0_16px_50px_rgba(0,0,0,0.24)]">
          <div className="grid gap-px bg-white/10 lg:grid-cols-[1.1fr_1fr_1fr_1fr]">
            <RevealPanel className="bg-gallery-panel px-6 py-7 sm:px-8">
              <p className="text-sm font-semibold tracking-[0.22em] text-red-500">
                {title}
              </p>
              <p className="mt-4 max-w-sm text-base leading-8 text-zinc-400">
                {description}
              </p>
            </RevealPanel>

            {items.map((item, index) => (
              <RevealPanel
                key={item.title}
                delay={index * 80}
                className="bg-gallery-panel px-6 py-7"
              >
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-zinc-400">
                  {item.body}
                </p>
              </RevealPanel>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
