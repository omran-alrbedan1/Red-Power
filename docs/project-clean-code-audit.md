# Project Clean Code & Best Practices Audit

Date: 2026-08-31  
Project: Red Power website

## Validation Snapshot

Commands run:

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
```

Current status:

- `npm run typecheck`: passes.
- `npm run build`: passes.
- `npm run lint`: fails with 3 errors and 9 warnings.
- `npm run format:check`: fails; Prettier reports style drift in 72 files.
- Build/typegen repeatedly warn that `@next/swc-win32-x64-msvc` is not a valid Win32 application, but Next falls back to WASM and completes.


## P1 - Restore Formatting Discipline

### 5. Run Prettier once and keep it enforced

`npm run format:check` currently reports 72 files with formatting drift.

Recommended change:

- Run `npm run format`.
- Review the diff carefully, especially because many files contain Arabic text and recent redesign work.
- Add `npm run format:check` to CI before merge/deploy.

Why this matters:

- The project is already changing quickly. Formatting drift makes real diffs harder to review and increases merge friction.

## P2 - Remove Lint Warnings / Dead Imports

Current warnings include:

- `src/app/opengraph-image.tsx`: `<img>` warning from Next lint.
- `src/features/contact/components/contact-hero.tsx`: unused `Link`, unused `buttonClassName`.
- `src/features/gallery/components/gallery-cta.tsx`: unused `useMessages`, unused `GalleryItemId`.
- `src/features/gallery/components/gallery-grid.tsx`: unused `Grid2x2`.
- `src/features/services/components/service-detail-hero.tsx`: unused `Container`, unused `eyebrow`.
- `src/lib/seo.ts`: unused `OPEN_GRAPH_LOCALES`.

Recommended change:

- Remove unused imports/variables.
- For `opengraph-image.tsx`, keep `<img>` only if required by `ImageResponse`; otherwise use a lint override with a short comment explaining why.

## P2 - Simplify Server / Client Boundaries

Next docs for this project version emphasize that `"use client"` pulls the imported module graph into the browser bundle. Several sections are client components mostly because they use animations, `useTranslations`, or `useMessages`.

Recommended changes:

- Keep client boundaries only around interactive pieces: mobile menu, forms, dialogs, load-more grids, animated wrappers.
- Prefer server components for static page sections when possible.
- Avoid making whole page compositions client components only to read translated arrays.

Examples to review:

- `src/features/gallery/components/gallery-showcase.tsx`
- `src/features/reviews/components/reviews-grid.tsx`
- `src/features/contact/components/contact-hero.tsx`
- `src/features/contact/components/contact-hub-section.tsx`

Practical direction:

- Server page loads translations/data.
- Static presentational sections stay server-rendered.
- Small client components receive serializable props only where they need state or event handlers.

## P2 - Consolidate Data Ownership Patterns

The project has a few different patterns for page data:

- Some features read arrays from translation JSON with `t.raw`.
- Gallery uses `constants.ts` for image/data IDs and translations for labels.
- Reviews currently has multiple component variants and duplicated concepts.
- Contact has both `ContactFeatures` and `ContactLocation`, with route composition still in flux.

Recommended change:

- Pick one feature pattern and apply it consistently:
  - Static image/data IDs live in feature `constants.ts`.
  - Localized copy lives in `messages/{locale}/*.json`.
  - Page route imports from the feature barrel.
  - Stateful behavior stays in one small container component only when needed.

Why this matters:

- This will make future API integration easier because constants can be replaced with fetched data without rewriting component trees.

## P2 - Clean Up Reviews Feature Drift

Current reviews feature exports include:

- `ReviewCard`
- `ReviewsBottomMetrics`
- `ReviewsCta`
- `ReviewsGrid`
- `ReviewsHero`
- `ReviewsSummary`
- `ReviewsTrustStrip`

There were also recent alternate names during redesign work such as editorial/trust-panel/showcase components. The current route imports the individual section components directly.

Recommended change:

- Decide whether reviews should expose a single `ReviewsShowcase` component or individual route sections.
- Remove unused alternate files if they exist again later.
- Keep one naming system: either `summary/grid/trust-strip` or `trust-panel/editorial-grid`, not both.

## P2 - Make Contact Location Production-Ready

File:

- `src/features/contact/components/contact-location.tsx`

Current issues:

- It contains a hardcoded Google Maps embed URL with placeholder-looking coordinates.
- The real maps link is in translations/config.
- The component uses comments that describe layout mechanics rather than business intent.

Recommended change:

- Put the real maps URL in `siteConfig` or a contact constants file.
- If embedding Google Maps, use a verified embed URL from the same real location.
- Keep the outbound button using the provided `maps.app.goo.gl` link.
- Remove obvious layout comments once the component is stable.

## P2 - Improve Configuration Consistency

`src/config/site.ts` still uses:

```ts
arabicName: "ريد باور جراج"
```

But the latest contact-page requirement says not to use `جراج` in Arabic contact branding.

Recommended change:

- Decide whether the brand is globally `ريد باور` or only contact-page copy should avoid `جراج`.
- If global, update `siteConfig.arabicName`, common translations, JSON-LD naming, footer, and SEO text together.
- If contact-only, keep this intentional and document it.

## P2 - Form/API Hardening

Recommended changes:

- Check `response.ok` before parsing JSON in `src/lib/api/public-forms.ts`.
- Add a typed fallback error when an API returns non-JSON.
- Add server-side body size handling for contact submissions if needed.
- Consider rate limiting beyond the in-memory duplicate cache before production.
- Keep honeypot fields, but add logging/observability only server-side.

Why this matters:

- In-memory dedupe resets per process and does not protect multi-instance deployments.

## P3 - SEO / Metadata Improvements

Recommended changes:

- Remove or use `OPEN_GRAPH_LOCALES` in `src/lib/seo.ts`.
- Avoid hardcoded sitemap `lastModified`; derive from build time, content metadata, or omit it if it is not meaningful.
- Ensure site URL is production-final before launch; `siteConfig.siteUrl` currently points to `https://red-power.vercel.app`.
- Review JSON-LD business details once real address, phone, and map data are final.

## P3 - Accessibility & UX Pass

Recommended checks:

- Verify Arabic/English direction in every redesigned section, especially mixed English vehicle names inside Arabic cards.
- Ensure all icon-only buttons have accessible names.
- Check focus states on custom cards and dialog triggers.
- Test contact form errors in both locales.
- Confirm mobile nav focus behavior after route changes.
- Run browser checks at mobile, tablet, and desktop widths after the formatting/lint pass.

## Suggested Cleanup Order

1. Create `/api/contact` so the main form works.
2. Fix the 3 lint errors.
3. Remove unused imports causing lint warnings.
4. Run `npm run format` and review the large formatting diff.
5. Decide final contact page section order and mount/remove unused contact sections.
6. Normalize reviews naming and remove old/unused variants.
7. Refactor static sections toward server components where practical.
8. Harden form submission error handling and production rate limiting.
9. Final SEO/config pass before deployment.

## Acceptance Checklist

- `npm run typecheck` passes.
- `npm run lint` passes with zero errors.
- `npm run format:check` passes.
- `npm run build` passes.
- Contact form submits successfully to `/api/contact`.
- Contact page renders all approved design sections.
- No obvious unused feature components remain.
- Arabic branding decision is consistent across UI, config, and SEO.
