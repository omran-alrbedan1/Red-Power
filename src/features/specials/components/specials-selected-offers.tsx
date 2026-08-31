"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Wrench, Shield, Gauge } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { OptimizedImage } from "@/components/ui/optimized-image";
import {
  depthCardIn,
  lineDrawIn,
  motionViewport,
  softSpring,
  staggerContainer,
} from "@/components/ui/motion-presets";
import { RevealPanel } from "@/components/ui/reveal-panel";
import { images } from "@/constants/image";

const ICON_MAP = {
  wrench: Wrench,
  shield: Shield,
  zap: Gauge,
};

const OFFER_IMAGE_MAP = {
  wrench: images.services.technicianWorking,
  shield: images.specials.brakeAndWheelDetail,
  zap: images.services.mechanicEngineService,
} as const;

type SelectedOfferItem = {
  title: string;
  description: string;
  icon: keyof typeof ICON_MAP;
  cta: string;
};

export function SpecialsSelectedOffers() {
  const locale = useLocale();
  const t = useTranslations("specials.selectedOffers");
  const isArabic = locale === "ar";
  const reduceMotion = useReducedMotion();
  const items = t.raw("items") as SelectedOfferItem[];

  return (
    <Section className="bg-[#050505] py-14 sm:py-16">
      <Container className="space-y-10">
        <RevealPanel className="flex flex-col items-center gap-3 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-white/90 sm:tracking-[0.3em]">
            {t("eyebrow")}
          </p>
          <motion.span
            className="h-0.5 w-7 rounded-full bg-red-600"
            initial="hidden"
            whileInView="visible"
            viewport={motionViewport}
            variants={reduceMotion ? undefined : lineDrawIn("x", 0.1)}
            style={{ transformOrigin: "center" }}
          />
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {t("title")}
          </h2>
        </RevealPanel>

        <motion.div
          className="grid gap-6 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={reduceMotion ? undefined : staggerContainer(0.12, 0.1)}
        >
          {items.map((item, index) => {
            const Icon = ICON_MAP[item.icon] || Wrench;
            const imageSrc = OFFER_IMAGE_MAP[item.icon];

            return (
              <motion.div
                key={item.title}
                variants={reduceMotion ? undefined : depthCardIn(0)}
                whileHover={reduceMotion ? undefined : { y: -8, scale: 1.015 }}
                transition={softSpring}
                className="group relative overflow-hidden rounded-b-xl bg-[#0d0d0d] p-0 shadow-[-16px_16px_30px_-16px_rgba(220,38,38,0.4)] transition-[box-shadow] duration-300 hover:shadow-[-20px_20px_46px_-16px_rgba(220,38,38,0.6)]"
              >
                {/* Number Badge at Top-Right — returns to an enforced red on hover */}
                <motion.div
                  className="absolute right-0 top-0 z-20 flex h-9 w-11 items-center justify-center bg-red-600 text-xs font-bold text-white shadow-md transition-colors duration-300 group-hover:bg-red-500"
                  whileHover={reduceMotion ? undefined : { y: 3, scale: 1.04 }}
                  transition={softSpring}
                >
                  {String(index + 1).padStart(2, "0")}
                </motion.div>

                {/* Red sheen that sweeps across on hover */}
                <motion.div
                  className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.09)_50%,transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Top Image Container */}
                <div className="relative h-44 w-full overflow-hidden">
                  <OptimizedImage
                    src={imageSrc}
                    alt={item.title}
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="h-full w-full rounded-none border-0 bg-black shadow-none"
                    imageClassName="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-black/40 to-black/20" />
                </div>

                {/* Overlapping Red Circular Icon */}
                <div className="relative px-6">
                  <motion.div
                    className="absolute -top-6 left-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_0_22px_rgba(220,38,38,0.95)] transition-shadow duration-300 group-hover:shadow-[0_0_34px_rgba(220,38,38,1)]"
                    whileHover={
                      reduceMotion ? undefined : { scale: 1.08, rotate: -6 }
                    }
                    transition={softSpring}
                  >
                    <Icon className="size-6" strokeWidth={2.25} />
                  </motion.div>
                </div>

                {/* Card Content — lifts directionally on hover */}
                <motion.div
                  className="flex flex-col items-center px-6 pb-6 pt-9 text-center"
                  whileHover={reduceMotion ? undefined : { y: -3 }}
                  transition={softSpring}
                >
                  <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-red-50">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                    {item.description}
                  </p>

                  <Link
                    href={`/${locale}/contact`}
                    className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-red-600 transition-colors hover:text-red-500"
                  >
                    <span>{item.cta}</span>
                    <motion.span
                      aria-hidden="true"
                      className="text-sm"
                      whileHover={
                        reduceMotion ? undefined : { x: isArabic ? -4 : 4 }
                      }
                      transition={softSpring}
                    >
                      {isArabic ? "←" : "→"}
                    </motion.span>
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="flex justify-center pt-2">
          <motion.span
            className="h-0.5 w-8 rounded-full bg-red-600"
            initial="hidden"
            whileInView="visible"
            viewport={motionViewport}
            variants={reduceMotion ? undefined : lineDrawIn("x", 0.3)}
            style={{ transformOrigin: "center" }}
          />
        </div>
      </Container>
    </Section>
  );
}
