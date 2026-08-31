import { ReviewsBottomMetrics } from "./reviews-bottom-metrics";
import { ReviewsCta } from "./reviews-cta";
import { ReviewsGrid } from "./reviews-grid";
import { ReviewsHero } from "./reviews-hero";
import { ReviewsSummary } from "./reviews-summary";
import { ReviewsTrustStrip } from "./reviews-trust-strip";

export function ReviewsShowcase() {
  return (
    <>
      <ReviewsHero />
      <ReviewsSummary />
      <ReviewsTrustStrip />
      <ReviewsGrid />
      <ReviewsCta />
      <ReviewsBottomMetrics />
    </>
  );
}
