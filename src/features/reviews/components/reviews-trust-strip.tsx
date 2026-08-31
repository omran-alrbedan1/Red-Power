import { Headset, ShieldCheck, Star, ThumbsUp } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { RevealPanel } from "@/components/ui/reveal-panel";
import { cn } from "@/lib/utils";

import type { ReviewsFeatureItem } from "./reviews-content";

const trustIcons = [ShieldCheck, ThumbsUp, Star, Headset] as const;

export function ReviewsTrustStrip() {
  const t = useTranslations("reviews.features");
  const items = t.raw("items") as ReviewsFeatureItem[];

  return (
    <section className="bg-gallery-page pt-4">
      <Container>
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = trustIcons[index] ?? ShieldCheck;

            return (
              <RevealPanel
                key={item.title}
                delay={index * 60}
                className={cn(
                  "group flex items-center gap-4 bg-gallery-page px-6 py-6 transition-colors duration-300",
                  "hover:bg-gallery-panel"
                )}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-red-700/35 bg-red-600/8 text-red-500">
                  <Icon className="size-5" strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-zinc-400">{item.body}</p>
                </div>
              </RevealPanel>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
