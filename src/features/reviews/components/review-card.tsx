"use client";

import { CarFront, Star } from "lucide-react";

import type { ReviewsTestimonialItem } from "./reviews-content";

type ReviewCardProps = {
  item: ReviewsTestimonialItem;
};

export function ReviewCard({ item }: ReviewCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden border border-white/10 bg-card-deep transition-colors duration-300 hover:border-red-700/45">
      <div className="flex items-start justify-between gap-4 border-b border-white/8 px-6 py-5">
        <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">
          {item.name}
        </h3>
        <span className="shrink-0 text-sm text-zinc-500">{item.time}</span>
      </div>

      <div className="flex items-center gap-1 px-6 pt-5 text-red-500">
        {Array.from({ length: 5 }).map((_, starIndex) => (
          <Star key={starIndex} className="size-4 fill-current" />
        ))}
      </div>

      <p className="flex-1 px-6 py-5 text-base leading-8 text-zinc-300/92">
        {item.body}
      </p>

      <div className="flex items-center gap-3 border-t border-white/8 px-6 py-5 text-zinc-200">
        <CarFront className="size-5 text-red-500" />
        <span className="text-lg font-medium">{item.vehicle}</span>
      </div>
    </article>
  );
}
